/* eslint-disable no-console */
import 'dotenv/config';
import { sequelize } from './utils/db.js';
import './models/User.js';
import './models/Token.js';

sequelize.sync({ force: true });
