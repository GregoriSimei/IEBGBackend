import { Module } from '@nestjs/common';
import { GlobalModule } from 'src/shared/NestModules/global.module';
import { UserRepository } from './repositories/UserRepository';
import { CrudController } from './useCases/crud/crud.controller';
import { CreateUserService } from './useCases/crud/services/create.user.service';
import { UpdateUserService } from './useCases/crud/services/update.user.service';
import { LoginController } from './useCases/login/login.controller';
import { LoginService } from './useCases/login/services/login.service';

@Module({
  imports: [GlobalModule],
  controllers: [CrudController, LoginController],
  providers: [
    CreateUserService,
    LoginService,
    UpdateUserService,
    {
      provide: 'REPOSITORY_USER',
      useClass: UserRepository,
    },
  ],
})
export class UserModule {}
