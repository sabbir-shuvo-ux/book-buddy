import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Toaster } from "react-hot-toast";

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
        <header>
          <Button asChild>
            <Link href={"/"}>Home</Link>
          </Button>
        </header>
        <main>{children}</main>
        <Toaster />
      </body>
    </html>
  );
}
