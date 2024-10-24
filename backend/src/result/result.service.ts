import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { QuestionService } from '../question/question.service';
import { SubmitResultDto } from './dto/submit-result.dto';
import { Result } from './schemas/result.schema'; // Import Result schema
import { calculateProficiencyLevel } from '../utils/levelCalculator';

@Injectable()
export class ResultService {
    constructor(
        private readonly questionService: QuestionService,
        @InjectModel(Result.name) private resultModel: Model<Result>, // Inject the Result model
    ) { }

    async calculateResult(submitResultDto: SubmitResultDto): Promise<{ results: any[]; totalScore: number; level: string }> {
        const { answers, user } = submitResultDto;
        const questionIds = Object.keys(answers);

        // Fetch the questions using the IDs
        const questions = await this.questionService.findManyByIds(questionIds);

        // Process each question and calculate the result
        const results = questions.map((question) => {
            const userAnswer = answers[question.id];
            const isCorrect = userAnswer === question.correctAnswer;
            const earnedPoints = isCorrect ? question.points : 0;

            return {
                question: question.question,
                yourAnswer: userAnswer,
                correctAnswer: question.correctAnswer,
                points: question.points,
                earnedPoints,
            };
        });

        // Calculate the total score
        const totalScore = results.reduce((total, result) => total + result.earnedPoints, 0);

        // Determine proficiency level based on total score
        const level = calculateProficiencyLevel(totalScore);

        // Create the result document
        const resultDocument = new this.resultModel({
            user,
            results,
            totalScore,
            level,
        });

        // Save the result to MongoDB
        await resultDocument.save();

        return { results, totalScore, level };
    }

    async getAllResults(): Promise<Result[]> {
        return this.resultModel.find().exec(); // Return all saved results
    }
}