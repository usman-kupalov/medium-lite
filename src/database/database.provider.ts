import { Sequelize } from 'sequelize-typescript';
import { databaseConfig } from './database.config';
import { SEQUELIZE } from './database.constants';
import { User } from 'src/user/user.entity';
import { Post } from 'src/post/post.entity';

export const databaseProvider = [
  {
    provide: SEQUELIZE,
    useFactory: async () => {
      const config = databaseConfig.development;
      const sequelize = new Sequelize(config);
      sequelize.addModels([User, Post]);
      await sequelize.sync();
      return sequelize;
    },
  },
];
