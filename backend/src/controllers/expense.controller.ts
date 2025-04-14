import { Request, Response } from 'express';
import { handleErrorResponse, handleResponse } from '../utils/response.util';
import { validateInput } from '../helpers/validation.helper';
import { ICreateExpenseInput, IUpdateExpenseInput } from '../types/input.interface';
import {
  createExpenseService,
  deleteExpenseService,
  getMonthlyExpensesService,
  updateExpenseService,
} from '../services/expense.service';
import { AuthenticatedRequest } from '../types/request.interface';

export const createExpense = async (req: Request, res: Response): Promise<void> => {
  const { title, category, emoji, amount, currency, date } = req.body;
  const { userId } = req as AuthenticatedRequest;
  const expenseData: ICreateExpenseInput = {
    title,
    category,
    emoji,
    amount: parseFloat(amount),
    currency,
    date: date ? new Date(date) : new Date(),
    userId,
  };
  try {
    validateInput<ICreateExpenseInput>(expenseData, res);
    const expense = await createExpenseService(expenseData, res);
    handleResponse(res, 200, 'expense.createExpense', undefined, expense, 'expense');
  } catch (error: unknown) {
    handleErrorResponse(res, error);
  }
};

export const getMonthlyExpenses = async (req: Request, res: Response): Promise<void> => {
  const { userId } = req as AuthenticatedRequest;
  try {
    const expenses = await getMonthlyExpensesService(userId, res);
    handleResponse(res, 200, undefined, undefined, expenses, 'expenses');
  } catch (error: unknown) {
    handleErrorResponse(res, error);
  }
};

export const updateExpense = async (req: Request, res: Response): Promise<void> => {
  const { title, category, emoji, amount, currency, date } = req.body;
  const { id: expenseId } = req.params;
  const expenseData: IUpdateExpenseInput = {
    title,
    category,
    emoji,
    amount: parseFloat(amount),
    currency,
    date: date ? new Date(date) : new Date(),
    expenseId,
  };
  try {
    const updatedExpense = await updateExpenseService(expenseData, res);
    handleResponse(res, 200, 'expense.updatedExpense', undefined, updatedExpense, 'expense');
  } catch (error: unknown) {
    handleErrorResponse(res, error);
  }
};

export const deleteExpense = async (req: Request, res: Response): Promise<void> => {
  const { id: expenseId } = req.params;
  try {
    const deletedExpense = await deleteExpenseService(expenseId, res);
    handleResponse(res, 200, 'expense.deletedExpense', undefined, deletedExpense, 'deletedExpense');
  } catch (error: unknown) {
    handleErrorResponse(res, error);
  }
};
