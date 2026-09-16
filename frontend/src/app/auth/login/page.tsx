"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

type Stage = "password" | "otp";

export default function LoginPage() {
  const router = useRouter();
  const [stage, setStage] = useState<Stage>("password");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);
  const [resent, setResent] = useState(false);

  async function handlePasswordSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setLoading(true);

    // Step 1: verify the password is correct.
    const { data, error: passwordError } =
      await supabase.auth.signInWithPassword({ email, password });

    if (passwordError || !data.session) {
      setLoading(false);
      setError(passwordError?.message || "Invalid login credentials");
      return;
    }

    // Immediately sign back out — the password alone should not grant
    // access. The session only becomes valid once the email code below
    // is verified.
    await supabase.auth.signOut();

    // Step 2: send the 6-digit email verification code.
    const { error: otpError } = await supabase.auth.signInWithOtp({
      email,
      options: { shouldCreateUser: false },
    });

    setLoading(false);

    if (otpError) {
      setError(otpError.message);
      return;
    }

    setStage("otp");
  }

  async function handleOtpSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setLoading(true);

    const { data, error: verifyError } = await supabase.auth.verifyOtp({
      email,
      token: otp.trim(),
      type: "email",
    });

    setLoading(false);

    if (verifyError || !data.session) {
      setError(verifyError?.message || "Invalid or expired code");
      return;
    }

    fetch("/api/activity/log", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${data.session.access_token}`,
      },
      body: JSON.stringify({
        action: "LOGIN",
        details: `${email} logged in`,
      }),
    }).catch((err) => console.error("Activity log network error:", err));

    router.push("/");
  }

  async function resendCode() {
    setResending(true);
    setError("");

    const { error: otpError } = await supabase.auth.signInWithOtp({
      email,
      options: { shouldCreateUser: false },
    });

    setResending(false);

    if (otpError) {
      setError(otpError.message);
      return;
    }

    setResent(true);
    setTimeout(() => setResent(false), 3000);
  }

  function backToPassword() {
    setStage("password");
    setOtp("");
    setError("");
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
        {/* BRAND */}
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
            Welcome back, champion.
          </p>
        </div>

        {/* CARD */}
        <div
          style={{
            padding: "32px",
            borderRadius: "20px",
            background: "#0b1220",
            border: "1px solid #1e293b",
            boxShadow: "0 25px 70px rgba(0,0,0,0.3)",
          }}
        >
          {stage === "password" ? (
            <>
              <h1
                style={{
                  margin: "0 0 8px",
                  fontSize: "29px",
                  fontWeight: "900",
                }}
              >
                Login
              </h1>

              <p
                style={{
                  color: "#64748b",
                  margin: "0 0 27px",
                  fontSize: "14px",
                }}
              >
                Sign in to continue to your esports account.
              </p>

              {/* GOOGLE */}
              <button
                type="button"
                style={{
                  width: "100%",
                  padding: "13px",
                  borderRadius: "9px",
                  border: "1px solid #334155",
                  background: "#111827",
                  color: "white",
                  fontWeight: "700",
                  cursor: "pointer",
                  fontSize: "14px",
                }}
              >
                🌐 Continue with Google
              </button>

              {/* DIVIDER */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  margin: "23px 0",
                  color: "#475569",
                  fontSize: "12px",
                }}
              >
                <div
                  style={{
                    flex: 1,
                    height: "1px",
                    background: "#1e293b",
                  }}
                />

                OR

                <div
                  style={{
                    flex: 1,
                    height: "1px",
                    background: "#1e293b",
                  }}
                />
              </div>

              {/* FORM */}
              <form onSubmit={handlePasswordSubmit}>
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

                <label
                  style={{
                    ...labelStyle,
                    marginTop: "17px",
                  }}
                >
                  Password

                  <input
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
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

                <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    marginTop: "10px",
                  }}
                >
                  <Link
                    href="/auth/forgot-password"
                    style={{
                      color: "#a78bfa",
                      fontSize: "12px",
                      textDecoration: "none",
                    }}
                  >
                    Forgot password?
                  </Link>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  style={{
                    width: "100%",
                    marginTop: "22px",
                    padding: "14px",
                    border: "none",
                    borderRadius: "9px",
                    background:
                      "linear-gradient(135deg, #7c3aed, #6366f1)",
                    color: "white",
                    fontWeight: "900",
                    fontSize: "14px",
                    cursor: loading ? "not-allowed" : "pointer",
                    opacity: loading ? 0.7 : 1,
                  }}
                >
                  {loading ? "Verifying..." : "Continue →"}
                </button>
              </form>

              {/* REGISTER */}
              <p
                style={{
                  textAlign: "center",
                  color: "#64748b",
                  fontSize: "13px",
                  marginTop: "25px",
                  marginBottom: 0,
                }}
              >
                Don&apos;t have an account?{" "}
                <Link
                  href="/auth/register"
                  style={{
                    color: "#a78bfa",
                    textDecoration: "none",
                    fontWeight: "800",
                  }}
                >
                  Create one
                </Link>
              </p>
            </>
          ) : (
            <>
              <h1
                style={{
                  margin: "0 0 8px",
                  fontSize: "26px",
                  fontWeight: "900",
                }}
              >
                Verify It&apos;s You
              </h1>

              <p
                style={{
                  color: "#64748b",
                  margin: "0 0 27px",
                  fontSize: "14px",
                  lineHeight: 1.6,
                }}
              >
                We sent an 8-digit code to <strong>{email}</strong>. Enter it
                below to finish logging in.
              </p>

              <form onSubmit={handleOtpSubmit}>
                <label style={labelStyle}>
                  Verification Code

                  <input
                    type="text"
                    inputMode="numeric"
                    maxLength={8}
                    placeholder="12345678"
                    value={otp}
                    onChange={(e) =>
                      setOtp(e.target.value.replace(/[^0-9]/g, ""))
                    }
                    required
                    autoFocus
                    style={{
                      ...inputStyle,
                      letterSpacing: "6px",
                      fontSize: "20px",
                      textAlign: "center",
                    }}
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

                {resent && (
                  <p
                    style={{
                      color: "#4ade80",
                      fontSize: "13px",
                      marginTop: "12px",
                      marginBottom: 0,
                    }}
                  >
                    Code resent! Check your inbox.
                  </p>
                )}

                <button
                  type="submit"
                  disabled={loading || otp.length !== 8}
                  style={{
                    width: "100%",
                    marginTop: "22px",
                    padding: "14px",
                    border: "none",
                    borderRadius: "9px",
                    background:
                      loading || otp.length !== 8
                        ? "#334155"
                        : "linear-gradient(135deg, #7c3aed, #6366f1)",
                    color: "white",
                    fontWeight: "900",
                    fontSize: "14px",
                    cursor:
                      loading || otp.length !== 8
                        ? "not-allowed"
                        : "pointer",
                  }}
                >
                  {loading ? "Verifying..." : "Verify & Login →"}
                </button>
              </form>

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginTop: "20px",
                }}
              >
                <button
                  type="button"
                  onClick={backToPassword}
                  style={{
                    background: "none",
                    border: "none",
                    color: "#64748b",
                    fontSize: "12px",
                    cursor: "pointer",
                    padding: 0,
                  }}
                >
                  ← Back
                </button>

                <button
                  type="button"
                  onClick={resendCode}
                  disabled={resending}
                  style={{
                    background: "none",
                    border: "none",
                    color: "#a78bfa",
                    fontSize: "12px",
                    fontWeight: "700",
                    cursor: resending ? "not-allowed" : "pointer",
                    padding: 0,
                  }}
                >
                  {resending ? "Sending..." : "Resend code"}
                </button>
              </div>
            </>
          )}
        </div>

        {/* BACK */}
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