/* eslint-disable no-console */
import 'dotenv/config';
import bcrypt from 'bcrypt';
import { v4 } from 'uuid';
import { ApiError } from '../exceptions/ApiError.js';
import { User } from '../models/User.js';
import { emailService } from './emailService.js';
import { userService } from './userService.js';

const registerUser = async({ email, password }) => {
  const existingUser = await userService.getUserByEmail(email);

  if (existingUser) {
    throw ApiError.BadReguest(
      'Email is alredy taken',
      { message: 'Email is alredy taken' },
    );
  }

  const activationToken = v4();
  const hash = await bcrypt.hash(password, 10);

  await User.create({
    email,
    password: hash,
    activationToken,
  });

  await emailService.sendActivationLink(email, activationToken);
};

const activateUser = async(activationToken) => {
  const user = await User.findOne({ where: { activationToken } });

  if (!user) {
    throw ApiError.Unauthorized(
      'User not found',
      { message: 'User not found' });
  }

  user.activationToken = null;
  await user.save();

  return user;
};

export const authService = {
  registerUser,
  activateUser,
};
