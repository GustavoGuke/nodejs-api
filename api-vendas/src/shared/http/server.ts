import 'reflect-metadata';
import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import router from './routes';
import AppError from '../../shared/errors/AppError';
import { User } from 'src/entity/user.entity';
import { myDataSource } from '../../app-data-source';

myDataSource
  .initialize()
  .then(() => {
    console.log('Data Source has been initialized!');
  })
  .catch(err => {
    console.error('Error during Data Source initialization:', err);
  });

// configuração padrao para da api
const app = express();
app.use(cors());
app.use(express.json());

// rota padrao
app.use(router);

// middeware de erro
app.use(
  (error: Error, request: Request, response: Response, next: NextFunction) => {
    if (error instanceof AppError) {
      return response
        .status(error.statusCode)
        .json({ status: 'error', message: error.message });
    }
    return response.status(500).json({
      status: 'error',
      message: 'Internal server error',
    });
  },
);

app.listen(5000, () => {
  console.log('Server stated on port 5000');
});
