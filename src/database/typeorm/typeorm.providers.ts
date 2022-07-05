import { DataSource } from 'typeorm';
import { User } from './models/user.entity';
import { typeormConfig } from './typeorm.config';

export const typeormProviders = [
  {
    provide: 'TYPEORM_BD_CONECTION',
    useFactory: async () => {
      const dataSource = new DataSource(typeormConfig);
      return dataSource.initialize();
    },
  },
  {
    provide: 'TYPEORM_ENTITY_USER',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(User),
    inject: ['TYPEORM_BD_CONECTION'],
  },
];
