import type { Metadata } from "next";
import { Inter, Noto_Sans_Bengali } from "next/font/google";
import { Galada } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const notoSansBengali = Noto_Sans_Bengali({
  variable: "--font-noto-sans-bengali",
  subsets: ["bengali"],
  weight: ["400", "500", "600", "700"],
});

const galada = Galada({
  variable: "--font-galada",
  subsets: ["bengali"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "News Photo Card Dashboard",
  description: "Create professional news photo cards with branded elements",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${notoSansBengali.variable} ${galada.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
