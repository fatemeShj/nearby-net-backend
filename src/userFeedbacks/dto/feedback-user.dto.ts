import { IsBoolean, IsNumber, IsString } from 'class-validator';

export class FeedbackUserDto {
  @IsNumber()
  targetUserId: number;
  @IsNumber()
  sourceUserId: number;
  @IsString()
  type: string;
  @IsBoolean()
  isActive: boolean;
}
