"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";

const SLIDES = [
  {
    icon: "🔍",
    title: "Find a Tournament",
    text: "Browse live and upcoming tournaments across Free Fire, BGMI, Valorant, CS2 and Call of Duty.",
  },
  {
    icon: "📝",
    title: "Register",
    text: "Fill in your player details (and teammates, if needed) to lock your slot before it fills up.",
  },
  {
    icon: "🔑",
    title: "Get Your Room ID",
    text: "10–15 minutes before your match, we'll share the Room ID and password so you can join.",
  },
  {
    icon: "🏆",
    title: "Play & Win",
    text: "Play your best, climb the leaderboard, and win real cash prizes. Good luck!",
  },
];

function storageKey(userId: string) {
  return `onboarding_seen_${userId}`;
}

export default function OnboardingModal() {
  const { user, loading } = useAuth();
  const [visible, setVisible] = useState(false);
  const [slide, setSlide] = useState(0);

  useEffect(() => {
    if (loading || !user) return;

    try {
      const seen = window.localStorage.getItem(storageKey(user.id));
      if (!seen) {
        setVisible(true);
      }
    } catch {
      // localStorage can fail in some environments — fail silently.
    }
  }, [loading, user]);

  function close() {
    if (user) {
      try {
        window.localStorage.setItem(storageKey(user.id), "1");
      } catch {
        // ignore
      }
    }
    setVisible(false);
    setSlide(0);
  }

  if (!visible || !user) {
    return null;
  }

  const current = SLIDES[slide];
  const isLast = slide === SLIDES.length - 1;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(2, 6, 23, 0.85)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
        zIndex: 999,
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "420px",
          background: "#0f172a",
          border: "1px solid #1e293b",
          borderRadius: "18px",
          padding: "32px 28px",
          textAlign: "center",
        }}
      >
        <div style={{ fontSize: "48px", marginBottom: "16px" }}>
          {current.icon}
        </div>

        <h2
          style={{
            margin: "0 0 10px",
            fontSize: "21px",
            color: "white",
          }}
        >
          {current.title}
        </h2>

        <p
          style={{
            margin: "0 0 26px",
            color: "#94a3b8",
            fontSize: "13px",
            lineHeight: 1.6,
          }}
        >
          {current.text}
        </p>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "6px",
            marginBottom: "22px",
          }}
        >
          {SLIDES.map((_, index) => (
            <span
              key={index}
              style={{
                width: index === slide ? "20px" : "6px",
                height: "6px",
                borderRadius: "999px",
                background: index === slide ? "#7c3aed" : "#334155",
                transition: "all 0.2s",
              }}
            />
          ))}
        </div>

        <div style={{ display: "flex", gap: "10px" }}>
          {!isLast && (
            <button
              type="button"
              onClick={close}
              style={{
                flex: 1,
                padding: "13px",
                border: "1px solid #1e293b",
                borderRadius: "9px",
                background: "transparent",
                color: "#94a3b8",
                fontWeight: 800,
                fontSize: "13px",
                cursor: "pointer",
              }}
            >
              Skip
            </button>
          )}

          <button
            type="button"
            onClick={() => (isLast ? close() : setSlide((s) => s + 1))}
            style={{
              flex: 1,
              padding: "13px",
              border: "none",
              borderRadius: "9px",
              background: "linear-gradient(135deg, #7c3aed, #6366f1)",
              color: "white",
              fontWeight: 800,
              fontSize: "13px",
              cursor: "pointer",
            }}
          >
            {isLast ? "Get Started" : "Next"}
          </button>
        </div>
      </div>
    </div>
  );
}