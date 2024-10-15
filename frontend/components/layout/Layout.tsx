import { ChakraProvider, extendTheme, theme as defaultTheme } from "@chakra-ui/react";
import type { Metadata } from "next";

// Define your custom theme and merge it with the default Chakra theme
const customTheme = extendTheme({
  ...defaultTheme, // Include default theme colors
  colors: {
    ...defaultTheme.colors, // Ensure default colors (like teal) are included
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

export const metadata: Metadata = {
  title: "Testa Asta Kurdi",
  description: "Adar Schule",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ChakraProvider theme={customTheme}>
      <html lang="en">
        <body>{children}</body>
      </html>
    </ChakraProvider>
  );
}