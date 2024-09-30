import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import { CompoundInterestProvider } from "./_context/CompoundInterestFormContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CompoundVision",
  description: "Explore the power of compound interest.",
  openGraph: {
    title: "CompoundVision",
    description: "Explore the power of compound interest.",
    url: "https://compound-interest.com",
    siteName: "CompoundVision",
    images: [
      {
        url: "https://compound-interest.com/api/meta/opengraph/image",
        width: 1200,
        height: 627,
        alt: "CompoundVision logo",
      },
    ],
    locale: "en",
    type: "website",
  },
  metadataBase: new URL("https://compound-interest.com"),
  creator: "Philip Andersson",
  keywords: [
    "finance",
    "graph",
    "compound interest",
    "react",
    "next.js",
    "tech",
  ],
  generator: "Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="overflow-x-hidden">
          <CompoundInterestProvider>{children}</CompoundInterestProvider>
        </div>
      </body>
    </html>
  );
}
