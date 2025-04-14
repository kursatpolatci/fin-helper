export interface ISignupInput {
  email: string;
  username: string;
  fullName: string;
  password: string;
  profileImage: string | undefined;
}

export interface ILoginInput {
  email: string;
  password: string;
}

export interface IUpdateProfileInput {
  email: string | undefined;
  username: string | undefined;
  fullName: string | undefined;
  oldPassword: string | undefined;
  newPassword: string | undefined;
  profileImage: string | undefined;
}

export interface ICreateExpenseInput {
  title: string;
  category: string;
  emoji: string;
  amount: number;
  date: Date;
  currency: string;
  userId: string;
}

export type IUpdateExpenseInput = Partial<Omit<ICreateExpenseInput, 'userId'>> & { expenseId: string };
