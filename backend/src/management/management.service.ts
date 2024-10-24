import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Management, ManagementDocument } from './schemas/management.schema';
import * as bcrypt from 'bcrypt';

@Injectable()
export class ManagementService {
    constructor(
        @InjectModel(Management.name) private managementModel: Model<ManagementDocument>
    ) { }

    // Find a management user by username
    async findByUsername(username: string): Promise<Management> {
        return this.managementModel.findOne({ username }).exec();
    }

    // Generic function to create an admin or auditor
    async create(username: string, password: string, role: string): Promise<Management> {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new this.managementModel({ username, password: hashedPassword, role });
        return newUser.save();
    }
}