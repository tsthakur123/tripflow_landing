import type { Metadata, Viewport } from "next";
import { Inter, Geist } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

const geist = Geist({
  variable: "--font-heading",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  themeColor: "#030303",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export const metadata: Metadata = {
  title: "TripFlow — AI Travel Agent That Plans & Books Complete Trips",
  description:
    "Stop planning trips manually. TripFlow is an AI-powered travel planner that generates personalized itineraries, discovers transport and hotels, and plans complete trips using natural language.",
  keywords: [
    "AI travel planner",
    "AI trip planner",
    "AI travel agent",
    "travel itinerary generator",
    "smart travel planner",
    "automated trip planning",
  ],
  authors: [{ name: "TripFlow" }],
  openGraph: {
    title: "TripFlow — AI Travel Agent",
    description: "Your next trip starts with one prompt. Let AI handle the flights, stays, and itineraries.",
    url: "https://tripflow.live",
    siteName: "TripFlow",
    images: [
      {
        url: "https://tripflow.live/logo.png",
        width: 1200,
        height: 630,
        alt: "TripFlow — AI Travel Agent",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "TripFlow — AI Travel Agent",
    description: "Stop planning trips manually. Let AI handle it.",
    images: ["https://tripflow.live/logo.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${geist.variable} dark antialiased`}
    >
      <body className="min-h-screen flex flex-col selection:bg-primary/30">{children}</body>
    </html>
  );
}
