"use client";

import { useEffect, useState } from "react";

type TournamentCountdownProps = {
  startsAt: string | null;
};

function getTimeParts(startsAt: string) {
  const diffMs = new Date(startsAt).getTime() - Date.now();

  if (diffMs <= 0) {
    return null;
  }

  const totalSeconds = Math.floor(diffMs / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return { days, hours, minutes, seconds };
}

export default function TournamentCountdown({
  startsAt,
}: TournamentCountdownProps) {
  const [parts, setParts] = useState<ReturnType<typeof getTimeParts>>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (!startsAt) return;

    setMounted(true);
    setParts(getTimeParts(startsAt));

    const interval = setInterval(() => {
      setParts(getTimeParts(startsAt));
    }, 1000);

    return () => clearInterval(interval);
  }, [startsAt]);

  if (!startsAt || !mounted) {
    return null;
  }

  if (!parts) {
    return (
      <div style={wrapper}>
        <span style={liveDot}>●</span>
        <span style={liveText}>Tournament has started</span>
      </div>
    );
  }

  const segments = [
    { value: parts.days, label: "d" },
    { value: parts.hours, label: "h" },
    { value: parts.minutes, label: "m" },
    { value: parts.seconds, label: "s" },
  ].filter((segment, index) => segment.value > 0 || index >= 2);

  return (
    <div style={wrapper}>
      <span style={countdownLabel}>Starts in</span>
      <div style={{ display: "flex", gap: "6px" }}>
        {segments.map((segment) => (
          <span key={segment.label} style={segmentBox}>
            {String(segment.value).padStart(2, "0")}
            {segment.label}
          </span>
        ))}
      </div>
    </div>
  );
}

const wrapper = {
  display: "flex",
  alignItems: "center",
  gap: "10px",
  marginTop: "14px",
};

const countdownLabel = {
  color: "#94a3b8",
  fontSize: "12px",
  fontWeight: "700" as const,
};

const segmentBox = {
  padding: "5px 9px",
  borderRadius: "7px",
  background: "#0b1220",
  border: "1px solid #312e81",
  color: "#c4b5fd",
  fontSize: "13px",
  fontWeight: "800" as const,
  fontVariantNumeric: "tabular-nums" as const,
};

const liveDot = {
  color: "#4ade80",
  fontSize: "12px",
};

const liveText = {
  color: "#4ade80",
  fontSize: "13px",
  fontWeight: "700" as const,
};