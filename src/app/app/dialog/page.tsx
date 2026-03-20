"use client";

import { useState, useEffect, useCallback } from "react";
import KamiottoLogo from "@/components/kamiotto/KamiottoLogo";
import BottomNav from "@/components/kamiotto/BottomNav";
import { Check } from "lucide-react";
import { saveReflection, getTodayKey, loadReflections } from "@/lib/storage";
import type { ReflectionEntry } from "@/lib/storage";

const questions = [
  "今日、パートナーに感謝を伝えましたか？",
  "最近、相手を変えようとしていませんでしたか？",
  "パートナーの話を、最後まで聴けていますか？",
  "家庭で「太陽」でいられましたか？",
  "自分の機嫌は、自分でとれていますか？",
  "「ありがとう」を、今日何回言いましたか？",
  "パートナーの良いところを、ひとつ思い浮かべてみてください。",
  "自分の内側は、今、穏やかですか？",
];

function getDailyQuestion(): string {
  const today = new Date();
  const dayOfYear = Math.floor((today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / 86400000);
  return questions[dayOfYear % questions.length];
}

export default function DialogPage() {
  const [text, setText] = useState("");
  const [saved, setSaved] = useState(false);
  const [todayEntry, setTodayEntry] = useState<ReflectionEntry | undefined>();
  const [pastEntries, setPastEntries] = useState<ReflectionEntry[]>([]);
  const question = getDailyQuestion();

  useEffect(() => {
    const all = loadReflections();
    const today = all.find((r) => r.date === getTodayKey() && r.question === question);
    if (today) {
      setTodayEntry(today);
      setSaved(true);
    }
    setPastEntries(all.filter((r) => r.date !== getTodayKey()).slice(0, 5));
  }, [question]);

  const handleSave = useCallback(() => {
    if (!text.trim()) return;
    const entry: ReflectionEntry = {
      date: getTodayKey(),
      question,
      text: text.trim(),
      timestamp: Date.now(),
    };
    saveReflection(entry);
    setTodayEntry(entry);
    setSaved(true);
  }, [text, question]);

  return (
    <div className="min-h-screen pb-24" style={{ backgroundColor: "var(--ko-bg)" }}>
      <header className="flex items-center justify-between px-6 pt-8 pb-6">
        <KamiottoLogo size={32} showWordmark={false} color="var(--ko-orange)" />
      </header>

      <div className="px-6 space-y-8">
        <section className="ko-animate-fadeUp">
          <p className="mb-1" style={{ color: "var(--ko-orange-light)", fontSize: 11, letterSpacing: "0.15em", fontWeight: 500 }}>
            SELF DIALOG
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
            自分との対話
          </h1>
          <p className="mt-3" style={{ color: "var(--ko-ink-light)", fontSize: 13, lineHeight: 1.9 }}>
            静かに自分の内側と向き合う時間です。
          </p>
        </section>

        {/* Today's dialog */}
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
              {question}
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
            ) : (
              <div className="mt-5">
                <textarea
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder="感じたことを、そのまま書いてみてください。正解はありません。"
                  rows={5}
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

        {/* Past dialogs */}
        {pastEntries.length > 0 && (
          <section className="ko-animate-fadeUp ko-delay-2">
            <h2 className="mb-4" style={{ color: "var(--ko-orange)", fontSize: 14, fontFamily: '"Noto Serif JP", serif', fontWeight: 400, letterSpacing: "0.1em" }}>
              過去の対話
            </h2>
            <div className="space-y-3">
              {pastEntries.map((entry) => (
                <div key={entry.timestamp} className="rounded-2xl p-5" style={{ backgroundColor: "var(--ko-white)", border: "1px solid var(--ko-border)" }}>
                  <p style={{ color: "var(--ko-ink-light)", fontSize: 11, letterSpacing: "0.1em", marginBottom: 4 }}>
                    {entry.date}
                  </p>
                  <p className="mb-2" style={{ color: "var(--ko-orange-light)", fontSize: 12, fontFamily: '"Noto Serif JP", serif', lineHeight: 1.6 }}>
                    {entry.question}
                  </p>
                  <p style={{ color: "var(--ko-ink)", fontSize: 13, lineHeight: 1.9, whiteSpace: "pre-wrap" }}>
                    {entry.text}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>

      <BottomNav active="dialog" />
    </div>
  );
}
