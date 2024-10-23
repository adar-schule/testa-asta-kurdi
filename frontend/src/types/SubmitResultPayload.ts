// src/types/SubmitResultPayload.ts
export interface SubmitResultPayload {
    user?: { name?: string; surname?: string; email?: string; phone?: string }; // Make the user optional
    answers: { [questionId: string]: string }; // Map question IDs to the user's answers
}