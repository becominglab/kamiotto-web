import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "神夫養成研究所 | あなたが整い、家族が笑う",
    template: "%s | 神夫養成研究所",
  },
  description:
    "幸せは家庭から。自分の内側を整え、愛と感謝をもってパートナーと向き合う。神夫養成研究所の実践アプリ。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;500;700&family=Noto+Serif+JP:wght@300;400;500;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        className="antialiased min-h-screen"
        style={{
          backgroundColor: "var(--ko-bg)",
          color: "var(--ko-ink)",
          fontFamily: '"Noto Sans JP", sans-serif',
        }}
      >
        {children}
      </body>
    </html>
  );
}
