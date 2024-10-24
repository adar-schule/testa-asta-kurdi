import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

@Schema()
export class Result extends Document {
    @ApiProperty({
        example: {
            name: 'John',
            surname: 'Doe',
            email: 'john.doe@example.com',
            phone: '+491231234567'
        },
        description: 'The user information (optional fields)',
    })
    @Prop({ type: Object }) // Use Object for storing user information (optional fields)
    user: {
        name?: string;
        surname?: string;
        email?: string;
        phone?: string;
    };

    @ApiProperty({
        example: [
            {
                question: 'What is the capital of Kurdistan?',
                yourAnswer: 'Erbil',
                correctAnswer: 'Erbil',
                points: 10,
                earnedPoints: 10
            },
        ],
        description: 'The result of each question, including user answer, correct answer, points, and earned points',
    })
    @Prop({ type: Array }) // Store the result of each question
    results: {
        question: string;
        yourAnswer: string;
        correctAnswer: string;
        points: number;
        earnedPoints: number;
    }[];

    @ApiProperty({ example: 100, description: 'The total score earned by the user' })
    @Prop({ type: Number }) // Store the total score
    totalScore: number;

    @ApiProperty({ example: 'A1.1', description: 'The calculated proficiency level based on the score' })
    @Prop({ type: String }) // Store the calculated level
    level: string;
}

export const ResultSchema = SchemaFactory.createForClass(Result);