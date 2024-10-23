export interface AssessmentResult {
    results: {
        question: string;
        yourAnswer: string;
        correctAnswer: string;
        points: number;
        earnedPoints: number;
    }[];
    totalScore: number;
    level: string;
}