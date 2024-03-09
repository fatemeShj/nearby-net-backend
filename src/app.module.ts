import { Module } from '@nestjs/common';
import { AuthModule } from './authentication/auth.module';
import { UserModule } from './users/users.module';
@Module({
  imports: [UserModule, AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
