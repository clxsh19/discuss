import { body, param, query } from "express-validator";
import ValidateFieldNotEmpty from "./validateFieldNotEmpty";

const ValidateCommentNotEmpty = ValidateFieldNotEmpty('comment', 'Comment');
const ValidateCommentIdNotEmpty = ValidateFieldNotEmpty('comment_id', 'Comment Id');

const ValidateCreateComment = [
  ValidateCommentNotEmpty,
  ValidateFieldNotEmpty('post_id', 'Post Id'),
  body('parent_comment_id')
    .optional()
    .trim().escape(),
]

const ValidateUpdateComment = [
  ValidateCommentNotEmpty,
  ValidateCommentIdNotEmpty
]

const ValidateGetCommentsByPost = [
  param('post_id')
    .notEmpty().withMessage('Post id cannot be empty')
    .trim()
    .isInt().withMessage('Post id must be a positive integer')
    .escape(),

  query('offset')
    .notEmpty().withMessage('Offset cannot be empty.')
    .trim().toInt()
    .isInt({ min: 0 }).withMessage('Offset must be a positive integer.')
    .escape(),

  query('sort')
    .optional().trim()
    .isIn(['top', 'new', 'old']).withMessage('Only top,new and old sort by')
    .escape(),
]

const ValidateVoteComment = [
  ValidateCommentIdNotEmpty,
  body('vote_type')
    .notEmpty().withMessage('Vote type cannot be empty')
    .toInt()
    .isIn([1, -1]).withMessage('Vote type must be either 1 or -1'),
]

export {
  ValidateCommentIdNotEmpty,
  ValidateCreateComment,
  ValidateUpdateComment,
  ValidateGetCommentsByPost,
  ValidateVoteComment
}
