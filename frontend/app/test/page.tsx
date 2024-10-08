// frontend/app/test/page.tsx

"use client"; // Ensures this component runs on the client side

import { Box, Heading, Text, Button, Input } from '@chakra-ui/react';
import { useState } from 'react';

export default function TestPage() {
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const totalQuestions = 10;

  const handleNextQuestion = () => {
    if (currentQuestion < totalQuestions) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  return (
    <Box p={4} textAlign="center">
      <Heading>Language Skills Evaluation</Heading>
      <Text mt={6}>Answer the following questions to evaluate your language skills.</Text>

      <Box mt={8}>
        <Text>Question {currentQuestion} of {totalQuestions}</Text>
        <Text mt={4}>Which of the following is a Kurdish dish?</Text>
        <Input placeholder="Enter your answer" mt={4} />

        <Button mt={6} colorScheme="teal" onClick={handleNextQuestion}>
          Next
        </Button>
      </Box>
    </Box>
  );
}