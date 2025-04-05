import express from 'express';
import { checkAuth, login, logout, signup } from '../controllers/auth.controller';
import { authenticate } from '../middlewares/authenticate.middleware';

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.get('/logout', logout);
router.get('/check-auth', authenticate, checkAuth);

export const authRoutes = router;
