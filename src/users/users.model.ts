import { Prisma } from '@prisma/client';

export class Users implements Prisma.UsersCreateInput {
  name: string;
  email: string;
  password: string;
  avatar: string;
  bio: string;
  latitude: number;
  longitude: number;
}
