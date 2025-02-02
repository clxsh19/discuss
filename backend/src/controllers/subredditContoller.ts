import asyncHandler from "express-async-handler";
import { body, query, validationResult } from "express-validator";
import {query as dbQuery, queryTransaction} from "../db/index";
import { deleteUploadedFile } from "../utils/deleteUploadedFIle";

const post_create_subreddit = [
  body('name', 'Name must not be empty').not().isEmpty().withMessage('Name cannot be empty')
  .matches(/^(?!_+$)[a-zA-Z0-9_]+$/).withMessage("only alphabets,letters and underscore allowed")
  .trim().escape(),
  body('displayName', 'Display name must not be empty').not().isEmpty().withMessage('Display Name cannot be empty').trim().escape(),
  body('description').not().isEmpty().withMessage('Description cannot be empty').trim().escape(),
  
  asyncHandler( async(req, res) => {
    const errors = validationResult(req);
    const { name, displayName, description } = req.body;
    const lowerCaseName = name.toLowerCase();
    const files = req.files as { [fieldname: string] : Express.Multer.File[] };
    const bannerFilePath =  files.banner?.[0]?.path;
    const logoFilePath =  files.logo?.[0]?.path;

    if (!errors.isEmpty()) {
      // console.log(files);
      deleteUploadedFile(bannerFilePath);
      deleteUploadedFile(logoFilePath);

      res.status(400).json({ 
        errors: errors.array()
      });
    } else {
      const name_exists_query = await dbQuery(`SELECT EXISTS (
        SELECT 1 FROM subreddits WHERE name = $1 )`, [lowerCaseName] 
      );
      const name_exists = name_exists_query.rows[0].exists;
      if (name_exists) {
        res.status(403).json({ message: "Community already exists"});
      } else {
        await dbQuery(`INSERT INTO subreddits (name, display_name, description, banner_url, logo_url) VALUES ($1, $2, $3, $4, $5)`,
        [lowerCaseName, displayName, description, bannerFilePath, logoFilePath] );
        res.status(202).json({
          message: 'Community created successfully',
        });
      };
    };
  }),
];

const get_subbreddit_detail = asyncHandler( async(req, res) => {
  const subreddit_name = req.params.name.toLowerCase();
  const user_id = req.user?.id;
  const subreddit_query = await dbQuery(`SELECT 
    s.subreddit_id,
    s.name AS sub_name,
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
    [user_id, subreddit_name]);
  res.status(200).json({
    subreddit_detail: subreddit_query.rows[0]
  });
});

const user_join_subreddit = [
  body('subreddit_id').not().isEmpty().withMessage('subreddit_id cannot be null').trim().escape(),
  
  asyncHandler( async(req, res, next) => {
    const errors = validationResult(req);
    const { subreddit_id } = req.body;
    const user_id = req.user?.id; 

    if (!errors.isEmpty()) {
      res.status(400).json({ 
        message: 'subreddit_id is required',
        id: req.body.subreddit_id,
      });
    } else {
      const queries = [
        'SELECT 1 FROM subreddits WHERE subreddit_id = $1',
        'SELECT 1 from subreddit_members WHERE user_id = $1 AND subreddit_id = $2'
      ];
      const params = [
        [subreddit_id],
        [user_id, subreddit_id]
      ];

      const result = await queryTransaction(queries, params);

      if (result[0].rows.length === 0 || result[1].rows.length > 0) {
        res.status(409).json({
          message: "community doesn't exist or user already subscribed"
        });
        return;
      }

      const subscribe_query = await dbQuery(`INSERT INTO subreddit_members (user_id, subreddit_id) VALUES ($1, $2)`,
        [user_id, subreddit_id]);
      res.status(200).json({ 
        message: "User subscribed to the community",
        result: subscribe_query.rows[0]
      });
    }
  })
]

const user_leave_subreddit = [
  body('subreddit_id').not().isEmpty().withMessage('subreddit_id cannot be null').trim().escape(),
  
  asyncHandler( async(req, res, next) => {
    const errors = validationResult(req);
    const { subreddit_id } = req.body;
    const user_id = req.user?.id; 

    if (!errors.isEmpty()) {
      res.status(400).json({ 
        message: 'subreddit_id is required',
        id: req.body.subreddit_id,
      });
    } else {
      const queries = [
        'SELECT 1 FROM subreddits WHERE subreddit_id = $1',
        'SELECT 1 from subreddit_members WHERE user_id = $1 AND subreddit_id = $2'
      ];
      const params = [
        [subreddit_id],
        [user_id, subreddit_id]
      ];

      const result = await queryTransaction(queries, params);

      if (result[0].rows.length === 0 || result[1].rows.length === 0) {
        res.status(409).json({
          message: "sub doesn't exist or user already unsubscribed"
        });
        return;
      }

      const unsubscribe_query = await dbQuery(`DELETE FROM subreddit_members WHERE user_id = $1 AND subreddit_id = $2`,
        [user_id, subreddit_id]);
      res.status(200).json({ 
        message: "User unsubscribed",
        result: unsubscribe_query.rows[0]
      });
    }
  })
]

const get_all_communities = asyncHandler( async(req, res) => {
  // const user_id = req.user?.id;
  const name_query = await dbQuery(`SELECT subreddit_id, name FROM subreddits`);
  res.status(200).json({
    communities: name_query.rows
  });
});

const check_sub_exist = [
  query('sub_name').not().isEmpty().withMessage('community name cannot be null').trim().escape(),
  
  asyncHandler( async(req, res) => {
    const errors = validationResult(req);
    const { sub_name } = req.query;  

    if (!errors.isEmpty()) {
      res.status(400).json({ 
        errors: errors.array()
      });
    } else {
      const sub_query = await dbQuery(`SELECT 
        1 FROM subreddits
        WHERE name = $1`,
        [sub_name]);
      res.status(200).json({
        sub: sub_query.rowCount });
    }
})
]

export default {
  post_create_subreddit,
  get_subbreddit_detail,
  user_join_subreddit,
  get_all_communities,
  check_sub_exist
}