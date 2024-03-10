import { Module } from '@nestjs/common';
import { AuthModule } from './authentication/auth.module';
import { UserModule } from './users/users.module';
import { UserFeedbackModule } from './userFeedbacks/userFeedbacks.module';
import { CacheModule } from '@nestjs/cache-manager';
@Module({
  imports: [
    UserModule,
    AuthModule,
    UserFeedbackModule,
    CacheModule.register({ isGlobal: true, ttl: 30 * 1000 }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
