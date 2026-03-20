import Link from "next/link";
import { ChevronDown } from "lucide-react";
import KamiottoLogo from "@/components/kamiotto/KamiottoLogo";

const pillars = [
  {
    num: "01",
    title: "幸せは家庭から",
    desc: "すべての幸福の源泉は家庭にある。夫婦の関係性が整うとき、家庭が、社会が、世界が変わる。",
  },
  {
    num: "02",
    title: "インサイドアウト",
    desc: "外側の世界は内側の反映。パートナーを変えようとするのではなく、まず自分が変わる。",
  },
  {
    num: "03",
    title: "愛から生きる",
    desc: "不安や義務ではなく、愛と感謝を源泉として生きること。それが神夫の根本にある思想。",
  },
];

const flows = [
  {
    step: "朝",
    title: "今日の問いに触れる",
    desc: "静かな問いかけが、自分の内側を整えるきっかけになります。",
  },
  {
    step: "日中",
    title: "小さなプラクティス",
    desc: "日常の中で実践できる、愛と感謝の行動の指針。",
  },
  {
    step: "夜",
    title: "静かなふりかえり",
    desc: "今日の自分を責めず、受け止め、明日に渡す時間。",
  },
];

export default function KamiottoTopPage() {
  return (
    <>
      {/* ── Hero ── */}
      <section
        className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden"
        style={{ backgroundColor: "var(--ko-bg)" }}
      >
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div
            className="rounded-full border ko-animate-breathe"
            style={{ width: 320, height: 320, borderColor: "var(--ko-orange-pale)", opacity: 0.4 }}
          />
          <div
            className="absolute rounded-full border ko-animate-breathe ko-delay-2"
            style={{ width: 500, height: 500, borderColor: "var(--ko-orange-pale)", opacity: 0.2 }}
          />
          <div
            className="absolute rounded-full border ko-animate-breathe ko-delay-4"
            style={{ width: 700, height: 700, borderColor: "var(--ko-orange-pale)", opacity: 0.1 }}
          />
        </div>

        <div className="relative z-10 text-center px-6 max-w-lg mx-auto">
          <div className="flex justify-center mb-10 ko-animate-fadeUp">
            <KamiottoLogo size={56} showWordmark={false} color="var(--ko-orange)" />
          </div>

          <h1
            className="ko-animate-fadeUp ko-delay-1 mb-4"
            style={{
              color: "var(--ko-orange)",
              fontSize: 28,
              fontFamily: '"Noto Serif JP", serif',
              fontWeight: 400,
              letterSpacing: "0.25em",
              lineHeight: 1.4,
            }}
          >
            神夫養成研究所
          </h1>

          <p
            className="ko-animate-fadeUp ko-delay-2"
            style={{
              color: "var(--ko-ink-light)",
              fontSize: 14,
              letterSpacing: "0.12em",
              lineHeight: 2,
            }}
          >
            あなたが整い、家族が笑う
          </p>

          <div className="mt-16 ko-animate-fadeUp ko-delay-4 flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/app/splash"
              className="px-10 py-4 rounded-2xl text-center transition-all duration-200"
              style={{
                backgroundColor: "var(--ko-orange)",
                color: "var(--ko-white)",
                fontSize: 14,
                letterSpacing: "0.1em",
              }}
            >
              はじめる
            </Link>
            <Link
              href="#concept"
              className="px-10 py-4 rounded-2xl text-center transition-all duration-200"
              style={{
                border: "1px solid var(--ko-border)",
                color: "var(--ko-orange)",
                fontSize: 14,
                letterSpacing: "0.1em",
              }}
            >
              神夫とは
            </Link>
          </div>

          <div className="mt-20 ko-animate-fadeUp ko-delay-6">
            <ChevronDown
              size={20}
              strokeWidth={1}
              className="mx-auto animate-bounce"
              style={{ color: "var(--ko-orange-light)", animationDuration: "3s" }}
            />
          </div>
        </div>
      </section>

      {/* ── Concept ── */}
      <section id="concept" className="py-28" style={{ backgroundColor: "var(--ko-white)" }}>
        <div className="max-w-2xl mx-auto px-6 text-center">
          <p
            className="mb-6"
            style={{ color: "var(--ko-orange-light)", fontSize: 11, letterSpacing: "0.2em", fontWeight: 500 }}
          >
            CONCEPT
          </p>
          <h2
            className="mb-8"
            style={{
              color: "var(--ko-orange)",
              fontSize: 22,
              fontFamily: '"Noto Serif JP", serif',
              fontWeight: 400,
              lineHeight: 1.9,
              letterSpacing: "0.06em",
            }}
          >
            神夫とは、
            <br />
            完璧な夫のことではありません。
          </h2>
          <p style={{ color: "var(--ko-ink-light)", fontSize: 14, lineHeight: 2.2, letterSpacing: "0.03em" }}>
            神夫とは、自分の内側から愛を生きる人。
            <br />
            <br />
            自分自身を整え、自分の人生を生きる。
            <br />
            その在り方が、自然とパートナーを尊重し、
            <br />
            家族を照らし、周囲を幸せにしていく。
            <br />
            <br />
            まるで太陽のように家庭を照らす存在。
            <br />
            それが神夫です。
          </p>
        </div>
      </section>

      {/* ── Three Pillars ── */}
      <section className="py-28" style={{ backgroundColor: "var(--ko-bg)" }}>
        <div className="max-w-2xl mx-auto px-6">
          <p
            className="text-center mb-16"
            style={{ color: "var(--ko-orange-light)", fontSize: 11, letterSpacing: "0.2em", fontWeight: 500 }}
          >
            THREE PILLARS
          </p>
          <div className="space-y-6">
            {pillars.map((item) => (
              <div
                key={item.num}
                className="rounded-2xl p-7"
                style={{ backgroundColor: "var(--ko-white)", border: "1px solid var(--ko-border)" }}
              >
                <div className="flex items-start gap-5">
                  <span
                    style={{
                      color: "var(--ko-orange-light)",
                      fontSize: 28,
                      fontFamily: '"Noto Serif JP", serif',
                      fontWeight: 300,
                      lineHeight: 1,
                    }}
                  >
                    {item.num}
                  </span>
                  <div>
                    <h3
                      className="mb-2"
                      style={{
                        color: "var(--ko-orange)",
                        fontSize: 16,
                        fontFamily: '"Noto Serif JP", serif',
                        fontWeight: 400,
                        letterSpacing: "0.06em",
                      }}
                    >
                      {item.title}
                    </h3>
                    <p style={{ color: "var(--ko-ink-light)", fontSize: 13, lineHeight: 2 }}>{item.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Daily Flow ── */}
      <section className="py-28" style={{ backgroundColor: "var(--ko-white)" }}>
        <div className="max-w-2xl mx-auto px-6">
          <p
            className="text-center mb-6"
            style={{ color: "var(--ko-orange-light)", fontSize: 11, letterSpacing: "0.2em", fontWeight: 500 }}
          >
            DAILY FLOW
          </p>
          <h2
            className="text-center mb-16"
            style={{
              color: "var(--ko-orange)",
              fontSize: 20,
              fontFamily: '"Noto Serif JP", serif',
              fontWeight: 400,
              letterSpacing: "0.08em",
            }}
          >
            一日の流れ
          </h2>
          <div className="space-y-8">
            {flows.map((item, i) => (
              <div key={i} className="flex items-start gap-6">
                <div
                  className="shrink-0 w-12 h-12 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: "var(--ko-bg-warm)", border: "1px solid var(--ko-border)" }}
                >
                  <span style={{ color: "var(--ko-orange)", fontSize: 13, fontFamily: '"Noto Serif JP", serif' }}>
                    {item.step}
                  </span>
                </div>
                <div>
                  <h3 className="mb-1" style={{ color: "var(--ko-orange)", fontSize: 15, fontWeight: 500, letterSpacing: "0.04em" }}>
                    {item.title}
                  </h3>
                  <p style={{ color: "var(--ko-ink-light)", fontSize: 13, lineHeight: 1.9 }}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-28" style={{ backgroundColor: "var(--ko-bg)" }}>
        <div className="max-w-lg mx-auto px-6 text-center">
          <p
            className="mb-8"
            style={{
              color: "var(--ko-orange)",
              fontSize: 20,
              fontFamily: '"Noto Serif JP", serif',
              fontWeight: 400,
              lineHeight: 2,
              letterSpacing: "0.06em",
            }}
          >
            内側が変われば、
            <br />
            世界が変わる。
          </p>
          <Link
            href="/app/splash"
            className="inline-block px-12 py-4 rounded-2xl transition-all duration-200"
            style={{
              backgroundColor: "var(--ko-orange)",
              color: "var(--ko-white)",
              fontSize: 14,
              letterSpacing: "0.1em",
            }}
          >
            神夫の実践をはじめる
          </Link>
          <p
            className="mt-8"
            style={{
              color: "var(--ko-orange-light)",
              fontSize: 12,
              fontFamily: '"Noto Serif JP", serif',
              fontWeight: 300,
              letterSpacing: "0.08em",
              lineHeight: 2,
            }}
          >
            幸せで、豊かで、ご機嫌に生きること。
          </p>
        </div>
      </section>
    </>
  );
}
