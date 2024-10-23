// src/result/result.service.ts
import { Injectable } from '@nestjs/common';
import { QuestionService } from '../question/question.service'; // Import QuestionService to fetch questions
import { SubmitResultDto } from './dto/submit-result.dto';
import { calculateProficiencyLevel } from '../utils/levelCalculator'; // Custom function for calculating levels

/**
 * TODO: Save the Result to MongoDB database
 */
@Injectable()
export class ResultService {
    constructor(private readonly questionService: QuestionService) { }

    async calculateResult(submitResultDto: SubmitResultDto) {
        const { answers, user } = submitResultDto;
        const questionIds = Object.keys(answers);

        // Fetch the questions using the IDs
        const questions = await this.questionService.findManyByIds(questionIds);

        // Process each question and calculate the result
        const results = questions.map((question) => {
            const userAnswer = answers[question.id]; // "id" should now be available as part of the transformation

            // TODO: Improve this logic later with multiple perspective 
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

        return { results, totalScore, level };
    }
}