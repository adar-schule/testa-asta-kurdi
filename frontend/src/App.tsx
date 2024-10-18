import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ChakraProvider, extendTheme, Box, Flex } from '@chakra-ui/react';
import { UserProvider } from './context/UserContext';
import { AssessmentProvider } from './context/AssessmentContext';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import AssessmentFormPage from './pages/assessment/form';
import AssessmentQuestionsPage from './pages/assessment/questions';
import AssessmentResult from './pages/assessment/result';
import Footer from './components/Footer';

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
    <ChakraProvider theme={customTheme}>
      <UserProvider>
        <AssessmentProvider>
          <Router>
            <Flex direction="column" minH="100vh">
              {/* Main content area */}
              <Box flex="1">
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/assessment/form" element={<AssessmentFormPage />} />
                  <Route path="/assessment/questions" element={<AssessmentQuestionsPage />} />
                  <Route path="/assessment/result" element={<AssessmentResult />} />
                  {/* Add more routes as needed */}
                </Routes>
              </Box>
              {/* Footer */}
              <Footer />
            </Flex>
          </Router>
        </AssessmentProvider>
      </UserProvider>
    </ChakraProvider>
  );
}

export default App;