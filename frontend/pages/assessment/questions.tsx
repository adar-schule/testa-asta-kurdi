// /frontend/pages/assessment/questions.tsx
import React, { useState } from 'react';
import { Box, VStack, Button, Center, HStack } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useUser } from '../../context/UserContext';
import { questionsDummyData } from '@/utils/dummyQuestions';
import QuestionMultiselect from '@/components/questions/MultipleChoiceQuestion';
import QuestionFillInput from '@/components/questions/FillInTheBlankQuestion';
import Navbar from '@/components/Navbar';

interface AnswerType {
    [key: number]: string;
}

const AssessmentQuestionsPage = () => {
    const { user } = useUser();
    const router = useRouter();

    const [answers, setAnswers] = useState<AnswerType>({});
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);

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
            const fullSubmission = { user, answers };
            console.log("Submission:", fullSubmission);
            router.push('/assessment/result');
        }
    };

    const handleBack = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(currentQuestionIndex - 1);
        }
    };

    return (
        <>
            <Navbar /> {/* Navbar included here */}
            <Center minH="100vh" bg="gray.50" px={4} pt="80px"> {/* Added padding-top to account for navbar height */}
                <Box w="full" maxW="600px" mx="auto" textAlign="center">
                    <VStack spacing={6}>
                        <Box minH="200px" w="full"> {/* Ensure consistent height for questions */}
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
                        </Box>

                        <HStack spacing={4} justify="center" mt={4} w="full"> {/* Buttons aligned horizontally */}
                            <Button onClick={handleBack} colorScheme="gray" isDisabled={currentQuestionIndex === 0}>
                                Back
                            </Button>
                            <Button onClick={handleNext} colorScheme="teal">
                                {currentQuestionIndex === questionsDummyData.length - 1 ? 'Submit' : 'Next'}
                            </Button>
                        </HStack>
                    </VStack>
                </Box>
            </Center>
        </>
    );
};

export default AssessmentQuestionsPage;