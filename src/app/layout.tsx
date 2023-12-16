import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { PanwasDataProvider } from "@/context/DataContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Portal Panwaslu Kecamatan Prigen",
  description:
    "Portal Panwaslu Kecamatan Prigen menunjang kegiatan pengawasan seperti generate form A dan lain-lain.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <PanwasDataProvider>{children}</PanwasDataProvider>
      </body>
    </html>
  );
}
