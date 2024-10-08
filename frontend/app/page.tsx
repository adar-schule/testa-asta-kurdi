"use client";

import { Box, Heading, Text, Button, Icon } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import { InfoIcon } from '@chakra-ui/icons'; // To display the info icon as in the screenshot

export default function HomePage() {
  const router = useRouter();

  const handleStartTest = () => {
    router.push('/test'); // Redirect to the test page
  };

  return (
    <Box textAlign="center" py={10} px={6}>
      {/* Title */}
      <Heading>Kurdish Language Proficiency Test</Heading>
      <Text mt={4} fontSize="lg">
        Assess your Kurdish language skills with our comprehensive proficiency test.
      </Text>

      {/* About the Test Section */}
      <Box mt={8} p={5} borderWidth="1px" borderRadius="lg" boxShadow="md">
        <Icon as={InfoIcon} w={6} h={6} mb={4} color="gray.500" />
        <Heading size="md">About the Test</Heading>
        <Text mt={4}>
          This test is designed to evaluate your Kurdish language proficiency across various aspects, including vocabulary, grammar, and comprehension.
          The test consists of multiple-choice questions and will take approximately 30 minutes to complete.
        </Text>
        <Text mt={4}>
          Upon completion, you’ll receive a detailed assessment of your Kurdish language skills, including your proficiency level and areas for improvement.
        </Text>
      </Box>

      {/* Start Test Button */}
      <Button
        mt={6}
        colorScheme="teal"
        size="lg"
        onClick={handleStartTest}
        leftIcon={<Icon as={InfoIcon} />}
      >
        Start Kurdish Level Test
      </Button>
    </Box>
  );
}