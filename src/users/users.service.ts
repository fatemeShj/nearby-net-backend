import { PrismaService } from 'src/prisma.service';
import { Users } from './users.model';
import { ConflictException, Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';

@Injectable()
export class UsersService {
  constructor(
    @Inject('CACHE_MANAGER') private cacheManager: Cache,
    private prisma: PrismaService,
  ) {}

  async getAllUser(): Promise<Users[]> {
    const cachedData: Users[] = await this.cacheManager.get('users');
    if (cachedData) {
      return cachedData;
    }

    const users = await this.prisma.users.findMany();
    await this.cacheManager.set('users', users);
    return users;
  }

  async createUser(data: Users): Promise<Users> {
    const existing = await this.prisma.users.findUnique({
      where: { email: data.email },
    });

    if (existing) {
      throw new ConflictException('email already exists');
    }

    return this.prisma.users.create({
      data,
    });
  }
}
