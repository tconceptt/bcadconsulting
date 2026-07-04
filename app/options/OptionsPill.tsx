import Link from "next/link";

export function OptionsPill({ current }: { current: string }) {
  return (
    <Link
      href="/options"
      className="fixed bottom-4 left-4 z-50 inline-flex items-center gap-2 rounded-full bg-black/80 px-4 py-2 text-xs font-medium text-white shadow-lg backdrop-blur-sm transition hover:bg-black"
    >
      <span aria-hidden>←</span> All options
      <span className="text-white/50">·</span>
      <span className="text-white/70">{current}</span>
    </Link>
  );
}
