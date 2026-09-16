"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";

export default function RegisterPage() {
  const router = useRouter();
  const { register } = useAuth();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (!agreed) {
      setError("Please agree to the Terms of Service.");
      return;
    }

    setLoading(true);

    const { error: registerError } = await register(email, password);

    setLoading(false);

    if (registerError) {
      setError(registerError.message);
      return;
    }

    router.push("/");
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
          maxWidth: "470px",
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
            Create your account and enter the arena.
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
          <h1
            style={{
              margin: "0 0 8px",
              fontSize: "29px",
              fontWeight: "900",
            }}
          >
            Create Account
          </h1>

          <p
            style={{
              color: "#64748b",
              margin: "0 0 27px",
              fontSize: "14px",
            }}
          >
            Join tournaments, build your profile and climb the leaderboard.
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
          <form onSubmit={handleSubmit}>
            <label style={labelStyle}>
              Username

              <input
                type="text"
                placeholder="Choose your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
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
                placeholder="Create a strong password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
                style={inputStyle}
              />
            </label>

            <label
              style={{
                ...labelStyle,
                marginTop: "17px",
              }}
            >
              Confirm Password

              <input
                type="password"
                placeholder="Repeat your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                style={inputStyle}
              />
            </label>

            {/* TERMS */}
            <label
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: "9px",
                marginTop: "19px",
                color: "#64748b",
                fontSize: "12px",
                lineHeight: "1.5",
                cursor: "pointer",
              }}
            >
              <input
                type="checkbox"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                style={{
                  marginTop: "2px",
                  accentColor: "#7c3aed",
                }}
              />

              <span>
                I agree to the{" "}
                <Link
                  href="#"
                  style={{
                    color: "#a78bfa",
                    textDecoration: "none",
                  }}
                >
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link
                  href="#"
                  style={{
                    color: "#a78bfa",
                    textDecoration: "none",
                  }}
                >
                  Privacy Policy
                </Link>
                .
              </span>
            </label>

            {error && (
              <p
                style={{
                  color: "#f87171",
                  fontSize: "13px",
                  marginTop: "14px",
                  marginBottom: 0,
                }}
              >
                {error}
              </p>
            )}

            {/* REGISTER */}
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
              {loading ? "Creating account..." : "Create Account →"}
            </button>
          </form>

          {/* LOGIN */}
          <p
            style={{
              textAlign: "center",
              color: "#64748b",
              fontSize: "13px",
              marginTop: "25px",
              marginBottom: 0,
            }}
          >
            Already have an account?{" "}
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