// src/components/Navbar.tsx
import { Box, Flex, Button, Heading } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom'; // Updated to useNavigate

const Navbar = () => {
    const navigate = useNavigate(); // Updated to useNavigate

    const handleGoHome = () => {
        navigate('/'); // Use navigate instead of router.push
    };

    return (
        <Box as="nav" w="100%" bg="teal.500" px={4} py={3} position="fixed" top={0} zIndex="1">
            <Flex justify="space-between" align="center" maxW="1200px" mx="auto">
                <Heading as="h1" size="md" color="white">
                    Testa Asta Kurdi
                </Heading>
                <Button
                    bg="white"
                    color="teal.500"
                    _hover={{ bg: 'gray.100' }}
                    onClick={handleGoHome}
                >
                    Go to Home
                </Button>
            </Flex>
        </Box>
    );
};

export default Navbar;