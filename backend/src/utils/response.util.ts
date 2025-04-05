import { Response } from 'express';
import { CustomError } from '../errors/custom.error';

export const handleResponse = (
  res: Response,
  statusCode: number,
  message?: string,
  dataValue: any = null,
  dataKey: string = 'data'
): void => {
  if (dataValue) res.status(statusCode).json({ success: true, message, [dataKey]: dataValue });
  else res.status(statusCode).json({ success: true, message });
};

export const handleErrorResponse = (res: Response, error: unknown): void => {
  if (error instanceof CustomError) res.status(error.code).json({ success: false, message: error.message });
  else if (error instanceof Error) res.status(500).json({ success: false, message: error.message });
  else res.status(500).json({ success: false, message: 'An unknown error occurred' });
};
