"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setLoading(true);

    const { error: resetError } = await supabase.auth.resetPasswordForEmail(
      email,
      {
        redirectTo: `${window.location.origin}/auth/reset-password`,
      }
    );

    setLoading(false);

    if (resetError) {
      setError(resetError.message);
      return;
    }

    setSent(true);
  }

  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "40px 20px",
        background:
          "radial-gradient(circle at top, rgba(124,58,237,0.22), transparent 55%), #020617",
        color: "white",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "430px",
        }}
      >
        <div
          style={{
            textAlign: "center",
            marginBottom: "28px",
          }}
        >
          <Link
            href="/"
            style={{
              color: "white",
              textDecoration: "none",
              fontSize: "25px",
              fontWeight: "900",
            }}
          >
            Esports Platform
          </Link>

          <p
            style={{
              color: "#64748b",
              marginTop: "9px",
              fontSize: "14px",
            }}
          >
            Reset your password.
          </p>
        </div>

        <div
          style={{
            padding: "32px",
            borderRadius: "20px",
            background: "#0b1220",
            border: "1px solid #1e293b",
            boxShadow: "0 25px 70px rgba(0,0,0,0.3)",
          }}
        >
          <h1
            style={{
              margin: "0 0 8px",
              fontSize: "29px",
              fontWeight: "900",
            }}
          >
            Forgot Password
          </h1>

          {sent ? (
            <>
              <p
                style={{
                  color: "#4ade80",
                  margin: "20px 0",
                  fontSize: "14px",
                  lineHeight: "1.6",
                }}
              >
                If an account exists for <strong>{email}</strong>, a password
                reset link has been sent. Check your inbox (and spam folder).
              </p>

              <Link
                href="/auth/login"
                style={{
                  display: "block",
                  textAlign: "center",
                  marginTop: "10px",
                  padding: "14px",
                  borderRadius: "9px",
                  background: "linear-gradient(135deg, #7c3aed, #6366f1)",
                  color: "white",
                  fontWeight: "900",
                  fontSize: "14px",
                  textDecoration: "none",
                }}
              >
                Back to Login
              </Link>
            </>
          ) : (
            <>
              <p
                style={{
                  color: "#64748b",
                  margin: "0 0 27px",
                  fontSize: "14px",
                }}
              >
                Enter your email and we&apos;ll send you a link to reset your
                password.
              </p>

              <form onSubmit={handleSubmit}>
                <label style={labelStyle}>
                  Email
                  <input
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    style={inputStyle}
                  />
                </label>

                {error && (
                  <p
                    style={{
                      color: "#f87171",
                      fontSize: "13px",
                      marginTop: "12px",
                      marginBottom: 0,
                    }}
                  >
                    {error}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  style={{
                    width: "100%",
                    marginTop: "22px",
                    padding: "14px",
                    border: "none",
                    borderRadius: "9px",
                    background: "linear-gradient(135deg, #7c3aed, #6366f1)",
                    color: "white",
                    fontWeight: "900",
                    fontSize: "14px",
                    cursor: loading ? "not-allowed" : "pointer",
                    opacity: loading ? 0.7 : 1,
                  }}
                >
                  {loading ? "Sending..." : "Send Reset Link"}
                </button>
              </form>
            </>
          )}

          <p
            style={{
              textAlign: "center",
              color: "#64748b",
              fontSize: "13px",
              marginTop: "25px",
              marginBottom: 0,
            }}
          >
            Remembered your password?{" "}
            <Link
              href="/auth/login"
              style={{
                color: "#a78bfa",
                textDecoration: "none",
                fontWeight: "800",
              }}
            >
              Login
            </Link>
          </p>
        </div>

        <div
          style={{
            textAlign: "center",
            marginTop: "22px",
          }}
        >
          <Link
            href="/"
            style={{
              color: "#64748b",
              textDecoration: "none",
              fontSize: "13px",
            }}
          >
            ← Back to home
          </Link>
        </div>
      </div>
    </main>
  );
}

const labelStyle = {
  display: "grid",
  gap: "8px",
  color: "#cbd5e1",
  fontSize: "13px",
  fontWeight: "700",
};

const inputStyle = {
  width: "100%",
  boxSizing: "border-box" as const,
  padding: "13px",
  borderRadius: "8px",
  border: "1px solid #334155",
  background: "#020617",
  color: "white",
  outline: "none",
  fontSize: "14px",
};