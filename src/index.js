import 'dotenv/config';
import express from 'express';
import authRouter from './routes/auth.js';
import userRouter from './routes/userRouter.js';
import cors from 'cors';
import { errorMiddleware } from './middlewares/errorMiddleware.js';
import cookieParser from 'cookie-parser';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true,
}));

app.use(cookieParser());
app.use(express.json());
app.use(authRouter);
app.use(userRouter);
app.use(errorMiddleware);

app.listen(PORT);
