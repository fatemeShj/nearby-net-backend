import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly prismaService: PrismaService) {
    super({
      jwtFormRequest: ExtractJwt.formAuthHeaderAsBearerToken(),
      ingnoreExpiration: false,
      secretOrkey: process.env.JWT_SECRET,
    });
  }

  async validate(payload: { email: string }) {
    const users = await this.prismaService.users.findUnique({
      where: {
        email: payload.email,
      },
    });
    return users;
  }
}
