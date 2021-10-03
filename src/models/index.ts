import dotenv from 'dotenv';
import { Sequelize } from 'sequelize';

dotenv.config();

const dbName = process.env.DB_NAME as string;
const dbUser = process.env.DB_USER as string;
const dbPassword = process.env.DB_PWD as string;

const sequelize = new Sequelize(dbName, dbUser, dbPassword, {
  host: process.env.DB_HOST,
  dialect: 'mysql',
});

export default sequelize;
