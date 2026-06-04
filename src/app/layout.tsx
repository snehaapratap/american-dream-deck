import type { Metadata } from "next";
import { inter } from "@/styles/fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "American Dream | The Destination for Retail, Entertainment & Experience",
  description:
    "Discover American Dream — 3.5 million square feet of world-class retail, dining, and entertainment just 5 miles from Manhattan. 40M+ annual visitors. Infinite possibilities.",
  openGraph: {
    title: "American Dream | Interactive Sales Experience",
    description:
      "The ultimate destination for retail, entertainment, and brand experiences. Explore partnership opportunities.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} antialiased`}>
      <body className="min-h-screen bg-background text-foreground overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
