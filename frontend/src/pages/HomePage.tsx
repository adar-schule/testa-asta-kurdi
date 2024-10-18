// src/pages/HomePage.tsx
import {
  Box,
  Heading,
  Text,
  Button,
  VStack,
  Center,
  Icon,
  HStack,
  Image,
} from "@chakra-ui/react";
import { InfoIcon } from "@chakra-ui/icons";
import { useNavigate } from 'react-router-dom'; // Updated to useNavigate
import { useEffect, useState } from "react";

const HomePage = () => {
  const navigate = useNavigate(); // Updated to useNavigate
  const [message, setMessage] = useState(""); // State to hold backend response

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiUrl =
          process.env.REACT_APP_API_URL || "http://localhost:5001"; // Updated to REACT_APP
        const res = await fetch(apiUrl);
        if (!res.ok) {
          throw new Error(`Error: ${res.statusText}`);
        }

        const data = await res.text();
        setMessage(data);
      } catch (err) {
        console.error("Error fetching data from backend:", err);
        setMessage("Error fetching data.");
      }
    };

    fetchData();
  }, []);

  const handleStartTest = () => {
    navigate("/assessment/form"); // Use navigate instead of router.push
  };

  return (
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
              {message || "Loading..."}
            </Heading>
            <Text fontSize="xl" color="whiteAlpha.800">
              Assess your Kurdish language skills with our comprehensive proficiency test.
            </Text>
          </Box>

          <Image
            src="/images/testa-asta-kurdi.jpg"
            alt="Kurdish Language Test"
            borderRadius="md"
            shadow="lg"
            mb={6}
            maxW="100%"
            maxH="300px"
            w="full"
            objectFit="cover"
          />

          <Box
            borderRadius="md"
            p={6}
            bg="white"
            shadow="md"
            w="full"
            textAlign="left"
            maxW="800px"
          >
            <HStack spacing={3} alignItems="flex-start">
              <Icon as={InfoIcon} w={8} h={8} color="teal.500" />
              <Text fontWeight="bold" fontSize="2xl">
                About the Test
              </Text>
            </HStack>
            <Text mt={2} color="gray.700" fontSize="lg">
              This test is designed to evaluate your Kurdish language proficiency across various
              aspects, including vocabulary, grammar, and comprehension. The test consists of
              multiple-choice questions and will take approximately 30 minutes to complete.
            </Text>
            <Text mt={2} color="gray.700" fontSize="lg">
              Upon completion, you’ll receive a detailed assessment of your Kurdish language skills,
              including your proficiency level and areas for improvement.
            </Text>
          </Box>

          <Button
            onClick={handleStartTest}
            colorScheme="teal"
            size="lg"
            mt={4}
            w="full"
            maxW="400px"
          >
            Start Kurdish Level Test
          </Button>
        </VStack>
      </Box>
    </Center>
  );
};

export default HomePage;