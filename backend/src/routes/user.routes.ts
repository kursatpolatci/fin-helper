import express from 'express';
import { upload } from '../middlewares/multer.middleware';
import { updateProfile } from '../controllers/user.controller';
import { authenticate } from '../middlewares/authenticate.middleware';

const router = express.Router();

router.put('/update', authenticate, upload.single('profileImage'), updateProfile);

export const userRoutes = router;
