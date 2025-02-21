import express from 'express';
import isAuthenticated from '../middlewares/checkAuth';
import subController from '../controllers/subredditController';
import { multipleFileUpload } from '../middlewares/multerUpload';
import { 
  ValidateCreateSubreddit, 
  ValidateName, 
  ValidateSubId, 
  ValidateSubName 
} from "../validators/subredditValidators";
const router = express.Router();

router.post('/create', isAuthenticated, multipleFileUpload, ValidateCreateSubreddit, subController.postCreate);
router.post('/join', isAuthenticated, ValidateSubId, subController.postSubscribe);
router.post('/leave', isAuthenticated, ValidateSubId, subController.postUnsubscribe);
router.get('/all_names', isAuthenticated, subController.getAllName);
router.get('/check_sub', ValidateSubName, subController.getSubExist);
router.get('/:name', ValidateName, subController.getInfo);

export default router;
