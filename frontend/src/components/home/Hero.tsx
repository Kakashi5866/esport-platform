"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const words = ["COMPETE.", "DOMINATE.", "WIN."];

export default function Hero() {
  const router = useRouter();
  const [wordIndex, setWordIndex] = useState(0);

  function scrollToHowItWorks() {
    document
      .getElementById("how-it-works")
      ?.scrollIntoView({ behavior: "smooth" });
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex((current) => (current + 1) % words.length);
    }, 1800);

    return () => clearInterval(interval);
  }, []);

  return (
    <section
      style={{
        minHeight: "calc(90vh - 72px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
        background:
          "radial-gradient(circle at 50% 30%, #312e81 0%, #111827 35%, #020617 75%)",
        color: "white",
        textAlign: "center",
        padding: "80px 30px",
      }}
    >
      {/* Background glow */}
      <div
        style={{
          position: "absolute",
          width: "450px",
          height: "450px",
          borderRadius: "50%",
          background: "#7c3aed",
          filter: "blur(140px)",
          opacity: 0.25,
          top: "-180px",
          left: "-120px",
          animation: "floatGlow 6s ease-in-out infinite alternate",
        }}
      />

      <div
        style={{
          position: "absolute",
          width: "350px",
          height: "350px",
          borderRadius: "50%",
          background: "#2563eb",
          filter: "blur(130px)",
          opacity: 0.2,
          bottom: "-180px",
          right: "-100px",
          animation: "floatGlow 5s ease-in-out infinite alternate-reverse",
        }}
      />

      {/* Main content */}
      <div
        style={{
          position: "relative",
          zIndex: 2,
          maxWidth: "900px",
        }}
      >
        <div
          style={{
            display: "inline-block",
            padding: "8px 16px",
            border: "1px solid #4c1d95",
            borderRadius: "999px",
            background: "rgba(124, 58, 237, 0.12)",
            color: "#c4b5fd",
            fontSize: "13px",
            fontWeight: "700",
            letterSpacing: "1.5px",
            marginBottom: "25px",
          }}
        >
          ⚡ INDIA'S COMPETITIVE ESPORTS PLATFORM
        </div>

        <h1
          style={{
            fontSize: "clamp(45px, 7vw, 82px)",
            lineHeight: 1,
            fontWeight: 900,
            margin: "0 0 20px",
            letterSpacing: "-3px",
          }}
        >
          PLAY.
          <br />

          <span
            style={{
              color: "#a78bfa",
              display: "inline-block",
              minWidth: "430px",
              transition: "opacity 0.3s ease",
            }}
          >
            {words[wordIndex]}
          </span>
        </h1>

        <p
          style={{
            maxWidth: "650px",
            margin: "0 auto 35px",
            color: "#cbd5e1",
            fontSize: "18px",
            lineHeight: 1.7,
          }}
        >
          Enter competitive tournaments, challenge skilled players, climb the
          leaderboard and fight for your share of the prize pool.
        </p>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "15px",
            flexWrap: "wrap",
          }}
        >
          <button
            onClick={() => router.push("/tournaments")}
            style={{
              padding: "15px 30px",
              border: "none",
              borderRadius: "10px",
              background: "#7c3aed",
              color: "white",
              fontSize: "16px",
              fontWeight: "800",
              cursor: "pointer",
              boxShadow: "0 10px 35px rgba(124, 58, 237, 0.35)",
            }}
          >
            Explore Tournaments →
          </button>

          <button
            onClick={scrollToHowItWorks}
            style={{
              padding: "15px 30px",
              border: "1px solid #475569",
              borderRadius: "10px",
              background: "rgba(15, 23, 42, 0.6)",
              color: "#e2e8f0",
              fontSize: "16px",
              fontWeight: "700",
              cursor: "pointer",
            }}
          >
            How It Works
          </button>
        </div>

        {/* Live indicator */}
        <div
          style={{
            marginTop: "45px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "9px",
            color: "#94a3b8",
            fontSize: "14px",
          }}
        >
          <span
            style={{
              width: "8px",
              height: "8px",
              borderRadius: "50%",
              background: "#22c55e",
              boxShadow: "0 0 12px #22c55e",
            }}
          />

          Live tournaments are waiting for you
        </div>
      </div>

      <style>{`
        @keyframes floatGlow {
          from {
            transform: translate(0, 0) scale(1);
          }

          to {
            transform: translate(50px, 30px) scale(1.15);
          }
        }
      `}</style>
    </section>
  );
}