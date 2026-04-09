import { Request, Response, NextFunction } from 'express';

interface AppError extends Error {
  status?: number;
  code?: number;
}

const errorHandler = (
  err: AppError,
  _req: Request,
  res: Response,
  _next: NextFunction
): void => {
  console.error(err.stack);
  const status = err.status || 500;
  res.status(status).json({
    success: false,
    message: err.message || 'Internal Server Error',
  });
};

export default errorHandler;
