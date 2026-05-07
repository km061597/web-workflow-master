import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "Canonical Next.js Site",
  description: "Production-ready Next.js 16 scaffold with Tailwind 4, shadcn/ui, and quality tooling.",
  metadataBase: new URL("https://example.com"),
  openGraph: {
    title: "Canonical Next.js Site",
    description: "Production-ready Next.js 16 scaffold with Tailwind 4, shadcn/ui, and quality tooling.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="antialiased">{children}</body>
    </html>
  );
}
