// src/result/result.controller.ts
import { Controller, Post, Body, Get, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ResultService } from './result.service';
import { SubmitResultDto } from './dto/submit-result.dto';
import { Result } from './schemas/result.schema';
import { AuthGuard } from 'src/auth/auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';

@ApiTags('results')  // Group all routes under "results"
@Controller('results')
export class ResultController {
    constructor(private readonly resultService: ResultService) { }

    @ApiOperation({ summary: 'Submit user ansqwers and calculate result' })
    @ApiResponse({ status: 201, description: 'Result calculated successfully.' })
    @Post()
    async submitResult(@Body() submitResultDto: SubmitResultDto) {
        return this.resultService.calculateResult(submitResultDto);
    }

    @ApiOperation({ summary: 'Get all results' })
    @ApiResponse({ status: 200, description: 'Return all saved results', type: [Result] })
    @UseGuards(AuthGuard, RolesGuard)
    @Get()
    async getAllResults(): Promise<Result[]> {
        return this.resultService.getAllResults();
    }
}