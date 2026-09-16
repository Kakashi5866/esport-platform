"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { supabase } from "@/lib/supabase";

const contactOptions = [
  {
    icon: "🎮",
    title: "Tournament Support",
    text: "Tournament registration, match issues or competition-related questions.",
    action: "View Tournaments",
    href: "/tournaments",
  },
  {
    icon: "🛡️",
    title: "Player Support",
    text: "Need help with your account, profile or player experience?",
    action: "Get Help",
    href: "#contact-form",
  },
  {
    icon: "🤝",
    title: "Partnerships",
    text: "Want to collaborate with our esports platform or community?",
    action: "Contact Us",
    href: "#contact-form",
  },
];

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle"
  );
  const [honeypot, setHoneypot] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (honeypot) {
      setStatus("sent");
      return;
    }
    if (!name.trim() || !email.trim() || !message.trim()) {
      return;
    }

    setStatus("sending");

    const { error } = await supabase.from("contact_messages").insert({
      name: name.trim(),
      email: email.trim(),
      subject: subject || "other",
      message: message.trim(),
    });

    if (error) {
      console.error("Contact form error:", error);
      setStatus("error");
      return;
    }

    setStatus("sent");
    setName("");
    setEmail("");
    setSubject("");
    setMessage("");
  }

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#020617",
        color: "white",
      }}
    >
      {/* HERO */}
      <section
        style={{
          padding: "100px 24px 70px",
          textAlign: "center",
          background:
            "radial-gradient(circle at top, rgba(124,58,237,0.22), transparent 58%)",
        }}
      >
        <div
          style={{
            maxWidth: "800px",
            margin: "0 auto",
          }}
        >
          <div
            style={{
              display: "inline-block",
              padding: "7px 15px",
              borderRadius: "999px",
              border: "1px solid #4c1d95",
              color: "#c4b5fd",
              fontSize: "12px",
              fontWeight: "800",
              letterSpacing: "1px",
            }}
          >
            SUPPORT CENTER
          </div>

          <h1
            style={{
              fontSize: "clamp(42px, 7vw, 70px)",
              lineHeight: "1",
              margin: "20px 0",
              fontWeight: "900",
            }}
          >
            Let&apos;s talk.
          </h1>

          <p
            style={{
              maxWidth: "650px",
              margin: "0 auto",
              color: "#94a3b8",
              fontSize: "17px",
              lineHeight: "1.8",
            }}
          >
            Have a question, need some help or want to work with us?
            Our team is ready to hear from you.
          </p>
        </div>
      </section>

      {/* CONTACT OPTIONS */}
      <section
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
          padding: "20px 24px 70px",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "18px",
          }}
        >
          {contactOptions.map((option) => (
            <div
              key={option.title}
              style={{
                padding: "25px",
                borderRadius: "18px",
                border: "1px solid #1e293b",
                background: "#0b1220",
              }}
            >
              <div
                style={{
                  fontSize: "32px",
                  marginBottom: "16px",
                }}
              >
                {option.icon}
              </div>

              <h2
                style={{
                  fontSize: "20px",
                  margin: "0 0 10px",
                }}
              >
                {option.title}
              </h2>

              <p
                style={{
                  color: "#64748b",
                  lineHeight: "1.7",
                  fontSize: "14px",
                  minHeight: "70px",
                }}
              >
                {option.text}
              </p>

              <Link
                href={option.href}
                style={{
                  color: "#a78bfa",
                  textDecoration: "none",
                  fontWeight: "700",
                  fontSize: "14px",
                }}
              >
                {option.action} →
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* CONTACT AREA */}
      <section
        id="contact-form"
        style={{
          padding: "80px 24px",
          background: "#070d1a",
          borderTop: "1px solid #111827",
          borderBottom: "1px solid #111827",
        }}
      >
        <div
          style={{
            maxWidth: "1050px",
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "0.8fr 1.2fr",
            gap: "50px",
          }}
        >
          {/* CONTACT INFO */}
          <div>
            <p
              style={{
                color: "#8b5cf6",
                fontWeight: "800",
                fontSize: "13px",
                letterSpacing: "2px",
              }}
            >
              GET IN TOUCH
            </p>

            <h2
              style={{
                fontSize: "38px",
                lineHeight: "1.15",
                margin: "10px 0 18px",
              }}
            >
              We&apos;re here to help.
            </h2>

            <p
              style={{
                color: "#94a3b8",
                lineHeight: "1.8",
                fontSize: "15px",
              }}
            >
              Tell us what you need and our team will get back to you.
              For tournament-related questions, you can also explore
              our tournament section.
            </p>

            <div
              style={{
                marginTop: "35px",
                display: "grid",
                gap: "18px",
              }}
            >
              <ContactInfo
                icon="📧"
                title="Email"
                value="support@esportsplatform.com"
              />

              <ContactInfo
                icon="💬"
                title="Community"
                value="Join our esports community"
              />

              <ContactInfo
                icon="⏱️"
                title="Support Hours"
                value="Mon - Sat • 10 AM - 7 PM"
              />
            </div>
          </div>

          {/* FORM */}
          <form
            onSubmit={handleSubmit}
            style={{
              padding: "30px",
              borderRadius: "20px",
              border: "1px solid #1e293b",
              background: "#0b1220",
            }}
          >
            <h3
              style={{
                margin: "0 0 22px",
                fontSize: "24px",
              }}
            >
              Send us a message
            </h3>

            <div
              style={{
                display: "grid",
                gap: "17px",
              }}
            >
              <label style={labelStyle}>
                Name

                <input
                  type="text"
                  placeholder="Your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  style={inputStyle}
                />
              </label>

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

              <label style={labelStyle}>
                Subject

                <select
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  style={inputStyle}
                >
                  <option value="" disabled>
                    Select a topic
                  </option>

                  <option value="tournament">
                    Tournament Support
                  </option>

                  <option value="account">
                    Account Support
                  </option>

                  <option value="partnership">
                    Partnership
                  </option>

                  <option value="other">
                    Other
                  </option>
                </select>
              </label>

              <label style={labelStyle}>
                Message

                <textarea
                  placeholder="Tell us how we can help..."
                  rows={6}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                  style={{
                    ...inputStyle,
                    resize: "vertical",
                  }}
                />
              </label>

              <button
                type="submit"
                disabled={status === "sending"}
                style={{
                  marginTop: "5px",
                  padding: "14px",
                  border: "none",
                  borderRadius: "9px",
                  background:
                    "linear-gradient(135deg, #7c3aed, #6366f1)",
                  color: "white",
                  fontWeight: "800",
                  fontSize: "14px",
                  cursor: status === "sending" ? "not-allowed" : "pointer",
                  opacity: status === "sending" ? 0.7 : 1,
                }}
              >
                {status === "sending" ? "Sending..." : "Send Message →"}
              </button>

              {status === "sent" && (
                <p style={{ color: "#4ade80", margin: 0, fontSize: "14px" }}>
                  Message sent! We&apos;ll get back to you soon.
                </p>
              )}

              {status === "error" && (
                <p style={{ color: "#f87171", margin: 0, fontSize: "14px" }}>
                  Something went wrong. Please try again.
                </p>
              )}
            </div>
            <input
              type="text"
              value={honeypot}
              onChange={(e) => setHoneypot(e.target.value)}
              autoComplete="off"
              tabIndex={-1}
               style={{
                position: "absolute",
                 left: "-9999px",
                 opacity: 0,
                 height: 0,
                 width: 0,
               }}
             aria-hidden="true"
           />
          </form>
        </div>
      </section>

      {/* QUICK LINKS */}
      <section
        style={{
          padding: "75px 24px",
          textAlign: "center",
        }}
      >
        <h2
          style={{
            fontSize: "30px",
            marginBottom: "12px",
          }}
        >
          Looking for something else?
        </h2>

        <p
          style={{
            color: "#64748b",
            marginBottom: "25px",
          }}
        >
          Explore the platform and find your next competition.
        </p>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "12px",
            flexWrap: "wrap",
          }}
        >
          <Link href="/tournaments" style={primaryButton}>
            Browse Tournaments
          </Link>

          <Link href="/leaderboard" style={secondaryButton}>
            View Leaderboard
          </Link>

          <Link href="/about" style={secondaryButton}>
            About Us
          </Link>
        </div>
      </section>

      <style>{`
        @media (max-width: 750px) {
          #contact-form > div {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </main>
  );
}

function ContactInfo({
  icon,
  title,
  value,
}: {
  icon: string;
  title: string;
  value: string;
}) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "14px",
      }}
    >
      <div
        style={{
          width: "42px",
          height: "42px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "10px",
          background: "#111827",
          border: "1px solid #1e293b",
        }}
      >
        {icon}
      </div>

      <div>
        <strong
          style={{
            display: "block",
            fontSize: "14px",
          }}
        >
          {title}
        </strong>

        <span
          style={{
            color: "#64748b",
            fontSize: "13px",
          }}
        >
          {value}
        </span>
      </div>
    </div>
  );
}

const labelStyle = {
  display: "grid",
  gap: "7px",
  color: "#cbd5e1",
  fontSize: "13px",
  fontWeight: "700",
};

const inputStyle = {
  width: "100%",
  boxSizing: "border-box" as const,
  padding: "12px 13px",
  borderRadius: "8px",
  border: "1px solid #334155",
  background: "#020617",
  color: "white",
  outline: "none",
  fontSize: "14px",
};

const primaryButton = {
  display: "inline-block",
  padding: "12px 19px",
  borderRadius: "9px",
  background: "#7c3aed",
  color: "white",
  textDecoration: "none",
  fontWeight: "800",
  fontSize: "14px",
};

const secondaryButton = {
  display: "inline-block",
  padding: "12px 19px",
  borderRadius: "9px",
  background: "#0f172a",
  border: "1px solid #334155",
  color: "#cbd5e1",
  textDecoration: "none",
  fontWeight: "700",
  fontSize: "14px",
};