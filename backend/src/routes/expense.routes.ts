import express from 'express';
import { createExpense, deleteExpense, getMonthlyExpenses, updateExpense } from '../controllers/expense.controller';
import { authenticate } from '../middlewares/authenticate.middleware';

const router = express.Router();

router.post('/create', authenticate, createExpense);
router.get('/get-monthly-expenses', authenticate, getMonthlyExpenses);
router.put('/update/:id', authenticate, updateExpense);
router.delete('/delete/:id', authenticate, deleteExpense);

export const expenseRoutes = router;
