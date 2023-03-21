import express from 'express';
import { body } from 'express-validator';
import { authController } from '../controllers/authController.js';
import { catchError } from '../utils/catchError.js';

const authRouter = new express.Router();

authRouter.post(
  '/registration',
  body('email').isEmail(),
  body('password').isLength({ min: 6 }),
  catchError(authController.registration),
);

authRouter.get(
  '/activation/:activationToken', catchError(authController.activate),
);
authRouter.post('/login', catchError(authController.login));

authRouter.get(
  '/refresh', catchError(authController.refresh),
);

export default authRouter;
