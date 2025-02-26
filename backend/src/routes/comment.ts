import express from 'express';
import commentController from '../controllers/commentController';
import  isAuthenticated from '../middlewares/checkAuth';
import { 
  ValidateCommentIdNotEmpty,
  ValidateCreateComment,
  ValidateUpdateComment,
  ValidateGetCommentsByPost,
  ValidateVoteComment
} from '../validators/commentValidators';


const router = express.Router();

router.post('/create', isAuthenticated, ValidateCreateComment, commentController.postCreate);
router.post('/update', isAuthenticated, ValidateUpdateComment, commentController.postUpdate);
router.post('/delete', isAuthenticated, ValidateCommentIdNotEmpty, commentController.postDelete);
router.post('/vote', isAuthenticated, ValidateVoteComment, commentController.postVote);
router.get('/:post_id', ValidateGetCommentsByPost, commentController.getByPostId);

export default router;

