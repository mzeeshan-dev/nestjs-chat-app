import { Sequelize } from 'sequelize-typescript';
import { ResetPassToken } from 'src/models/resetPassToken/resetPassToken.model';
import { User } from '../models/user/user.model';

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const sequelize = new Sequelize({
        dialect: 'mysql',
        host: 'localhost',
        port: 3306,
        username: 'root',
        password: '',
        database: 'nestjs-chat-app',
      });
      sequelize.addModels([User, ResetPassToken]);
      await sequelize.sync();
      return sequelize;
    },
  },
];
