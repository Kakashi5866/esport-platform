"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

type RatingWidgetProps = {
  tournamentId: string;
};

export default function RatingWidget({ tournamentId }: RatingWidgetProps) {
  const [average, setAverage] = useState(0);
  const [count, setCount] = useState(0);
  const [myRating, setMyRating] = useState<number | null>(null);
  const [hovered, setHovered] = useState<number | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [loaded, setLoaded] = useState(false);

  async function loadRating() {
    try {
      const { data: sessionData } = await supabase.auth.getSession();
      const token = sessionData.session?.access_token;

      const response = await fetch(
        `/api/ratings?tournament_id=${encodeURIComponent(tournamentId)}`,
        {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        }
      );

      if (response.ok) {
        const data = await response.json();
        setAverage(data.average || 0);
        setCount(data.count || 0);
        setMyRating(data.myRating ?? null);
      }
    } catch (error) {
      console.error("Rating load error:", error);
    } finally {
      setLoaded(true);
    }
  }

  useEffect(() => {
    loadRating();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tournamentId]);

  async function submitRating(rating: number) {
    setSubmitting(true);

    try {
      const { data: sessionData } = await supabase.auth.getSession();
      const token = sessionData.session?.access_token;

      if (!token) {
        alert("You must be logged in to rate a tournament.");
        return;
      }

      const response = await fetch("/api/ratings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ tournament_id: tournamentId, rating }),
      });

      if (response.ok) {
        setMyRating(rating);
        await loadRating();
      }
    } catch (error) {
      console.error("Rating submit error:", error);
    } finally {
      setSubmitting(false);
    }
  }

  if (!loaded) {
    return null;
  }

  return (
    <div
      style={{
        marginTop: "10px",
        padding: "12px 14px",
        borderRadius: "9px",
        background: "#0b1220",
        border: "1px solid #1e293b",
      }}
    >
      <p
        style={{
          margin: "0 0 8px",
          color: "#94a3b8",
          fontSize: "11px",
          fontWeight: 700,
        }}
      >
        {myRating ? "Your rating" : "Rate this tournament"}
      </p>

      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <div style={{ display: "flex", gap: "3px" }}>
          {[1, 2, 3, 4, 5].map((star) => {
            const filled = (hovered ?? myRating ?? 0) >= star;
            return (
              <button
                key={star}
                type="button"
                disabled={submitting}
                onClick={() => submitRating(star)}
                onMouseEnter={() => setHovered(star)}
                onMouseLeave={() => setHovered(null)}
                style={{
                  border: "none",
                  background: "transparent",
                  padding: 0,
                  cursor: submitting ? "not-allowed" : "pointer",
                  fontSize: "20px",
                  lineHeight: 1,
                  color: filled ? "#facc15" : "#334155",
                }}
                aria-label={`Rate ${star} star${star > 1 ? "s" : ""}`}
              >
                ★
              </button>
            );
          })}
        </div>

        {count > 0 && (
          <span style={{ color: "#64748b", fontSize: "11px" }}>
            {average} avg ({count} rating{count === 1 ? "" : "s"})
          </span>
        )}
      </div>
    </div>
  );
}