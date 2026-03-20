"use client";

import Link from "next/link";
import { BookOpen, MessageCircle, User } from "lucide-react";

interface BottomNavProps {
  active: "home" | "learn" | "dialog" | "mypage";
}

function HomeIcon() {
  return (
    <svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.3} strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  );
}

const items = [
  { key: "home", href: "/app/home", icon: <HomeIcon />, label: "ホーム" },
  { key: "learn", href: "/app/learn", icon: <BookOpen size={20} strokeWidth={1.3} />, label: "学び" },
  { key: "dialog", href: "/app/dialog", icon: <MessageCircle size={20} strokeWidth={1.3} />, label: "対話" },
  { key: "mypage", href: "/app/mypage", icon: <User size={20} strokeWidth={1.3} />, label: "マイページ" },
] as const;

export default function BottomNav({ active }: BottomNavProps) {
  return (
    <nav
      className="fixed bottom-0 left-0 right-0 flex items-center justify-around py-4 border-t z-50"
      style={{ backgroundColor: "var(--ko-white)", borderColor: "var(--ko-border)" }}
    >
      {items.map((item) => (
        <Link
          key={item.key}
          href={item.href}
          className="flex flex-col items-center gap-1"
          style={{ color: item.key === active ? "var(--ko-orange)" : "var(--ko-orange-light)" }}
        >
          {item.icon}
          <span style={{ fontSize: 10, letterSpacing: "0.05em" }}>{item.label}</span>
        </Link>
      ))}
    </nav>
  );
}
