import express from 'express';
import userController from '../controllers/userController';
import {isAuthenticated} from '../midllewares/checkAuth';
import multer from 'multer';

const router = express.Router();
const upload = multer();

router.post('/login', upload.any(), userController.user_login);
router.post('/register', upload.any(), userController.user_register);
router.post('/logout', userController.user_logout);
router.get('/status',  isAuthenticated, userController.user_status);

export default router;