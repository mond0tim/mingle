import type { Metadata, Viewport } from 'next';
import './globals.css';
import PlayerWrapper from '@/features/player/PlayerRoot';
import localFont from "next/font/local";
import NavigationMenu from '@/components/NavigationMenu/NavigationMenu';
import Preloader from '@/components/Preloader/Preloader';
import Providers from './providers';
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

export const viewport: Viewport = {
  themeColor: '#0c0312',
}

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});
const Oddval = localFont({
  src: "./fonts/FliegeMonoVF.woff2",
  variable: "--font-oddval",
});
const OddvalItalic = localFont({
  src: "./fonts/Oddval-SemiBoldItalic.woff",
  variable: "--font-oddval-italic",
});
const Raydis = localFont({
  src: "./fonts/RAYDIS.woff",
  variable: "--font-raydis",
});

export const metadata: Metadata = {
  title: 'mingle',
  description: 'Ваш музыкальный плеер',
  generator: "Next.js",
  manifest: "/manifest.json",
  openGraph: {
    images: 'https://mingle.ti-web.ru/preview.png',
    title: 'mingle',
  },
  twitter: {
    images: 'https://mingle.ti-web.ru/preview.png',
    title: 'mingle',
    card: "summary_large_image"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" className={cn("font-sans", geist.variable)} >
      <body className={`${geistSans.variable} ${Oddval.variable} ${Raydis.variable} ${OddvalItalic.variable} ${geistMono.variable} antialiased`}>
        <NavigationMenu />
        <Preloader />
        <Providers><PlayerWrapper>  {children}</PlayerWrapper></Providers>
      </body>
    </html>
  );
}