import { Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma.service';
import { UsersService } from 'src/users/users.service';
import { LoginDto } from './dto/login-user.dto';
import { RegisterUserDto } from './dto/register-user.dto';
import { Users } from 'src/users/users.model';
import * as bcrypt from 'bcrypt';
@Injectable()
export class AuthService {
  constructor(
    private readonly prismaService: PrismaService,
    private jwtService: JwtService,
    private readonly usersService: UsersService,
  ) {}

  async login(loginDto: LoginDto): Promise<any> {
    const { email, password } = loginDto;

    const users = await this.prismaService.users.findUnique({
      where: { email },
    });

    const validatePassword = await bcrypt.compare(
      password,
      users?.password || '',
    );
    if (!users || !validatePassword) {
      throw new NotFoundException('Invalid username or password');
    }

    return {
      token: this.jwtService.sign({ email }),
    };
  }

  async register(createDto: RegisterUserDto): Promise<any> {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(createDto.password, salt);

    const createUsers = new Users();
    createUsers.name = createDto.name;
    createUsers.email = createDto.email;
    createUsers.password = hashedPassword;
    createUsers.avatar = createDto.avatar;
    createUsers.bio = createDto.bio;
    createUsers.latitude = createDto.latitude;
    createUsers.longitude = createDto.longitude;

    const user = await this.usersService.createUser(createUsers);

    return {
      token: this.jwtService.sign({
        email: user.email,
      }),
    };
  }
}
