// /frontend/pages/index.tsx
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
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const HomePage = () => {
  const router = useRouter();
  const [message, setMessage] = useState(""); // State to hold backend response

  // Use useEffect to call the backend when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiUrl =
          process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001";
        const res = await fetch(apiUrl);
        if (!res.ok) {
          throw new Error(`Error: ${res.statusText}`);
        }

        const data = await res.text();
        setMessage(data); // Set the backend response
      } catch (err) {
        console.error("Error fetching data from backend:", err);
        setMessage("Error fetching data.");
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
      <Box w="full" maxW="600px" mx="auto" px={4} textAlign="center"> {/* Ensure centering */}
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
            maxW="100%"  // Make image fully responsive
            maxH="300px"  // Limit height
            w="full"
            objectFit="cover"  // Maintain aspect ratio
          />

          <Box
            borderRadius="md"
            p={6}
            bg="white"
            shadow="md"
            w="full"
            textAlign="left"
          >
            <HStack spacing={3}>
              <Icon as={InfoIcon} w={6} h={6} color="teal.500" />
              <Text fontWeight="bold" fontSize="xl">
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
            size="md"
          >
            Start Kurdish Level Test
          </Button>
        </VStack>
      </Box>
    </Center>
  );
};

export default HomePage;