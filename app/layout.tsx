import type { Metadata } from "next";
import { Inter, Noto_Naskh_Arabic } from "next/font/google";

import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const notoNaskhArabic = Noto_Naskh_Arabic({
  subsets: ["arabic"],
  variable: "--font-noto-naskh-arabic",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "AMIS FCT",
  description: "AMIS FCT website rebuild foundation and admin platform.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${notoNaskhArabic.variable}`}>{children}</body>
    </html>
  );
}
