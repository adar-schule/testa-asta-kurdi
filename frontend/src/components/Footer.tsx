import { Box, Text, Link, IconButton, Flex } from "@chakra-ui/react";
import { FaKey } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Footer = () => {
    const navigate = useNavigate(); // React Router hook for navigation

    const handleAdminClick = () => {
        navigate('/admin'); // Navigate to admin dashboard when clicked
    };

    return (
        <Box as="footer" w="100%" py={4} bg="gray.100">
            <Flex w="full" px={4} align="center">
                {/* Footer text in the center */}
                <Text flex="1" textAlign="center" fontSize="sm" color="gray.600">
                    Made with love by{" "}
                    <Link href="https://www.kurdisch-lernen.de" color="teal.500" isExternal>
                        Adar Schule
                    </Link>
                </Text>

                {/* Key Icon for Admin Dashboard aligned to the right */}
                <IconButton
                    aria-label="Admin Dashboard"
                    icon={<FaKey />}
                    size="sm"
                    variant="outline"
                    colorScheme="teal"
                    onClick={handleAdminClick}
                    ml="auto" // Aligns the button to the far right
                />
            </Flex>
        </Box>
    );
};

export default Footer;