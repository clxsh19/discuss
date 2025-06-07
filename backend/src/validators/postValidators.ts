import { body, query } from 'express-validator';
import ValidateFieldNotEmpty from './validateFieldNotEmpty';

const ValidatePostIdNotEmpty = ValidateFieldNotEmpty('post_id', 'Post Id');
const ValidateSubNameNotEmpty = ValidateFieldNotEmpty('sub_name', 'Subname');

const ValidateCreatePost = [
  ValidateFieldNotEmpty('title', 'Title'),
  body('title').trim().notEmpty().withMessage('Title is required'),
  ValidateSubNameNotEmpty,
  body('text').optional().trim(),
  body('link')
    .optional()
    .trim()
    .isURL()
    .withMessage('Please enter a valid URL!'),
  query('type').custom((value, { req }) => {
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
];

const ValidatePostVote = [
  ValidatePostIdNotEmpty,
  body('vote_type')
    .notEmpty()
    .withMessage('vote_type is required')
    .trim()
    .toInt()
    .isIn([1, -1])
    .withMessage('vote_type should be either 1 or -1')
    .escape(),
];

const ValidatePostUrlQuery = [
  query('offset')
    .notEmpty()
    .withMessage('Offset is required.')
    .trim()
    .toInt()
    .isInt({ min: 0 })
    .withMessage('Offset must be a positive integer.')
    .escape(),
  query('sort')
    .optional()
    .trim()
    .isIn(['hot', 'top', 'new'])
    .withMessage('Invalid sort')
    .escape(),
  query('t')
    .optional()
    .trim()
    .isIn(['day', 'week', 'month', 'year', 'all', ''])
    .withMessage('Invalid timeframe')
    .escape(),
];

export {
  ValidateCreatePost,
  ValidatePostVote,
  ValidatePostUrlQuery,
  ValidateSubNameNotEmpty,
  ValidatePostIdNotEmpty,
};
