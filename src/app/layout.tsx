import type { Metadata } from "next";
// Metadata helps browsers and search engines understand each page.
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ShopNextPOC",
  description: "poc to understand architecture of nextjs",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Navbar />
        {/* <h2>Value of KEY variable:- {process.env.API_BASE_URL}</h2> */}
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
