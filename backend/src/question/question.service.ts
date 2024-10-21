import { Injectable } from '@nestjs/common';
// import { InjectModel } from '@nestjs/mongoose';
// import { Model } from 'mongoose';
// import { Question, QuestionDocument } from './schemas/question.schema';
import { CreateQuestionDto } from './dto/create-question.dto';

@Injectable()
export class QuestionService {
    // Commented out the MongoDB integration for now
    // constructor(
    //     @InjectModel(Question.name) private questionModel: Model<QuestionDocument>,
    // ) { }

    private mockQuestions: Array<{ id: string; type: string; question: string; answers?: string[]; correctAnswer: string; points: number }> = [
        { id: '1', type: 'multiselect', question: 'What is the capital of Kurdistan?', answers: ['Erbil', 'Sulaymaniyah', 'Duhok', 'Kirkuk'], correctAnswer: 'Erbil', points: 10 },
        { id: '2', type: 'fillinput', question: 'The city of ___ is the capital of Kurdistan.', correctAnswer: 'Erbil', points: 5 }
    ];

    async create(createQuestionDto: CreateQuestionDto): Promise<any> {
        const newQuestion = { id: (this.mockQuestions.length + 1).toString(), ...createQuestionDto };

        // Ensure that answers are not included if it's a fillinput question
        if (newQuestion.type === 'fillinput') {
            delete newQuestion.answers;  // Remove the `answers` field for fillinput type
        }

        this.mockQuestions.push(newQuestion);
        return newQuestion;
    }

    async findAll(): Promise<any[]> {
        // Return mock data instead of using MongoDB
        return this.mockQuestions;
    }

    async findOne(id: string): Promise<any> {
        // Return a specific mock question
        return this.mockQuestions.find(q => q.id === id);
    }

    async update(id: string, updateQuestionDto: CreateQuestionDto): Promise<any> {
        const questionIndex = this.mockQuestions.findIndex(q => q.id === id);
        if (questionIndex !== -1) {
            this.mockQuestions[questionIndex] = { ...this.mockQuestions[questionIndex], ...updateQuestionDto };
            return this.mockQuestions[questionIndex];
        }
        return null;
    }

    async remove(id: string): Promise<any> {
        const questionIndex = this.mockQuestions.findIndex(q => q.id === id);
        if (questionIndex !== -1) {
            const removedQuestion = this.mockQuestions.splice(questionIndex, 1);
            return removedQuestion[0];
        }
        return null;
    }
}