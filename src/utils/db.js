import { Sequelize } from 'sequelize';

export const sequelize = new Sequelize({
  host: process.env.POSTGRES_HOST,
  dialect: 'postgres',
  database: process.env.POSTGRES_DB,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  logging: false,
});
