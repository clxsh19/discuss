import { query, queryTransaction } from "../db";
import CustomError from "../utils/customError";

interface CreateSubParams {
  subName: string;
  displayName: string;
  description: string;
  bannerFilePath: string;
  logoFilePath: string;
}

interface GetSubInfoParams {
  userId?: number;
  subName: string;
}

interface CheckUserSubParams {
  userId?: number;
  subId: string;
}

const checkSubExist = async(lowerCaseName: string) => {
  const existQuery = await query( `SELECT EXISTS ( SELECT 1 FROM subreddits 
    WHERE name = $1)`, [lowerCaseName]
  );
  return existQuery.rows[0].exists;
};

const checkUserSubscription = async({ userId, subId } : CheckUserSubParams) => {
  const queries = [
    'SELECT 1 FROM subreddits WHERE subreddit_id = $1',
    'SELECT 1 from subreddit_members WHERE user_id = $1 AND subreddit_id = $2'
  ];
  const params = [ [subId], [userId, subId] ];
  const existQuery = await queryTransaction(queries, params);
  const subNotExist = existQuery[0].rows.length === 0;
  const userSubStatus = existQuery[1].rows.length > 0 ? true : false;

  return { userSubStatus, subNotExist };
}

const createSub = async({ 
  subName, displayName, description, bannerFilePath, logoFilePath }: CreateSubParams
) => {
  const lowerCaseName = subName.toLowerCase();
  const exists = await checkSubExist(lowerCaseName);
  if (exists) {
    throw new CustomError("Community already exists", 403, {
      errors: "the community exists query returns true",
      location: "subController/postCreate/createSub"
    });
  }

  await query(`INSERT INTO subreddits 
    (name, display_name, description, banner_url, logo_url) 
    VALUES ($1, $2, $3, $4, $5)`,
    [lowerCaseName, displayName, description, bannerFilePath, logoFilePath]
  );

  return { message: "Community created successfully" };
};

const getSubInfo = async({ userId, subName } : GetSubInfoParams) => {
  const lowerCaseName = subName.toLowerCase();
  const infoQuery = await query(`SELECT 
    s.subreddit_id,
    s.name AS sub_name,
    s.display_name,
    s.description,
    s.members_count,
    s.created_at,
    s.logo_url,
    s.banner_url,
    COALESCE(sm.role, 'none') AS user_role
    FROM subreddits s
    LEFT JOIN subreddit_members sm 
      ON s.subreddit_id = sm.subreddit_id 
      AND sm.user_id = $1
    WHERE s.name = $2`,
    [userId, lowerCaseName]);

  return { data: infoQuery.rows[0] };
;}

const subscribeUserToSub = async({ userId, subId } : CheckUserSubParams) => {
  const { userSubStatus, subNotExist } = await checkUserSubscription({userId, subId});

  if (subNotExist || userSubStatus) {
    throw new CustomError("Community doesn't exist or User already subscribed",
      409, {
      errors: `userSubStatus : ${userSubStatus}, subNotExist: ${subNotExist}`,
      location: "subController/postSubscribe/subscribeUserToSub/"
    });
  }
  await query(`INSERT INTO subreddit_members (user_id, subreddit_id) 
    VALUES ($1, $2)`, [userId, subId]);

  return { message: "User joined the community"}
}

const unsubscribeUserToSub = async({ userId, subId } : CheckUserSubParams) => {
  const { userSubStatus, subNotExist } = await checkUserSubscription({userId, subId});

  if (subNotExist || !userSubStatus) {
    throw new CustomError("Community doesn't exist or User already unsubscribed",
      409, {
      errors: `userSubStatus : ${userSubStatus}, subNotExist: ${subNotExist}`,
      location: "subController/postSubscribe/unsubscribeUserToSub/"
    });
  }
  await query(`DELETE FROM subreddit_members WHERE user_id = $1 
    AND subreddit_id = $2`, [userId, subId]);

  return { message: "User left the community" } 
}

const getAllSubName = async() => {
  const allNameQuery = await query(`SELECT subreddit_id, name FROM subreddits`);
  return { data: allNameQuery.rows[0] };
}


export {
  checkSubExist,
  createSub,
  getSubInfo,
  subscribeUserToSub,
  unsubscribeUserToSub,
  getAllSubName
}
