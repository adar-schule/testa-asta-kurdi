import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';  // Import Swagger decorators
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @ApiOperation({ summary: 'Returns a greeting message' })  // Add operation summary
  @ApiResponse({ status: 200, description: 'Successful greeting message response.' })  // Define response
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}