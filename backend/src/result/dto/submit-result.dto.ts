// src/result/dto/submit-result.dto.ts
import { ApiProperty } from '@nestjs/swagger';

export class SubmitResultDto {
    @ApiProperty({
        example: { '671797d8e588847d4ea772c6': 'Erbil', '671797e2e588847d4ea772c8': 'peyiv' },
        description: 'User answers with question IDs as keys and answers as values',
    })
    answers: { [questionId: string]: string };

    @ApiProperty({
        example: { name: 'John Doe', email: 'john@example.com' },
        description: 'Optional user details',
        required: false,
    })
    user?: { name: string; email: string };
}