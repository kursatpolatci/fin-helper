import mongoose, { Schema, Types } from 'mongoose';
import { Document } from 'mongoose';

export interface IExpense extends Document {
  title: string;
  category: string;
  emoji: string;
  amount: number;
  currency: string;
  date: Date;
  userId: Types.ObjectId;
}

const expenseSchema = new Schema<IExpense>(
  {
    title: { type: String, required: true },
    category: { type: String, required: true },
    emoji: { type: String, required: true },
    amount: { type: Number, required: true },
    currency: { type: String, required: true },
    date: { type: Date, required: true },
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  },
  { timestamps: true }
);

const Expense = mongoose.model<IExpense>('Expense', expenseSchema);

export default Expense;
