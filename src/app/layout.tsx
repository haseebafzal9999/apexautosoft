import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" });

export const metadata: Metadata = {
  title: "Nexora Flow — Automation & Web Solutions",
  description: "Nexora Flow builds custom web applications, AI agents, Twilio integrations, Zapier automations and scalable business automation systems.",
  openGraph: {
    title: "Nexora Flow — Automation & Web Solutions",
    description: "Nexora Flow builds custom web applications, AI agents, Twilio integrations, Zapier automations and scalable business automation systems.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Nexora Flow — Automation & Web Solutions",
    description: "Nexora Flow builds custom web applications, AI agents, Twilio integrations, Zapier automations and scalable business automation systems.",
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
