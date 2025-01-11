import express from 'express';
import commentController from '../controllers/commentController';
import  isAuthenticated from '../midllewares/checkAuth';
const router = express.Router();

router.post('/create', isAuthenticated, commentController.create_comment);
router.post('/update', isAuthenticated, commentController.update_comment);
router.post('/delete', isAuthenticated, commentController.delete_comment);
router.post('/vote', isAuthenticated, commentController.comment_vote);
router.get('/test', function(req, res, next) {
  res.json({name: "op"});
});
router.get('/:post_id', commentController.get_comments_by_post);

export default router;

