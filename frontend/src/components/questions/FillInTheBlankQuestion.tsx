import { Box, Heading, FormControl, Input } from "@chakra-ui/react";

interface QuestionProps {
    id: string;  // Change `id` to string
    question: string;
}

interface Props {
    question: QuestionProps;
    onAnswerChange: (questionId: string, answer: string) => void;  // Use `string` instead of `number`
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
                    onChange={(e) => onAnswerChange(question.id, e.target.value)}  // `question.id` as string
                    placeholder="Your answer"
                />
            </FormControl>
        </Box>
    );
};

export default QuestionFillInput;