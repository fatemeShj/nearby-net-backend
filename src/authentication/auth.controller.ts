import { Controller, Post, Body, Req, Res, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login-user.dto';
import { Request, Response } from 'express';
import { RegisterUserDto } from './dto/register-user.dto';

@Controller('/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  async login(
    @Req() request: Request,
    @Res() response: Response,
    @Body() loginDto: LoginDto,
  ): Promise<any> {
    try {
      const result = await this.authService.login(loginDto);
      return response.status(200).json({
        message: 'Successfully login!',
        result: result,
      });
    } catch (error) {
      return response.status(500).json({
        message: 'Internal server error!',
      });
    }
  }

  @Post('/register')
  async register(
    @Req() request: Request,
    @Res() response: Response,
    @Body() registerDto: RegisterUserDto,
  ): Promise<any> {
    try {
      const result = await this.authService.register(registerDto);
      return response.status(200).json({
        message: 'Successfully register!',
        result: result,
      });
    } catch (error) {
      return response.status(500).json({
        message: 'Internal server error!',
      });
    }
  }

  @Get('/getusers')
  async getUsers(
    @Req() request: Request,
    @Res() response: Response,
  ): Promise<any> {
    try {
      const result = await this.authService.getUsers();
      return response.status(200).json({
        message: 'Successfully get users!',
        result: result,
      });
    } catch (error) {
      return response.status(500).json({
        message: 'Internal server error!',
      });
    }
  }
}
