import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import { authConfig } from 'src/config/Auth';

import { UnauthorizedRequest } from '../shared/DTO/UnauthorisedRequest';

interface ITokenPayload {
  iat: number;
  exp: number;
  sub: string;
  id: number;
  email: string;
}

@Injectable()
export class EnsureAuthenticated implements NestMiddleware {
  async use(request: Request, response: Response, next: NextFunction) {
    const authHeader = request.headers.authorization;

    if (!authHeader) {
      throw new UnauthorizedRequest('JWT token is missing');
    }

    const [, token] = authHeader.split(' ');

    try {
      const decoded = verify(token, authConfig.jwt.secret);

      const { sub, email } = decoded as ITokenPayload;

      request.user = {
        id: sub,
        email,
      };

      return next();
    } catch {
      throw new UnauthorizedRequest('Invalid JWT token');
    }
  }
}
