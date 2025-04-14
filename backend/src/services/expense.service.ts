import mongoose from 'mongoose';
import Expense, { IExpense } from '../models/expense.model';
import { ICreateExpenseInput, IUpdateExpenseInput } from '../types/input.interface';
import { Response } from 'express';
import { CustomError } from '../errors/custom.error';
import { validCurrency } from '../helpers/validation.helper';
import { deleteImage } from '../utils/image.util';

export const createExpenseService = async (input: ICreateExpenseInput, res: Response): Promise<IExpense> => {
  const { title, amount, date, userId, currency, expenseImage } = input;
  validCurrency(currency, res);
  if (!userId) throw new Error(res.__('errors.user-not-found'));
  const dateValue = new Date(date);
  const newExpense = new Expense({ title, amount, date: dateValue, currency, userId, expenseImage });
  await newExpense.save();
  return newExpense;
};

export const getUserExpensesService = async (userId: string): Promise<any> => {
  const expenses = await Expense.aggregate([
    {
      $match: { userId: new mongoose.Types.ObjectId(userId) },
    },
    {
      $group: {
        _id: '$date',
        expensesByDate: { $push: '$$ROOT' },
      },
    },
    {
      $sort: { _id: -1 },
    },
    {
      $project: {
        date: { $dateToString: { format: '%Y-%m-%d', date: '$_id' } },
        expensesByDate: 1,
        _id: 0,
      },
    },
  ]);
  return expenses;
};

export const updateExpenseService = async (
  input: IUpdateExpenseInput,
  expenseId: string,
  userId: string,
  res: Response
): Promise<IExpense> => {
  const isAnyFieldEmpty = Object.entries(input).every((value) => !value);
  if (isAnyFieldEmpty) throw new CustomError('No fields provided', 400);
  const relatedExpense = await Expense.findById(expenseId);
  if (!relatedExpense) throw new CustomError('Expense not found', 404);
  if (relatedExpense.userId.toString() !== userId) throw new CustomError('You do not own this expense', 400);
  const { title, amount, currency, date, expenseImage } = input;
  if (title) relatedExpense.title = title;
  if (amount) relatedExpense.amount = amount;
  if (currency) {
    validCurrency(currency, res);
    relatedExpense.currency = currency;
  }
  if (date) relatedExpense.date = date;
  if (expenseImage) {
    deleteImage(relatedExpense.expenseImage);
    relatedExpense.expenseImage = expenseImage;
  }
  await relatedExpense.save();
  return relatedExpense;
};
