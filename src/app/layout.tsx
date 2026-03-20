import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "KAMIOTTO | 相手を変える前に、自分を整える。",
    template: "%s | KAMIOTTO",
  },
  description:
    "自分自身の在り方を整え、家庭の空気を変えていくためのアプリ。完璧な夫になるのではなく、在り方を育てる。",
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
