import type { Metadata } from "next";
import { Geist, Geist_Mono, Source_Serif_4, Source_Code_Pro } from "next/font/google";
import "./globals.css";
import NavHeader from "./NavHeader";
import SmoothScrollProvider from "./components/SmoothScrollProvider";

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
  metadataBase: new URL('https://ara.computer'),

  // Open Graph
  openGraph: {
    title: "Ara Intelligence",
    description: "Building the future of AI - personal, cute, and intelligent assistants for everyone.",
    url: "https://ara.computer",
    siteName: "Ara Intelligence",
    type: "website",
    // images will be automatically handled by opengraph-image.tsx
    videos: [
      {
        url: "/ara-demo.mp4", // We'll add this
        width: 1200,
        height: 630,
        type: "video/mp4",
      }
    ],
  },

  // Twitter
  twitter: {
    card: "summary_large_image",
    title: "Ara Intelligence",
    description: "Building the future of AI - personal, cute, and intelligent assistants for everyone.",
    // images will be automatically handled by opengraph-image.tsx
    creator: "@ara_intelligence", // Update with your actual Twitter handle
  },

  // Additional meta tags
  other: {
    "og:video:type": "video/mp4",
    "og:video:width": "1200",
    "og:video:height": "630",
  },
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
        <SmoothScrollProvider>
          <div className="min-h-screen max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <NavHeader />
            <main className="pt-28">
              {children}
            </main>
          </div>
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
