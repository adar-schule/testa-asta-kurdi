import React, { useState, useEffect } from 'react';
import { Box, VStack, Button, Center, HStack } from '@chakra-ui/react';
import { Text } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../context/UserContext';
import Navbar from '../../components/Navbar';
import QuestionMultiselect from '../../components/questions/MultipleChoiceQuestion';
import QuestionFillInput from '../../components/questions/FillInTheBlankQuestion';
import { useTranslation } from 'react-i18next';

interface AnswerType {
    [key: number]: string;
}

const AssessmentQuestionsPage = () => {
    const { user } = useUser();
    const navigate = useNavigate();
    const { t } = useTranslation();
    const [answers, setAnswers] = useState<AnswerType>({});
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
    const [questions, setQuestions] = useState<any[]>([]); // Hold the questions coming from the backend
    const [loading, setLoading] = useState<boolean>(true); // For loading state

    // Fetch questions from the backend
    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const apiUrl =
                    process.env.REACT_APP_API_URL || 'http://localhost:5001/questions'; // Adjust API URL for production
                const res = await fetch(apiUrl);
                if (!res.ok) {
                    throw new Error(`Error: ${res.statusText}`);
                }
                const data = await res.json();
                setQuestions(data);
                setLoading(false); // Stop loading once data is received
            } catch (err) {
                console.error('Error fetching questions:', err);
                setLoading(false); // Stop loading even on error
            }
        };

        fetchQuestions();
    }, []);

    // If questions array is empty or currentQuestionIndex exceeds its length, return undefined.
    const currentQuestion = questions.length > 0 ? questions[currentQuestionIndex] : null;

    const handleAnswerChange = (questionId: number, answer: string) => {
        setAnswers((prevAnswers) => ({
            ...prevAnswers,
            [questionId]: answer,
        }));
    };

    const handleNext = () => {
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        } else if (questions.length > 0) {
            const fullSubmission = { user, answers };
            console.log('Submission:', fullSubmission);
            navigate('/assessment/result');
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
                    {loading ? (
                        <Text>{t('loading')}</Text> // Add a loading indicator
                    ) : questions.length === 0 ? (
                        <Text>{t('noQuestions')}</Text> // Show "No Questions" message if no questions available
                    ) : (
                        <VStack spacing={6}>
                            <Box minH="200px" w="full">
                                {currentQuestion?.type === 'multiselect' ? (
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
                                    {currentQuestionIndex === questions.length - 1
                                        ? t('submit') // Translated "Submit"
                                        : t('next')}  {/* Translated "Next" */}
                                </Button>
                            </HStack>
                        </VStack>
                    )}
                </Box>
            </Center>
        </>
    );
};

export default AssessmentQuestionsPage;