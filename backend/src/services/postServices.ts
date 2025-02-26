import { query, queryTransaction } from "../db";
import CustomError from "../utils/customError";

interface CreatePostParams {
  userId?: number;
  subName: string;
  title: string;
  postType: string;
  text?: string;
  mediaUrl?: string;
  link?: string; 
}

interface GetPostByIdParams {
  postId: string;
  userId?: number;
}

interface GetAllPostParams {
  userId?: number;
  offset: number;
  limit: number;
  timeCondition: string;
  sortCondition: string;
}

interface GetPostByNameParams extends GetAllPostParams {
  subName: string;
}

interface UserVotePostParams {
  postId: string;
  voteType: number;
  userId?: number;
}

const getSubId = async(lowerCaseName: string) => {
  const { rows } = await query(`SELECT subreddit_id FROM subreddits 
    WHERE name = $1`, [lowerCaseName]);
  return rows[0]?.subreddit_id;
}

const createPost = async({
  subName, title, postType, link, text, mediaUrl, userId }: CreatePostParams
) => {
  const lowerCaseName = subName.toLowerCase();
  const subId = await getSubId(lowerCaseName);
  if (!subId) {
    throw new CustomError("Community doesn't exists", 409, {
      errors: "the community exists query returns false",
      location: "postController/postCreate/createPost"
    });
  }

  const insertQuery = await query(`INSERT INTO posts (
    title, user_id, subreddit_id, post_type, text_content, media_url, link_url) 
    VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING post_id`
    , [title, userId, subId, postType, text, mediaUrl ,link] );
  
  return { data: insertQuery.rows[0].post_id }
} 

const getPostInfoById = async({ postId, userId }: GetPostByIdParams) => {
  const postQuery = await query(`SELECT
    p.post_id,
    p.title,
    p.text_content,
    p.user_id,
    p.created_at,
    u.username,
    p.vote_count AS total_votes,
    p.post_type,
    p.media_url,
    p.link_url,
    COALESCE(pv.vote_type, null) AS vote_type

    FROM posts p
    LEFT JOIN users u ON p.user_id = u.user_id
    LEFT JOIN post_votes pv ON p.post_id = pv.post_id AND pv.user_id = $2
    WHERE p.post_id = $1`, [postId, userId]
  );
  return ({ data: postQuery.rows[0] }); 
}

const getAllPost = async({ 
  userId, offset, limit, timeCondition, sortCondition} : GetAllPostParams
) => {
  const postQuery = await query(`SELECT
    p.post_id,
    p.title,
    p.post_type,
    p.link_url,
    p.media_url,
    p.text_content,
    p.created_at,
    p.comment_count AS total_comments,
    p.vote_count AS total_votes,
    u.username AS username,
    s.name AS subreddit_name,
    COALESCE(pv.vote_type, null) AS vote_type

    FROM posts p
    JOIN subreddits s ON p.subreddit_id = s.subreddit_id
    LEFT JOIN users u ON p.user_id = u.user_id
    LEFT JOIN post_votes pv ON p.post_id = pv.post_id AND pv.user_id = $1
    WHERE TRUE ${timeCondition}  -- Dynamic time filtering
    ${sortCondition}  -- Dynamic sorting
    
    LIMIT $2 OFFSET $3`, [userId, limit+1, offset]
  );
  // Check if there are more posts for pagination
  const hasMore = postQuery.rows.length > limit;
  const posts = hasMore ? postQuery.rows.slice(0, limit) : postQuery.rows;

  return { hasMore, posts };
}

const getPostByName = async({ 
  subName, userId, offset, limit, timeCondition, sortCondition} : GetPostByNameParams
) => {
  const postQuery = await query(`SELECT
    p.post_id,
    p.title,
    p.post_type,
    p.link_url,
    p.media_url,
    p.created_at,
    p.text_content,
    p.comment_count AS total_comments,
    p.vote_count AS total_votes,
    u.username AS username,
    s.name AS subreddit_name,
    s.display_name AS display_name,
    COALESCE(pv.vote_type, null) AS vote_type

    FROM posts p
    JOIN subreddits s ON p.subreddit_id = s.subreddit_id
    LEFT JOIN users u ON p.user_id = u.user_id
    LEFT JOIN post_votes pv ON p.post_id = pv.post_id 
    AND pv.user_id = $1
    WHERE s.name = $2
    ${timeCondition}
    ${sortCondition}
    
    LIMIT $3 OFFSET $4`, [userId, subName, limit+1, offset]
  );
  // Check if there are more posts for pagination
  const hasMore = postQuery.rows.length > limit;
  const posts = hasMore ? postQuery.rows.slice(0, limit) : postQuery.rows;

  return { hasMore, posts };
}

const userVotePost = async({ userId, postId, voteType} : UserVotePostParams) => {
  const voteCountQuery = 'UPDATE posts SET vote_count = vote_count + $1 WHERE post_id = $2';
  let voteQuery: string;
  let voteQueryParams: any[];
  let voteDiff = voteType; // how much to add or subtract
  
  const existingVote = await query(`SELECT vote_type FROM post_votes 
    WHERE user_id=$1 AND post_id = $2`, [userId, postId]);
  
  if (existingVote.rows.length > 0) { // vote exist
    const oldVoteType = existingVote.rows[0].vote_type;
    if (oldVoteType === voteType) {
      // same as old vote, so delete it
      voteQuery = 'DELETE FROM post_votes WHERE user_id = $1 AND post_id = $2';
      voteQueryParams = [userId, postId];
      voteDiff = -voteType;
    } else { 
      // update the vote with new vote
      voteQuery = 'UPDATE post_votes SET vote_type = $1 WHERE user_id = $2 AND post_id = $3';
      voteQueryParams = [voteType, userId, postId];
      voteDiff = voteType * 2;
    }
  } else { 
    // vote doesn't exist so insert it
    voteQuery = 'INSERT INTO post_votes (user_id, post_id, vote_type) VALUES ($1, $2, $3)';
    voteQueryParams = [userId, postId, voteType];
  }

  await queryTransaction(
    [voteQuery, voteCountQuery], [ 
    voteQueryParams, [voteDiff, postId]
  ]);

  return { message: "Vote registered successfully"}
} 

export {
  createPost,
  getPostInfoById,
  getAllPost,
  getPostByName,
  userVotePost
}
