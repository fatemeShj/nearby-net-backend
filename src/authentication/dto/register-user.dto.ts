import { IsNumber, IsString, Length } from 'class-validator';

export class RegisterUserDto {
  @IsString()
  name: string;
  @IsString()
  email: string;
  @IsString()
  @Length(6, 12)
  password: string;
  @IsString()
  avatar: string;
  @IsString()
  @Length(10, 150)
  bio: string;
  @IsNumber()
  latitude: number;
  @IsNumber()
  longitude: number;
}
