import { RouterModule } from '@nestjs/core';
import { UserModule } from './modules/user/user.module';

export const Routes = RouterModule.register([
  {
    path: 'iebg',
    children: [
      {
        path: 'user',
        module: UserModule,
      },
    ],
  },
]);
