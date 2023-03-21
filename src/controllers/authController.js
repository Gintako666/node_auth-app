/* eslint-disable no-console */
import 'dotenv/config';
import bcrypt from 'bcrypt';

import { validationResult } from 'express-validator';
import { ApiError } from '../exceptions/ApiError.js';
import { authService } from '../services/authService.js';
import { jwtService } from '../services/jwtService.js';
import { userService } from '../services/userService.js';
import { tokenService } from '../services/tokenService.js';

const registration = async(req, res, next) => {
  const { email, password } = req.body;

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    throw ApiError.BadReguest('Validation error', errors);
  }

  await authService.registerUser({
    email, password,
  });

  res.send({ message: 'Ok' });
};

const activate = async(req, res, next) => {
  const { activationToken } = req.params;

  const user = await authService.activateUser(activationToken);

  if (!user) {
    throw ApiError.BadReguest('User not found');
  }

  await sendAuthentication(res, user);
};

const login = async(req, res, next) => {
  const { email, password } = req.body;

  const user = await userService.getUserByEmail(email);

  if (!user) {
    throw ApiError.BadReguest('User with email does not exist');
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    throw ApiError.BadReguest('Password is wrong');
  }

  if (user.activationToken) {
    res.statusCode = 401;
    res.send('User no active');

    return;
  }

  await sendAuthentication(res, user);
};

const refresh = async(req, res, next) => {
  const { refreshToken } = req.cookies;

  const userData = jwtService.validateRefreshToken(refreshToken);

  if (!userData) {
    throw ApiError.Unauthorized();
  }

  const token = await tokenService.getByToken(refreshToken);

  if (!token) {
    throw ApiError.Unauthorized();
  }

  const user = await userService.getUserByEmail(userData.email);

  await sendAuthentication(res, user);
};

async function sendAuthentication(res, user) {
  const userData = userService.normalize(user);
  const accessToken = jwtService.generateAccessToken(userData);
  const refreshToken = jwtService.generateRefreshToken(userData);

  await tokenService.save(user.id, refreshToken);

  res.cookie('refreshToken', refreshToken, {
    maxAge: 14 * 24 * 60 * 60 * 1000,
    httpOnly: true,
  });

  res.send({
    user: userData,
    accessToken,
  });
}

export const authController = {
  registration,
  activate,
  login,
  refresh,
};
