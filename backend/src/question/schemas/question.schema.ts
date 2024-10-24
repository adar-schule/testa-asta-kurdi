// src/question/schemas/question.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document, Types } from 'mongoose';

export type QuestionDocument = Question & Document;

@Schema({
    toJSON: {
        virtuals: true,
        versionKey: false,  // remove __v key
        transform: (_doc, ret) => {
            ret.id = ret._id;  // assign _id to id
            delete ret._id;    // delete _id from the response
        }
    }
})
export class Question {
    @ApiProperty({ example: 'multiselect', description: 'The type of question' })
    @Prop({ required: true })
    type: string;

    @ApiProperty({ example: 'What is the capital of Kurdistan?', description: 'The text of the question' })
    @Prop({ required: true })
    question: string;

    @ApiProperty({ example: ['Erbil', 'Sulaymaniyah', 'Duhok', 'Kirkuk'], description: 'The possible answers for multiselect questions' })
    @Prop({ type: [String], required: false })  // Optional for fill-input type
    answers: string[];

    @ApiProperty({ example: 'Erbil', description: 'The correct answer for fill-in or multiselect' })
    @Prop({ required: true })
    correctAnswer: string;

    @ApiProperty({ example: 10, description: 'Points for answering this question correctly' })
    @Prop({ required: true })
    points: number;  // Add points to evaluate the user’s score

    // Adding the "id" field explicitly
    id?: string; // Add `id` property here as an optional string
}

export const QuestionSchema = SchemaFactory.createForClass(Question);