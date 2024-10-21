// src/question/question.controller.ts
import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { QuestionService } from './question.service';
import { CreateQuestionDto } from './dto/create-question.dto';
import { ApiTags, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import { Question } from './schemas/question.schema';

@ApiTags('questions') // Group all routes under "questions"
@Controller('questions')
export class QuestionController {
    constructor(private readonly questionService: QuestionService) { }

    @ApiOperation({ summary: 'Create a new question' })
    @ApiResponse({ status: 201, description: 'The question has been created.', type: Question })
    @Post()
    async create(@Body() createQuestionDto: CreateQuestionDto) {
        return this.questionService.create(createQuestionDto);
    }

    @ApiOperation({ summary: 'Get all questions' })
    @ApiResponse({ status: 200, description: 'List of all questions.', type: [Question] })
    @Get()
    async findAll() {
        return this.questionService.findAll();
    }

    @ApiOperation({ summary: 'Get a single question by ID' })
    @ApiParam({ name: 'id', description: 'ID of the question' })
    @ApiResponse({ status: 200, description: 'The question has been found.', type: Question })
    @Get(':id')
    async findOne(@Param('id') id: string) {
        return this.questionService.findOne(id);
    }

    @ApiOperation({ summary: 'Update a question by ID' })
    @ApiParam({ name: 'id', description: 'ID of the question' })
    @ApiResponse({ status: 200, description: 'The question has been updated.', type: Question })
    @Put(':id')
    async update(@Param('id') id: string, @Body() updateQuestionDto: CreateQuestionDto) {
        return this.questionService.update(id, updateQuestionDto);
    }

    @ApiOperation({ summary: 'Delete a question by ID' })
    @ApiParam({ name: 'id', description: 'ID of the question' })
    @ApiResponse({ status: 200, description: 'The question has been deleted.', type: Question })
    @Delete(':id')
    async remove(@Param('id') id: string) {
        return this.questionService.remove(id);
    }
}