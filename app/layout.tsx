import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "react-hot-toast";
import "./globals.css";
import TopNavbar from "@/components/header/TopNavbar";

export const metadata: Metadata = {
  title: "BookBuddy",
  description: "BookBuddy - a digital library of your",
};
const inter = Inter({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased`}>
        <TopNavbar />
        <main>{children}</main>
        <Toaster />
      </body>
    </html>
  );
}
