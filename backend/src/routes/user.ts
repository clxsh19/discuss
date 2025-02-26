import express from 'express';
import userController from '../controllers/userController';
import { isAuthenticated } from '../middlewares/checkAuth';
import { validateUserCredentials } from '../validators/userValidators';
import multer from 'multer';

const router = express.Router();
const upload = multer();

router.post('/login', upload.any(), validateUserCredentials, userController.postLogin);
router.post('/register', upload.any(), validateUserCredentials, userController.postRegister);
router.post('/logout', isAuthenticated, userController.postLogout);
router.get('/status',  isAuthenticated, userController.getAuthStatus);

export default router;
