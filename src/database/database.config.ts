import * as dotenv from 'dotenv';
import { IDatabaseConfig } from './database.interface';
import { Dialect } from 'sequelize/types';

dotenv.config({ path: '.env' });

export const databaseConfig: IDatabaseConfig = {
  development: {
    dialect: process.env.DB_DIALECT as Dialect,
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME_DEVELOPMENT,
  }
};
