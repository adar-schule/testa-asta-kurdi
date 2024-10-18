import React from 'react';
import {
    Box,
    Heading,
    Text,
    VStack,
    Center,
} from '@chakra-ui/react';
import UserForm from '../../components/forms/UserForm';
import Navbar from '../../components/Navbar';
import { useTranslation } from 'react-i18next'; // Import useTranslation

const AssessmentFormPage = () => {
    const { t } = useTranslation(); // Use useTranslation hook

    return (
        <>
            <Navbar />
            <Center minH="100vh" bg="gray.50" px={4}>
                <Box w="full" maxW="600px" mx="auto" px={4} textAlign="center">
                    <VStack spacing={6} w="full">
                        <Box
                            w="100%"
                            p={6}
                            bg="teal.500"
                            borderRadius="lg"
                            color="white"
                            textAlign="center"
                            boxShadow="lg"
                            mb={8}
                        >
                            <Heading size="2xl" mb={4}>
                                {t('assessmentForm.heading')} {/* Translated text */}
                            </Heading>
                            <Text fontSize="xl" color="whiteAlpha.800">
                                {t('assessmentForm.description')} {/* Translated text */}
                            </Text>
                        </Box>

                        <UserForm />
                    </VStack>
                </Box>
            </Center>
        </>
    );
};

export default AssessmentFormPage;