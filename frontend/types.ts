// frontend/types.ts

export interface Question {
    id: number;
    question: string;
    options: string[];
}

export interface User {
    id: string;
    name: string;
    email: string;
    phone?: string;
}

export interface TestResult {
    id: string;
    userId: string;
    score: number;
    level: 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2';
    testDate: string;
}