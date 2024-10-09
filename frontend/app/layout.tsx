// frontend/app/layout.tsx
import { ChakraProvider } from '@chakra-ui/react';
import Navbar from '../components/Navbar';
import './globals.css';

export const metadata = {
  title: 'Testa Asta Kurdî',
  description: 'Assess your Kurdish language proficiency skills',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
      </head>
      <body>
        <ChakraProvider>
          <Navbar />
          <main>{children}</main>
        </ChakraProvider>
      </body>
    </html>
  );
}