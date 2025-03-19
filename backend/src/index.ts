import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import { connectDb } from './config/db';

dotenv.config();

const app = express();
const port = process.env.PORT;

app.get('/', (req: Request, res: Response) => {
  res.send('Merhaba');
});

app.listen(port, async () => {
  try {
    await connectDb();
    console.log(`Server is running on port ${port}`);
  } catch (error: unknown) {
    console.error(`App Listen Error: ${error}`);
    process.exit(1);
  }
});
