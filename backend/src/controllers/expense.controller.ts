import { Response } from 'express';
import { handleErrorResponse, handleResponse } from '../utils/response.util';
import { validateInput } from '../helpers/validation.helper';
import { ICreateExpenseInput, IUpdateExpenseInput } from '../types/input.interface';
import { createExpenseService, getUserExpensesService, updateExpenseService } from '../services/expense.service';
import { AuthenticatedRequest } from '../types/request.interface';
import { deleteImage } from '../utils/image.util';

export const createExpense = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  const { title, amount, currency, date } = req.body;
  const { userId, file } = req;
  const expenseData: ICreateExpenseInput = {
    title,
    amount: parseFloat(amount),
    currency,
    date: new Date(date),
    userId,
    expenseImage: file?.path,
  };
  try {
    validateInput<ICreateExpenseInput>(expenseData, res);
    const expense = await createExpenseService(expenseData, res);
    handleResponse(res, 200, 'expense.createExpense', undefined, expense, 'expense');
  } catch (error: unknown) {
    deleteImage(file?.path);
    handleErrorResponse(res, error);
  }
};

export const getUserExpenses = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  const { userId } = req;
  try {
    const expenses = await getUserExpensesService(userId!);
    handleResponse(res, 200, undefined, undefined, expenses, 'expenses');
  } catch (error: unknown) {
    handleErrorResponse(res, error);
  }
};

export const updateExpense = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  const { title, amount, currency, date } = req.body;
  const { id: expenseId } = req.params;
  const { file, userId } = req;
  const expenseData: IUpdateExpenseInput = {
    title,
    amount: parseFloat(amount),
    currency,
    date: new Date(date),
    expenseImage: file?.path,
  };
  try {
    const updatedExpense = await updateExpenseService(expenseData, expenseId, userId!);
    handleResponse(res, 200);
  } catch (error: unknown) {
    deleteImage(file?.path);
    handleErrorResponse(res, error);
  }
};
