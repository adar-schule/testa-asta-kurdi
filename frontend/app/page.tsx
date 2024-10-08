"use client";

import { Box, Heading, Text, Button } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';

export default function HomePage() {
  const router = useRouter();

  const handleStartTest = () => {
    router.push('/test'); // Programmatic navigation
  };

  return (
    <Box textAlign="center" py={10} px={6}>
      <Heading>Kurdish Language Proficiency Test</Heading>
      <Text mt={6}>
        This test is designed to evaluate your Kurdish language proficiency across various aspects.
      </Text>
      <Button mt={6} colorScheme="teal" size="lg" onClick={handleStartTest}>
        Start Kurdish Level Test
      </Button>
    </Box>
  );
}