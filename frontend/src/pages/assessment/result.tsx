import React, { useEffect, useState } from 'react';
import { Box, Text, VStack, Heading, Center, Divider } from '@chakra-ui/react';
import { useAssessment } from '../../context/AssessmentContext';
import { useUser } from '../../context/UserContext';
import { useTranslation } from 'react-i18next';
import { fetchResults } from '../../utils/httpClient';
import { AssessmentResult } from '../../types/AssessmentResult';
import Navbar from '../../components/Navbar';

const AssessmentResultPage = () => {
    const { answers } = useAssessment();  // Ensure answers are fetched from context
    const { user } = useUser();
    const { t } = useTranslation();
    const [results, setResults] = useState<AssessmentResult | null>(null);
    const [loading, setLoading] = useState(true);  // Dynamically manage loading state
    const [error, setError] = useState(false); // New state for error handling

    useEffect(() => {
        const getResults = async () => {
            try {
                const payload = {
                    user: user?.name || user?.email ? user : undefined,  // Optional user data
                    answers,
                };

                const response = await fetchResults(payload);  // Submit the answers to backend
                setResults(response);
                setLoading(false);  // Set loading to false once data is fetched
            } catch (error) {
                console.error('Error fetching results:', error);
                setError(true); // Set error state if the request fails
                setLoading(false); // Stop loading if there’s an error
            }
        };

        getResults();
    }, [answers, user]);

    return (
        <>
            <Navbar />  {/* Navbar always visible */}
            <Center minH="100vh" bg="gray.50" px={4} pt="80px">
                <Box w="full" maxW="600px" mx="auto" textAlign="center">
                    <Heading mb={4}>{t('assessmentResult.title')}</Heading>

                    {/* Display total score and level just after the title */}
                    {results && (
                        <>
                            <Text fontSize="2xl" color="teal.600" fontWeight="bold">
                                {t('assessmentResult.level')}: {results.level || '-'}
                            </Text>
                            <Text fontSize="xl" color="teal.600" mb={6}>
                                {t('assessmentResult.totalScore')}: {results.totalScore != null ? results.totalScore : '-'}
                            </Text>
                            <Divider my={4} />
                        </>
                    )}

                    <Text>{t('assessmentResult.description')}</Text>

                    {/* If an error occurs, show a small message below the heading */}
                    {error && (
                        <Text color="red.500" mt={2}>
                            {t('assessmentResult.error')}
                        </Text>
                    )}

                    {/* Render loading state */}
                    {loading ? (
                        <Text>{t('assessmentResult.loading')}</Text>
                    ) : (
                        <>
                            {/* Render results table or placeholder content */}
                            <VStack mt={8} align="start">
                                {results && results.results?.length > 0 ? (
                                    results.results.map((item, index) => (
                                        <Box key={index} mb={4} w="full" p={4} borderWidth="1px" borderRadius="md" bg="white" boxShadow="sm">
                                            <Text fontWeight="bold" color="teal.500">
                                                {index + 1}. {item.question || '-'}
                                            </Text>
                                            <Text color="gray.600">
                                                {t('assessmentResult.yourAnswer')}: {' '}
                                                {item.yourAnswer ? (
                                                    <Text as="b" display="inline">&quot;{item.yourAnswer}&quot;</Text>
                                                ) : (
                                                    <Text as="i" color="gray.400" display="inline">
                                                        {t('assessmentResult.noAnswer')}
                                                    </Text>
                                                )}
                                            </Text>
                                            <Text color="gray.600">
                                                {t('assessmentResult.correctAnswer')}: {' '}
                                                {item.correctAnswer ? (
                                                    <Text as="b" display="inline">&quot;{item.correctAnswer}&quot;</Text>
                                                ) : (
                                                    <Text as="i" color="gray.400" display="inline">
                                                        {t('assessmentResult.correctAnswerNotAvailable')}
                                                    </Text>
                                                )}
                                            </Text>
                                            <Text color="gray.600">
                                                {t('assessmentResult.points')}: {item.earnedPoints != null ? item.earnedPoints : '-'} / {item.points != null ? item.points : '-'}
                                            </Text>
                                        </Box>
                                    ))
                                ) : (
                                    <Text mt={4}>
                                        {t('assessmentResult.noResultsAvailable')}
                                    </Text>
                                )}
                            </VStack>
                        </>
                    )}
                </Box>
            </Center>
        </>
    );
};

export default AssessmentResultPage;