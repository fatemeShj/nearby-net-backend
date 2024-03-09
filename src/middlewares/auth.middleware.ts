import {
  Injectable,
  NestMiddleware,
  Req,
  Res,
  UnauthorizedException,
} from '@nestjs/common';
import { Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  async use(@Req() req: Request, @Res() res: Response) {
    // No bearer token in header
    if (!req.headers.cookie) {
      return res.status(401).json({
        message: 'No authorization-token',
      });
    }

    const token = req.headers.cookie.replace('Bearer ', '');
    try {
      const jwtData = jwt.verify(token, process.env.SECRET_KEY);
      // User token not found
      if (!jwtData) {
        return res.status(401).json({
          message: 'user not found',
        });
      }
    } catch (error) {
      console.log(error);
      throw new UnauthorizedException();
    }
  }
}
