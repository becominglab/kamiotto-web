"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import KamiottoLogo from "@/components/kamiotto/KamiottoLogo";

export default function SplashPage() {
  const router = useRouter();
  const [phase, setPhase] = useState<"breathe" | "logo" | "copy" | "fade">("breathe");

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase("logo"), 800),
      setTimeout(() => setPhase("copy"), 1800),
      setTimeout(() => setPhase("fade"), 3400),
      setTimeout(() => router.push("/app/onboarding"), 4200),
    ];
    return () => timers.forEach(clearTimeout);
  }, [router]);

  return (
    <div
      className="fixed inset-0 flex flex-col items-center justify-center transition-opacity duration-700"
      style={{
        backgroundColor: "var(--ko-bg)",
        opacity: phase === "fade" ? 0 : 1,
      }}
    >
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
        <div
          className="rounded-full border ko-animate-ripple"
          style={{ width: 200, height: 200, borderColor: "var(--ko-orange-pale)", opacity: phase === "breathe" ? 0.4 : 0.2 }}
        />
        <div
          className="absolute rounded-full border ko-animate-ripple ko-delay-2"
          style={{ width: 340, height: 340, borderColor: "var(--ko-orange-pale)", opacity: 0.15 }}
        />
        <div
          className="absolute rounded-full border ko-animate-ripple ko-delay-4"
          style={{ width: 500, height: 500, borderColor: "var(--ko-orange-pale)", opacity: 0.08 }}
        />
      </div>

      <div
        className="relative z-10 flex flex-col items-center gap-8 transition-all duration-700"
        style={{
          opacity: phase === "breathe" ? 0 : 1,
          transform: phase === "breathe" ? "translateY(8px)" : "translateY(0)",
        }}
      >
        <KamiottoLogo size={64} showWordmark={false} color="var(--ko-orange)" />

        <span
          className="tracking-[0.25em] font-light"
          style={{
            color: "var(--ko-orange)",
            fontSize: 22,
            fontFamily: '"Noto Serif JP", serif',
            letterSpacing: "0.25em",
          }}
        >
          KAMIOTTO
        </span>

        <p
          className="text-center transition-all duration-700"
          style={{
            color: "var(--ko-ink-light)",
            fontSize: 13,
            letterSpacing: "0.12em",
            lineHeight: 2,
            fontFamily: '"Noto Sans JP", sans-serif',
            opacity: phase === "copy" || phase === "fade" ? 1 : 0,
            transform: phase === "copy" || phase === "fade" ? "translateY(0)" : "translateY(6px)",
          }}
        >
          相手を変える前に、自分を整える。
        </p>
      </div>
    </div>
  );
}
