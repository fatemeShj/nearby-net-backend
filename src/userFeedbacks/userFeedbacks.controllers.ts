import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { UserFeedbacksService } from './userFeedbacks.service';
import { Request, Response, response } from 'express';

@Controller('/userFeedbacks')
export class UserFeedbacksController {
  constructor(private readonly userFeedbacksService: UserFeedbacksService) {}

  // @UseGuards('jwtGurd')
  @Get('/getFeedbacks')
  async getAllUserFeedbacks(
    @Req() request: Request,
    @Res() response: Response,
  ): Promise<any> {
    try {
      const result = await this.userFeedbacksService.getAllUserFeedback();
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
