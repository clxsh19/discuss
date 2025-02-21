import express from 'express';
import postController from '../controllers/postController';
import { fileUpload } from '../middlewares/multerUpload';
import isAuthenticated from '../middlewares/checkAuth';

const router = express.Router();

router.post('/create', isAuthenticated, fileUpload, postController.create_post);
router.post('/vote', isAuthenticated, postController.post_vote);
router.get('/all', postController.get_all_posts);
router.get('/id/:id', postController.get_post_by_id);
// this routes need to  be last
router.get('/:name', postController.get_posts_by_subreddit);


export default router;
