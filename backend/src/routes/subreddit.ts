import express from 'express';
import isAuthenticated from '../middlewares/checkAuth';
import subController from '../controllers/subredditController';
import { multipleFileUpload } from '../middlewares/multerUpload';
import {
  ValidateCreateSubreddit,
  ValidateSubIdNotEmpty,
  ValidateSubNameNotEmpty,
  ValidateGetByTagQuery,
} from '../validators/subredditValidators';

const router = express.Router();

router.post(
  '/create',
  isAuthenticated,
  multipleFileUpload,
  ValidateCreateSubreddit,
  subController.postCreate,
);
router.post(
  '/join',
  isAuthenticated,
  ValidateSubIdNotEmpty,
  subController.postSubscribe,
);
router.post(
  '/leave',
  isAuthenticated,
  ValidateSubIdNotEmpty,
  subController.postUnsubscribe,
);
router.get('/all_names', subController.getAllName);
router.get('/check_sub', ValidateSubNameNotEmpty, subController.getSubExist);
router.get('/communities', ValidateGetByTagQuery, subController.getSubsByTag);
router.get('/:sub_name', ValidateSubNameNotEmpty, subController.getInfo); // this route should be last

export default router;
