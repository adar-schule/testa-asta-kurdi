import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsEnum } from 'class-validator';

export class CreateManagementDto {
    @ApiProperty({ example: 'admin123', description: 'Unique username of the management user' })
    @IsString()
    @IsNotEmpty()
    username: string;

    @ApiProperty({ example: 'password123', description: 'Password of the management user' })
    @IsString()
    @IsNotEmpty()
    password: string;

    @ApiProperty({ example: 'Admin', enum: ['Admin', 'Auditor'], description: 'Role of the management user' })
    @IsEnum(['Admin', 'Auditor'])
    role: string;
}