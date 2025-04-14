import express from 'express';
import { createExpense, getUserExpenses, updateExpense } from '../controllers/expense.controller';
import { authenticate } from '../middlewares/authenticate.middleware';
import { upload } from '../middlewares/multer.middleware';

const router = express.Router();

router.post('/create', authenticate, upload.single('expenseImage'), createExpense);
router.get('/all', authenticate, getUserExpenses);
router.put('/update/:id', authenticate, upload.single('expenseImage'), updateExpense);

export const expenseRoutes = router;
