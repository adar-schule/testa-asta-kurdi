// /frontend/pages/_app.tsx
import { UserProvider } from "@/context/UserContext";
import { AssessmentProvider } from "@/context/AssessmentContext"; // Import Assessment Context
import { ChakraProvider, extendTheme, theme as defaultTheme } from "@chakra-ui/react";
import type { AppProps } from "next/app";

// Define your custom theme and merge it with the default Chakra theme
const customTheme = extendTheme({
  ...defaultTheme, // Ensure default colors (like teal) are included
  colors: {
    ...defaultTheme.colors, // Include default colors like teal
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

function TestaAstaKurdiApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={customTheme}>
      <UserProvider>
        <AssessmentProvider>
          <Component {...pageProps} />
        </AssessmentProvider>
      </UserProvider>
    </ChakraProvider>
  );
}

export default TestaAstaKurdiApp;