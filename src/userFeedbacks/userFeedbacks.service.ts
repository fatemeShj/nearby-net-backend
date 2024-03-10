import { PrismaService } from 'src/prisma.service';
import { UserFeedbacks } from './userFeedbacks.model';
import { Injectable } from '@nestjs/common';
import { FeedbackUserDto } from './dto/feedback-user.dto';

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

  async createUserFeedback(feedbackUserDto: FeedbackUserDto): Promise<any> {
    // Find existing records matching the provided data
    const existing = await this.prisma.userFeedbacks.findMany({
      where: {
        isActive: true,
        sourceUserId: feedbackUserDto.sourceUserId,
        targetUserId: feedbackUserDto.targetUserId,
      },
    });

    // Update existing records and create new record
    if (existing.length > 0) {
      // Update existing records
      await this.prisma.userFeedbacks.updateMany({
        where: {
          sourceUserId: feedbackUserDto.sourceUserId,
          targetUserId: feedbackUserDto.targetUserId,
        },
        data: {
          isActive: false,
        },
      });
    }

    // Create new user feedback
    const createUserFeedbacks = {
      sourceUserId: feedbackUserDto.sourceUserId,
      targetUserId: feedbackUserDto.targetUserId,
      type: feedbackUserDto.type,
      isActive: feedbackUserDto.isActive,
    };

    const feedback = await this.prisma.userFeedbacks.create({
      data: createUserFeedbacks,
    });

    return feedback;
  }
}
