import { getAllPosts, getPostBySlug } from "@/lib/blog-posts";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

export async function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.description,
    keywords: post.tags,
    openGraph: { title: post.title, description: post.description, type: "article" },
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  return (
    <article className="mx-auto max-w-3xl">
      {/* Header */}
      <header className="mb-8">
        <div className="mb-4 flex flex-wrap items-center gap-3">
          <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-400 ring-1 ring-emerald-500/30">
            {post.category === "daily" ? "일일 분석" : post.category === "pivot" ? "피봇 자리표" : post.category === "calendar" ? "경제 캘린더" : "가이드"}
          </span>
          <time className="text-sm text-gray-500">{post.date}</time>
        </div>
        <h1 className="mb-4 text-3xl font-bold leading-tight md:text-4xl">{post.title}</h1>
        <p className="text-lg text-gray-400">{post.description}</p>

        {/* Ticker Bar */}
        {(post.tqqq || post.soxl) && (
          <div className="mt-6 flex gap-4 rounded-xl bg-gray-900/50 p-4 ring-1 ring-gray-800">
            {post.tqqq && (
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-400">TQQQ</span>
                <span className="font-bold text-white">${post.tqqq.price.toFixed(2)}</span>
                <span className={`text-sm font-bold ${post.tqqq.pct >= 0 ? "text-emerald-400" : "text-red-400"}`}>
                  {post.tqqq.pct >= 0 ? "▲" : "▼"} {Math.abs(post.tqqq.pct).toFixed(1)}%
                </span>
              </div>
            )}
            {post.soxl && (
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-400">SOXL</span>
                <span className="font-bold text-white">${post.soxl.price.toFixed(2)}</span>
                <span className={`text-sm font-bold ${post.soxl.pct >= 0 ? "text-emerald-400" : "text-red-400"}`}>
                  {post.soxl.pct >= 0 ? "▲" : "▼"} {Math.abs(post.soxl.pct).toFixed(1)}%
                </span>
              </div>
            )}
          </div>
        )}
      </header>

      {/* Content */}
      <div
        className="prose prose-invert prose-emerald max-w-none prose-headings:text-white prose-h2:text-2xl prose-h3:text-xl prose-p:text-gray-300 prose-strong:text-white prose-a:text-emerald-400 prose-table:text-sm prose-th:bg-gray-800 prose-th:p-3 prose-td:border-gray-800 prose-td:p-3"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />

      {/* Tags */}
      <div className="mt-8 flex flex-wrap gap-2">
        {post.tags.map((tag) => (
          <span key={tag} className="rounded-full bg-gray-800 px-3 py-1 text-xs text-gray-400">
            #{tag}
          </span>
        ))}
      </div>

      {/* CTA */}
      <div className="mt-12 rounded-2xl bg-gradient-to-r from-emerald-900/30 to-cyan-900/30 p-8 ring-1 ring-emerald-500/20">
        <h3 className="mb-3 text-xl font-bold">💎 레버리지 연구소 프리미엄 투자 생태계</h3>
        <div className="space-y-2 text-gray-400">
          <p>📲 <a href="https://t.me/NasdaqLabAlimBot" target="_blank" className="text-emerald-400 underline">실시간 텔레그램</a> — 무료 시황 & VIP 시그널 채널</p>
          <p>📚 <a href={`https://link.coupang.com/re/AFFSRP?lptag=AF2398041&pageKey=0&q=%EB%AF%B8%EA%B5%AD%EC%A3%BC%EC%8B%9D+%ED%88%AC%EC%9E%90`} target="_blank" className="text-emerald-400 underline">추천 도서</a> — 3배 레버리지 완전정복</p>
          <p>⚡ <a href="https://kmong.com/gig/756291" target="_blank" className="text-emerald-400 underline">크몽 서비스</a> — 네이버 카페 AI 자동화 & 퀀트 분석기 맞춤 제작</p>
        </div>
      </div>

      {/* Legal */}
      <div className="mt-8 rounded-xl bg-gray-900/50 p-6 text-xs text-gray-500 ring-1 ring-gray-800">
        <p className="font-bold">⚖️ 법적 면책 고지</p>
        <p className="mt-2">본 자료는 공개된 시장 데이터를 기반으로 작성된 단순 정보 제공 목적의 리서치이며, 매수·매도 추천이나 자문·리딩이 아닙니다.
        3배 레버리지 상품은 원금 손실 위험이 매우 높으므로 철저한 분할 매매와 손절 원칙을 지켜야 합니다.
        모든 금융 투자의 최종 판단과 결과에 대한 법적 책임은 전적으로 투자자 본인에게 있습니다.</p>
      </div>
    </article>
  );
}
