// AssessmentContext.tsx
import { createContext, useContext, useState, ReactNode } from 'react';

interface Answer {
  [questionId: string]: string;
}

interface AssessmentContextType {
  answers: Answer;
  setAnswer: (questionId: string, answer: string) => void;
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

  const setAnswer = (questionId: string, answer: string) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: answer,
    }));
  };

  return (
    <AssessmentContext.Provider value={{ answers, setAnswer }}>
      {children}
    </AssessmentContext.Provider>
  );
};