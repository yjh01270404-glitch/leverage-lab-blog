import { getAllPosts, BlogPost } from "@/lib/blog-posts";
import Link from "next/link";

export default function HomePage() {
  const posts = getAllPosts();
  const latest = posts[0];
  const rest = posts.slice(1);

  return (
    <div className="space-y-12">
      {/* Hero */}
      <section className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-8 md:p-12">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZyIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48Y2lyY2xlIGN4PSIyMCIgY3k9IjIwIiByPSIxIiBmaWxsPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMDUpIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCBmaWxsPSJ1cmwoI2cpIiB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIi8+PC9zdmc+')] opacity-50" />
        <div className="relative z-10">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-emerald-500/10 px-4 py-1.5 text-sm text-emerald-400 ring-1 ring-emerald-500/30">
            <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
            매일 자동 업데이트
          </div>
          <h1 className="mb-4 text-4xl font-bold leading-tight md:text-5xl">
            <span className="gradient-text">TQQQ · SOXL</span>
            <br />
            3배 레버리지 데이터 포털
          </h1>
          <p className="mb-8 max-w-2xl text-lg text-gray-400">
            AI가 매일 분석하는 나스닥 3배 레버리지 ETF 실시간 수급, 피봇 자리표, 미국 경제지표 캘린더.
            데이터 기반 원칙 매매의 시작.
          </p>
          <div className="flex flex-wrap gap-4">
            <a href="https://t.me/NasdaqLabAlimBot" target="_blank"
               className="rounded-xl bg-emerald-500 px-6 py-3 font-semibold text-white transition hover:bg-emerald-600 hover:shadow-lg hover:shadow-emerald-500/20">
              📲 텔레그램 알림 받기
            </a>
            <a href="https://cafe.naver.com/pinkqoure" target="_blank"
               className="rounded-xl bg-white/5 px-6 py-3 font-semibold text-white ring-1 ring-white/10 transition hover:bg-white/10">
              네이버 카페 바로가기 →
            </a>
          </div>
        </div>
      </section>

      {/* Latest Post Feature */}
      {latest && (
        <section>
          <h2 className="mb-6 text-2xl font-bold">📊 최신 분석</h2>
          <Link href={`/blog/${latest.slug}`} className="block">
            <article className="glass-card p-6 md:p-8">
              <div className="mb-3 flex flex-wrap items-center gap-3">
                <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-400 ring-1 ring-emerald-500/30">
                  {latest.category === "daily" ? "일일 분석" : latest.category === "pivot" ? "피봇 자리표" : latest.category === "calendar" ? "경제 캘린더" : "가이드"}
                </span>
                <span className="text-sm text-gray-500">{latest.date}</span>
                {latest.tqqq && (
                  <span className={`text-sm font-bold ${latest.tqqq.pct >= 0 ? "text-emerald-400" : "text-red-400"}`}>
                    TQQQ {latest.tqqq.pct >= 0 ? "+" : ""}{latest.tqqq.pct.toFixed(1)}%
                  </span>
                )}
                {latest.soxl && (
                  <span className={`text-sm font-bold ${latest.soxl.pct >= 0 ? "text-emerald-400" : "text-red-400"}`}>
                    SOXL {latest.soxl.pct >= 0 ? "+" : ""}{latest.soxl.pct.toFixed(1)}%
                  </span>
                )}
              </div>
              <h3 className="mb-2 text-xl font-bold text-white transition group-hover:text-emerald-400 md:text-2xl">
                {latest.title}
              </h3>
              <p className="text-gray-400">{latest.description}</p>
            </article>
          </Link>
        </section>
      )}

      {/* Post Grid */}
      {rest.length > 0 && (
        <section>
          <h2 className="mb-6 text-2xl font-bold">📚 리서치 아카이브</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {rest.map((post) => (
              <Link href={`/blog/${post.slug}`} key={post.slug} className="block">
                <article className="glass-card h-full p-6 transition">
                  <div className="mb-3 flex items-center gap-2">
                    <span className="rounded bg-gray-800 px-2 py-0.5 text-xs text-gray-400">
                      {post.category === "daily" ? "일일" : post.category === "pivot" ? "피봇" : post.category === "calendar" ? "캘린더" : "가이드"}
                    </span>
                    <span className="text-xs text-gray-500">{post.date}</span>
                  </div>
                  <h3 className="mb-2 line-clamp-2 font-bold text-white">{post.title}</h3>
                  <p className="line-clamp-2 text-sm text-gray-500">{post.description}</p>
                </article>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* CTA Banner */}
      <section className="rounded-2xl bg-gradient-to-r from-emerald-900/30 to-cyan-900/30 p-8 text-center ring-1 ring-emerald-500/20">
        <h2 className="mb-3 text-2xl font-bold">💎 레버리지 연구소 프리미엄</h2>
        <p className="mb-6 text-gray-400">
          실시간 피봇 알림, VIP 리서치, AI 시그널을 텔레그램에서 받아보세요.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <a href="https://t.me/NasdaqLabAlimBot" target="_blank"
             className="rounded-xl bg-emerald-500 px-6 py-3 font-semibold text-white transition hover:bg-emerald-600">
            📲 무료 채널 입장
          </a>
          <a href={`https://link.coupang.com/re/AFFSRP?lptag=AF2398041&pageKey=0&q=%EB%AF%B8%EA%B5%AD%EC%A3%BC%EC%8B%9D+%ED%88%AC%EC%9E%90`} target="_blank"
             className="rounded-xl bg-white/5 px-6 py-3 font-semibold text-white ring-1 ring-white/10 transition hover:bg-white/10">
            📚 추천 도서 보기
          </a>
          <a href="https://kmong.com/gig/756291" target="_blank"
             className="rounded-xl bg-white/5 px-6 py-3 font-semibold text-white ring-1 ring-white/10 transition hover:bg-white/10">
            ⚡ 자동화 서비스
          </a>
        </div>
      </section>
    </div>
  );
}
