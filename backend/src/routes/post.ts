import express from 'express';
import postController from '../controllers/postController';
import fielUpload from '../midllewares/multerUpload';
import isAuthenticated from '../midllewares/checkAuth';
import { Request, Response, NextFunction } from 'express';
const router = express.Router();

router.post('/create', isAuthenticated, fielUpload, postController.create_post);
router.post('/vote', isAuthenticated, (req:Request, res:Response, next:NextFunction) => {
  console.log(req.body); next()
}, postController.post_vote);
router.get('/all', postController.get_all_posts);
router.get('/id/:id', postController.get_post_by_id);
// this routes need to  be last
router.get('/:name', postController.get_posts_by_subreddit);


export default router;
