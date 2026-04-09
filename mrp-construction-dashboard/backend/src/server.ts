import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import rateLimit from 'express-rate-limit';
import materialsRouter from './routes/materials';
import dashboardRouter from './routes/dashboard';
import errorHandler from './middleware/errorHandler';

dotenv.config();

const app = express();

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, message: 'Too many requests, please try again later.' },
});

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(limiter);

app.get('/health', (_req, res) => {
  res.json({ status: 'OK', message: 'MRP Dashboard API is running' });
});

app.use('/api/materials', materialsRouter);
app.use('/api/dashboard', dashboardRouter);

app.use(errorHandler);

export default app;
