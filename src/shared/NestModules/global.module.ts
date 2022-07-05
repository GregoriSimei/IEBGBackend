import { Module } from '@nestjs/common';
import { databaseProviders } from 'src/database/database.providers';

@Module({
  imports: [],
  controllers: [],
  providers: [...databaseProviders],
  exports: [...databaseProviders],
})
export class GlobalModule {}
