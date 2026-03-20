"use client";

interface KamiottoLogoProps {
  size?: number;
  showWordmark?: boolean;
  color?: string;
  className?: string;
}

/**
 * KAMIOTTO Logo — 二重円（未完成の円）+ ワードマーク
 * 外円：家庭・世界・場
 * 内円：自分の在り方・内面
 * 少し開いた隙間：未完成さ、更新、呼吸、伸びしろ
 */
export default function KamiottoLogo({
  size = 48,
  showWordmark = true,
  color = "var(--ko-orange)",
  className = "",
}: KamiottoLogoProps) {
  const strokeWidth = size > 40 ? 2 : 1.5;

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="KAMIOTTO logo"
      >
        <path
          d="M 85 50 A 35 35 0 1 1 62 18"
          stroke={color}
          strokeWidth={strokeWidth * 1.2}
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M 30 50 A 20 20 0 1 1 42 70"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          fill="none"
        />
      </svg>

      {showWordmark && (
        <span
          className="tracking-[0.2em] font-light"
          style={{
            color,
            fontSize: size * 0.38,
            fontFamily: '"Noto Serif JP", serif',
            letterSpacing: "0.2em",
          }}
        >
          KAMIOTTO
        </span>
      )}
    </div>
  );
}
