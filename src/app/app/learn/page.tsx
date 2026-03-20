"use client";

import KamiottoLogo from "@/components/kamiotto/KamiottoLogo";
import BottomNav from "@/components/kamiotto/BottomNav";
import { ChevronRight } from "lucide-react";
import { useState } from "react";

const teachings = [
  {
    id: 1,
    category: "思想",
    title: "神夫とは何か",
    body: "神夫とは、完璧な夫のことではありません。自分の内側から愛を生きる人のことです。\n\n自分自身を整え、自分の人生を生きる。その在り方が、自然とパートナーを尊重し、家族を照らし、周囲を幸せにしていく。\n\nまるで太陽のように家庭を照らす存在。それが神夫です。",
  },
  {
    id: 2,
    category: "原則",
    title: "幸せは家庭から",
    body: "すべての幸福の源泉は家庭にあります。\n\n仕事で成功しても、家庭が整っていなければ、本当の幸せとは言えません。夫婦の関係性が整うとき、家庭が、子どもが、そして社会が変わっていきます。\n\n家庭を最優先にすること。それが神夫の第一原則です。",
  },
  {
    id: 3,
    category: "原則",
    title: "インサイドアウト",
    body: "外側の世界は、内側の反映です。\n\nパートナーを変えようとしても、うまくいきません。なぜなら、変えられるのは自分だけだからです。\n\nまず自分の在り方を整える。自分が変われば、パートナーとの関係は自然に変化していきます。\n\nこれがインサイドアウトの実践です。",
  },
  {
    id: 4,
    category: "原則",
    title: "愛から生きる",
    body: "不安や義務ではなく、愛と感謝を源泉として生きること。\n\n「こうしなければ」ではなく、「こうしたい」から動く。「怒られないように」ではなく、「相手を大切にしたいから」行動する。\n\n愛を源泉にすると、同じ行動でも質が変わります。それが神夫の根本にある思想です。",
  },
  {
    id: 5,
    category: "実践",
    title: "日々の積み重ねが在り方を変える",
    body: "神夫になるのは、一日でできることではありません。\n\n毎朝、自分の内側を整える。日中、インサイドアウトを意識する。夜、静かにふりかえる。\n\nこの小さな積み重ねが、あなたの在り方を少しずつ変えていきます。できなかった日も、それに気づけた自分を認めましょう。\n\n大切なのは、続けようとする意志です。",
  },
];

export default function LearnPage() {
  const [openId, setOpenId] = useState<number | null>(null);

  return (
    <div className="min-h-screen pb-24" style={{ backgroundColor: "var(--ko-bg)" }}>
      <header className="flex items-center justify-between px-6 pt-8 pb-6">
        <KamiottoLogo size={32} showWordmark={false} color="var(--ko-orange)" />
      </header>

      <div className="px-6 space-y-8">
        <section className="ko-animate-fadeUp">
          <p className="mb-1" style={{ color: "var(--ko-orange-light)", fontSize: 11, letterSpacing: "0.15em", fontWeight: 500 }}>
            LEARNING
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
            神夫の学び
          </h1>
          <p className="mt-3" style={{ color: "var(--ko-ink-light)", fontSize: 13, lineHeight: 1.9 }}>
            神夫の思想と原則を、ひとつずつ深めていきましょう。
          </p>
        </section>

        <section className="space-y-3 ko-animate-fadeUp ko-delay-1">
          {teachings.map((t) => (
            <div
              key={t.id}
              className="rounded-2xl overflow-hidden transition-all duration-300"
              style={{ backgroundColor: "var(--ko-white)", border: "1px solid var(--ko-border)" }}
            >
              <button
                onClick={() => setOpenId(openId === t.id ? null : t.id)}
                className="w-full p-5 flex items-center justify-between text-left"
              >
                <div>
                  <span
                    className="inline-block rounded-full px-2 py-0.5 mb-2"
                    style={{ backgroundColor: "var(--ko-bg-warm)", color: "var(--ko-orange)", fontSize: 10, letterSpacing: "0.08em" }}
                  >
                    {t.category}
                  </span>
                  <p style={{ color: "var(--ko-orange)", fontSize: 15, fontWeight: 500, letterSpacing: "0.03em" }}>
                    {t.title}
                  </p>
                </div>
                <ChevronRight
                  size={16}
                  strokeWidth={1.5}
                  style={{
                    color: "var(--ko-orange-light)",
                    transform: openId === t.id ? "rotate(90deg)" : "rotate(0deg)",
                    transition: "transform 0.2s",
                  }}
                />
              </button>

              {openId === t.id && (
                <div className="px-5 pb-5 ko-animate-fadeUp">
                  <div style={{ borderTop: "1px solid var(--ko-border)", paddingTop: 16 }}>
                    <p
                      className="whitespace-pre-line"
                      style={{
                        color: "var(--ko-ink)",
                        fontSize: 14,
                        lineHeight: 2.2,
                        letterSpacing: "0.02em",
                      }}
                    >
                      {t.body}
                    </p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </section>
      </div>

      <BottomNav active="learn" />
    </div>
  );
}
