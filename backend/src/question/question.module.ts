import { Module } from '@nestjs/common';
// import { MongooseModule } from '@nestjs/mongoose';  // Comment out Mongoose integration
import { QuestionService } from './question.service';
import { QuestionController } from './question.controller';
// import { Question, QuestionSchema } from './schemas/question.schema';  // Comment out the schema

@Module({
    imports: [
        // MongooseModule.forFeature([{ name: Question.name, schema: QuestionSchema }]),  // Comment out Mongoose schema
    ],
    controllers: [QuestionController],
    providers: [QuestionService],
})
export class QuestionModule { }