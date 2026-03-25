import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ЭкскурсГид — Авторские экскурсии по городу и окрестностям",
  description: "Откройте для себя удивительные места с опытным гидом. Авторские экскурсии по городу, природе и гастрономические туры. Более 500 довольных гостей за 5 лет работы.",
  keywords: ["экскурсии", "гид", "туры", "путешествия", "экскурсии по городу", "природные туры", "гастрономические туры", "индивидуальные экскурсии"],
  authors: [{ name: "ЭкскурсГид" }],
  icons: {
    icon: "https://z-cdn.chatglm.cn/z-ai/static/logo.svg",
  },
  openGraph: {
    title: "ЭкскурсГид — Авторские экскурсии",
    description: "Откройте для себя удивительные места с опытным гидом",
    url: "https://excursions.ru",
    siteName: "ЭкскурсГид",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ЭкскурсГид — Авторские экскурсии",
    description: "Откройте для себя удивительные места с опытным гидом",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
