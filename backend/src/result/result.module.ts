import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ResultService } from './result.service';
import { ResultController } from './result.controller';
import { Result, ResultSchema } from './schemas/result.schema'; // Import the schema
import { QuestionModule } from '../question/question.module'; // Import QuestionModule to access questions

@Module({
    imports: [
        MongooseModule.forFeature([{ name: Result.name, schema: ResultSchema }]), // Register Result schema
        QuestionModule, // Import the QuestionModule to access questions
    ],
    controllers: [ResultController],
    providers: [ResultService],
})
export class ResultModule { }