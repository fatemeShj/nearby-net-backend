import { Body, Controller, Get, Post, Req, Res } from '@nestjs/common';
import { UserFeedbacksService } from './userFeedbacks.service';
import { Request, Response, response } from 'express';
import { FeedbackUserDto } from './dto/feedback-user.dto';
@Controller('userFeedbacks')
export class UserFeedbacksController {
  constructor(private readonly userFeedbacksService: UserFeedbacksService) {}

  @Get('/getfeedback')
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

  @Post('/createfeedback')
  async createUserFeedbacks(
    @Req() request: Request,
    @Res() response: Response,
    @Body() feedbackUserDto: FeedbackUserDto,
  ): Promise<any> {
    try {
      const result =
        await this.userFeedbacksService.createUserFeedback(feedbackUserDto);
      return response.status(200).json({
        message: 'Successfully create feedback!',
        result: result,
      });
    } catch (error) {
      return response.status(500).json({
        message: 'Internal server error!',
      });
    }
  }
}
