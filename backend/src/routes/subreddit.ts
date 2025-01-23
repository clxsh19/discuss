import express from 'express';
import isAuthenticated from '../midllewares/checkAuth';
import subController from '../controllers/subredditContoller';
import { multipleFileUpload } from '../midllewares/multerUpload';

const router = express.Router();

router.post('/create', isAuthenticated, multipleFileUpload, subController.post_create_subreddit);
router.post('/join', isAuthenticated, subController.user_join_subreddit);
router.get('/all_names', isAuthenticated, subController.get_all_communities);
router.get('/check_sub', subController.check_sub_exist);
router.get('/:name', subController.get_subbreddit_detail);

export default router;