import { useMemo } from "react";

export default function IconTile({ label, accent = false }) {
  const initials = useMemo(
    () =>
      label
        .split(" ")
        .map((part) => part[0])
        .join("")
        .slice(0, 2)
        .toUpperCase(),
    [label],
  );

  return (
    <span
      className={`inline-flex h-12 w-12 items-center justify-center rounded-2xl border text-sm font-bold ${
        accent
          ? "border-accent/40 bg-accent/15 text-accent"
          : "border-white/10 bg-white/5 text-slate-200"
      }`}
      aria-hidden="true"
    >
      {initials}
    </span>
  );
}
