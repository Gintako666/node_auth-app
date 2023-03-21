import express from 'express';
import { userController } from '../controllers/userController.js';
import { authMiddleware } from '../middlewares/authMiddlewares.js';
import { catchError } from '../utils/catchError.js';

const userRouter = new express.Router();

userRouter.get(
  '/users',
  catchError(authMiddleware),
  catchError(userController.getAll),
);

export default userRouter;
