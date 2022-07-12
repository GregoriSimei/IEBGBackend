import { databaseConfig } from 'src/config/databaseConfig';
import { DataSourceOptions } from 'typeorm';

export const typeormConfig: DataSourceOptions = {
  type: 'mysql',
  host: databaseConfig.host,
  port: databaseConfig.port,
  username: databaseConfig.username,
  password: databaseConfig.password,
  database: databaseConfig.database,
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  synchronize: true,
};
