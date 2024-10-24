import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { QuestionService } from './question.service';
import { QuestionController } from './question.controller';
import { Question, QuestionSchema } from './schemas/question.schema';
import { AuthModule } from '../auth/auth.module'; // Import AuthModule to provide JwtService

@Module({
    imports: [
        MongooseModule.forFeature([{ name: Question.name, schema: QuestionSchema }]),
        AuthModule, // Add AuthModule to import JwtService
    ],
    controllers: [QuestionController],
    providers: [QuestionService],
    exports: [QuestionService], // Ensure QuestionService is exported if needed by other modules
})
export class QuestionModule { }