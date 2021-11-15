import 'dotenv/config';
import { Sequelize } from 'sequelize';
import { dotEnvType } from '../@types/dataType';
import { logger } from '../config/logger';

declare let process: {
  env: dotEnvType;
};

const { DB_NAME, DB_USER, DB_PWD, DB_HOST, DB_PORT } = process.env;

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PWD, {
  host: DB_HOST,
  port: DB_PORT,
  logging: (msg) => logger.info(msg),
  dialect: 'mysql',
  dialectOptions: {
    ssl: 'Amazon RDS',
  },
});

export default sequelize;
