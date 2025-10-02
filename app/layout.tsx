import type { Metadata } from "next";
import { Open_Sans, Pacifico } from "next/font/google";
import "./globals.css";

const openSans = Open_Sans({
  variable: "--font-open-sans",
  subsets: ["latin"],
});

const pacifico= Pacifico({
  weight: "400",   
  variable: "--font-pacifico",
  subsets: ["latin"],
});


export const metadata: Metadata = {
  title: "Storefront",
  description: "Your one stop store front",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${pacifico.variable} ${openSans.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
