import asyncHandler from "express-async-handler";
import { param, query, body, validationResult } from "express-validator";
import {query as dbQuery, queryTransaction} from "../db/index";

const create_comment = [
  body('comment', 'Comment content must not be empty').trim().isLength({min:1}).escape(),
  body('post_id').not().isEmpty().withMessage('comment post_id cannot be null').trim().escape(),
  body('parent_comment_id').optional().trim().escape(),

  asyncHandler( async (req, res, next) => {
    const errors = validationResult(req);
    const { comment, post_id } = req.body;
    let { parent_comment_id } = req.body
    const user_id = req.user?.id;
    if (parent_comment_id === "" ) {
      parent_comment_id = null;
    }
    // console.log(parent_comment_id);      
  
    if (!errors.isEmpty()) {
      res.status(400).json({ 
        message: 'comment content, user_id and comment_id are required',
        comment,
        parent_comment_id,  
        post_id
      });
    } else {
      try {
        const queries = [
          'INSERT INTO comments (content, user_id, post_id, parent_comment_id) VALUES ($1, $2, $3, $4) RETURNING comment_id',
          'UPDATE posts SET comment_count = comment_count + 1 WHERE post_id = $1'
        ];
        const params = [
          [comment, user_id, post_id, parent_comment_id],
          [post_id]
        ]
        const result = await queryTransaction(queries, params);
        const comment_id = result[0].rows[0].comment_id;
        res.status(202).json({
          message: 'comment created successfully',
          comment_id
        });
      } catch (error) {
        console.error("Error creating comment:", error);
        res.status(500).json({ message: 'Internal Server Error' });
      }
    };
  }),
];

const update_comment = [
  body('comment', 'Comment content must not be empty').trim().isLength({min:1}).escape(),
  body('comment_id').not().isEmpty().withMessage('comment_id cannot be null').trim().escape(),
  
  asyncHandler( async(req, res, next) => {
    const errors = validationResult(req);
    const { comment, comment_id } = req.body;
    const user_id = req.user?.id;
  
    if (!errors.isEmpty()) {
      res.status(400).json({ 
        message: 'comment content and comment_id are required',
        errors: errors.array(),
        comment,
        comment_id
      });
    }

    const { rows } = await dbQuery(`SELECT comment_id from comments where comment_id = $1`, [comment_id]);
    if (rows.length === 0 ) {
      res.status(404).json({ message: 'Comment does not exist' });
      return;
    }

    const comment_user_id = rows[0].user_id;
    if (user_id !== comment_user_id) { // same user who commented trying to update?
      res.status(403).json({ message: 'Unauthorized user cannot update' });
      return;
    }

    await dbQuery(`UPDATE comments SET content = $1 WHERE comment_id = $2`, [comment, comment_id]);
    res.status(200).json({ message: 'Comment updated' });
  })
]

const delete_comment = [
  body('comment_id').not().isEmpty().withMessage('comment_id cannot be null').trim().escape(),
  
  asyncHandler( async(req, res, next) => {
    const errors = validationResult(req);
    const { comment_id } = req.body;
    const user_id = req.user?.id;  
  
    if (!errors.isEmpty()) {
      res.status(400).json({ 
        message: 'comment content and comment_id are required',
        errors: errors.array(),
        comment_id
      });
    } else {
      const { rows } = await dbQuery(`SELECT parent_comment_id, user_id from comments where comment_id = $1`, [comment_id]);
     
      if ( rows.length === 0 ) { //check if comment exist
        res.status(404).json({ message: 'Comment does not exist' });
        return;
      }
      const { parent_comment_id, user_id:comment_user_id } = rows[0];
      if ( user_id !== comment_user_id) { // same user who commented trying to delete?
        res.status(403).json({ message: 'Unauthorized user cannot delete' });
        return;
      }
      // 12 is the deleted user id
      await dbQuery(`UPDATE comments 
        SET user_id = 12,
        content = '', 
        deleted = TRUE
        WHERE comment_id = $1`,
        [comment_id]);

      res.status(200).json({ message: 'Comment deleted' });

      
      // if ( parent_comment_id ) {
      //   // await dbQuery(`DELETE FROM comments WHERE comment_id = $1`, [comment_id]);
      //   res.status(200).json({ message: 'Comment deleted' });
      // } else {
      //   res.status(200).json({ message: 'comment soft deleted'})
      // }
    }
  })
]

const get_comments_by_post = [
  param('post_id')
    .notEmpty()
    .withMessage('Post id caanot be empty')
    .trim()
    .isInt()
    .withMessage('id must be a positive integer')
    .escape(),

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

  asyncHandler( async(req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ 
        errors: errors.array()
      });
    }
    const { offset, sort = 'new'} = req.query;
    const post_id = req.params.post_id;
    const user_id = req.user?.id;

    let sortCondition = '';

    if (sort === 'new') {
      sortCondition = 'c.created_at DESC';
    } else if (sort === 'top') {
      sortCondition = 'c.vote_count DESC';
    }
    const comments_query = await dbQuery(`SELECT
        c.comment_id,
        c.content,
        c.user_id,
        c.parent_comment_id AS parent_id,
        c.created_at,
        u.username,
        c.vote_count AS total_votes,
        COALESCE(cv.vote_type, null) AS vote_type,
        c.deleted
      FROM comments c
      LEFT JOIN users u ON c.user_id = u.user_id
      LEFT JOIN comment_votes cv ON c.comment_id = cv.comment_id AND cv.user_id = $1
      WHERE c.post_id = $2
      ORDER BY 
        c.parent_comment_id IS NULL,         
        ${sortCondition}`
      , [user_id, post_id]);
    res.status(200).json({ 
      comments: comments_query.rows,
    });
  })
];



const comment_vote = [
  body('comment_id').not().isEmpty().withMessage('comment_id cannot be null').trim().escape(),
  body('vote_type').notEmpty().withMessage('vote_type cannot be null').isIn([1, -1]).withMessage('vote_type must be either 1 or -1').toInt(),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.status(400).json({ 
        errors: errors.array()
      });
    } else {
      const { comment_id, vote_type} = req.body;
      const user_id = req.user?.id;

      const existingVote = await dbQuery(`SELECT vote_type FROM comment_votes WHERE user_id=$1 AND comment_id = $2`, [user_id, comment_id]);
      // user vote exist on this post
      if ( existingVote.rows.length > 0) { 
        const oldVoteType = existingVote.rows[0].vote_type;

        if (oldVoteType === vote_type) {// same as old vote
          const queries = [
            'DELETE FROM comment_votes WHERE user_id = $1 AND comment_id = $2',
            'UPDATE comments SET vote_count = vote_count - $1 WHERE comment_id = $2'
          ];
          const params = [
            [user_id, comment_id],
            [vote_type, comment_id]
          ];
          res.status(200).json({ message: 'Deleted the vote'});
          await queryTransaction(queries, params);
          return;
          // next();
        }

        const queries = [ // update the vote
          'UPDATE comment_votes SET vote_type = $1 WHERE user_id = $2 AND comment_id = $3',
          'UPDATE comments SET vote_count = vote_count + $1 WHERE comment_id = $2'
        ];
        const params = [
          [vote_type, user_id, comment_id],
          [vote_type * 2, comment_id]
        ]

        await queryTransaction(queries, params);
        res.status(200).json({ message: 'Vote updated successfully' });
      } else { // new vote add it 
        const queries = [
          'INSERT INTO comment_votes (user_id, comment_id, vote_type) VALUES ($1, $2, $3)',
          'UPDATE comments SET vote_count = vote_count + $1 WHERE comment_id = $2'
        ];
        const params = [
          [user_id, comment_id, vote_type],
          [vote_type, comment_id]
        ]

        await queryTransaction(queries, params)
        res.status(202).json({
          message: 'comment vote created successfully',
        });
      }
    };
  })
];

export default {
  create_comment,
  get_comments_by_post,
  comment_vote,
  update_comment,
  delete_comment
}

     
