"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import KamiottoLogo from "@/components/kamiotto/KamiottoLogo";
import BottomNav from "@/components/kamiotto/BottomNav";
import { Settings, User, ChevronRight, Check } from "lucide-react";
import { practices } from "@/lib/practices";
import {
  getGreeting,
  getFormattedDate,
  getTodayKey,
  saveReflection,
  getTodayReflection,
  getRecentReflections,
  getTodayPracticeIds,
} from "@/lib/storage";
import type { ReflectionEntry } from "@/lib/storage";

const todayQuestion = "今日、パートナーに感謝を伝えましたか？";

export default function KamiottoHomePage() {
  const [reflectionOpen, setReflectionOpen] = useState(false);
  const [reflectionText, setReflectionText] = useState("");
  const [saved, setSaved] = useState(false);
  const [todayEntry, setTodayEntry] = useState<ReflectionEntry | undefined>(undefined);
  const [recentEntries, setRecentEntries] = useState<ReflectionEntry[]>([]);
  const [showHistory, setShowHistory] = useState(false);
  const [donePracticeIds, setDonePracticeIds] = useState<number[]>([]);

  useEffect(() => {
    const existing = getTodayReflection();
    if (existing) {
      setTodayEntry(existing);
      setSaved(true);
    }
    setRecentEntries(getRecentReflections(7));
    setDonePracticeIds(getTodayPracticeIds());
  }, []);

  const handleSave = useCallback(() => {
    if (!reflectionText.trim()) return;
    const entry: ReflectionEntry = {
      date: getTodayKey(),
      question: todayQuestion,
      text: reflectionText.trim(),
      timestamp: Date.now(),
    };
    saveReflection(entry);
    setTodayEntry(entry);
    setSaved(true);
    setRecentEntries(getRecentReflections(7));
  }, [reflectionText]);

  return (
    <div className="min-h-screen pb-24" style={{ backgroundColor: "var(--ko-bg)" }}>
      <header className="flex items-center justify-between px-6 pt-8 pb-6" style={{ backgroundColor: "var(--ko-bg)" }}>
        <KamiottoLogo size={32} showWordmark={false} color="var(--ko-orange)" />
        <div className="flex items-center gap-4">
          <Link href="/app/mypage" aria-label="マイページ">
            <User size={20} strokeWidth={1.5} style={{ color: "var(--ko-ink-light)" }} />
          </Link>
          <button aria-label="設定">
            <Settings size={20} strokeWidth={1.5} style={{ color: "var(--ko-ink-light)" }} />
          </button>
        </div>
      </header>

      <div className="px-6 space-y-8">
        {/* ── 挨拶 ── */}
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

        {/* ── 今日の問い ── */}
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

            {saved && todayEntry ? (
              <div className="mt-5 ko-animate-fadeUp">
                <div className="flex items-center gap-2 mb-3" style={{ color: "var(--ko-orange)" }}>
                  <Check size={16} strokeWidth={2} />
                  <span style={{ fontSize: 12, letterSpacing: "0.08em", fontWeight: 500 }}>記録しました</span>
                </div>
                <div className="rounded-xl p-4" style={{ backgroundColor: "var(--ko-bg)", border: "1px solid var(--ko-border)" }}>
                  <p style={{ color: "var(--ko-ink)", fontSize: 14, lineHeight: 1.9, whiteSpace: "pre-wrap" }}>
                    {todayEntry.text}
                  </p>
                </div>
                <p className="mt-3 text-center" style={{ color: "var(--ko-ink-light)", fontSize: 12, lineHeight: 1.8, fontFamily: '"Noto Serif JP", serif', fontWeight: 300 }}>
                  今日も自分と向き合えましたね。
                </p>
              </div>
            ) : !reflectionOpen ? (
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
                  }}
                  autoFocus
                />
                <button
                  onClick={handleSave}
                  disabled={!reflectionText.trim()}
                  className="mt-3 w-full py-3 rounded-xl text-center transition-all duration-200"
                  style={{
                    backgroundColor: reflectionText.trim() ? "var(--ko-orange)" : "var(--ko-border)",
                    color: reflectionText.trim() ? "var(--ko-white)" : "var(--ko-ink-light)",
                    fontSize: 13,
                    letterSpacing: "0.08em",
                    cursor: reflectionText.trim() ? "pointer" : "default",
                  }}
                >
                  記録する
                </button>
              </div>
            )}
          </div>
        </section>

        {/* ── 今日のプラクティス ── */}
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
            {practices.map((p) => {
              const done = donePracticeIds.includes(p.id);
              return (
                <Link
                  key={p.id}
                  href={`/app/practice/${p.id}`}
                  className="rounded-2xl p-5 flex items-center justify-between transition-colors duration-200 hover:bg-white block"
                  style={{
                    backgroundColor: done ? "var(--ko-bg-warm)" : "var(--ko-white)",
                    border: "1px solid var(--ko-border)",
                  }}
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p style={{ color: "var(--ko-orange)", fontSize: 15, fontWeight: 500, letterSpacing: "0.03em" }}>
                        {p.title}
                      </p>
                      {done && <Check size={14} strokeWidth={2} style={{ color: "var(--ko-orange)" }} />}
                    </div>
                    <p className="mt-1" style={{ color: "var(--ko-ink-light)", fontSize: 12, lineHeight: 1.6 }}>
                      {p.description}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 ml-4 shrink-0">
                    <span
                      className="rounded-full px-2.5 py-1"
                      style={{ backgroundColor: done ? "var(--ko-white)" : "var(--ko-bg-warm)", color: "var(--ko-ink-light)", fontSize: 11 }}
                    >
                      {p.duration}
                    </span>
                    <ChevronRight size={16} strokeWidth={1.5} style={{ color: "var(--ko-orange-light)" }} />
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

        {/* ── 過去のふりかえり ── */}
        {recentEntries.length > 0 && (
          <section className="ko-animate-fadeUp ko-delay-3">
            <button onClick={() => setShowHistory(!showHistory)} className="w-full flex items-center justify-between mb-4">
              <h2
                style={{
                  color: "var(--ko-orange)",
                  fontSize: 14,
                  fontFamily: '"Noto Serif JP", serif',
                  fontWeight: 400,
                  letterSpacing: "0.1em",
                }}
              >
                ふりかえりの記録
              </h2>
              <ChevronRight
                size={16}
                strokeWidth={1.5}
                style={{
                  color: "var(--ko-orange-light)",
                  transform: showHistory ? "rotate(90deg)" : "rotate(0deg)",
                  transition: "transform 0.2s",
                }}
              />
            </button>

            {showHistory && (
              <div className="space-y-3 ko-animate-fadeUp">
                {recentEntries.map((entry) => (
                  <div
                    key={entry.timestamp}
                    className="rounded-2xl p-5"
                    style={{
                      backgroundColor: entry.date === getTodayKey() ? "var(--ko-bg-warm)" : "var(--ko-white)",
                      border: "1px solid var(--ko-border)",
                    }}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <p style={{ color: "var(--ko-ink-light)", fontSize: 11, letterSpacing: "0.1em" }}>{entry.date}</p>
                      {entry.date === getTodayKey() && (
                        <span className="rounded-full px-2 py-0.5" style={{ backgroundColor: "var(--ko-orange)", color: "var(--ko-white)", fontSize: 10 }}>
                          今日
                        </span>
                      )}
                    </div>
                    <p className="mb-2" style={{ color: "var(--ko-orange-light)", fontSize: 12, fontFamily: '"Noto Serif JP", serif', lineHeight: 1.6 }}>
                      {entry.question}
                    </p>
                    <p style={{ color: "var(--ko-ink)", fontSize: 13, lineHeight: 1.9, whiteSpace: "pre-wrap" }}>{entry.text}</p>
                  </div>
                ))}
              </div>
            )}
          </section>
        )}

        {/* ── 週の振り返り ── */}
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
            <Link
              href="/app/weekly"
              className="mt-4 inline-block px-6 py-2.5 rounded-xl transition-colors duration-200"
              style={{
                backgroundColor: "var(--ko-white)",
                color: "var(--ko-orange)",
                fontSize: 13,
                letterSpacing: "0.08em",
                border: "1px solid var(--ko-border)",
              }}
            >
              ふりかえりを開く
            </Link>
          </div>
        </section>

        {/* ── ひとこと ── */}
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

      <BottomNav active="home" />
    </div>
  );
}
