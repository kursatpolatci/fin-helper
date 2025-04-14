import Expense, { IExpense } from '../models/expense.model';
import { ICreateExpenseInput, IUpdateExpenseInput } from '../types/input.interface';
import { Response } from 'express';
import { validCurrency } from '../helpers/validation.helper';
import { Types } from 'mongoose';

export const createExpenseService = async (input: ICreateExpenseInput, res: Response): Promise<IExpense> => {
  const { title, category, emoji, amount, date, userId, currency } = input;
  validCurrency(currency, res);
  const newExpense = new Expense({ title, category, emoji, amount, date, currency, userId });
  return newExpense.save();
};

export const getMonthlyExpensesService = async (userId: string, res: Response): Promise<IExpense[]> => {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();
  const monthlyExpenses = await Expense.aggregate([
    {
      $match: {
        userId: new Types.ObjectId(userId),
        date: {
          $gte: new Date(currentYear, currentMonth, 1),
          $lt: new Date(currentYear, currentMonth + 1, 1),
        },
      },
    },
  ]);
  return monthlyExpenses;
};

export const updateExpenseService = async (input: IUpdateExpenseInput, res: Response): Promise<IExpense> => {
  const { title, category, emoji, amount, currency, date, expenseId } = input;
  const relatedExpense = await Expense.findById(expenseId);
  if (!relatedExpense) throw new Error(res.__('error.expense-not-found'));
  if (title) relatedExpense.title = title;
  if (category) relatedExpense.category = category;
  if (emoji) relatedExpense.emoji = emoji;
  if (amount) relatedExpense.amount = amount;
  if (currency) relatedExpense.currency = currency;
  if (date) relatedExpense.date = date;
  return relatedExpense.save();
};

export const deleteExpenseService = async (expenseId: string, res: Response): Promise<IExpense> => {
  const deletedExpense = await Expense.findByIdAndDelete(expenseId);
  if (!deletedExpense) throw new Error(res.__('error.delete-expense-error'));
  return deletedExpense;
};
