import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

export type ManagementDocument = Management & Document;

@Schema()
export class Management {
    @ApiProperty({ example: 'admin123', description: 'Unique username of the user' })
    @Prop({ required: true, unique: true })
    username: string;

    @ApiProperty({ example: 'password123', description: 'User password' })
    @Prop({ required: true })
    password: string;

    @ApiProperty({ example: 'Admin', enum: ['Admin', 'Auditor'], description: 'Role of the user' })
    @Prop({ required: true, enum: ['Admin', 'Auditor'] })
    role: string;
}

export const ManagementSchema = SchemaFactory.createForClass(Management);