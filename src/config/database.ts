import { Sequelize } from "sequelize";
require('dotenv').config();

export const sequelizeInstance = new Sequelize({
  dialect: 'postgres',
  host: String(process.env.DB_HOST),
  port: Number(process.env.DB_PORT),
  database: String(process.env.DB_NAME),
  username: String(process.env.DB_USER),
  password: String(process.env.DB_PASSWORD),
});