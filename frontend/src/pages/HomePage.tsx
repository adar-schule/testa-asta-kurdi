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
import { useTranslation } from 'react-i18next';

const HomePage = () => {
  const navigate = useNavigate(); // Updated to useNavigate
  const { t } = useTranslation(); // Import useTranslation

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
    navigate("/assessment/form");
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
              {message || t('welcomeMessage')}
            </Heading>
            <Text fontSize="xl" color="whiteAlpha.800">
              {t('aboutTestDescription')}
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
                {t('aboutTestTitle')}
              </Text>
            </HStack>
            <Text mt={2} color="gray.700" fontSize="lg">
              {t('aboutTestDescription')}
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
            {t('startTest')}
          </Button>
        </VStack>
      </Box>
    </Center>
  );
};

export default HomePage;