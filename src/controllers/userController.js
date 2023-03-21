import 'dotenv/config';
import { userService } from '../services/userService.js';

const getAll = async(req, res, next) => {
  const users = await userService.getUsers();

  res.send(users);
};

export const userController = {
  getAll,
};
