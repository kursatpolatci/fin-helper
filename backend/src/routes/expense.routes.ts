import express from 'express';
import { createExpense, getAllExpenses } from '../controllers/expense.controller';
import { authenticate } from '../middlewares/authenticate.middleware';

const router = express.Router();

router.post('/create', authenticate, createExpense);
router.get('/all', authenticate, getAllExpenses);

export const expenseRoutes = router;
