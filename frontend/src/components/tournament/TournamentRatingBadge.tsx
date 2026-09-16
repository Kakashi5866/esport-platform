"use client";

import { useEffect, useState } from "react";

type TournamentRatingBadgeProps = {
  tournamentId: string;
};

export default function TournamentRatingBadge({
  tournamentId,
}: TournamentRatingBadgeProps) {
  const [average, setAverage] = useState(0);
  const [count, setCount] = useState(0);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    fetch(`/api/ratings?tournament_id=${encodeURIComponent(tournamentId)}`)
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data) {
          setAverage(data.average || 0);
          setCount(data.count || 0);
        }
      })
      .catch(() => {})
      .finally(() => setLoaded(true));
  }, [tournamentId]);

  if (!loaded || count === 0) {
    return null;
  }

  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "6px",
        marginTop: "14px",
        padding: "6px 12px",
        borderRadius: "999px",
        background: "#0b1220",
        border: "1px solid #1e293b",
      }}
    >
      <span style={{ color: "#facc15", fontSize: "13px" }}>★</span>
      <span style={{ color: "#e2e8f0", fontSize: "12px", fontWeight: 800 }}>
        {average}
      </span>
      <span style={{ color: "#64748b", fontSize: "11px" }}>
        ({count} rating{count === 1 ? "" : "s"})
      </span>
    </div>
  );
}