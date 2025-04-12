import mongoose, { Schema, Types } from 'mongoose';
import { Document } from 'mongoose';

export interface IExpense extends Document {
  title: string;
  amount: number;
  date: Date;
  expensePicture?: string;
  userId: Types.ObjectId;
}

const expenseSchema = new Schema<IExpense>(
  {
    title: { type: String, required: true },
    amount: { type: Number, required: true },
    date: { type: Date, required: true },
    expensePicture: { type: String },
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  },
  { timestamps: true }
);

const Expense = mongoose.model<IExpense>('Expense', expenseSchema);

export default Expense;
