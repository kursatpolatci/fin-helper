export interface ISignupInput {
  email: string;
  username: string;
  fullName: string;
  password: string;
  profileImage?: string;
}

export interface ILoginInput {
  email: string;
  password: string;
}

export interface IUpdateProfileInput {
  email: string;
  username: string;
  fullName: string;
  oldPassword: string;
  newPassword: string;
  profileImage: string;
}

export interface ICreateExpenseInput {
  title: string;
  amount: number;
  date: Date;
  currency: string;
  userId?: string;
  expenseImage?: string;
}

export interface IUpdateExpenseInput {
  title: string;
  amount: number;
  date: Date;
  currency: string;
  expenseImage?: string;
}
