import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import { CompoundInterestProvider } from "./_context/CompoundInterestFormContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CompoundVision",
  description: "Explore the power of compound interest",
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
