import asyncHandler from "express-async-handler";
import { param, query, body, validationResult } from "express-validator";
import {query as dbQuery, queryTransaction} from "../db/index";
import { deleteUploadedFile } from "../utils/deleteUploadedFIle";

// need to change post schema to include author-id rather than using join and similar more stuff

const create_post = [
  body('title', 'Post title cannot be empty!').trim().isLength({min:1}).escape(),
  body('sub_name').not().isEmpty().withMessage('Please select a commuity!').trim().escape(),
  body('text').optional().trim().escape(),
  body('link').optional().trim().isURL().withMessage('Please enter a valid URL!').escape(),
  query('type').custom((value, { req }) => {
    console.log(value);
    console.log(req.file)
    const { text, link } = req.body;
    const validTypes = ['TEXT', 'MEDIA', 'LINK'];

    if (!validTypes.includes(value)) {
      throw new Error('Invalid post type!');
    }

    if (value === 'TEXT' && !text) {
      throw new Error('Text content is required for Text posts');
    }

    if (value === 'MEDIA' && !req.file) {
      throw new Error('Media file is required for Media posts');
    }

    if (value === 'LINK' && !link) {
      throw new Error('Link content is required for Link posts');
    }
    return true;
  }),

  asyncHandler(async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      let filePath = req.file?.path;
      if (filePath) deleteUploadedFile(filePath);

      res.status(400).json({ 
        errors: errors.array()
      });
    } else {
      const { sub_name, title, text, link} = req.body;
      const user_id = req.user?.id;
      const media_url = req.file?.path; 
      const { type: post_type } = req.query;

      //getting subreddit_id from db
      const result = await dbQuery(`SELECT subreddit_id FROM subreddits WHERE name = $1`, [sub_name.toLowerCase()]);
      if (result.rowCount === 0) {
        res.status(409).json({
          message: "Community doesn't exist!"
        });
        return;
      }
      const sub_id = result.rows[0].subreddit_id;
      
      await dbQuery(`INSERT INTO posts (title, user_id, subreddit_id, post_type, text_content, media_url, link_url) VALUES ($1, $2, $3, $4, $5, $6, $7)`,
      [title, user_id, sub_id, post_type, text, media_url ,link] );
      res.status(202).json({
        message: 'Post created successfully',
        file: req.file,
      });
    }
  }),
];


const get_post_by_id = [ 
  asyncHandler(async (req, res, next) => {
    const post_id = req.params.id;
    const user_id = req.user?.id || null;

    const post_query = await dbQuery(`SELECT
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
      p.text_content,
      COALESCE(pv.vote_type, null) AS vote_type

      FROM posts p
      LEFT JOIN users u ON p.user_id = u.user_id
      LEFT JOIN post_votes pv ON p.post_id = pv.post_id AND pv.user_id = $2
      WHERE p.post_id = $1`
      , [post_id, user_id]);
    // console.log(post_query.rows);
    res.status(200).json({
      post: post_query.rows[0]
    });
  })
];

const get_all_posts = [
  query('offset')
    .notEmpty()
    .withMessage('Offset is required.')
    .trim()
    .isInt({ min: 0 })
    .withMessage('Offset must be a positive integer.')
    .escape()
    .toInt(),

  query('sort')
    .optional()
    .trim()
    .isIn(['top', 'new'])
    .withMessage('Only top and new sort by')
    .escape(),

  query('t')
    .optional()
    .trim()
    .isIn(['day', 'week', 'month', 'year', 'all', ''])
    .withMessage('Invalid timeframe')
    .escape(),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return;
    }

    const user_id = req.user?.id || null;
    const limit = 5;
    const { offset, sort = 'new', t = 'all' } = req.query;

    // Sorting and time conditions
    let sortCondition = sort === 'new' ? 'ORDER BY p.created_at DESC, p.post_id DESC' : 'ORDER BY p.vote_count DESC, p.post_id DESC';
    let timeCondition = '';

    // Apply time filtering for 'top' sort with `t`
    if (sort === 'top') {
      switch (t) {
        case 'day':
        
          timeCondition = `AND p.created_at >= NOW() - INTERVAL '1 day'`;
          break;
        case 'week':
          timeCondition = `AND p.created_at >= NOW() - INTERVAL '1 week'`;
          break;
        case 'month':
          timeCondition = `AND p.created_at >= NOW() - INTERVAL '1 month'`;
          break;
        case 'year':
          timeCondition = `AND p.created_at >= NOW() - INTERVAL '1 year'`;
          break;
        // 'all' means no time condition
      }
    }

    try {
      // Query to fetch posts with sorting and time filtering
      const posts_query = await dbQuery(
        `SELECT
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
        LIMIT $2 OFFSET $3`,
        [user_id, limit + 1, offset]
      );

      // Check if there are more posts for pagination
      const hasMore = posts_query.rows.length > limit;
      const posts = hasMore ? posts_query.rows.slice(0, limit) : posts_query.rows;
      res.status(200).json({
        posts,
        hasMore,
      });
    } catch (error) {
      next(error);
    }
  })
];

const get_posts_by_subreddit = [
  query('offset')
    .notEmpty()
    .withMessage('Offset is required.')
    .trim()
    .isInt({ min: 0 })
    .withMessage('Offset must be a positive integer.')
    .escape(),

  query('sort')
    .optional()
    .trim()
    .isIn(['top', 'new'])
    .withMessage('Only top and new sort by')
    .escape(),

  query('t')
    .optional()
    .trim()
    .isIn(['day', 'week', 'month', 'year', 'all', ''])
    .withMessage('not sutaible duration')
    .escape(),

  param('name')
    .notEmpty()
    .withMessage('Subreddit name is required')
    .isString()
    .withMessage('Sub name must be string')
    .trim()
    .escape(),

  asyncHandler( async(req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ 
        errors: errors.array()
      });
      return;
    }
    const { offset, sort = 'new', t = 'all' } = req.query;
    const subreddit_name = req.params.name;
    const user_id = req.user?.id; // add conditon for user id not existing
    const limit = 5;

    let sortCondition = '';
    let timeCondition = '';

    // Apply sorting based on the 'sort' parameter
    if (sort === 'new') {
      sortCondition = 'ORDER BY p.created_at DESC';
    } else if (sort === 'top') {
      sortCondition = 'ORDER BY p.vote_count DESC';

      // Apply time filtering if `t` is provided and `sort` is 'top'
      if (t === 'day') {
        timeCondition = `AND p.created_at >= NOW() - INTERVAL '1 day'`;
      } else if (t === 'week') {
        timeCondition = `AND p.created_at >= NOW() - INTERVAL '1 week'`;
      } else if (t === 'month') {
        timeCondition = `AND p.created_at >= NOW() - INTERVAL '1 month'`;
      } else if (t === 'year') {
        timeCondition = `AND p.created_at >= NOW() - INTERVAL '1 year'`;
      } // 'all' means no time condition
    }

    const posts_query = await dbQuery(`SELECT
      p.post_id,
      p.title,
      p.post_type,
      p.link_url,
      p.media_url,
      p.created_at,
      p.comment_count AS total_comments,
      p.vote_count AS total_votes,
      u.username AS username,
      s.name AS subreddit_name,
      COALESCE(pv.vote_type, null) AS vote_type

      FROM posts p
      JOIN subreddits s ON p.subreddit_id = s.subreddit_id
      LEFT JOIN users u ON p.user_id = u.user_id
      LEFT JOIN post_votes pv ON p.post_id = pv.post_id 
      AND pv.user_id = $1
      WHERE s.name = $2
      ${timeCondition}
      ${sortCondition}
      
      LIMIT $3 OFFSET $4`
      , [user_id, subreddit_name, limit+1, offset]
    );
    const hasMore = posts_query.rows.length > limit;
    const posts = hasMore ? posts_query.rows.slice(0, limit) : posts_query.rows;
    res.status(200).json({
      posts,
      hasMore,
    });
  })
];

const post_vote = [
  body('post_id').not().isEmpty().withMessage('post_id caanot be null').trim().escape(),
  body('vote_type').notEmpty().withMessage('vote_type cannot be null').isIn([1, -1]).withMessage('vote_type must be either 1 or -1').toInt(),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.status(400).json({ 
        errors: errors.array()
      });
      next();
    } else {
      const { post_id, vote_type} = req.body;
      const user_id = req.user?.id;
    
      const existingVote = await dbQuery(`SELECT vote_type FROM post_votes WHERE user_id=$1 AND post_id = $2`, [user_id, post_id]);
      // user vote exist on this post say user upvoted 1
      if ( existingVote.rows.length > 0) { 
        const oldVoteType = existingVote.rows[0].vote_type;

        if (oldVoteType === vote_type) {// same as old vote revert it or delete it?
          const queries = [
            'DELETE FROM post_votes WHERE user_id = $1 AND post_id = $2',
            'UPDATE posts SET vote_count = vote_count - $1 WHERE post_id = $2'
          ];
          const params = [
            [user_id, post_id],
            [vote_type, post_id]
          ];
          res.status(204).json({ message: 'Deleted the vote'});
          await queryTransaction(queries, params);
          return;
          // next();
        }

        const queries = [ // update the vote
          'UPDATE post_votes SET vote_type = $1 WHERE user_id = $2 AND post_id = $3',
          'UPDATE posts SET vote_count = vote_count + $1 WHERE post_id = $2'
        ];

        const params = [
          [vote_type, user_id, post_id],
          [vote_type * 2, post_id]
        ]

        await queryTransaction(queries, params);
        res.status(200).json({ message: 'Vote updated successfully' });
      } else { // new vote add it 
        const queries = [
          'INSERT INTO post_votes (user_id, post_id, vote_type) VALUES ($1, $2, $3)',
          'UPDATE posts SET vote_count = vote_count + $1 WHERE post_id = $2'
        ];
        const params = [
          [user_id, post_id, vote_type],
          [vote_type, post_id]
        ]
        console.log('adding new vote : ', vote_type);
        await queryTransaction(queries, params)
        res.status(202).json({
          message: 'vote created successfully',
        });
      }
    };
  })
];

export default {
  create_post,
  get_posts_by_subreddit,
  get_all_posts,
  get_post_by_id,
  post_vote
}

