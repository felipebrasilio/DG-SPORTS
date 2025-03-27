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
  title: "DG Sports Management | Gestão de Atletas e Contratos Esportivos",
  description: "Plataforma completa para gestão de atletas, contratos, finanças e análise de desempenho esportivo. Maximize o potencial da sua carreira esportiva.",
  keywords: "gestão de atletas, contratos esportivos, análise de desempenho, finanças esportivas, carreira esportiva",
  authors: [{ name: "DG Sports" }],
  creator: "DG Sports Management",
  publisher: "DG Sports Management",
  openGraph: {
    title: "DG Sports Management | Gestão de Atletas e Contratos Esportivos",
    description: "Plataforma completa para gestão de atletas, contratos, finanças e análise de desempenho esportivo.",
    url: "https://dgsports.com",
    siteName: "DG Sports Management",
    images: [
      {
        url: "/LOGODG.jpg",
        width: 800,
        height: 600,
        alt: "DG Sports Management Logo",
      },
    ],
    locale: "pt-BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "DG Sports Management | Gestão de Atletas e Contratos Esportivos",
    description: "Plataforma completa para gestão de atletas, contratos, finanças e análise de desempenho esportivo.",
    images: ["/LOGODG.jpg"],
    creator: "@dgsports",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: "google-site-verification-code",
  },
  alternates: {
    canonical: "https://dgsports.com",
    languages: {
      'pt-BR': "https://dgsports.com",
      'en-US': "https://dgsports.com/en",
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}