import type { Metadata } from "next";
import { Noto_Sans_KR } from "next/font/google";
import "./globals.css";

const notoSansKr = Noto_Sans_KR({
  variable: "--font-noto-sans-kr",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "예수교대한성결교회 경안교회",
  description: "하나님의 은혜와 사랑이 가득한 경안교회에 오신 것을 환영합니다. (부천시 안곡로 86번길 21 / 담임목사 고원영)",
  keywords: ["경안교회", "부천 경안교회", "예수교대한성결교회 경안교회", "고원영 목사", "부천 교회", "괴안동 교회"],
  openGraph: {
    title: "예수교대한성결교회 경안교회",
    description: "하나님의 은혜와 사랑이 가득한 경안교회에 오신 것을 환영합니다.",
    url: "https://gyeongan-church.vercel.app",
    siteName: "경안교회",
    images: [
      {
        url: "/hero-bg.jpg",
        width: 1200,
        height: 630,
        alt: "경안교회 성전 모습",
      },
    ],
    locale: "ko_KR",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className="scroll-smooth">
      <body className={`${notoSansKr.variable} font-sans antialiased bg-stone-50 text-stone-900`}>
        {children}
      </body>
    </html>
  );
}
