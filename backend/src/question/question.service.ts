// src/question/question.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Question, QuestionDocument } from './schemas/question.schema';
import { CreateQuestionDto } from './dto/create-question.dto';

@Injectable()
export class QuestionService {
    constructor(
        @InjectModel(Question.name) private questionModel: Model<QuestionDocument>,
    ) { }

    async create(createQuestionDto: CreateQuestionDto): Promise<Question> {
        const createdQuestion = new this.questionModel(createQuestionDto);
        return createdQuestion.save();
    }

    async findAll(): Promise<Question[]> {
        return this.questionModel.find().exec();
    }

    async findOne(id: string): Promise<Question> {
        return this.questionModel.findById(id).exec();
    }

    async findManyByIds(ids: string[]): Promise<Question[]> {
        // Find questions where _id is in the list of ids provided
        return this.questionModel.find({ _id: { $in: ids } }).exec();
    }

    async update(id: string, updateQuestionDto: CreateQuestionDto): Promise<Question> {
        return this.questionModel.findByIdAndUpdate(id, updateQuestionDto, { new: true }).exec();
    }

    async remove(id: string): Promise<Question> {
        return this.questionModel.findByIdAndDelete(id).exec();
    }
}