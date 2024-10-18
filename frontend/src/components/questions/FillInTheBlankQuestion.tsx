import { Box, Heading, FormControl, Input } from "@chakra-ui/react";

interface QuestionProps {
    id: number;
    question: string;
}

interface Props {
    question: QuestionProps;
    onAnswerChange: (questionId: number, answer: string) => void;
    currentAnswer: string;
}

const QuestionFillInput: React.FC<Props> = ({ question, onAnswerChange, currentAnswer }) => {
    return (
        <Box w="full" textAlign="left">
            <Heading size="md" mb={4}>
                {question.question}
            </Heading>
            <FormControl>
                <Input
                    value={currentAnswer}
                    onChange={(e) => onAnswerChange(question.id, e.target.value)}
                    placeholder="Your answer"
                />
            </FormControl>
        </Box>
    );
};

export default QuestionFillInput;