import { Module } from '@nestjs/common';
import { UserFeedbacksController } from './userFeedbacks.controllers';
import { UserFeedbacksService } from './userFeedbacks.service';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [UserFeedbacksController],
  providers: [UserFeedbacksService, PrismaService],
})
export class UserFeedbackModule {}
