import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" });

export const metadata: Metadata = {
  title: "ApexAutosoft",
  description: "ApexAutosoft builds intelligent automation systems, AI agents, custom software applications, and business workflows.",
  openGraph: {
    title: "ApexAutosoft",
    description: "ApexAutosoft builds intelligent automation systems, AI agents, custom software applications, and business workflows.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ApexAutosoft",
    description: "ApexAutosoft builds intelligent automation systems, AI agents, custom software applications, and business workflows.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} ${playfair.variable} font-sans antialiased bg-brand-light text-brand-dark overflow-x-hidden`}>
        <Navbar />
        <main className="w-full max-w-full overflow-hidden">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
