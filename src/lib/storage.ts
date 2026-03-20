/* ── KAMIOTTO localStorage utilities ── */

export interface ReflectionEntry {
  date: string;
  question: string;
  text: string;
  timestamp: number;
}

export interface PracticeRecord {
  date: string;
  practiceId: number;
  practiceTitle: string;
  completedAt: number;
  note?: string;
}

export interface WeeklyEntry {
  weekKey: string;
  text: string;
  timestamp: number;
}

/* ── date helpers ── */

export function getTodayKey(): string {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;
}

export function getWeekKey(): string {
  const now = new Date();
  const onejan = new Date(now.getFullYear(), 0, 1);
  const week = Math.ceil(((now.getTime() - onejan.getTime()) / 86400000 + onejan.getDay() + 1) / 7);
  return `${now.getFullYear()}-W${String(week).padStart(2, "0")}`;
}

export function getFormattedDate(): string {
  const now = new Date();
  const month = now.getMonth() + 1;
  const day = now.getDate();
  const weekdays = ["日", "月", "火", "水", "木", "金", "土"];
  return `${month}月${day}日（${weekdays[now.getDay()]}）`;
}

export function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 10) return "おはようございます。";
  if (hour < 17) return "こんにちは。";
  return "おつかれさまです。";
}

/* ── reflections ── */

const REFLECTIONS_KEY = "kamiotto_reflections";

export function loadReflections(): ReflectionEntry[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(REFLECTIONS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveReflection(entry: ReflectionEntry) {
  const all = loadReflections();
  const existing = all.findIndex((r) => r.date === entry.date);
  if (existing >= 0) {
    all[existing] = entry;
  } else {
    all.unshift(entry);
  }
  localStorage.setItem(REFLECTIONS_KEY, JSON.stringify(all));
}

export function getTodayReflection(): ReflectionEntry | undefined {
  return loadReflections().find((r) => r.date === getTodayKey());
}

export function getRecentReflections(limit: number): ReflectionEntry[] {
  return loadReflections().slice(0, limit);
}

/* ── practice records ── */

const PRACTICES_KEY = "kamiotto_practices";

export function loadPracticeRecords(): PracticeRecord[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(PRACTICES_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function savePracticeRecord(record: PracticeRecord) {
  const all = loadPracticeRecords();
  all.unshift(record);
  localStorage.setItem(PRACTICES_KEY, JSON.stringify(all));
}

export function getTodayPracticeIds(): number[] {
  const today = getTodayKey();
  return loadPracticeRecords()
    .filter((r) => r.date === today)
    .map((r) => r.practiceId);
}

/* ── weekly reflections ── */

const WEEKLY_KEY = "kamiotto_weekly";

export function loadWeeklyEntries(): WeeklyEntry[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(WEEKLY_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveWeeklyEntry(entry: WeeklyEntry) {
  const all = loadWeeklyEntries();
  const existing = all.findIndex((w) => w.weekKey === entry.weekKey);
  if (existing >= 0) {
    all[existing] = entry;
  } else {
    all.unshift(entry);
  }
  localStorage.setItem(WEEKLY_KEY, JSON.stringify(all));
}

export function getCurrentWeeklyEntry(): WeeklyEntry | undefined {
  return loadWeeklyEntries().find((w) => w.weekKey === getWeekKey());
}

/* ── stats ── */

export function getStats() {
  const reflections = loadReflections();
  const practices = loadPracticeRecords();
  const weekly = loadWeeklyEntries();

  const uniqueDays = new Set([
    ...reflections.map((r) => r.date),
    ...practices.map((p) => p.date),
  ]);

  // streak
  let streak = 0;
  const today = new Date();
  for (let i = 0; i < 365; i++) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
    if (uniqueDays.has(key)) {
      streak++;
    } else if (i > 0) {
      break;
    }
  }

  return {
    totalReflections: reflections.length,
    totalPractices: practices.length,
    totalWeekly: weekly.length,
    totalDays: uniqueDays.size,
    streak,
  };
}
