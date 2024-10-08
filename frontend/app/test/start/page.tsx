// frontend/app/test/start/page.tsx

"use client";

import { Box, Heading, Text, Button, Input, FormControl, FormLabel } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function UserInfoPage() {
    const router = useRouter();
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');

    const handleStartTest = () => {
        // Submit user info (if any) and navigate to the test page
        // Ideally, you'd store this information or pass it to the test page
        console.log({ name, phone, email });
        router.push('/test');
    };

    const handleSkip = () => {
        // Skip the form and navigate directly to the test page
        router.push('/test');
    };

    return (
        <Box textAlign="center" py={10} px={6}>
            <Heading>Optional User Information</Heading>
            <Text mt={4}>
                You can optionally provide your personal information before starting the test. This will help us associate your results with your details.
            </Text>

            <FormControl mt={6}>
                <FormLabel>Name</FormLabel>
                <Input placeholder="Enter your name" value={name} onChange={(e) => setName(e.target.value)} />
            </FormControl>

            <FormControl mt={4}>
                <FormLabel>Phone Number</FormLabel>
                <Input placeholder="Enter your phone number" value={phone} onChange={(e) => setPhone(e.target.value)} />
            </FormControl>

            <FormControl mt={4}>
                <FormLabel>Email</FormLabel>
                <Input placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </FormControl>

            <Text mt={4} fontSize="sm">
                Note: Your data will be stored securely and used only for the purpose of this test. We respect your privacy and will not share your information with third parties.
            </Text>

            <Button mt={6} colorScheme="teal" onClick={handleStartTest}>
                Save and Start Test
            </Button>
            <Button mt={4} onClick={handleSkip}>
                Skip and Start Test Anonymously
            </Button>
        </Box>
    );
}