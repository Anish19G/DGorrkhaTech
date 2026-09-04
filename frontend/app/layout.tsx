import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  metadataBase: new URL("https://www.dgorkhatech.com"),
  title: {
    default: "DGorkhaTech — IT Consulting & Digital Transformation",
    template: "%s | DGorkhaTech",
  },
  description:
    "DGorkhaTech digitalizes businesses through IT consulting, custom software, web and mobile development, and data analytics.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
