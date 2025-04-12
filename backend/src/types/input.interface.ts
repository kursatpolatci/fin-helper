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
  image: string;
}

export interface ICreateExpenseInput {
  title: string;
  amount: number;
  date: string;
}
