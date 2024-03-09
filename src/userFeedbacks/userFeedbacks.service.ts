import { PrismaService } from 'src/prisma.service';
import { UserFeedbacks } from './userFeedbacks.model';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserFeedbacksService {
  constructor(private prisma: PrismaService) {}
  async getAllUserFeedback(): Promise<UserFeedbacks[]> {
    return this.prisma.userFeedbacks.findMany({
      where: {
        isActive: true,
      },
    });
  }

  async createUserFeedback(data: UserFeedbacks): Promise<UserFeedbacks> {
    // Find existing records matching the provided data
    const existing = await this.prisma.userFeedbacks.findMany({
      where: {
        isActive: true,
        sourceUserId: data.sourceUserId,
        targetUserId: data.targetUserId,
      },
    });

    // Update existing records and create new record
    if (existing.length > 0) {
      // Update existing records
      await this.prisma.userFeedbacks.updateMany({
        where: {
          sourceUserId: data.sourceUserId,
          targetUserId: data.targetUserId,
        },
        data: {
          isActive: false,
        },
      });
    }
    return this.prisma.userFeedbacks.create({
      data,
    });
  }
}
