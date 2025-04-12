import mongoose from 'mongoose';
import Expense, { IExpense } from '../models/expense.model';
import { ICreateExpenseInput } from '../types/input.interface';

export const createExpenseService = async (input: ICreateExpenseInput, userId: string): Promise<IExpense> => {
  const { title, amount, date } = input;
  const newExpense = new Expense({
    title,
    amount,
    date: new Date(date),
    userId,
  });
  await newExpense.save();
  return newExpense;
};

export const getAllExpensesService = async (userId: string): Promise<any> => {
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
