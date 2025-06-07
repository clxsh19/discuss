import { body, query } from 'express-validator';
import ValidateFieldNotEmpty from './validateFieldNotEmpty';
import { TAGS, TagsHashMap } from '../utils/tags';

const ValidateSubIdNotEmpty = ValidateFieldNotEmpty('sub_id', 'Subreddit Id');
const ValidateSubNameNotEmpty = ValidateFieldNotEmpty('sub_name', 'Subname');

const ValidateCreateSubreddit = [
  body('sub_name')
    .notEmpty()
    .withMessage('Sub name cannot be empty')
    .trim()
    .matches(/^(?!_+$)[a-zA-Z0-9_]+$/)
    .withMessage('only alphabets,letters and underscore allowed')
    .escape(),
  ValidateFieldNotEmpty('display_name', 'Dispaly Name'),
  ValidateFieldNotEmpty('description', 'Description'),
  body('tags')
    .isArray({ min: 2 })
    .withMessage('Select atleast two tags')
    .custom((tags) => {
      for (const tag of tags) {
        if (!TagsHashMap.has(tag)) throw new Error(`Invalid tag ${tag}`);
      }
      return true;
    }),
];

const ValidateGetByTagQuery = [
  query('tag').optional().trim().isIn(TAGS).withMessage('Invalid Tag'),
  query('offset')
    .optional()
    .trim()
    .toInt()
    .isInt({ min: 0 })
    .withMessage('Offset must be a positive integer.')
    .escape(),
];

export {
  ValidateSubIdNotEmpty,
  ValidateSubNameNotEmpty,
  ValidateCreateSubreddit,
  ValidateGetByTagQuery,
};
