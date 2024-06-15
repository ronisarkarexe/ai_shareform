import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import HeaderPage from "./_components/header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AI-ShareForm",
  description: "AI-ShareForm",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <HeaderPage />
        {children}
      </body>
    </html>
  );
}
