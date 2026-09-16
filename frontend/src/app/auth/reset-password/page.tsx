"use client";

import Link from "next/link";
import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function ResetPasswordPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    // Supabase automatically exchanges the recovery token in the URL
    // for a temporary session when this page loads.
    supabase.auth.onAuthStateChange((event) => {
      if (event === "PASSWORD_RECOVERY" || event === "SIGNED_IN") {
        setReady(true);
      }
    });

    supabase.auth.getSession().then(({ data }) => {
      if (data.session) {
        setReady(true);
      }
    });
  }, []);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);

    const { error: updateError } = await supabase.auth.updateUser({
      password,
    });

    setLoading(false);

    if (updateError) {
      setError(updateError.message);
      return;
    }

    setSuccess(true);
    setTimeout(() => router.push("/auth/login"), 2500);
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
            Set New Password
          </h1>

          {success ? (
            <p
              style={{
                color: "#4ade80",
                margin: "20px 0",
                fontSize: "14px",
                lineHeight: "1.6",
              }}
            >
              Password updated! Redirecting you to login...
            </p>
          ) : !ready ? (
            <p
              style={{
                color: "#64748b",
                margin: "20px 0",
                fontSize: "14px",
                lineHeight: "1.6",
              }}
            >
              Verifying your reset link... If this doesn&apos;t load, the
              link may have expired —{" "}
              <Link href="/auth/forgot-password" style={{ color: "#a78bfa" }}>
                request a new one
              </Link>
              .
            </p>
          ) : (
            <>
              <p
                style={{
                  color: "#64748b",
                  margin: "0 0 27px",
                  fontSize: "14px",
                }}
              >
                Choose a new password for your account.
              </p>

              <form onSubmit={handleSubmit}>
                <label style={labelStyle}>
                  New Password
                  <input
                    type="password"
                    placeholder="At least 6 characters"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    style={inputStyle}
                  />
                </label>

                <label style={{ ...labelStyle, marginTop: "17px" }}>
                  Confirm New Password
                  <input
                    type="password"
                    placeholder="Re-enter password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
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
                  {loading ? "Updating..." : "Update Password"}
                </button>
              </form>
            </>
          )}
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