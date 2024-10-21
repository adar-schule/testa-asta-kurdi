// src/question/dto/create-question.dto.ts
import { ApiProperty } from '@nestjs/swagger';

export class CreateQuestionDto {
    @ApiProperty({ example: 'multiselect', description: 'Type of the question' })
    type: string;

    @ApiProperty({ example: 'What is the capital of Kurdistan?', description: 'Question text' })
    question: string;

    @ApiProperty({ example: ['Erbil', 'Sulaymaniyah', 'Duhok'], description: 'Possible answers (for multiselect type)', required: false })
    answers?: string[];  // Optional because it's not required for fill-in-the-blank questions

    @ApiProperty({ example: 'Erbil', description: 'Correct answer for either multiselect or fillinput' })
    correctAnswer: string;

    @ApiProperty({ example: 10, description: 'Points awarded for a correct answer' })
    points: number;
}