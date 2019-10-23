import { Sequelize } from 'sequelize-typescript';
import { User } from '../users/user.entity';
import { News } from '../news/news.entity';

export const databaseProviders = [
    {
        provide: 'SEQUELIZE',
        useFactory: async () => {
            const sequelize = new Sequelize({
                dialect: 'postgres',
                host: 'localhost',
                port: 5432,
                username: 'postgres',
                password: 'postgres',
                database: 'loft',
            });
            sequelize.addModels([User, News]);
            await sequelize.sync();
            return sequelize;
        },
    },
];
