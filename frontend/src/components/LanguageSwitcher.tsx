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
        <Box position="fixed" top="16px" right="16px" zIndex="10"> {/* Stick the LanguageSwitcher to the top-right */}
            <Menu>
                <MenuButton
                    as={IconButton}
                    icon={<FaGlobe />} // Globe icon for language selection
                    aria-label="Language Switcher"
                    bg="teal.500" // Ensure it has a background that stands out from the navbar
                    color="white"
                    _hover={{ bg: "teal.600" }}
                    _active={{ bg: "teal.600" }}
                />
                <MenuList>
                    <MenuItem onClick={() => changeLanguage('en')}>
                        English
                    </MenuItem>
                    <MenuItem onClick={() => changeLanguage('de')}>
                        German
                    </MenuItem>
                    <MenuItem onClick={() => changeLanguage('ku')}>
                        Kurmanci
                    </MenuItem>
                </MenuList>
            </Menu>
        </Box>
    );
};

export default LanguageSwitcher;