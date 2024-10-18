import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ChakraProvider, extendTheme, Box, Flex } from '@chakra-ui/react';
import { UserProvider } from './context/UserContext';
import { AssessmentProvider } from './context/AssessmentContext';
import HomePage from './pages/HomePage';
import AssessmentFormPage from './pages/assessment/form';
import AssessmentQuestionsPage from './pages/assessment/questions';
import AssessmentResult from './pages/assessment/result';
import Footer from './components/Footer';
import LanguageSwitcher from './components/LanguageSwitcher'; // Import the LanguageSwitcher
import i18n from 'i18next';
import { I18nextProvider } from 'react-i18next';
import en from './locales/en.json';
import de from './locales/de.json';
import ku from './locales/ku.json';

// Initialize i18n
i18n.init({
  resources: {
    en: { translation: en },
    de: { translation: de },
    ku: { translation: ku }
  },
  lng: 'en', // default language
  fallbackLng: 'en',
  interpolation: { escapeValue: false }
});

// Define your custom theme (if needed) or use Chakra default
const customTheme = extendTheme({
  colors: {
    primary: {
      100: "#E3F8FF",
      200: "#B3ECFF",
      300: "#81DEFD",
      400: "#5ED0FA",
      500: "#40C3F7",
      600: "#2BB0ED",
      700: "#1992D4",
      800: "#127FBF",
      900: "#0B69A3",
    },
  },
});

function App() {
  return (
    <I18nextProvider i18n={i18n}>
      <ChakraProvider theme={customTheme}>
        <UserProvider>
          <AssessmentProvider>
            <Router>
              <Flex direction="column" minH="100vh">
                {/* LanguageSwitcher placed globally */}
                <LanguageSwitcher />

                {/* Main content area */}
                <Box flex="1">
                  <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/assessment/form" element={<AssessmentFormPage />} />
                    <Route path="/assessment/questions" element={<AssessmentQuestionsPage />} />
                    <Route path="/assessment/result" element={<AssessmentResult />} />
                  </Routes>
                </Box>

                {/* Footer */}
                <Footer />
              </Flex>
            </Router>
          </AssessmentProvider>
        </UserProvider>
      </ChakraProvider>
    </I18nextProvider>
  );
}

export default App;