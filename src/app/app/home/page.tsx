"use client";

import { useState } from "react";
import KamiottoLogo from "@/components/kamiotto/KamiottoLogo";
import {
  BookOpen,
  MessageCircle,
  Settings,
  User,
  ChevronRight,
} from "lucide-react";

function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 10) return "おはようございます。";
  if (hour < 17) return "こんにちは。";
  return "おつかれさまです。";
}

function getFormattedDate(): string {
  const now = new Date();
  const month = now.getMonth() + 1;
  const day = now.getDate();
  const weekdays = ["日", "月", "火", "水", "木", "金", "土"];
  const weekday = weekdays[now.getDay()];
  return `${month}月${day}日（${weekday}）`;
}

const todayQuestion = "今日、パートナーに感謝を伝えましたか？";

const practices = [
  {
    id: 1,
    title: "朝の内側を整える時間",
    description: "今日、愛と感謝を源泉にして生きると決める",
    duration: "3分",
  },
  {
    id: 2,
    title: "インサイドアウトの実践",
    description: "パートナーを変えようとせず、まず自分の在り方を整える",
    duration: "1分",
  },
  {
    id: 3,
    title: "夜の静かなふりかえり",
    description: "今日の自分を受け止め、愛から生きられたかをふりかえる",
    duration: "5分",
  },
];

export default function KamiottoHomePage() {
  const [reflectionOpen, setReflectionOpen] = useState(false);
  const [reflectionText, setReflectionText] = useState("");

  return (
    <div className="min-h-screen pb-24" style={{ backgroundColor: "var(--ko-bg)" }}>
      <header className="flex items-center justify-between px-6 pt-8 pb-6" style={{ backgroundColor: "var(--ko-bg)" }}>
        <KamiottoLogo size={32} showWordmark={false} color="var(--ko-orange)" />
        <div className="flex items-center gap-4">
          <button aria-label="マイページ">
            <User size={20} strokeWidth={1.5} style={{ color: "var(--ko-ink-light)" }} />
          </button>
          <button aria-label="設定">
            <Settings size={20} strokeWidth={1.5} style={{ color: "var(--ko-ink-light)" }} />
          </button>
        </div>
      </header>

      <div className="px-6 space-y-8">
        <section className="ko-animate-fadeUp">
          <p className="mb-1" style={{ color: "var(--ko-ink-light)", fontSize: 12, letterSpacing: "0.1em" }}>
            {getFormattedDate()}
          </p>
          <h1
            style={{
              color: "var(--ko-orange)",
              fontSize: 22,
              fontFamily: '"Noto Serif JP", serif',
              fontWeight: 400,
              letterSpacing: "0.08em",
            }}
          >
            {getGreeting()}
          </h1>
          <p className="mt-3" style={{ color: "var(--ko-ink-light)", fontSize: 13, lineHeight: 1.9, letterSpacing: "0.03em" }}>
            今日も、内側から愛を生きる一日にしましょう。
          </p>
        </section>

        <section className="ko-animate-fadeUp ko-delay-1">
          <div className="rounded-2xl p-6" style={{ backgroundColor: "var(--ko-white)", border: "1px solid var(--ko-border)" }}>
            <p className="mb-4" style={{ color: "var(--ko-orange-light)", fontSize: 11, letterSpacing: "0.15em", fontWeight: 500 }}>
              TODAY&apos;S QUESTION
            </p>
            <p
              style={{
                color: "var(--ko-orange)",
                fontSize: 16,
                fontFamily: '"Noto Serif JP", serif',
                lineHeight: 1.9,
                fontWeight: 400,
              }}
            >
              {todayQuestion}
            </p>

            {!reflectionOpen ? (
              <button
                onClick={() => setReflectionOpen(true)}
                className="mt-5 w-full py-3 rounded-xl text-center transition-colors duration-200"
                style={{ backgroundColor: "var(--ko-bg-warm)", color: "var(--ko-orange)", fontSize: 13, letterSpacing: "0.08em" }}
              >
                ふりかえる
              </button>
            ) : (
              <div className="mt-5 ko-animate-fadeUp">
                <textarea
                  value={reflectionText}
                  onChange={(e) => setReflectionText(e.target.value)}
                  placeholder="感じたことを、そのまま書いてみてください。"
                  rows={4}
                  className="w-full rounded-xl p-4 resize-none focus:outline-none"
                  style={{
                    backgroundColor: "var(--ko-bg)",
                    border: "1px solid var(--ko-border)",
                    color: "var(--ko-ink)",
                    fontSize: 14,
                    lineHeight: 1.9,
                    fontFamily: '"Noto Sans JP", sans-serif',
                  }}
                />
                <button
                  className="mt-3 w-full py-3 rounded-xl text-center transition-colors duration-200"
                  style={{ backgroundColor: "var(--ko-orange)", color: "var(--ko-white)", fontSize: 13, letterSpacing: "0.08em" }}
                >
                  記録する
                </button>
              </div>
            )}
          </div>
        </section>

        <section className="ko-animate-fadeUp ko-delay-2">
          <h2
            className="mb-4"
            style={{
              color: "var(--ko-orange)",
              fontSize: 14,
              fontFamily: '"Noto Serif JP", serif',
              fontWeight: 400,
              letterSpacing: "0.1em",
            }}
          >
            今日のプラクティス
          </h2>
          <div className="space-y-3">
            {practices.map((p) => (
              <div
                key={p.id}
                className="rounded-2xl p-5 flex items-center justify-between cursor-pointer transition-colors duration-200 hover:bg-white"
                style={{ backgroundColor: "var(--ko-white)", border: "1px solid var(--ko-border)" }}
              >
                <div className="flex-1 min-w-0">
                  <p style={{ color: "var(--ko-orange)", fontSize: 15, fontWeight: 500, letterSpacing: "0.03em" }}>
                    {p.title}
                  </p>
                  <p className="mt-1" style={{ color: "var(--ko-ink-light)", fontSize: 12, lineHeight: 1.6 }}>
                    {p.description}
                  </p>
                </div>
                <div className="flex items-center gap-2 ml-4 shrink-0">
                  <span
                    className="rounded-full px-2.5 py-1"
                    style={{ backgroundColor: "var(--ko-bg-warm)", color: "var(--ko-ink-light)", fontSize: 11 }}
                  >
                    {p.duration}
                  </span>
                  <ChevronRight size={16} strokeWidth={1.5} style={{ color: "var(--ko-orange-light)" }} />
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="ko-animate-fadeUp ko-delay-3">
          <div className="rounded-2xl p-6 text-center" style={{ backgroundColor: "var(--ko-bg-warm)", border: "1px solid var(--ko-border)" }}>
            <p style={{ color: "var(--ko-ink-light)", fontSize: 11, letterSpacing: "0.15em", fontWeight: 500 }}>
              WEEKLY REFLECTION
            </p>
            <p
              className="mt-3"
              style={{
                color: "var(--ko-orange)",
                fontSize: 15,
                fontFamily: '"Noto Serif JP", serif',
                fontWeight: 400,
                lineHeight: 1.8,
              }}
            >
              今週、愛から生きられた瞬間をふりかえる
            </p>
            <button
              className="mt-4 px-6 py-2.5 rounded-xl transition-colors duration-200"
              style={{
                backgroundColor: "var(--ko-white)",
                color: "var(--ko-orange)",
                fontSize: 13,
                letterSpacing: "0.08em",
                border: "1px solid var(--ko-border)",
              }}
            >
              ふりかえりを開く
            </button>
          </div>
        </section>

        <section className="ko-animate-fadeUp ko-delay-4">
          <div className="text-center py-6">
            <p
              style={{
                color: "var(--ko-orange-light)",
                fontSize: 13,
                fontFamily: '"Noto Serif JP", serif',
                fontWeight: 300,
                letterSpacing: "0.08em",
                lineHeight: 2,
              }}
            >
              幸せは家庭から。
            </p>
          </div>
        </section>
      </div>

      <nav
        className="fixed bottom-0 left-0 right-0 flex items-center justify-around py-4 border-t"
        style={{ backgroundColor: "var(--ko-white)", borderColor: "var(--ko-border)" }}
      >
        {[
          { icon: <HomeIcon />, label: "ホーム", active: true },
          { icon: <BookOpen size={20} strokeWidth={1.3} />, label: "学び", active: false },
          { icon: <MessageCircle size={20} strokeWidth={1.3} />, label: "対話", active: false },
          { icon: <User size={20} strokeWidth={1.3} />, label: "マイページ", active: false },
        ].map((item) => (
          <button
            key={item.label}
            className="flex flex-col items-center gap-1"
            style={{ color: item.active ? "var(--ko-orange)" : "var(--ko-orange-light)" }}
          >
            {item.icon}
            <span style={{ fontSize: 10, letterSpacing: "0.05em" }}>{item.label}</span>
          </button>
        ))}
      </nav>
    </div>
  );
}

function HomeIcon() {
  return (
    <svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.3} strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  );
}
