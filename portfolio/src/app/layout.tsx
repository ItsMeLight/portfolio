import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "Christian I. Asuncion | Software & System Developer",
  description:
    "Portfolio of Christian I. Asuncion — Information Technology graduate, aspiring software developer, mobile developer, and system developer.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="font-sans bg-bg text-white antialiased">{children}</body>
    </html>
  );
}
