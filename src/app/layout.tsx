import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { HeaderComponent } from "@/components/component/header-component";
import { FooterComponent } from "@/components/component/footer-component";

const inter = Inter({ subsets: [ "latin" ] });

export const metadata: Metadata = {
  title: "Mocking Bird",
  icons: "./favicon.ico",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <HeaderComponent/>
        {children}
        <FooterComponent/>
      </body>
    </html>
  );
}
