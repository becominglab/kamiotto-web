"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import KamiottoLogo from "@/components/kamiotto/KamiottoLogo";

const steps = [
  {
    heading: "家庭の空気は、\nあなたの在り方から\n変わります。",
    body: "テクニックではなく、内側を整えること。\nそこから、すべてが静かに動き始めます。",
  },
  {
    heading: "完璧を目指さない。\nただ、少しずつ整える。",
    body: "神夫とは、完璧な夫のことではありません。\n自分の在り方を育て続ける人のことです。",
  },
  {
    heading: "できなかった日も、\n戻ってくればいい。",
    body: "更新を重ねる人生。\nこのアプリは、いつでもあなたを迎えます。",
  },
  {
    heading: "さあ、\n今日の自分を\n整えましょう。",
    body: null,
  },
];

export default function OnboardingPage() {
  const router = useRouter();
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState<"enter" | "exit">("enter");

  const isLast = current === steps.length - 1;
  const step = steps[current];

  function goNext() {
    if (isLast) {
      router.push("/app/home");
      return;
    }
    setDirection("exit");
    setTimeout(() => {
      setCurrent((prev) => prev + 1);
      setDirection("enter");
    }, 300);
  }

  function skip() {
    router.push("/app/home");
  }

  return (
    <div className="fixed inset-0 flex flex-col" style={{ backgroundColor: "var(--ko-bg)" }}>
      <div className="flex items-center justify-between px-6 pt-8 pb-4">
        <KamiottoLogo size={32} showWordmark={false} color="var(--ko-orange)" />
        {!isLast && (
          <button
            onClick={skip}
            className="text-sm tracking-wider"
            style={{ color: "var(--ko-ink-light)", fontFamily: '"Noto Sans JP", sans-serif' }}
          >
            スキップ
          </button>
        )}
      </div>

      <div className="flex-1 flex flex-col items-center justify-center px-8">
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div
            className="rounded-full border ko-animate-breathe"
            style={{ width: 280, height: 280, borderColor: "var(--ko-orange-pale)", opacity: 0.3 }}
          />
          <div
            className="absolute rounded-full border ko-animate-breathe ko-delay-2"
            style={{ width: 400, height: 400, borderColor: "var(--ko-orange-pale)", opacity: 0.15 }}
          />
        </div>

        <div
          className="relative z-10 max-w-sm w-full text-center transition-all duration-300"
          style={{
            opacity: direction === "enter" ? 1 : 0,
            transform: direction === "enter" ? "translateY(0)" : "translateY(-12px)",
          }}
        >
          <h1
            className="whitespace-pre-line leading-relaxed mb-8"
            style={{
              color: "var(--ko-orange)",
              fontSize: 24,
              fontFamily: '"Noto Serif JP", serif',
              fontWeight: 400,
              lineHeight: 1.8,
              letterSpacing: "0.06em",
            }}
          >
            {step.heading}
          </h1>

          {step.body && (
            <p
              className="whitespace-pre-line leading-loose"
              style={{ color: "var(--ko-ink-light)", fontSize: 14, lineHeight: 2, letterSpacing: "0.04em" }}
            >
              {step.body}
            </p>
          )}
        </div>
      </div>

      <div className="px-8 pb-12">
        <div className="flex justify-center gap-2 mb-8">
          {steps.map((_, i) => (
            <div
              key={i}
              className="rounded-full transition-all duration-300"
              style={{
                width: i === current ? 24 : 6,
                height: 6,
                backgroundColor: i === current ? "var(--ko-orange)" : "var(--ko-orange-light)",
              }}
            />
          ))}
        </div>

        <button
          onClick={goNext}
          className="w-full py-4 rounded-2xl text-center transition-all duration-200"
          style={{
            backgroundColor: isLast ? "var(--ko-orange)" : "transparent",
            color: isLast ? "var(--ko-white)" : "var(--ko-orange)",
            border: isLast ? "none" : "1px solid var(--ko-border)",
            fontSize: 15,
            fontFamily: '"Noto Sans JP", sans-serif',
            letterSpacing: "0.1em",
            fontWeight: 500,
          }}
        >
          {isLast ? "はじめる" : "つぎへ"}
        </button>
      </div>
    </div>
  );
}
