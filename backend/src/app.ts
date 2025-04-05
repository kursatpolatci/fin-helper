import express from 'express';
import { authRoutes } from './routes/auth.routes';
import cookieParser from 'cookie-parser';

const app = express();

// Middlewares
app.use(express.json());
app.use(cookieParser());

// Routes
app.use('/api/auth', authRoutes);

export default app;
