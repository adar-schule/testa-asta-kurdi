import { createContext, useContext, useState, ReactNode } from "react";

interface Answer {
    [questionId: string]: string;  // Updated to map question IDs to answers
}

interface AssessmentContextType {
    answers: Answer;
    currentQuestionIndex: number;
    setAnswer: (questionId: string, answer: string) => void;
    goToNextQuestion: () => void;
    goToPreviousQuestion: () => void;
}

const AssessmentContext = createContext<AssessmentContextType | undefined>(undefined);

export const useAssessment = () => {
    const context = useContext(AssessmentContext);
    if (!context) {
        throw new Error("useAssessment must be used within an AssessmentProvider");
    }
    return context;
};

export const AssessmentProvider = ({ children }: { children: ReactNode }) => {
    const [answers, setAnswers] = useState<Answer>({});
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

    const setAnswer = (questionId: string, answer: string) => {
        setAnswers((prevAnswers) => ({
            ...prevAnswers,
            [questionId]: answer,
        }));
    };

    const goToNextQuestion = () => {
        setCurrentQuestionIndex((index) => index + 1);
    };

    const goToPreviousQuestion = () => {
        setCurrentQuestionIndex((index) => Math.max(index - 1, 0));
    };

    return (
        <AssessmentContext.Provider
            value={{
                answers,
                currentQuestionIndex,
                setAnswer,
                goToNextQuestion,
                goToPreviousQuestion,
            }}
        >
            {children}
        </AssessmentContext.Provider>
    );
};