// frontend/components/Navbar.tsx
import { Box, Flex, Text } from '@chakra-ui/react';
import NextLink from 'next/link';

export default function Navbar() {
    return (
        <Box bg="gray.800" color="white" px={4}>
            <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
                <Box>Testa Asta Kurdî</Box>
                <Flex alignItems={'center'}>
                    <NextLink href="/" passHref>
                        <Text mx={4} cursor="pointer">Malpar | Home</Text>
                    </NextLink>
                    <NextLink href="/test" passHref>
                        <Text mx={4} cursor="pointer">Take Test | Testê bikin</Text>
                    </NextLink>
                </Flex>
            </Flex>
        </Box>
    );
}