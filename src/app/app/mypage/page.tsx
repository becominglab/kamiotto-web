"use client";

import { useState, useEffect } from "react";
import KamiottoLogo from "@/components/kamiotto/KamiottoLogo";
import BottomNav from "@/components/kamiotto/BottomNav";
import { ChevronRight, Flame, BookOpen, MessageCircle, Calendar } from "lucide-react";
import { getStats, loadReflections, loadPracticeRecords, loadWeeklyEntries } from "@/lib/storage";
import type { ReflectionEntry, PracticeRecord, WeeklyEntry } from "@/lib/storage";

export default function MyPage() {
  const [stats, setStats] = useState({ totalReflections: 0, totalPractices: 0, totalWeekly: 0, totalDays: 0, streak: 0 });
  const [reflections, setReflections] = useState<ReflectionEntry[]>([]);
  const [practiceRecords, setPracticeRecords] = useState<PracticeRecord[]>([]);
  const [weeklyEntries, setWeeklyEntries] = useState<WeeklyEntry[]>([]);
  const [tab, setTab] = useState<"reflections" | "practices" | "weekly">("reflections");

  useEffect(() => {
    setStats(getStats());
    setReflections(loadReflections());
    setPracticeRecords(loadPracticeRecords());
    setWeeklyEntries(loadWeeklyEntries());
  }, []);

  return (
    <div className="min-h-screen pb-24" style={{ backgroundColor: "var(--ko-bg)" }}>
      <header className="flex items-center justify-between px-6 pt-8 pb-6">
        <KamiottoLogo size={32} showWordmark={false} color="var(--ko-orange)" />
      </header>

      <div className="px-6 space-y-8">
        <section className="ko-animate-fadeUp">
          <p className="mb-1" style={{ color: "var(--ko-orange-light)", fontSize: 11, letterSpacing: "0.15em", fontWeight: 500 }}>
            MY PAGE
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
            マイページ
          </h1>
        </section>

        {/* Stats */}
        <section className="ko-animate-fadeUp ko-delay-1">
          <div className="grid grid-cols-2 gap-3">
            {[
              { icon: <Flame size={18} strokeWidth={1.5} />, label: "継続日数", value: `${stats.streak}日` },
              { icon: <Calendar size={18} strokeWidth={1.5} />, label: "実践した日", value: `${stats.totalDays}日` },
              { icon: <MessageCircle size={18} strokeWidth={1.5} />, label: "ふりかえり", value: `${stats.totalReflections}回` },
              { icon: <BookOpen size={18} strokeWidth={1.5} />, label: "プラクティス", value: `${stats.totalPractices}回` },
            ].map((s) => (
              <div
                key={s.label}
                className="rounded-2xl p-5 text-center"
                style={{ backgroundColor: "var(--ko-white)", border: "1px solid var(--ko-border)" }}
              >
                <div className="flex justify-center mb-2" style={{ color: "var(--ko-orange)" }}>{s.icon}</div>
                <p style={{ color: "var(--ko-orange)", fontSize: 24, fontFamily: '"Noto Serif JP", serif', fontWeight: 400 }}>
                  {s.value}
                </p>
                <p className="mt-1" style={{ color: "var(--ko-ink-light)", fontSize: 11, letterSpacing: "0.05em" }}>
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Tabs */}
        <section className="ko-animate-fadeUp ko-delay-2">
          <div className="flex gap-1 rounded-xl p-1" style={{ backgroundColor: "var(--ko-white)", border: "1px solid var(--ko-border)" }}>
            {[
              { key: "reflections" as const, label: "ふりかえり" },
              { key: "practices" as const, label: "プラクティス" },
              { key: "weekly" as const, label: "週の記録" },
            ].map((t) => (
              <button
                key={t.key}
                onClick={() => setTab(t.key)}
                className="flex-1 py-2 rounded-lg text-center transition-all duration-200"
                style={{
                  backgroundColor: tab === t.key ? "var(--ko-orange)" : "transparent",
                  color: tab === t.key ? "var(--ko-white)" : "var(--ko-ink-light)",
                  fontSize: 12,
                  letterSpacing: "0.05em",
                }}
              >
                {t.label}
              </button>
            ))}
          </div>
        </section>

        {/* Content */}
        <section className="space-y-3">
          {tab === "reflections" && (
            reflections.length === 0 ? (
              <EmptyState message="まだふりかえりの記録がありません。" />
            ) : (
              reflections.map((entry) => (
                <div key={entry.timestamp} className="rounded-2xl p-5" style={{ backgroundColor: "var(--ko-white)", border: "1px solid var(--ko-border)" }}>
                  <p style={{ color: "var(--ko-ink-light)", fontSize: 11, letterSpacing: "0.1em", marginBottom: 4 }}>{entry.date}</p>
                  <p className="mb-2" style={{ color: "var(--ko-orange-light)", fontSize: 12, fontFamily: '"Noto Serif JP", serif', lineHeight: 1.6 }}>
                    {entry.question}
                  </p>
                  <p style={{ color: "var(--ko-ink)", fontSize: 13, lineHeight: 1.9, whiteSpace: "pre-wrap" }}>{entry.text}</p>
                </div>
              ))
            )
          )}

          {tab === "practices" && (
            practiceRecords.length === 0 ? (
              <EmptyState message="まだプラクティスの記録がありません。" />
            ) : (
              practiceRecords.map((record) => (
                <div key={record.completedAt} className="rounded-2xl p-5" style={{ backgroundColor: "var(--ko-white)", border: "1px solid var(--ko-border)" }}>
                  <div className="flex items-center justify-between mb-2">
                    <p style={{ color: "var(--ko-ink-light)", fontSize: 11, letterSpacing: "0.1em" }}>{record.date}</p>
                  </div>
                  <p style={{ color: "var(--ko-orange)", fontSize: 14, fontWeight: 500, letterSpacing: "0.03em" }}>
                    {record.practiceTitle}
                  </p>
                  {record.note && (
                    <p className="mt-2" style={{ color: "var(--ko-ink)", fontSize: 13, lineHeight: 1.9, whiteSpace: "pre-wrap" }}>
                      {record.note}
                    </p>
                  )}
                </div>
              ))
            )
          )}

          {tab === "weekly" && (
            weeklyEntries.length === 0 ? (
              <EmptyState message="まだ週のふりかえりがありません。" />
            ) : (
              weeklyEntries.map((entry) => (
                <div key={entry.timestamp} className="rounded-2xl p-5" style={{ backgroundColor: "var(--ko-white)", border: "1px solid var(--ko-border)" }}>
                  <p style={{ color: "var(--ko-ink-light)", fontSize: 11, letterSpacing: "0.1em", marginBottom: 8 }}>{entry.weekKey}</p>
                  <p style={{ color: "var(--ko-ink)", fontSize: 13, lineHeight: 1.9, whiteSpace: "pre-wrap" }}>{entry.text}</p>
                </div>
              ))
            )
          )}
        </section>
      </div>

      <BottomNav active="mypage" />
    </div>
  );
}

function EmptyState({ message }: { message: string }) {
  return (
    <div className="rounded-2xl p-8 text-center" style={{ backgroundColor: "var(--ko-white)", border: "1px solid var(--ko-border)" }}>
      <p style={{ color: "var(--ko-ink-light)", fontSize: 13, lineHeight: 1.8 }}>{message}</p>
      <p className="mt-2" style={{ color: "var(--ko-orange-light)", fontSize: 12, fontFamily: '"Noto Serif JP", serif', fontWeight: 300 }}>
        今日から始めましょう。
      </p>
    </div>
  );
}
