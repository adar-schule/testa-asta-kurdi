import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';

export type QuestionDocument = Question & Document;

@Schema()
export class Question {
    @ApiProperty({ example: 1, description: 'The unique identifier of the question' })
    @Prop({ required: true })
    id: number;

    @ApiProperty({ example: 'multiselect', description: 'The type of question' })
    @Prop({ required: true })
    type: string;

    @ApiProperty({ example: 'What is the capital of Kurdistan?', description: 'The text of the question' })
    @Prop({ required: true })
    question: string;

    @ApiProperty({ example: ['Erbil', 'Sulaymaniyah', 'Duhok', 'Kirkuk'], description: 'The possible answers for multiselect questions', required: false })
    @Prop({ type: [String], required: function () { return this.type === 'multiselect'; } }) // Optional for fillinput type
    answers?: string[];

    @ApiProperty({ example: 'Erbil', description: 'The correct answer for fillinput or multiselect' })
    @Prop({ required: true })
    correctAnswer: string;

    @ApiProperty({ example: 10, description: 'Points for answering this question correctly' })
    @Prop({ required: true })
    points: number;
}

export const QuestionSchema = SchemaFactory.createForClass(Question);