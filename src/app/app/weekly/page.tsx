"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import KamiottoLogo from "@/components/kamiotto/KamiottoLogo";
import { ArrowLeft, Check } from "lucide-react";
import { saveWeeklyEntry, getCurrentWeeklyEntry, getWeekKey, loadReflections, loadPracticeRecords, getTodayKey } from "@/lib/storage";
import type { WeeklyEntry } from "@/lib/storage";

export default function WeeklyPage() {
  const router = useRouter();
  const [text, setText] = useState("");
  const [saved, setSaved] = useState(false);
  const [existing, setExisting] = useState<WeeklyEntry | undefined>();
  const [weekSummary, setWeekSummary] = useState({ reflections: 0, practices: 0 });

  useEffect(() => {
    const entry = getCurrentWeeklyEntry();
    if (entry) {
      setExisting(entry);
      setSaved(true);
    }

    // Count this week's activities
    const now = new Date();
    const weekStart = new Date(now);
    weekStart.setDate(now.getDate() - now.getDay());
    weekStart.setHours(0, 0, 0, 0);
    const weekStartKey = `${weekStart.getFullYear()}-${String(weekStart.getMonth() + 1).padStart(2, "0")}-${String(weekStart.getDate()).padStart(2, "0")}`;

    const reflections = loadReflections().filter((r) => r.date >= weekStartKey);
    const practices = loadPracticeRecords().filter((p) => p.date >= weekStartKey);
    setWeekSummary({ reflections: reflections.length, practices: practices.length });
  }, []);

  const handleSave = useCallback(() => {
    if (!text.trim()) return;
    const entry: WeeklyEntry = {
      weekKey: getWeekKey(),
      text: text.trim(),
      timestamp: Date.now(),
    };
    saveWeeklyEntry(entry);
    setExisting(entry);
    setSaved(true);
  }, [text]);

  return (
    <div className="min-h-screen" style={{ backgroundColor: "var(--ko-bg)" }}>
      <header className="flex items-center justify-between px-6 pt-8 pb-4">
        <button onClick={() => router.push("/app/home")} className="flex items-center gap-2" style={{ color: "var(--ko-ink-light)" }}>
          <ArrowLeft size={18} strokeWidth={1.5} />
          <span style={{ fontSize: 13 }}>ホーム</span>
        </button>
        <KamiottoLogo size={28} showWordmark={false} color="var(--ko-orange)" />
      </header>

      <div className="px-6 py-6 space-y-8">
        <section className="ko-animate-fadeUp">
          <p className="mb-1" style={{ color: "var(--ko-orange-light)", fontSize: 11, letterSpacing: "0.15em", fontWeight: 500 }}>
            WEEKLY REFLECTION
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
            今週のふりかえり
          </h1>
        </section>

        {/* Week stats */}
        <section className="ko-animate-fadeUp ko-delay-1">
          <div className="flex gap-3">
            <div className="flex-1 rounded-2xl p-4 text-center" style={{ backgroundColor: "var(--ko-white)", border: "1px solid var(--ko-border)" }}>
              <p style={{ color: "var(--ko-orange)", fontSize: 24, fontFamily: '"Noto Serif JP", serif' }}>{weekSummary.reflections}</p>
              <p style={{ color: "var(--ko-ink-light)", fontSize: 11 }}>ふりかえり</p>
            </div>
            <div className="flex-1 rounded-2xl p-4 text-center" style={{ backgroundColor: "var(--ko-white)", border: "1px solid var(--ko-border)" }}>
              <p style={{ color: "var(--ko-orange)", fontSize: 24, fontFamily: '"Noto Serif JP", serif' }}>{weekSummary.practices}</p>
              <p style={{ color: "var(--ko-ink-light)", fontSize: 11 }}>プラクティス</p>
            </div>
          </div>
        </section>

        {/* Questions */}
        <section className="ko-animate-fadeUp ko-delay-2">
          <div className="rounded-2xl p-6" style={{ backgroundColor: "var(--ko-white)", border: "1px solid var(--ko-border)" }}>
            <p className="mb-4" style={{ color: "var(--ko-orange)", fontSize: 15, fontFamily: '"Noto Serif JP", serif', fontWeight: 400, lineHeight: 2 }}>
              今週を静かにふりかえりましょう。
            </p>
            <div className="space-y-3 mb-6">
              {[
                "愛から行動できた瞬間はありましたか？",
                "パートナーとの関係に変化はありましたか？",
                "自分の在り方で気づいたことは？",
              ].map((q, i) => (
                <p key={i} style={{ color: "var(--ko-ink-light)", fontSize: 13, lineHeight: 1.8, paddingLeft: 16, borderLeft: "2px solid var(--ko-orange-pale)" }}>
                  {q}
                </p>
              ))}
            </div>

            {saved && existing ? (
              <div className="ko-animate-fadeUp">
                <div className="flex items-center gap-2 mb-3" style={{ color: "var(--ko-orange)" }}>
                  <Check size={16} strokeWidth={2} />
                  <span style={{ fontSize: 12, letterSpacing: "0.08em", fontWeight: 500 }}>記録しました</span>
                </div>
                <div className="rounded-xl p-4" style={{ backgroundColor: "var(--ko-bg)", border: "1px solid var(--ko-border)" }}>
                  <p style={{ color: "var(--ko-ink)", fontSize: 14, lineHeight: 1.9, whiteSpace: "pre-wrap" }}>
                    {existing.text}
                  </p>
                </div>
                <p className="mt-4 text-center" style={{ color: "var(--ko-ink-light)", fontSize: 12, fontFamily: '"Noto Serif JP", serif', fontWeight: 300, lineHeight: 1.8 }}>
                  今週もおつかれさまでした。
                  <br />
                  来週も、内側から愛を生きましょう。
                </p>
              </div>
            ) : (
              <div>
                <textarea
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder="今週の気づきや変化を、自由に書いてください。"
                  rows={6}
                  className="w-full rounded-xl p-4 resize-none focus:outline-none"
                  style={{
                    backgroundColor: "var(--ko-bg)",
                    border: "1px solid var(--ko-border)",
                    color: "var(--ko-ink)",
                    fontSize: 14,
                    lineHeight: 1.9,
                  }}
                />
                <button
                  onClick={handleSave}
                  disabled={!text.trim()}
                  className="mt-3 w-full py-3 rounded-xl text-center transition-all duration-200"
                  style={{
                    backgroundColor: text.trim() ? "var(--ko-orange)" : "var(--ko-border)",
                    color: text.trim() ? "var(--ko-white)" : "var(--ko-ink-light)",
                    fontSize: 13,
                    letterSpacing: "0.08em",
                    cursor: text.trim() ? "pointer" : "default",
                  }}
                >
                  記録する
                </button>
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
