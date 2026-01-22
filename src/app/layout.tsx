import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Oluwaferanmi Adeniji - Senior Software Engineer",
  description: "Senior Software Engineer with 7+ years of fintech experience. Specialized in micro-frontend architectures and high-scale systems.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <link rel="icon" type="image/png" href="/feranmi.png" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Oluwaferanmi Adeniji - Senior Software Engineer</title>

        {/* <!-- PWA Manifest --> */}
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#3b82f6" />

        {/* <!-- SEO Meta Tags --> */}
        <meta
          name="description"
          content="Senior Software Engineer with 7+ years of fintech experience. Specialized in micro-frontend architectures and high-scale systems."
        />
        <meta
          name="keywords"
          content="Software Engineer, Frontend Developer, React, TypeScript, Fintech, Micro-frontends, Performance Engineering"
        />
        <meta name="author" content="Oluwaferanmi Adeniji" />

        {/* <!-- Open Graph Tags --> */}
        <meta
          property="og:title"
          content="Oluwaferanmi Adeniji - Senior Software Engineer"
        />
        <meta
          property="og:description"
          content="Senior Software Engineer with 7+ years of fintech experience. Specialized in micro-frontend architectures and high-scale systems."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://devferanmi.xyz" />

        {/* <!-- Twitter Card Tags --> */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Oluwaferanmi Adeniji - Senior Software Engineer"
        />
        <meta
          name="twitter:description"
          content="Senior Software Engineer with 7+ years of fintech experience. Specialized in micro-frontend architectures and high-scale systems."
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
