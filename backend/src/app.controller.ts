import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get('welcome')
  getHello(): { message: string } {
    return { message: this.appService.getHello() };
  }
}
