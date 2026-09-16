"use client";

import { useEffect } from "react";

type ErrorPageProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function ErrorPage({
  error,
  reset,
}: ErrorPageProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#020617",
        color: "white",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "40px 20px",
        textAlign: "center",
      }}
    >
      <div
        style={{
          maxWidth: "600px",
          width: "100%",
          padding: "40px",
          background: "#0f172a",
          border: "1px solid #1e293b",
          borderRadius: "18px",
        }}
      >
        <div
          style={{
            fontSize: "50px",
            marginBottom: "15px",
          }}
        >
          ⚠️
        </div>

        <h1
          style={{
            fontSize: "32px",
            margin: "0 0 15px",
          }}
        >
          Something went wrong
        </h1>

        <p
          style={{
            color: "#94a3b8",
            lineHeight: 1.6,
            marginBottom: "25px",
          }}
        >
          We encountered an unexpected error. Please try again.
        </p>

        <button
          onClick={() => reset()}
          style={{
            padding: "13px 26px",
            border: "none",
            borderRadius: "9px",
            background: "#7c3aed",
            color: "white",
            fontSize: "15px",
            fontWeight: "700",
            cursor: "pointer",
          }}
        >
          Try Again
        </button>
      </div>
    </main>
  );
}