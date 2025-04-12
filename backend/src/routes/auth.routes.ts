import express from 'express';
import { checkAuth, login, logout, signup } from '../controllers/auth.controller';
import { authenticate } from '../middlewares/authenticate.middleware';
import { upload } from '../middlewares/multer.middleware';

const router = express.Router();

router.post('/signup', upload.single('profileImage'), signup);
router.post('/login', login);
router.get('/logout', logout);
router.get('/check-auth', authenticate, checkAuth);

export const authRoutes = router;
