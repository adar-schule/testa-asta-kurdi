// src/pages/assessment/questions.tsx
import React, { useState } from 'react';
import { Box, VStack, Button, Center, HStack } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom'; // Updated to useNavigate
import { useUser } from '../../context/UserContext';
import { questionsDummyData } from '../../utils/dummyQuestions';
import Navbar from '../../components/Navbar';
import QuestionMultiselect from '../../components/questions/MultipleChoiceQuestion';
import QuestionFillInput from '../../components/questions/FillInTheBlankQuestion';

interface AnswerType {
    [key: number]: string;
}

const AssessmentQuestionsPage = () => {
    const { user } = useUser();
    const navigate = useNavigate(); // Updated to useNavigate
    const [answers, setAnswers] = useState<AnswerType>({});
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);

    const currentQuestion = questionsDummyData[currentQuestionIndex];

    const handleAnswerChange = (questionId: number, answer: string) => {
        setAnswers((prevAnswers) => ({
            ...prevAnswers,
            [questionId]: answer,
        }));
    };

    const handleNext = () => {
        if (currentQuestionIndex < questionsDummyData.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        } else {
            const fullSubmission = { user, answers };
            console.log('Submission:', fullSubmission);
            navigate('/assessment/result'); // Use navigate for routing
        }
    };

    const handleBack = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(currentQuestionIndex - 1);
        }
    };

    return (
        <>
            <Navbar />
            <Center minH="100vh" bg="gray.50" px={4} pt="80px">
                <Box w="full" maxW="600px" mx="auto" textAlign="center">
                    <VStack spacing={6}>
                        <Box minH="200px" w="full">
                            {currentQuestion.type === 'multiselect' ? (
                                <QuestionMultiselect
                                    question={currentQuestion}
                                    onAnswerChange={handleAnswerChange}
                                    currentAnswer={answers[currentQuestion.id] || ''}
                                />
                            ) : (
                                <QuestionFillInput
                                    question={currentQuestion}
                                    onAnswerChange={handleAnswerChange}
                                    currentAnswer={answers[currentQuestion.id] || ''}
                                />
                            )}
                        </Box>

                        <HStack spacing={4} justify="center" mt={4} w="full">
                            <Button
                                onClick={handleBack}
                                colorScheme="gray"
                                isDisabled={currentQuestionIndex === 0}
                            >
                                Back
                            </Button>
                            <Button onClick={handleNext} colorScheme="teal">
                                {currentQuestionIndex === questionsDummyData.length - 1
                                    ? 'Submit'
                                    : 'Next'}
                            </Button>
                        </HStack>
                    </VStack>
                </Box>
            </Center>
        </>
    );
};

export default AssessmentQuestionsPage;