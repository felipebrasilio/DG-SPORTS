import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@/components/analytics/analytics";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

import { generateMetadata } from '@/lib/meta-config';
import { generateSchema } from '@/lib/schema-config';

export const metadata = generateMetadata('/');

export function generateViewport() {
  return {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5,
    userScalable: true,
  };
}


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <head>
        <link rel="canonical" href="https://dgsports.com" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="theme-color" content="#0070f3" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/icon-192x192.png" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="DG Sports" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="msapplication-TileColor" content="#0070f3" />
        <meta name="msapplication-tap-highlight" content="no" />
        <meta name="msapplication-config" content="/browserconfig.xml" />
        <meta property="og:locale" content="pt_BR" />
        <meta property="og:site_name" content="DG Sports Management" />
        <meta name="twitter:site" content="@dgsports" />
        <meta name="twitter:creator" content="@dgsports" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="robots" content="max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
        <meta name="google-site-verification" content="google-site-verification-code" />
        <link rel="alternate" hrefLang="pt-BR" href="https://dgsports.com" />
        <link rel="alternate" hrefLang="en-US" href="https://dgsports.com/en" />
        <link rel="alternate" hrefLang="x-default" href="https://dgsports.com" />
        <meta name="application-name" content="DG Sports Management" />
        <meta name="apple-mobile-web-app-title" content="DG Sports Management" />
        <meta name="msapplication-starturl" content="/" />
        <meta name="next-head-count" content="30" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: generateSchema('/') }} />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <Analytics />
      </body>
    </html>
  );
}