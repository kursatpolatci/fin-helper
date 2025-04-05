export class CustomError extends Error {
  public code: number;
  public name: string = 'Custom Error';
  constructor(message: string, code: number) {
    super(message);
    this.code = code;
  }
}
