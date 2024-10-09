// frontend/app/page.tsx
"use client";

import { Box, Heading, Text, Button } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function HomePage() {
  const [headingMessage, setMessage] = useState('Loading...');
  const router = useRouter();

  // Fetch data from backend
  useEffect(() => {
    const backendUrl = process.env.NEXT_PUBLIC_BE_URL || window.location.origin;
    fetch(`${backendUrl}/welcome`)
      .then((response) => response.json())
      .then((data) => setMessage(data.message))
      .catch((error) => {
        console.error('Error fetching message:', error);
        setMessage('Failed to load message');
      });
  }, []);

  const handleStartTest = () => {
    router.push('/test/start'); // Navigate to the user info form page first
  };

  return (
    <Box textAlign="center" py={10} px={6}>
      <Heading>{headingMessage}</Heading>
      <Text mt={6}>
        This test is designed to evaluate your Kurdish language proficiency across various aspects.
      </Text>
      <Button mt={6} colorScheme="teal" size="lg" onClick={handleStartTest}>
        Start Kurdî Level Test
      </Button>
    </Box>
  );
}