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
  title: 'Экскурсии по Москве с гидом Иветтой | ВДНХ, Музей Космонавтики, Пешие туры',
  description: 'Аккредитованный гид Иветта Красногорская. Индивидуальные и групповые экскурсии по Москве: ВДНХ, Центр Космонавтики, Новая Третьяковка. Русский, английский, итальянский языки. Бронируйте онлайн!',
  keywords: [
    'экскурсия космонавтики',
    'музей космонавтики экскурсии',
    'вднх космонавтики экскурсии',
    'экскурсии москва',
    'экскурсии для билингвов',
    'экскурсии для школьников',
    'экскурсии для школьников москва',
    'экскурсии для детей москва',
    'экскурсии для детей в москве',
    'экскурсии по Москве', 
    'экскурсии для подростков в москве',
    'экскурсия на итальянском',
    'экскурсия на английском',
    'Иветта Красногорская', 
    'экскурсия на ВДНХ', 
    'Музей Космонавтики экскурсия', 
    'пешие экскурсии Москва', 
    'индивидуальный гид Москва',
    'Moscow tour guide'
  ],
  openGraph: {
    title: 'Экскурсии по Москве с гидом Иветтой',
    description: 'Более 20 уникальных маршрутов по исторической Москве.',
    images: ['/hero-map.jpeg'],
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
