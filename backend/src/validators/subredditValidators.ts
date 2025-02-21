import { body, param, query } from "express-validator";

export const ValidateCreateSubreddit = [
  body('name')
    .notEmpty().withMessage('Sub name cannot be empty')
    .matches(/^(?!_+$)[a-zA-Z0-9_]+$/).withMessage("only alphabets,letters and underscore allowed")
    .trim().escape(),
  body('displayName')
    .notEmpty().withMessage('Display name cannot be empty')
    .trim().escape(),
  body('description')
    .notEmpty().withMessage('Description cannot be empty')
    .trim().escape(),
]

export const ValidateName = [
  param('name')
    .notEmpty().withMessage('name cannot be empty')
    .trim().escape(),
]

export const ValidateSubId = [
  body('subreddit_id')
    .notEmpty().withMessage('subreddit_id cannot be wmpty')
    .trim().escape(),
]

export const ValidateSubName = [
  query('sub_name')
    .notEmpty().withMessage('community name cannot be empty')
    .trim().escape(),
]
