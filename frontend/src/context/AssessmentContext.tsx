import { createContext, useContext, useState, ReactNode } from "react";

interface Answer {
    questionId: number;
    answer: string;
}

interface AssessmentContextType {
    answers: Answer[];
    currentQuestionIndex: number;
    setAnswer: (answer: Answer) => void;
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
    const [answers, setAnswers] = useState<Answer[]>([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

    const setAnswer = (answer: Answer) => {
        setAnswers((prevAnswers) => {
            const updatedAnswers = [...prevAnswers];
            updatedAnswers[currentQuestionIndex] = answer;
            return updatedAnswers;
        });
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