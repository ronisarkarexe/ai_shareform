import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import HeaderPage from "./_components/header";
import { Toaster } from "@/components/ui/sonner";

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
        <Toaster />
        {children}
      </body>
    </html>
  );
}
