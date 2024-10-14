import { Box, Heading, Text, Button, VStack, Center, Icon, HStack } from "@chakra-ui/react";
import { InfoIcon } from "@chakra-ui/icons";
import { useRouter } from "next/router";
import { useEffect, useState } from 'react';

const HomePage = () => {
  const router = useRouter();
  const [message, setMessage] = useState(''); // State to hold backend response

  // Use useEffect to call the backend when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Use the Heroku API URL if available, fallback to localhost for development
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001';
        console.log('Fetching data from:', apiUrl);

        const res = await fetch(apiUrl);
        if (!res.ok) {
          throw new Error(`Error: ${res.statusText}`);
        }

        const data = await res.text();
        console.log('Backend response:', data); // Log the response from backend
        setMessage(data); // Set the backend response
      } catch (err) {
        console.error('Error fetching data from backend:', err);
        setMessage('Error fetching data.');
      }
    };

    fetchData();
  }, []);


  const handleStartTest = () => {
    // Navigate to the assessment form page
    router.push("/assessment/form");
  };

  return (
    <Center minH="100vh" bg="gray.50" px={4}>
      <VStack spacing={6} maxW="600px" w="full" textAlign="center">
        <Heading size="2xl" mb={4}>
          {message || 'Loading...'}
        </Heading>
        <Text fontSize="xl" color="gray.600">
          Assess your Kurdish language skills with our comprehensive proficiency test.
        </Text>

        <Box
          borderRadius="md"
          p={4}
          bg="white"
          shadow="md"
          w="full"
          textAlign="left"
        >
          <HStack spacing={3}>
            <Icon as={InfoIcon} w={6} h={6} color="blue.500" />
            <Text fontWeight="bold">About the Test</Text>
          </HStack>
          <Text mt={2} color="gray.700">
            This test is designed to evaluate your Kurdish language proficiency across various
            aspects, including vocabulary, grammar, and comprehension. The test consists of
            multiple-choice questions and will take approximately 30 minutes to complete.
          </Text>
          <Text mt={2} color="gray.700">
            Upon completion, you’ll receive a detailed assessment of your Kurdish language skills,
            including your proficiency level and areas for improvement.
          </Text>
        </Box>

        <Button
          onClick={handleStartTest}
          colorScheme="teal"
          size="lg"
          mt={4}
        >
          Start Kurdish Level Test
        </Button>
      </VStack>
    </Center>
  );
};

export default HomePage;