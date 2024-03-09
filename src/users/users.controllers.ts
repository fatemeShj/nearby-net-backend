import { Controller, Get, Req, Res } from '@nestjs/common';
import { UsersService } from './users.service';
import { Request, Response, response } from 'express';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get()
  async getAllUsers(
    @Req() request: Request,
    @Res() response: Response,
  ): Promise<any> {
    try {
      const result = await this.userService.getAllUser();
      return response.status(200).json({
        message: 'Successfully fetch data!',
        result: result,
      });
    } catch (error) {
      return response.status(500).json({
        message: 'Internal server error!',
      });
    }
  }
}
