import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "레버리지 연구소 | TQQQ·SOXL 3배 레버리지 실시간 데이터 분석",
    template: "%s | 레버리지 연구소",
  },
  description:
    "매일 업데이트되는 TQQQ, SOXL, 나스닥 선물(NQ) 피봇 분석, 3배 레버리지 수급 데이터, 미국 경제지표 캘린더. AI 기반 실시간 시장 분석 리서치 포털.",
  keywords: [
    "TQQQ", "SOXL", "3배 레버리지", "나스닥 선물", "NQ 피봇",
    "미국주식", "레버리지 ETF", "나스닥100", "TQQQ 분석", "SOXL 타점",
    "레버리지 연구소", "미국 경제지표", "나스닥 마감",
  ],
  openGraph: {
    title: "레버리지 연구소 — TQQQ·SOXL 3배 레버리지 데이터 포털",
    description: "매일 자동 업데이트되는 실시간 3배 레버리지 분석 리서치",
    type: "website",
    locale: "ko_KR",
    siteName: "레버리지 연구소",
  },
  robots: { index: true, follow: true },
  alternates: { canonical: "https://leverage-lab.vercel.app" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko" className="dark">
      <head>
        {/* Google AdSense */}
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXX"
          crossOrigin="anonymous"
        />
        {/* Google Analytics */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX" />
      </head>
      <body className={`${inter.className} bg-gray-950 text-gray-100 antialiased`}>
        <nav className="sticky top-0 z-50 border-b border-gray-800/50 bg-gray-950/80 backdrop-blur-xl">
          <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
            <a href="/" className="flex items-center gap-2">
              <span className="text-2xl">🔬</span>
              <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-xl font-bold text-transparent">
                레버리지 연구소
              </span>
            </a>
            <div className="flex items-center gap-6 text-sm text-gray-400">
              <a href="/" className="transition hover:text-white">홈</a>
              <a href="/daily" className="transition hover:text-white">일일 분석</a>
              <a href="/pivot" className="transition hover:text-white">피봇 자리표</a>
              <a href="/calendar" className="transition hover:text-white">경제 캘린더</a>
              <a
                href="https://t.me/NasdaqLabAlimBot"
                target="_blank"
                className="rounded-full bg-emerald-500/10 px-4 py-1.5 text-emerald-400 ring-1 ring-emerald-500/30 transition hover:bg-emerald-500/20"
              >
                📲 텔레그램
              </a>
            </div>
          </div>
        </nav>
        <main className="mx-auto max-w-6xl px-4 py-8">{children}</main>
        <footer className="border-t border-gray-800/50 py-12 text-center text-sm text-gray-500">
          <div className="mx-auto max-w-4xl space-y-4">
            <div className="flex items-center justify-center gap-6">
              <a href="https://cafe.naver.com/pinkqoure" target="_blank" className="transition hover:text-white">
                네이버 카페
              </a>
              <a href="https://t.me/NasdaqLabAlimBot" target="_blank" className="transition hover:text-white">
                텔레그램
              </a>
              <a href="https://kmong.com/gig/756291" target="_blank" className="transition hover:text-white">
                크몽 서비스
              </a>
            </div>
            <p>
              본 사이트는 공개된 시장 데이터를 기반으로 작성된 정보 제공 목적의 리서치이며,
              투자 자문이 아닙니다. 모든 투자의 최종 판단과 책임은 투자자 본인에게 있습니다.
            </p>
            <p>© {new Date().getFullYear()} 레버리지 연구소. All rights reserved.</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
