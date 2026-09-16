"use client";

import { useEffect, useRef, useState } from "react";

type ShareButtonProps = {
  /** Text shared alongside the link, e.g. "Check out my profile on Esports Platform!" */
  text: string;
  /** Path to share, e.g. "/players/shadowx". Combined with window.location.origin at click time. */
  path: string;
  /** Button label, e.g. "Share Profile" or "Share Tournament" */
  label?: string;
};

export default function ShareButton({
  text,
  path,
  label = "Share",
}: ShareButtonProps) {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function getUrl() {
    return `${window.location.origin}${path}`;
  }

  function shareWhatsApp() {
    const url = getUrl();
    const message = `${text} 👉 ${url}`;
    window.open(
      `https://wa.me/?text=${encodeURIComponent(message)}`,
      "_blank"
    );
    setOpen(false);
  }

  function shareTwitter() {
    const url = getUrl();
    window.open(
      `https://twitter.com/intent/tweet?text=${encodeURIComponent(
        text
      )}&url=${encodeURIComponent(url)}`,
      "_blank"
    );
    setOpen(false);
  }

  async function copyLink() {
    const url = getUrl();

    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard API can fail (e.g. insecure context) — fall back silently.
    }
  }

  return (
    <div style={{ position: "relative", display: "inline-block" }} ref={menuRef}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        style={shareButton}
      >
        🔗 {label}
      </button>

      {open && (
        <div style={menu}>
          <button type="button" onClick={shareWhatsApp} style={menuItem}>
            <span style={{ fontSize: "16px" }}>💬</span> WhatsApp
          </button>

          <button type="button" onClick={shareTwitter} style={menuItem}>
            <span style={{ fontSize: "16px" }}>𝕏</span> Twitter / X
          </button>

          <button type="button" onClick={copyLink} style={menuItem}>
            <span style={{ fontSize: "16px" }}>{copied ? "✅" : "📋"}</span>{" "}
            {copied ? "Copied!" : "Copy Link"}
          </button>
        </div>
      )}
    </div>
  );
}

const shareButton = {
  display: "flex",
  alignItems: "center",
  gap: "6px",
  padding: "10px 16px",
  borderRadius: "9px",
  border: "1px solid #312e81",
  background: "#0b1220",
  color: "#c4b5fd",
  fontSize: "12px",
  fontWeight: "800" as const,
  cursor: "pointer",
};

const menu = {
  position: "absolute" as const,
  top: "calc(100% + 8px)",
  left: 0,
  width: "170px",
  borderRadius: "10px",
  border: "1px solid #1e293b",
  background: "#0b1220",
  boxShadow: "0 20px 50px rgba(0,0,0,0.45)",
  overflow: "hidden",
  zIndex: 20,
};

const menuItem = {
  display: "flex",
  alignItems: "center",
  gap: "8px",
  width: "100%",
  padding: "11px 14px",
  border: "none",
  background: "transparent",
  color: "#cbd5e1",
  fontSize: "12px",
  fontWeight: "700" as const,
  cursor: "pointer",
  textAlign: "left" as const,
};