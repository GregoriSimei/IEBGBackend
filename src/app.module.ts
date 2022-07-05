import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { Routes } from './app.routes';
import { UserModule } from './modules/user/user.module';
import { EnsureAuthenticated } from './middlewares/EnsureAuthenticated';
import { GlobalModule } from './shared/NestModules/global.module';

@Module({
  imports: [GlobalModule, UserModule, Routes],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(EnsureAuthenticated)
      .exclude(
        { path: '/iebg/user', method: RequestMethod.POST },
        { path: '/iebg/user/login', method: RequestMethod.ALL },
      )
      .forRoutes('/iebg');
  }
}
