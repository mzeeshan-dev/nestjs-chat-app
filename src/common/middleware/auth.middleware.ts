import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { AuthService } from 'src/auth/auth.service';
import { UsersService } from 'src/modules/users/users.service';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(
    private authService: AuthService,
    private userService: UsersService,
  ) {}
  use(req: Request, res: Response, next: NextFunction) {
    try {
      console.log(req.headers['authorization'].split(' '));
    } catch (error) {
      console.log(error);
    }
  }
}
