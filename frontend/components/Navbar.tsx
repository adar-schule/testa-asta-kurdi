// /frontend/components/Navbar.tsx
import { Box, Flex, Button, Heading } from '@chakra-ui/react';
import { useRouter } from 'next/router';

const Navbar = () => {
    const router = useRouter();

    const handleGoHome = () => {
        router.push('/');
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
                    _hover={{ bg: 'gray.100' }} // Lighter hover effect for better visibility
                    onClick={handleGoHome}
                >
                    Go to Home
                </Button>
            </Flex>
        </Box>
    );
};

export default Navbar;