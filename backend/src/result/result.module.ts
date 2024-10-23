// src/result/result.module.ts
import { Module } from '@nestjs/common';
import { ResultService } from './result.service';
import { ResultController } from './result.controller';
import { QuestionModule } from '../question/question.module';  // Import QuestionModule to use in ResultService

@Module({
    imports: [QuestionModule],
    providers: [ResultService],
    controllers: [ResultController],
})
export class ResultModule { }