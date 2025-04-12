import express from 'express';
import cookieParser from 'cookie-parser';
import path from 'path';
import { authRoutes } from './routes/auth.routes';
import { userRoutes } from './routes/user.routes';
import { expenseRoutes } from './routes/expense.routes';

const app = express();

// Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../public/uploads')));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/expense', expenseRoutes);

export default app;
