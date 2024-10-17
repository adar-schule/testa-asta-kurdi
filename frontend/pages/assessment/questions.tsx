// /frontend/pages/assessment/questions.tsx
import React, { useState, useRef } from 'react';
import { Box, VStack, Button, Center, AlertDialog, AlertDialogBody, AlertDialogFooter, AlertDialogHeader, AlertDialogContent, AlertDialogOverlay } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useUser } from '../../context/UserContext';
import { questionsDummyData } from '@/utils/dummyQuestions';
import QuestionMultiselect from '@/components/questions/MultipleChoiceQuestion';
import QuestionFillInput from '@/components/questions/FillInTheBlankQuestion';

interface AnswerType {
    [key: number]: string;
}

const AssessmentQuestionsPage = () => {
    const { user } = useUser();
    const router = useRouter();

    const [answers, setAnswers] = useState<AnswerType>({});
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
    const [isSubmitDialogOpen, setIsSubmitDialogOpen] = useState(false);
    const cancelRef = useRef<HTMLButtonElement>(null);

    const currentQuestion = questionsDummyData[currentQuestionIndex];

    const handleAnswerChange = (questionId: number, answer: string) => {
        setAnswers(prevAnswers => ({
            ...prevAnswers,
            [questionId]: answer
        }));
    };

    const handleNext = () => {
        if (currentQuestionIndex < questionsDummyData.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        } else {
            // Open the submit confirmation dialog
            setIsSubmitDialogOpen(true);
        }
    };

    const handleBack = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(currentQuestionIndex - 1);
        }
    };

    const handleSubmit = () => {
        // Close the dialog and submit the answers
        setIsSubmitDialogOpen(false);

        const fullSubmission = { user, answers };
        console.log("Submission:", fullSubmission);
        // Simulate backend submission or move to result page
        router.push('/assessment/result');
    };

    return (
        <Center minH="100vh" bg="gray.50" px={4}>
            <Box w="full" maxW="600px" mx="auto" textAlign="center">
                <VStack spacing={6}>
                    {currentQuestion.type === 'multiselect' ? (
                        <QuestionMultiselect
                            question={currentQuestion}
                            onAnswerChange={handleAnswerChange}
                            currentAnswer={answers[currentQuestion.id] || ""}
                        />
                    ) : (
                        <QuestionFillInput
                            question={currentQuestion}
                            onAnswerChange={handleAnswerChange}
                            currentAnswer={answers[currentQuestion.id] || ""}
                        />
                    )}

                    <VStack spacing={4}>
                        <Button onClick={handleBack} colorScheme="gray" isDisabled={currentQuestionIndex === 0}>
                            Back
                        </Button>
                        <Button onClick={handleNext} colorScheme="teal">
                            {currentQuestionIndex === questionsDummyData.length - 1 ? 'Submit' : 'Next'}
                        </Button>
                    </VStack>
                </VStack>
            </Box>

            {/* Submit Confirmation Dialog */}
            <AlertDialog
                isOpen={isSubmitDialogOpen}
                leastDestructiveRef={cancelRef}
                onClose={() => setIsSubmitDialogOpen(false)}
            >
                <AlertDialogOverlay>
                    <AlertDialogContent>
                        <AlertDialogHeader fontSize="lg" fontWeight="bold">
                            Submit Answers
                        </AlertDialogHeader>

                        <AlertDialogBody>
                            Are you sure you want to submit your answers? You won't be able to change them after submission.
                        </AlertDialogBody>

                        <AlertDialogFooter>
                            <Button ref={cancelRef} onClick={() => setIsSubmitDialogOpen(false)}>
                                Cancel
                            </Button>
                            <Button colorScheme="teal" onClick={handleSubmit} ml={3}>
                                Submit
                            </Button>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialogOverlay>
            </AlertDialog>
        </Center>
    );
};

export default AssessmentQuestionsPage;