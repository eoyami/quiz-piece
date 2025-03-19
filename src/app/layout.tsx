import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import Header from "./components/header";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import AuthProvider from "./api/providers/AuthProvider";
import { useSession } from "next-auth/react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Quiz Piece",
  description: "Um jogo de quiz com temática de One Piece",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { data } = useSession();
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthProvider session={data}>
          <main className="relative flex flex-col w-screen h-screen">
            <Header />
            {children}
            <Analytics />
          </main>
        </AuthProvider>
      </body>
    </html>
  );
}
