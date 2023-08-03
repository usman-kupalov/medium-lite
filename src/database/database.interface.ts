import { Dialect } from 'sequelize';

export interface IDatabaseConfigAttributes {
  dialect?: Dialect;
  host?: string;
  port?: number;
  username?: string;
  password?: string;
  database?: string;
}

export interface IDatabaseConfig {
  development: IDatabaseConfigAttributes;
}
