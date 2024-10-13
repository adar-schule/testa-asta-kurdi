import type { Metadata } from "next";

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
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
