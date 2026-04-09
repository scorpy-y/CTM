import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import materialsRouter from './routes/materials';
import dashboardRouter from './routes/dashboard';
import errorHandler from './middleware/errorHandler';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/health', (_req, res) => {
  res.json({ status: 'OK', message: 'MRP Dashboard API is running' });
});

app.use('/api/materials', materialsRouter);
app.use('/api/dashboard', dashboardRouter);

app.use(errorHandler);

export default app;
