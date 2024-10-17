// /frontend/pages/assessment/questions.tsx
import React, { useState } from 'react';
import { Box, VStack, Button, Center } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useUser } from '../../context/UserContext';
import { questionsDummyData } from '@/utils/dummyQuestions';
import QuestionMultiselect from '@/components/questions/MultipleChoiceQuestion';
import QuestionFillInput from '@/components/questions/FillInTheBlankQuestion';
import AssessmentNavbar from '@/components/AssessmentNavbar';

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
            <AssessmentNavbar /> {/* Navbar included here */}
            <Center minH="100vh" bg="gray.50" px={4} pt="80px"> {/* Added padding-top to account for navbar height */}
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
            </Center>
        </>
    );
};

export default AssessmentQuestionsPage;