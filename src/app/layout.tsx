import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

/* Tanker (Indian Type Foundry), font file supplied by the site owner. Single heavy cut; the 400-700 range
   keeps browsers from synthesizing a second bold when headings ask for 600. */
const tanker = localFont({
  src: "./fonts/Tanker-Regular.otf",
  variable: "--font-tanker",
  weight: "400 700",
  display: "swap",
});

export const metadata: Metadata = {
  title: "MNA. | Product Designer & Developer",
  description: "Portfolio of MNA., a product designer and developer building clear, fast and well-crafted digital products.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${tanker.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
