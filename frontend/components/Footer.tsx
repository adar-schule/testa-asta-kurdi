// /frontend/components/Footer.tsx
import { Box, Text, Link } from "@chakra-ui/react";

const Footer = () => {
    return (
        <Box as="footer" w="100%" py={4} textAlign="center" bg="gray.100" mt={8}>
            <Text fontSize="sm" color="gray.600">
                Made with love by{" "}
                <Link href="https://www.kurdisch-lernen.de" color="teal.500" isExternal>
                    Adar Schule
                </Link>
            </Text>
        </Box>
    );
};

export default Footer;