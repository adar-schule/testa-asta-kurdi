import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ResultService } from './result.service';
import { ResultController } from './result.controller';
import { Result, ResultSchema } from './schemas/result.schema'; // Import the schema
import { QuestionModule } from '../question/question.module'; // Import QuestionModule to access questions
import { AuthModule } from 'src/auth/auth.module';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: Result.name, schema: ResultSchema }]), // Register Result schema
        QuestionModule, // Import the QuestionModule to access questions
        AuthModule, // Import the AuthModule to use the JwtService
    ],
    controllers: [ResultController],
    providers: [ResultService],
})
export class ResultModule { }