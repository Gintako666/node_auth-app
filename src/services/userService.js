import 'dotenv/config';
import { User } from '../models/User.js';

const normalize = ({ id, email }) => ({
  id, email,
});

const getUserByEmail = (email) => {
  return User.findOne({ where: { email } });
};

const getUsers = () => {
  return User.findAll();
};

export const userService = {
  getUserByEmail, normalize, getUsers,
};
