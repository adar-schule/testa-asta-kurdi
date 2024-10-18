import React, { useState } from 'react';
import { Box, VStack, Button, Center, HStack } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom'; // Updated to useNavigate
import { useUser } from '../../context/UserContext';
import { questionsDummyData } from '../../utils/dummyQuestions';
import Navbar from '../../components/Navbar';
import QuestionMultiselect from '../../components/questions/MultipleChoiceQuestion';
import QuestionFillInput from '../../components/questions/FillInTheBlankQuestion';
import { useTranslation } from 'react-i18next'; // Import the translation hook

interface AnswerType {
    [key: number]: string;
}

const AssessmentQuestionsPage = () => {
    const { user } = useUser();
    const navigate = useNavigate(); // Updated to useNavigate
    const { t } = useTranslation(); // Initialize translation hook
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
                                {t('back')} {/* Translated "Back" */}
                            </Button>
                            <Button onClick={handleNext} colorScheme="teal">
                                {currentQuestionIndex === questionsDummyData.length - 1
                                    ? t('submit') // Translated "Submit"
                                    : t('next')}  {/* Translated "Next" */}
                            </Button>
                        </HStack>
                    </VStack>
                </Box>
            </Center>
        </>
    );
};

export default AssessmentQuestionsPage;