import express from 'express';
import userController from '../controllers/userController';
import {isAuthenticated} from '../midllewares/checkAuth';

const router = express.Router();

router.post('/login', userController.user_login);
router.post('/register', userController.user_register);
router.post('/logout', userController.user_logout);
router.get('/status',  isAuthenticated, userController.user_status);

export default router;