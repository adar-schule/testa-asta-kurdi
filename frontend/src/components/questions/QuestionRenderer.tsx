import React from 'react';
import QuestionMultiselect from '../../components/questions/MultipleChoiceQuestion';
import QuestionFillInput from '../../components/questions/FillInTheBlankQuestion';

interface QuestionRendererProps {
    question: any;
    onAnswerChange: (questionId: string, answer: string) => void;  // Use `string` instead of `number`
    currentAnswer: string;
}

const QuestionRenderer: React.FC<QuestionRendererProps> = ({ question, onAnswerChange, currentAnswer }) => {
    if (question?.type === 'multiselect') {
        return (
            <QuestionMultiselect
                question={question}
                onAnswerChange={onAnswerChange}
                currentAnswer={currentAnswer}
            />
        );
    } else {
        return (
            <QuestionFillInput
                question={question}
                onAnswerChange={onAnswerChange}
                currentAnswer={currentAnswer}
            />
        );
    }
};

export default QuestionRenderer;