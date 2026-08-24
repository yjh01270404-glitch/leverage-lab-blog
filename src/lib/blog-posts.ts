/**
 * 블로그 포스트 데이터 관리 모듈
 * - /content/posts/ 디렉토리의 JSON 파일을 읽어 블로그 글 목록 생성
 * - 정적 사이트 생성(SSG) 최적화
 */
import fs from "fs";
import path from "path";

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;         // YYYY-MM-DD
  category: "daily" | "pivot" | "calendar" | "guide";
  tags: string[];
  content: string;      // HTML or Markdown string
  tqqq?: { price: number; pct: number };
  soxl?: { price: number; pct: number };
}

const POSTS_DIR = path.join(process.cwd(), "content", "posts");

/** 모든 포스트 목록 (최신순) */
export function getAllPosts(): BlogPost[] {
  if (!fs.existsSync(POSTS_DIR)) return getSamplePosts();

  const files = fs.readdirSync(POSTS_DIR).filter((f) => f.endsWith(".json"));
  const posts: BlogPost[] = files.map((file) => {
    const raw = fs.readFileSync(path.join(POSTS_DIR, file), "utf-8");
    return JSON.parse(raw) as BlogPost;
  });

  return posts.sort((a, b) => b.date.localeCompare(a.date));
}

/** 슬러그로 특정 포스트 조회 */
export function getPostBySlug(slug: string): BlogPost | undefined {
  const posts = getAllPosts();
  return posts.find((p) => p.slug === slug);
}

/** 카테고리별 필터 */
export function getPostsByCategory(category: BlogPost["category"]): BlogPost[] {
  return getAllPosts().filter((p) => p.category === category);
}

/** 초기 샘플 포스트 (content/ 디렉토리 없을 때 사용) */
function getSamplePosts(): BlogPost[] {
  const today = new Date();
  const dateStr = today.toISOString().split("T")[0];
  const weekdays = ["일", "월", "화", "수", "목", "금", "토"];
  const wd = weekdays[today.getDay()];

  return [
    {
      slug: `${dateStr}-tqqq-soxl-daily`,
      title: `⚡ [${dateStr} ${wd}] TQQQ & SOXL 3배 레버리지 마감 결산 & 반도체 수급 분석`,
      description: `${dateStr} 뉴욕 증시 마감 기준 TQQQ, SOXL 실시간 수급 동향 및 변동성 팩트 결산 리포트`,
      date: dateStr,
      category: "daily",
      tags: ["TQQQ", "SOXL", "3배레버리지", "나스닥", "마감결산"],
      content: generateDailyContent(dateStr, wd),
      tqqq: { price: 82.45, pct: 2.3 },
      soxl: { price: 34.12, pct: 3.1 },
    },
    {
      slug: `${dateStr}-tqqq-pivot-table`,
      title: `🎯 [${dateStr} ${wd}] 오늘 밤 TQQQ & SOXL 실전 피봇 진입·손절 자리표`,
      description: `TQQQ 피봇 지지·저항 레벨 및 분할 매수 가이드. 오늘 밤 본장 대응 자리표.`,
      date: dateStr,
      category: "pivot",
      tags: ["TQQQ타점", "SOXL피봇", "레버리지자리표", "분할매수"],
      content: generatePivotContent(dateStr, wd),
      tqqq: { price: 82.45, pct: 2.3 },
      soxl: { price: 34.12, pct: 3.1 },
    },
    {
      slug: "tqqq-leverage-guide-beginners",
      title: "📚 TQQQ 3배 레버리지 완전 가이드 — 초보자가 반드시 알아야 할 7가지",
      description: "TQQQ란 무엇인가? 음의 복리, 분할 매수, 리밸런싱까지 3배 레버리지 ETF 초보 가이드.",
      date: "2026-08-20",
      category: "guide",
      tags: ["TQQQ", "레버리지ETF", "초보가이드", "음의복리", "분할매수"],
      content: generateGuideContent(),
    },
  ];
}

function generateDailyContent(date: string, wd: string): string {
  return `
<h2>📊 ${date}(${wd}) TQQQ & SOXL 3배 레버리지 마감 결산</h2>

<p>안녕하세요! 미국 3배 레버리지 ETF 전문 리서치 <strong>레버리지 연구소</strong>입니다.</p>

<h3>📌 오늘 아침 3X 레버리지 핵심 3줄 요약</h3>
<ol>
<li>TQQQ는 전일 대비 <strong class="text-emerald-400">+2.3%</strong> (종가 $82.45)를 기록하며 나스닥 3배 수급을 반영했습니다.</li>
<li>SOXL은 전일 대비 <strong class="text-emerald-400">+3.1%</strong> (종가 $34.12)를 기록하며 반도체 3배 변동성을 나타냈습니다.</li>
<li>현재 레버리지 변동성 구간에서는 분할 매수 및 익절 기준 준수가 요구됩니다.</li>
</ol>

<h3>■ 3배 레버리지 핵심 종목 현황표</h3>
<table>
<thead><tr><th>종목</th><th>종가</th><th>등락률</th><th>추종 지수</th></tr></thead>
<tbody>
<tr><td>TQQQ</td><td>$82.45</td><td class="text-emerald-400">+2.3%</td><td>나스닥100 3X</td></tr>
<tr><td>SOXL</td><td>$34.12</td><td class="text-emerald-400">+3.1%</td><td>반도체 3X</td></tr>
</tbody>
</table>

<h3>💡 3X 레버리지 실전 매매 3대 원칙</h3>
<ol>
<li><strong>단기 변동성 음의 복리(Decay) 주의</strong>: 횡보장에서는 레버리지 상품의 가치가 하락합니다.</li>
<li><strong>철저한 분할 매수</strong>: 최소 3~10회 분할하여 평균 단가를 낮추세요.</li>
<li><strong>목표 수익률 도달 시 분할 익절</strong>: +10%, +20% 구간마다 수익을 확정하세요.</li>
</ol>
  `;
}

function generatePivotContent(date: string, wd: string): string {
  return `
<h2>🎯 ${date}(${wd}) TQQQ 실시간 피봇 레벨 가이드</h2>

<p>오늘 밤 미국 본장 개장을 앞두고 TQQQ 피봇 대응 자리표를 공유합니다.</p>

<h3>📌 TQQQ 피봇 레벨 (기준가: $82.45)</h3>
<table>
<thead><tr><th>레벨</th><th>가격</th><th>대응 전략</th></tr></thead>
<tbody>
<tr><td>R2 (2차 저항)</td><td>$86.98</td><td>단기 과열 — 분할 익절 필수</td></tr>
<tr><td>R1 (1차 저항)</td><td>$84.51</td><td>돌파 테스트 — 비중 50% 익절</td></tr>
<tr><td>P (피봇 중심)</td><td>$82.45</td><td>⭐ 상승/하락 분기점</td></tr>
<tr><td>S1 (1차 지지)</td><td>$80.39</td><td>눌림목 1차 분할 매수</td></tr>
<tr><td>S2 (2차 지지)</td><td>$77.92</td><td>최종 마지노선 — 손절</td></tr>
</tbody>
</table>
  `;
}

function generateGuideContent(): string {
  return `
<h2>📚 TQQQ 3배 레버리지란?</h2>

<p>TQQQ(ProShares UltraPro QQQ)는 나스닥100 지수의 <strong>일일 수익률을 3배</strong>로 추종하는 레버리지 ETF입니다.</p>

<h3>1. 음의 복리(Volatility Decay)란?</h3>
<p>횡보장에서 지수가 원래 자리로 돌아와도 레버리지 상품은 손실을 기록합니다. 이것이 '음의 복리'입니다.</p>

<h3>2. 분할 매수의 중요성</h3>
<p>한 번에 전액 매수하지 않고, 3~10회 분할하여 평균 단가를 낮추는 것이 핵심입니다.</p>

<h3>3. 손절 원칙</h3>
<p>-10% 이상 손실 시 반드시 손절하고 재진입 타이밍을 기다리세요.</p>
  `;
}
