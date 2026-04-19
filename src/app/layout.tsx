import type { Metadata, Viewport } from 'next';
import './globals.css';
import './auth.css';
import GlobalUIWrapper from '@/components/GlobalUIWrapper/GlobalUIWrapper';
import Preloader from '@/components/Preloader/Preloader';
import Providers from './providers';
import { Geist } from "next/font/google";
import localFont from "next/font/local";
import { cn } from "@/lib/utils";

const geist = Geist({ subsets: ['latin'], variable: '--font-sans' });

export const viewport: Viewport = {
  themeColor: '#0c0312',
}
// nonBureau
// const Oddval = localFont({
//   src: [
//     { path: "./fonts/NonBureau/NonBureau-Thin.woff2", weight: "100", style: "normal" },
//     { path: "./fonts/NonBureau/NonBureau-ThinItalic.woff2", weight: "100", style: "italic" },
//     { path: "./fonts/NonBureau/NonBureau-Light.woff2", weight: "300", style: "normal" },
//     { path: "./fonts/NonBureau/NonBureau-LightItalic.woff2", weight: "300", style: "italic" },
//     { path: "./fonts/NonBureau/NonBureau-Regular.woff2", weight: "400", style: "normal" },
//     { path: "./fonts/NonBureau/NonBureau-RegularItalic.woff2", weight: "400", style: "italic" },
//     { path: "./fonts/NonBureau/NonBureau-Medium.woff2", weight: "500", style: "normal" },
//     { path: "./fonts/NonBureau/NonBureau-MediumItalic.woff2", weight: "500", style: "italic" },
//     { path: "./fonts/NonBureau/NonBureau-SemiBold.woff2", weight: "600", style: "normal" },
//     { path: "./fonts/NonBureau/NonBureau-SemiBoldItalic.woff2", weight: "600", style: "italic" },
//     { path: "./fonts/NonBureau/NonBureau-Bold.woff2", weight: "700", style: "normal" },
//     { path: "./fonts/NonBureau/NonBureau-BoldItalic.woff2", weight: "700", style: "italic" },
//     { path: "./fonts/NonBureau/NonBureau-Black.woff2", weight: "900", style: "normal" },
//     { path: "./fonts/NonBureau/NonBureau-BlackItalic.woff2", weight: "900", style: "italic" },
//   ],
//   variable: "--font-oddval",
//   // variable: "--font-non-bureau",
// });

const Oddval = localFont({
  src: [
    { path: "./fonts/Neue-Regrade-Variable.woff2", weight: "100 900", style: "normal" },
  ],
  variable: "--font-oddval",
});

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
// const Oddval = localFont({
//   src: "./fonts/FliegeMonoVF.woff2",
//   variable: "--font-oddval",
// });
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
        <Providers>
          <GlobalUIWrapper>{children}</GlobalUIWrapper>
        </Providers>
      </body>
    </html>
  );
}