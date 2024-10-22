import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';

export type QuestionDocument = Question & Document;

@Schema()
export class Question {
    @ApiProperty({ example: 'multiselect', description: 'The type of question' })
    @Prop({ required: true })
    type: string;

    @ApiProperty({ example: 'What is the capital of Kurdistan?', description: 'The text of the question' })
    @Prop({ required: true })
    question: string;

    @ApiProperty({ example: ['Erbil', 'Sulaymaniyah', 'Duhok', 'Kirkuk'], description: 'The possible answers for multiselect questions' })
    @Prop({ type: [String], required: false }) // Optional for fill-input type
    answers: string[];

    @ApiProperty({ example: 'Erbil', description: 'The correct answer for fill-in or multiselect' })
    @Prop({ required: true })
    correctAnswer: string;

    @ApiProperty({ example: 10, description: 'Points for answering this question correctly' })
    @Prop({ required: true })
    points: number;  // Add points to evaluate the user’s score
}

export const QuestionSchema = SchemaFactory.createForClass(Question);