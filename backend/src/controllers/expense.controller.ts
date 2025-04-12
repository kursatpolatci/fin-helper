import { Response } from 'express';
import { handleErrorResponse, handleResponse } from '../utils/response.util';
import { validateInput } from '../helpers/validation.helper';
import { ICreateExpenseInput } from '../types/input.interface';
import { createExpenseService, getAllExpensesService } from '../services/expense.service';
import { AuthenticatedRequest } from '../types/request.interface';

export const createExpense = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  const { title, amount, date } = req.body;
  const { userId } = req;
  const expenseData = { title, amount, date };
  try {
    validateInput<ICreateExpenseInput>(expenseData);
    await createExpenseService(expenseData, userId!);
    handleResponse(res, 200);
  } catch (error: unknown) {
    handleErrorResponse(res, error);
  }
};

export const getAllExpenses = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  const { userId } = req;
  try {
    const expenses = await getAllExpensesService(userId!);
    handleResponse(res, 200, undefined, expenses, 'expenses');
  } catch (error: unknown) {
    handleErrorResponse(res, error);
  }
};
