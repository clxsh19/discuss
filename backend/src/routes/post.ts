import express from 'express';
import postController from '../controllers/postController';
import { fileUpload } from '../middlewares/multerUpload';
import isAuthenticated from '../middlewares/checkAuth';
import {
  ValidateCreatePost,
  ValidatePostIdNotEmpty,
  ValidatePostUrlQuery,
  ValidateSubNameNotEmpty,
  ValidatePostVote,
} from '../validators/postValidators';

const router = express.Router();

router.post(
  '/create',
  isAuthenticated,
  fileUpload,
  ValidateCreatePost,
  postController.postCreate,
);
router.post(
  '/vote',
  isAuthenticated,
  ValidatePostVote,
  postController.postVote,
);
router.get('/all', ValidatePostUrlQuery, postController.getAll);
router.get('/id/:post_id', ValidatePostIdNotEmpty, postController.getInfoById);
// this routes need to be last
router.get(
  '/:sub_name',
  ValidatePostUrlQuery,
  ValidateSubNameNotEmpty,
  postController.getBySubName,
);

export default router;
