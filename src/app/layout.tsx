import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import type { ReactNode } from "react";
import { CustomCursor } from "@/components/motion/CustomCursor";
import { Intro } from "@/components/motion/Intro";
import { ScrollProgress } from "@/components/motion/ScrollProgress";
import { SmoothScroll } from "@/components/motion/SmoothScroll";
import { profile } from "@/data/profile";
import "./globals.css";

const geistSans = Geist({ subsets: ["latin"], variable: "--font-geist-sans", display: "swap" });
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono", display: "swap" });

const title = `${profile.name} — ${profile.role}`;
const description = `${profile.tagline} Estudante de ADS na Unifip, ${profile.location}.`;

export const metadata: Metadata = {
  metadataBase: new URL(profile.siteUrl),
  title: { default: title, template: `%s · ${profile.name}` },
  description,
  applicationName: profile.name,
  authors: [{ name: profile.name }],
  creator: profile.name,
  keywords: ["Artur Henrique", "desenvolvedor", "IA generativa", "chatbot", "landing page", "freelancer", "Paraíba"],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "/",
    siteName: profile.name,
    title,
    description,
  },
  twitter: { card: "summary_large_image", title, description },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#05070D",
  colorScheme: "dark",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body>
        <a
          href="#conteudo"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-blue-600 focus:px-4 focus:py-2 focus:text-sm focus:text-text"
        >
          Pular para o conteúdo
        </a>
        <Intro />
        <ScrollProgress />
        {profile.settings.customCursor ? <CustomCursor /> : null}
        <SmoothScroll>{children}</SmoothScroll>
        <div aria-hidden="true" className="noise" />
      </body>
    </html>
  );
}
