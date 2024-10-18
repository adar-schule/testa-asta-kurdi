import React from 'react';
import { Box, IconButton, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react';
import { FaGlobe } from 'react-icons/fa'; // Use a globe icon for language selection
import { useTranslation } from 'react-i18next';

const LanguageSwitcher = () => {
    const { i18n } = useTranslation();

    const changeLanguage = (lng: string) => {
        i18n.changeLanguage(lng);
    };

    return (
        <Box position="fixed" top="8px" right="8px" zIndex="10"> {/* Reduced padding from top and right */}
            <Menu>
                <MenuButton
                    as={IconButton}
                    icon={<FaGlobe />}
                    aria-label="Language Switcher"
                    // Reduced size and padding for a smaller button
                    bg="primary.500" // Matched color to theme
                    color="white"
                    _hover={{ bg: "primary.600" }}
                    _active={{ bg: "primary.600" }}
                    size="sm" // Smaller button size
                    p={2} // Reduced padding inside the button
                />
                <MenuList minW="80px"> {/* Adjust width of the dropdown menu */}
                    <MenuItem fontSize="sm" onClick={() => changeLanguage('en')}>
                        EN
                    </MenuItem>
                    <MenuItem fontSize="sm" onClick={() => changeLanguage('de')}>
                        DE
                    </MenuItem>
                    <MenuItem fontSize="sm" onClick={() => changeLanguage('ku')}>
                        KU
                    </MenuItem>
                </MenuList>
            </Menu>
        </Box>
    );
};

export default LanguageSwitcher;