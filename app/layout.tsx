import type { Metadata } from "next";
import { Geist, Geist_Mono, Source_Serif_4, Source_Code_Pro } from "next/font/google";
import "./globals.css";
import NavHeader from "./NavHeader";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const sourceSerif = Source_Serif_4({
  variable: "--font-source-serif-4",
  subsets: ["latin"],
});

const sourceCodePro = Source_Code_Pro({
  variable: "--font-source-code-pro",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ara Intelligence",
  description: "Building the future of AI - personal, cute, and intelligent assistants for everyone.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${sourceSerif.variable} ${sourceCodePro.variable} antialiased min-h-screen bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800`}
      >
        <div className="min-h-screen max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <NavHeader />
          <main className="pt-28">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
