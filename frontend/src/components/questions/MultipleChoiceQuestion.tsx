import { Box, Heading, Button, VStack } from "@chakra-ui/react";

interface QuestionProps {
    id: number;
    question: string;
    answers: string[];
}

interface Props {
    question: QuestionProps;
    onAnswerChange: (questionId: number, answer: string) => void;
    currentAnswer: string;
}

const QuestionMultiselect: React.FC<Props> = ({ question, onAnswerChange, currentAnswer }) => {
    return (
        <Box w="full" textAlign="left">
            <Heading size="md" mb={4}>
                {question.question}
            </Heading>
            <VStack spacing={2}>
                {question.answers.map((answer, index) => (
                    <Button
                        key={index}
                        w="full"
                        colorScheme={currentAnswer === answer ? 'teal' : 'gray'}
                        onClick={() => onAnswerChange(question.id, answer)}
                    >
                        {answer}
                    </Button>
                ))}
            </VStack>
        </Box>
    );
};

export default QuestionMultiselect;