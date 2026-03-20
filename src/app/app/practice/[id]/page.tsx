"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { useRouter, useParams } from "next/navigation";
import KamiottoLogo from "@/components/kamiotto/KamiottoLogo";
import { ArrowLeft, Check } from "lucide-react";
import { getPracticeById } from "@/lib/practices";
import { savePracticeRecord, getTodayKey } from "@/lib/storage";

type Phase = "intro" | "guidance" | "complete" | "saved";

export default function PracticePage() {
  const params = useParams();
  const router = useRouter();
  const id = Number(params.id || "1");
  const practice = getPracticeById(id);

  const [phase, setPhase] = useState<Phase>("intro");
  const [guidanceIndex, setGuidanceIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const [note, setNote] = useState("");
  const timerRef = useRef<ReturnType<typeof setInterval>>(undefined);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  const startPractice = useCallback(() => {
    if (!practice) return;
    setPhase("guidance");
    setGuidanceIndex(0);
    const perStep = Math.floor(practice.durationSeconds / practice.guidance.length);
    setTimeLeft(perStep);

    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setGuidanceIndex((gi) => {
            const next = gi + 1;
            if (next >= practice.guidance.length) {
              if (timerRef.current) clearInterval(timerRef.current);
              setPhase("complete");
              return gi;
            }
            setTimeLeft(perStep);
            return next;
          });
          return perStep;
        }
        return prev - 1;
      });
    }, 1000);
  }, [practice]);

  const handleSave = useCallback(() => {
    if (!practice) return;
    savePracticeRecord({
      date: getTodayKey(),
      practiceId: practice.id,
      practiceTitle: practice.title,
      completedAt: Date.now(),
      note: note.trim() || undefined,
    });
    setPhase("saved");
  }, [practice, note]);

  if (!practice) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: "var(--ko-bg)" }}>
        <p style={{ color: "var(--ko-ink-light)" }}>プラクティスが見つかりません</p>
      </div>
    );
  }

  const formatTime = (s: number) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: "var(--ko-bg)" }}>
      <header className="flex items-center justify-between px-6 pt-8 pb-4">
        <button onClick={() => router.push("/app/home")} className="flex items-center gap-2" style={{ color: "var(--ko-ink-light)" }}>
          <ArrowLeft size={18} strokeWidth={1.5} />
          <span style={{ fontSize: 13 }}>ホーム</span>
        </button>
        <KamiottoLogo size={28} showWordmark={false} color="var(--ko-orange)" />
      </header>

      <div className="flex-1 flex flex-col items-center justify-center px-8">
        {/* ── Intro ── */}
        {phase === "intro" && (
          <div className="max-w-sm w-full text-center ko-animate-fadeUp">
            <div className="mb-8">
              <span
                className="inline-block rounded-full px-3 py-1 mb-6"
                style={{ backgroundColor: "var(--ko-bg-warm)", color: "var(--ko-orange)", fontSize: 12 }}
              >
                {practice.duration}
              </span>
              <h1
                style={{
                  color: "var(--ko-orange)",
                  fontSize: 22,
                  fontFamily: '"Noto Serif JP", serif',
                  fontWeight: 400,
                  lineHeight: 1.8,
                  letterSpacing: "0.06em",
                }}
              >
                {practice.title}
              </h1>
              <p className="mt-4" style={{ color: "var(--ko-ink-light)", fontSize: 14, lineHeight: 2 }}>
                {practice.description}
              </p>
            </div>
            <button
              onClick={startPractice}
              className="w-full py-4 rounded-2xl transition-all duration-200"
              style={{
                backgroundColor: "var(--ko-orange)",
                color: "var(--ko-white)",
                fontSize: 15,
                letterSpacing: "0.1em",
              }}
            >
              はじめる
            </button>
          </div>
        )}

        {/* ── Guidance ── */}
        {phase === "guidance" && (
          <div className="max-w-sm w-full text-center">
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div
                className="rounded-full border ko-animate-breathe"
                style={{ width: 280, height: 280, borderColor: "var(--ko-orange-pale)", opacity: 0.3 }}
              />
            </div>

            <div className="relative z-10">
              <p className="mb-8" style={{ color: "var(--ko-orange-light)", fontSize: 32, fontFamily: '"Noto Serif JP", serif', fontWeight: 300 }}>
                {formatTime(timeLeft)}
              </p>
              <p
                className="whitespace-pre-line ko-animate-fadeUp"
                key={guidanceIndex}
                style={{
                  color: "var(--ko-orange)",
                  fontSize: 17,
                  fontFamily: '"Noto Serif JP", serif',
                  fontWeight: 400,
                  lineHeight: 2.2,
                  letterSpacing: "0.04em",
                }}
              >
                {practice.guidance[guidanceIndex]}
              </p>

              <div className="flex justify-center gap-2 mt-12">
                {practice.guidance.map((_, i) => (
                  <div
                    key={i}
                    className="rounded-full transition-all duration-300"
                    style={{
                      width: i === guidanceIndex ? 20 : 6,
                      height: 6,
                      backgroundColor: i <= guidanceIndex ? "var(--ko-orange)" : "var(--ko-border)",
                    }}
                  />
                ))}
              </div>

              <button
                onClick={() => {
                  if (timerRef.current) clearInterval(timerRef.current);
                  setPhase("complete");
                }}
                className="mt-8"
                style={{ color: "var(--ko-ink-light)", fontSize: 12, letterSpacing: "0.08em" }}
              >
                スキップ
              </button>
            </div>
          </div>
        )}

        {/* ── Complete ── */}
        {phase === "complete" && (
          <div className="max-w-sm w-full text-center ko-animate-fadeUp">
            <div className="mb-6">
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6"
                style={{ backgroundColor: "var(--ko-bg-warm)" }}
              >
                <Check size={28} strokeWidth={1.5} style={{ color: "var(--ko-orange)" }} />
              </div>
              <p
                style={{
                  color: "var(--ko-orange)",
                  fontSize: 18,
                  fontFamily: '"Noto Serif JP", serif',
                  fontWeight: 400,
                  lineHeight: 1.8,
                  letterSpacing: "0.06em",
                }}
              >
                {practice.closingMessage}
              </p>
            </div>

            <div className="mt-6">
              <textarea
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="気づいたこと、感じたことがあれば（任意）"
                rows={3}
                className="w-full rounded-xl p-4 resize-none focus:outline-none"
                style={{
                  backgroundColor: "var(--ko-white)",
                  border: "1px solid var(--ko-border)",
                  color: "var(--ko-ink)",
                  fontSize: 14,
                  lineHeight: 1.9,
                }}
              />
            </div>

            <button
              onClick={handleSave}
              className="mt-4 w-full py-4 rounded-2xl transition-all duration-200"
              style={{
                backgroundColor: "var(--ko-orange)",
                color: "var(--ko-white)",
                fontSize: 15,
                letterSpacing: "0.1em",
              }}
            >
              記録する
            </button>
          </div>
        )}

        {/* ── Saved ── */}
        {phase === "saved" && (
          <div className="max-w-sm w-full text-center ko-animate-fadeUp">
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6"
              style={{ backgroundColor: "var(--ko-bg-warm)" }}
            >
              <Check size={28} strokeWidth={1.5} style={{ color: "var(--ko-orange)" }} />
            </div>
            <p
              style={{
                color: "var(--ko-orange)",
                fontSize: 18,
                fontFamily: '"Noto Serif JP", serif',
                fontWeight: 400,
                letterSpacing: "0.06em",
              }}
            >
              記録しました
            </p>
            <p className="mt-4" style={{ color: "var(--ko-ink-light)", fontSize: 13, lineHeight: 2 }}>
              今日も自分と向き合えましたね。
              <br />
              小さな積み重ねが、あなたを変えていきます。
            </p>

            <button
              onClick={() => router.push("/app/home")}
              className="mt-8 w-full py-4 rounded-2xl transition-all duration-200"
              style={{
                backgroundColor: "var(--ko-orange)",
                color: "var(--ko-white)",
                fontSize: 15,
                letterSpacing: "0.1em",
              }}
            >
              ホームに戻る
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
