import type { Metadata } from "next";
import { Noto_Sans_KR } from "next/font/google";
import "./globals.css";

const siteUrl = "https://gyeongan-church.vercel.app";

const notoSansKr = Noto_Sans_KR({
  variable: "--font-noto-sans-kr",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "부천 경안교회 | 예수교대한성결교회 | 고원영 목사",
  description:
    "경기도 부천시 소사구 괴안동에 위치한 예수교대한성결교회 경안교회입니다. 주일예배, 주일학교, 청소년부, 청년부, 말씀과 설교 영상을 안내합니다.",
  keywords: [
    "경안교회",
    "부천 경안교회",
    "괴안동 교회",
    "부천시 소사구 교회",
    "예수교대한성결교회 경안교회",
    "고원영 목사",
  ],
  alternates: {
    canonical: "/",
  },
  verification: {
    google: "36dXca0HM5rC8b9fGUDTibzThUYhcOid9_h6V1JwVEQ",
    other: {
      "naver-site-verification": "3e8a1bab649a58860a5cdfb772a0c3c3f68c1590",
    },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    title: "부천 경안교회 | 예수교대한성결교회",
    description:
      "경기도 부천시 소사구 괴안동에 위치한 예수교대한성결교회 경안교회입니다. 예배, 다음세대, 말씀과 설교 영상을 안내합니다.",
    url: siteUrl,
    siteName: "경안교회",
    images: [
      {
        url: "/hero-bg.jpg",
        width: 1200,
        height: 630,
        alt: "부천 경안교회 성전 모습",
      },
    ],
    locale: "ko_KR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "부천 경안교회 | 예수교대한성결교회",
    description:
      "경기도 부천시 소사구 괴안동에 위치한 예수교대한성결교회 경안교회입니다.",
    images: ["/hero-bg.jpg"],
  },
};

const churchStructuredData = {
  "@context": "https://schema.org",
  "@type": "Church",
  "@id": `${siteUrl}/#church`,
  name: "예수교대한성결교회 경안교회",
  alternateName: "부천 경안교회",
  url: siteUrl,
  image: `${siteUrl}/hero-bg.jpg`,
  telephone: "010-2074-0691",
  address: {
    "@type": "PostalAddress",
    streetAddress: "안곡로86번길 21",
    addressLocality: "부천시",
    addressRegion: "경기도",
    postalCode: "14689",
    addressCountry: "KR",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 37.477626,
    longitude: 126.8110717,
  },
  pastor: {
    "@type": "Person",
    name: "고원영",
  },
  sameAs: [
    "https://www.youtube.com/@%EA%B2%BD%EC%95%88%EA%B5%90%ED%9A%8C",
    "https://blog.naver.com/kwy1210",
    "https://tv.naver.com/kachurch",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className="scroll-smooth">
      <body
        className={`${notoSansKr.variable} bg-stone-50 font-sans text-stone-900 antialiased`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(churchStructuredData).replace(/</g, "\\u003c"),
          }}
        />
        {children}
      </body>
    </html>
  );
}
