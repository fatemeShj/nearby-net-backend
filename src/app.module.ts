import { Module } from '@nestjs/common';
import { AuthModule } from './authentication/auth.module';
import { UserModule } from './users/users.module';
import { UserFeedbackModule } from './userFeedbacks/userFeedbacks.module';
@Module({
  imports: [UserModule, AuthModule, UserFeedbackModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
