import React, { useEffect, useState } from 'react';
import { Box, Text, VStack, Heading, Center } from '@chakra-ui/react';
import { useAssessment } from '../../context/AssessmentContext';
import { useUser } from '../../context/UserContext';
import { useTranslation } from 'react-i18next';
import { fetchResults } from '../../utils/httpClient';
import { AssessmentResult } from '../../types/AssessmentResult';
import Navbar from '../../components/Navbar';

const AssessmentResultPage = () => {
    const { answers } = useAssessment();
    const { user } = useUser();
    const { t } = useTranslation();
    const [results, setResults] = useState<AssessmentResult | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false); // New state for error handling

    useEffect(() => {
        const getResults = async () => {
            try {
                // Prepare request payload
                const payload = {
                    user: user?.name || user?.surname || user?.email || user?.phone ? user : undefined,
                    answers,
                };

                const response = await fetchResults(payload);
                setResults(response);
                setError(false); // No error if data is fetched successfully
            } catch (error) {
                console.error('Error fetching results:', error);
                setError(true); // Set error state if the request fails
            } finally {
                setLoading(false);
            }
        };

        getResults();
    }, [answers, user]);

    return (
        <>
            <Navbar />  {/* Navbar always visible */}
            <Center minH="100vh" bg="gray.50" px={4} pt="80px">
                <Box w="full" maxW="600px" mx="auto" textAlign="center">
                    <Heading>{t('assessmentResult.title')}</Heading>
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
                            <VStack mt={8}>
                                {results && results.results?.length > 0 ? (
                                    results.results.map((item, index) => (
                                        <Box key={index} mb={4}>
                                            <Text fontWeight="bold" color="teal.500">
                                                {index + 1}. {item.question || '-'} {/* Render question or "-" */}
                                            </Text>
                                            <Text color="gray.600">
                                                {t('assessmentSubmitModal.yourAnswer')}: {' '}
                                                {item.yourAnswer ? (
                                                    <Text as="b" display="inline">&quot;{item.yourAnswer}&quot;</Text>
                                                ) : (
                                                    <Text as="i" color="gray.400" display="inline">
                                                        {t('assessmentSubmitModal.noAnswer')}
                                                    </Text>
                                                )}
                                            </Text>
                                            <Text color="gray.600">
                                                {t('assessmentSubmitModal.correctAnswer')}: {' '}
                                                {item.correctAnswer ? (
                                                    <Text as="b" display="inline">&quot;{item.correctAnswer}&quot;</Text>
                                                ) : (
                                                    <Text as="i" color="gray.400" display="inline">
                                                        {t('assessmentSubmitModal.correctAnswerNotAvailable')}
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

                                {/* Total Score and Level */}
                                <Box mt={6}>
                                    <Text fontSize="xl">
                                        {t('assessmentResult.totalScore')}: {results?.totalScore != null ? results.totalScore : '-'}
                                    </Text>
                                    <Text fontSize="xl">
                                        {t('assessmentResult.level')}: {results?.level || '-'}
                                    </Text>
                                </Box>
                            </VStack>
                        </>
                    )}
                </Box>
            </Center>
        </>
    );
};

export default AssessmentResultPage;