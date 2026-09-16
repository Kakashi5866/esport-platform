"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";
import { useLanguage } from "@/hooks/useLanguage";
import { supabase } from "@/lib/supabase";

type UserSettings = {
  username: string | null;
  bio: string | null;
  ff_uid: string | null;
  bgmi_id: string | null;
  codm_id: string | null;
  valorant_id: string | null;
  notify_tournament_reminder: boolean;
  notify_match_alert: boolean;
  notify_registration_confirm: boolean;
  notify_result: boolean;
  notify_payment: boolean;
  privacy_profile_public: boolean;
  privacy_show_gaming_ids: boolean;
  privacy_show_history: boolean;
  favorite_games: string | null;
  preferred_mode: string | null;
  preferred_region: string | null;
  auto_remind: boolean;
  upi_id: string | null;
  theme_preference: string | null;
  language_preference: string | null;
};

const DEFAULT_SETTINGS: UserSettings = {
  username: "",
  bio: "",
  ff_uid: "",
  bgmi_id: "",
  codm_id: "",
  valorant_id: "",
  notify_tournament_reminder: true,
  notify_match_alert: true,
  notify_registration_confirm: true,
  notify_result: true,
  notify_payment: true,
  privacy_profile_public: true,
  privacy_show_gaming_ids: true,
  privacy_show_history: true,
  favorite_games: "",
  preferred_mode: "Solo",
  preferred_region: "",
  auto_remind: true,
  upi_id: "",
  theme_preference: "dark",
  language_preference: "en",
};

export default function SettingsPage() {
  const router = useRouter();
  const { user, logout } = useAuth();
  const { setLanguage } = useLanguage();

  const [settings, setSettings] = useState<UserSettings>(DEFAULT_SETTINGS);
  const [loadingSettings, setLoadingSettings] = useState(true);
  const [savingSection, setSavingSection] = useState<string | null>(null);
  const [savedSection, setSavedSection] = useState<string | null>(null);
  const [deviceInfo, setDeviceInfo] = useState("");

  useEffect(() => {
    setDeviceInfo(getDeviceInfo());
  }, []);

  const [displayName, setDisplayName] = useState(
    (user?.user_metadata?.full_name as string) || ""
  );
  const [nameStatus, setNameStatus] = useState<
    "idle" | "saving" | "saved" | "error"
  >("idle");

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordStatus, setPasswordStatus] = useState<
    "idle" | "saving" | "saved" | "error"
  >("idle");
  const [passwordError, setPasswordError] = useState("");

  const [deleteConfirm, setDeleteConfirm] = useState(false);
  const [deleting, setDeleting] = useState(false);

  async function getToken() {
    const { data } = await supabase.auth.getSession();
    return data.session?.access_token;
  }

  useEffect(() => {
    async function loadSettings() {
      const token = await getToken();
      if (!token) {
        setLoadingSettings(false);
        return;
      }

      try {
        const response = await fetch("/api/settings", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.ok) {
          const data = await response.json();
          if (data.settings) {
            setSettings({ ...DEFAULT_SETTINGS, ...data.settings });
          }
        }
      } catch (error) {
        console.error("Failed to load settings:", error);
      } finally {
        setLoadingSettings(false);
      }
    }

    loadSettings();
  }, []);

  async function saveSettings(section: string, updates: Partial<UserSettings>) {
    setSavingSection(section);
    setSavedSection(null);

    const token = await getToken();
    if (!token) {
      setSavingSection(null);
      return;
    }

    try {
      const response = await fetch("/api/settings", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updates),
      });

      if (response.ok) {
        setSavedSection(section);
      }
    } catch (error) {
      console.error("Failed to save settings:", error);
    } finally {
      setSavingSection(null);
    }
  }

  function update<K extends keyof UserSettings>(key: K, value: UserSettings[K]) {
    setSettings((current) => ({ ...current, [key]: value }));
  }

  async function handleSaveName(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setNameStatus("saving");

    const { error } = await supabase.auth.updateUser({
      data: { full_name: displayName.trim() },
    });

    setNameStatus(error ? "error" : "saved");
  }

  async function handleChangePassword(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();
    setPasswordError("");

    if (newPassword.length < 6) {
      setPasswordError("Password must be at least 6 characters.");
      setPasswordStatus("error");
      return;
    }

    if (newPassword !== confirmPassword) {
      setPasswordError("Passwords do not match.");
      setPasswordStatus("error");
      return;
    }

    setPasswordStatus("saving");

    const { error } = await supabase.auth.updateUser({
      password: newPassword,
    });

    if (error) {
      setPasswordError(error.message);
      setPasswordStatus("error");
      return;
    }

    setPasswordStatus("saved");
    setNewPassword("");
    setConfirmPassword("");
  }

  async function handleLogout() {
    await logout();
    router.push("/auth/login");
  }

  async function handleDeleteAccount() {
    setDeleting(true);
    const token = await getToken();

    if (!token) {
      setDeleting(false);
      return;
    }

    try {
      const response = await fetch("/api/account/delete", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        alert(data.error || "Failed to delete account.");
        setDeleting(false);
        return;
      }

      await supabase.auth.signOut();
      router.push("/auth/register");
    } catch {
      alert("Failed to delete account.");
      setDeleting(false);
    }
  }

  if (loadingSettings) {
    return (
      <main style={page}>
        <p style={{ color: "#94a3b8", textAlign: "center", paddingTop: "150px" }}>
          Loading settings...
        </p>
      </main>
    );
  }

  return (
    <main style={page}>
      <div style={{ maxWidth: "620px", margin: "0 auto", padding: "100px 24px 80px" }}>
        <Link href="/profile" style={backLink}>
          ← Back to Profile
        </Link>

        <h1 style={{ fontSize: "34px", margin: "20px 0 30px" }}>Settings</h1>

        {/* ACCOUNT */}
        <Section title="Account Email">
          <p style={{ color: "#94a3b8", fontSize: "13px", margin: 0 }}>
            {user?.email}
          </p>
        </Section>

        {/* DISPLAY NAME */}
        <Section title="Display Name">
          <form onSubmit={handleSaveName} style={formGrid}>
            <input
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              placeholder="Enter a display name"
              style={inputStyle}
            />
            {nameStatus === "saved" && <p style={successText}>Display name updated.</p>}
            {nameStatus === "error" && <p style={errorText}>Failed to update name.</p>}
            <button type="submit" disabled={nameStatus === "saving"} style={primaryButton(nameStatus === "saving")}>
              {nameStatus === "saving" ? "Saving..." : "Save Name"}
            </button>
          </form>
        </Section>

        {/* PROFILE */}
        <Section title="Profile" saved={savedSection === "profile"}>
          <div style={formGrid}>
            <label style={fieldLabel}>
              <span style={labelText}>Username</span>
              <input
                value={settings.username || ""}
                onChange={(e) => update("username", e.target.value)}
                placeholder="Choose a username"
                style={inputStyle}
              />
            </label>

            <label style={fieldLabel}>
              <span style={labelText}>Bio</span>
              <textarea
                value={settings.bio || ""}
                onChange={(e) => update("bio", e.target.value)}
                placeholder="Tell others about yourself"
                rows={3}
                style={{ ...inputStyle, resize: "vertical" as const, fontFamily: "inherit" }}
              />
            </label>

            <button
              onClick={() =>
                saveSettings("profile", { username: settings.username, bio: settings.bio })
              }
              disabled={savingSection === "profile"}
              style={primaryButton(savingSection === "profile")}
            >
              {savingSection === "profile" ? "Saving..." : "Save Profile"}
            </button>
          </div>
        </Section>

        {/* GAMING IDS */}
        <Section title="Gaming IDs" saved={savedSection === "gaming"}>
          <div style={formGrid}>
            <label style={fieldLabel}>
              <span style={labelText}>Free Fire UID</span>
              <input value={settings.ff_uid || ""} onChange={(e) => update("ff_uid", e.target.value)} style={inputStyle} />
            </label>
            <label style={fieldLabel}>
              <span style={labelText}>BGMI ID</span>
              <input value={settings.bgmi_id || ""} onChange={(e) => update("bgmi_id", e.target.value)} style={inputStyle} />
            </label>
            <label style={fieldLabel}>
              <span style={labelText}>COD Mobile ID</span>
              <input value={settings.codm_id || ""} onChange={(e) => update("codm_id", e.target.value)} style={inputStyle} />
            </label>
            <label style={fieldLabel}>
              <span style={labelText}>Valorant ID</span>
              <input value={settings.valorant_id || ""} onChange={(e) => update("valorant_id", e.target.value)} style={inputStyle} />
            </label>
            <button
              onClick={() =>
                saveSettings("gaming", {
                  ff_uid: settings.ff_uid,
                  bgmi_id: settings.bgmi_id,
                  codm_id: settings.codm_id,
                  valorant_id: settings.valorant_id,
                })
              }
              disabled={savingSection === "gaming"}
              style={primaryButton(savingSection === "gaming")}
            >
              {savingSection === "gaming" ? "Saving..." : "Save Gaming IDs"}
            </button>
          </div>
        </Section>

        {/* NOTIFICATIONS */}
        <Section title="Notification Controls" saved={savedSection === "notifications"}>
          <div style={formGrid}>
            <Toggle
              label="Tournament reminders"
              checked={settings.notify_tournament_reminder}
              onChange={(v) => update("notify_tournament_reminder", v)}
            />
            <Toggle
              label="Match starting alerts"
              checked={settings.notify_match_alert}
              onChange={(v) => update("notify_match_alert", v)}
            />
            <Toggle
              label="Registration confirmation"
              checked={settings.notify_registration_confirm}
              onChange={(v) => update("notify_registration_confirm", v)}
            />
            <Toggle
              label="Result notifications"
              checked={settings.notify_result}
              onChange={(v) => update("notify_result", v)}
            />
            <Toggle
              label="Prize/payment updates"
              checked={settings.notify_payment}
              onChange={(v) => update("notify_payment", v)}
            />
            <button
              onClick={() =>
                saveSettings("notifications", {
                  notify_tournament_reminder: settings.notify_tournament_reminder,
                  notify_match_alert: settings.notify_match_alert,
                  notify_registration_confirm: settings.notify_registration_confirm,
                  notify_result: settings.notify_result,
                  notify_payment: settings.notify_payment,
                })
              }
              disabled={savingSection === "notifications"}
              style={primaryButton(savingSection === "notifications")}
            >
              {savingSection === "notifications" ? "Saving..." : "Save Notification Settings"}
            </button>
          </div>
        </Section>

        {/* PRIVACY */}
        <Section title="Privacy Controls" saved={savedSection === "privacy"}>
          <div style={formGrid}>
            <Toggle
              label="Profile public"
              checked={settings.privacy_profile_public}
              onChange={(v) => update("privacy_profile_public", v)}
            />
            <Toggle
              label="Show gaming IDs on profile"
              checked={settings.privacy_show_gaming_ids}
              onChange={(v) => update("privacy_show_gaming_ids", v)}
            />
            <Toggle
              label="Show tournament history"
              checked={settings.privacy_show_history}
              onChange={(v) => update("privacy_show_history", v)}
            />
            <button
              onClick={() =>
                saveSettings("privacy", {
                  privacy_profile_public: settings.privacy_profile_public,
                  privacy_show_gaming_ids: settings.privacy_show_gaming_ids,
                  privacy_show_history: settings.privacy_show_history,
                })
              }
              disabled={savingSection === "privacy"}
              style={primaryButton(savingSection === "privacy")}
            >
              {savingSection === "privacy" ? "Saving..." : "Save Privacy Settings"}
            </button>
          </div>
        </Section>

        {/* APPEARANCE */}
        <Section title="Appearance" saved={savedSection === "appearance"}>
          <div style={formGrid}>
            <label style={fieldLabel}>
              <span style={labelText}>Theme</span>
              <select
                value={settings.theme_preference || "dark"}
                onChange={(e) => update("theme_preference", e.target.value)}
                style={inputStyle}
              >
                <option value="dark">Dark</option>
                <option value="light">Light</option>
                <option value="system">System</option>
              </select>
            </label>
            <label style={fieldLabel}>
              <span style={labelText}>Language</span>
              <select
                value={settings.language_preference || "en"}
                onChange={(e) => {
                  update("language_preference", e.target.value);
                  setLanguage(e.target.value === "hi" ? "hi" : "en");
                }}
                style={inputStyle}
              >
                <option value="en">English</option>
                <option value="hi">Hindi</option>
              </select>
            </label>
            <p style={{ color: "#64748b", fontSize: "11px", margin: 0 }}>
              Note: Navbar is now translated live when you switch language.
              Full site-wide translation and theme switching are coming soon.
            </p>
            <button
              onClick={() =>
                saveSettings("appearance", {
                  theme_preference: settings.theme_preference,
                  language_preference: settings.language_preference,
                })
              }
              disabled={savingSection === "appearance"}
              style={primaryButton(savingSection === "appearance")}
            >
              {savingSection === "appearance" ? "Saving..." : "Save Appearance"}
            </button>
          </div>
        </Section>

        {/* TOURNAMENT PREFERENCES */}
        <Section title="Tournament Preferences" saved={savedSection === "tournament"}>
          <div style={formGrid}>
            <label style={fieldLabel}>
              <span style={labelText}>Favorite Games (comma separated)</span>
              <input
                value={settings.favorite_games || ""}
                onChange={(e) => update("favorite_games", e.target.value)}
                placeholder="Free Fire, BGMI, Valorant"
                style={inputStyle}
              />
            </label>
            <label style={fieldLabel}>
              <span style={labelText}>Preferred Mode</span>
              <select
                value={settings.preferred_mode || "Solo"}
                onChange={(e) => update("preferred_mode", e.target.value)}
                style={inputStyle}
              >
                <option value="Solo">Solo</option>
                <option value="Duo">Duo</option>
                <option value="Squad">Squad</option>
              </select>
            </label>
            <label style={fieldLabel}>
              <span style={labelText}>Preferred Region/Server</span>
              <input
                value={settings.preferred_region || ""}
                onChange={(e) => update("preferred_region", e.target.value)}
                placeholder="e.g. India"
                style={inputStyle}
              />
            </label>
            <Toggle
              label="Auto-remind me before tournaments"
              checked={settings.auto_remind}
              onChange={(v) => update("auto_remind", v)}
            />
            <button
              onClick={() =>
                saveSettings("tournament", {
                  favorite_games: settings.favorite_games,
                  preferred_mode: settings.preferred_mode,
                  preferred_region: settings.preferred_region,
                  auto_remind: settings.auto_remind,
                })
              }
              disabled={savingSection === "tournament"}
              style={primaryButton(savingSection === "tournament")}
            >
              {savingSection === "tournament" ? "Saving..." : "Save Preferences"}
            </button>
          </div>
        </Section>

        {/* PAYMENT */}
        <Section title="Payment Settings" saved={savedSection === "payment"}>
          <div style={formGrid}>
            <label style={fieldLabel}>
              <span style={labelText}>UPI ID (for prize withdrawals)</span>
              <input
                value={settings.upi_id || ""}
                onChange={(e) => update("upi_id", e.target.value)}
                placeholder="yourname@upi"
                style={inputStyle}
              />
            </label>
            <button
              onClick={() => saveSettings("payment", { upi_id: settings.upi_id })}
              disabled={savingSection === "payment"}
              style={primaryButton(savingSection === "payment")}
            >
              {savingSection === "payment" ? "Saving..." : "Save Payment Info"}
            </button>
          </div>
        </Section>

        {/* PASSWORD */}
        <Section title="Change Password">
          <form onSubmit={handleChangePassword} style={formGrid}>
            <label style={fieldLabel}>
              <span style={labelText}>New Password</span>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="At least 6 characters"
                style={inputStyle}
              />
            </label>
            <label style={fieldLabel}>
              <span style={labelText}>Confirm New Password</span>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Re-enter new password"
                style={inputStyle}
              />
            </label>
            {passwordStatus === "error" && <p style={errorText}>{passwordError}</p>}
            {passwordStatus === "saved" && <p style={successText}>Password updated successfully.</p>}
            <button type="submit" disabled={passwordStatus === "saving"} style={primaryButton(passwordStatus === "saving")}>
              {passwordStatus === "saving" ? "Saving..." : "Update Password"}
            </button>
          </form>
        </Section>

        {/* SUPPORT */}
        <Section title="Support">
          <div style={{ display: "grid", gap: "4px" }}>
            <Link href="/contact" style={plainLink}>Help Center →</Link>
            <Link href="/contact" style={plainLink}>Contact Support →</Link>
            <Link href="/contact" style={plainLink}>Report a Problem →</Link>
          </div>
        </Section>

        {/* LEGAL */}
        <Section title="Legal">
          <div style={{ display: "grid", gap: "4px" }}>
            <Link href="/terms" style={plainLink}>Terms & Conditions →</Link>
            <Link href="/privacy" style={plainLink}>Privacy Policy →</Link>
          </div>
        </Section>

        {/* LOGOUT */}
        <Section title="Session">
          <div
            style={{
              padding: "14px",
              borderRadius: "10px",
              background: "#0b1220",
              border: "1px solid #1e293b",
              marginBottom: "16px",
            }}
          >
            <p
              style={{
                margin: "0 0 10px",
                color: "#94a3b8",
                fontSize: "11px",
                fontWeight: 800,
                letterSpacing: "0.5px",
              }}
            >
              CURRENT SESSION
            </p>

            <SessionRow label="Signed in as" value={user?.email || "—"} />
            <SessionRow
              label="Device / Browser"
              value={deviceInfo || "Loading..."}
            />
            <SessionRow
              label="Last sign in"
              value={formatDateTime(user?.last_sign_in_at)}
            />
            <SessionRow
              label="Account created"
              value={formatDateTime(user?.created_at)}
            />
          </div>

          <p style={{ color: "#94a3b8", fontSize: "13px", marginBottom: "16px" }}>
            Sign out of your account on this device.
          </p>
          <button onClick={handleLogout} style={secondaryButton}>🚪 Logout</button>
        </Section>

        {/* DANGER ZONE */}
        <div style={{ ...card, border: "1px solid #7f1d1d", background: "#1a0a0a" }}>
          <h2 style={{ ...cardTitle, color: "#f87171" }}>Danger Zone</h2>
          <p style={{ color: "#94a3b8", fontSize: "13px", marginBottom: "16px" }}>
            Permanently delete your account and all your registrations. This cannot be undone.
          </p>

          {!deleteConfirm ? (
            <button onClick={() => setDeleteConfirm(true)} style={dangerButton}>
              Delete Account
            </button>
          ) : (
            <div style={{ display: "grid", gap: "10px" }}>
              <p style={{ color: "#fca5a5", fontSize: "13px", margin: 0 }}>
                Are you sure? This is permanent.
              </p>
              <div style={{ display: "flex", gap: "10px" }}>
                <button onClick={handleDeleteAccount} disabled={deleting} style={dangerButton}>
                  {deleting ? "Deleting..." : "Yes, Delete My Account"}
                </button>
                <button onClick={() => setDeleteConfirm(false)} style={secondaryButton}>
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}

function Section({
  title,
  saved,
  children,
}: {
  title: string;
  saved?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div style={card}>
      <h2 style={cardTitle}>{title}</h2>
      {children}
      {saved && <p style={{ ...successText, marginTop: "10px" }}>Saved.</p>}
    </div>
  );
}

function Toggle({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: (value: boolean) => void;
}) {
  return (
    <label
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "10px 0",
        cursor: "pointer",
      }}
    >
      <span style={{ fontSize: "13px", color: "#e2e8f0" }}>{label}</span>
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        style={{ width: "18px", height: "18px", cursor: "pointer" }}
      />
    </label>
  );
}

const page = {
  minHeight: "100vh",
  background: "#020617",
  color: "white",
};

const backLink = {
  color: "#64748b",
  textDecoration: "none",
  fontSize: "13px",
  fontWeight: "700" as const,
};

const card = {
  padding: "24px",
  borderRadius: "16px",
  background: "#0b1220",
  border: "1px solid #1e293b",
  marginBottom: "20px",
};

const cardTitle = {
  fontSize: "16px",
  marginBottom: "16px",
};

const formGrid = {
  display: "grid",
  gap: "14px",
};

const fieldLabel = {
  display: "grid",
  gap: "6px",
};

const labelText = {
  color: "#94a3b8",
  fontSize: "12px",
};

const successText = {
  color: "#4ade80",
  fontSize: "12px",
  margin: 0,
};

const errorText = {
  color: "#f87171",
  fontSize: "12px",
  margin: 0,
};

const plainLink = {
  color: "#a78bfa",
  textDecoration: "none",
  fontSize: "13px",
  padding: "6px 0",
};

const inputStyle = {
  width: "100%",
  boxSizing: "border-box" as const,
  minHeight: "43px",
  padding: "10px 12px",
  borderRadius: "8px",
  border: "1px solid #334155",
  background: "#020617",
  color: "white",
  outline: "none",
  fontSize: "13px",
};

function primaryButton(disabled: boolean) {
  return {
    marginTop: "6px",
    minHeight: "44px",
    border: 0,
    borderRadius: "9px",
    background: disabled ? "#475569" : "#7c3aed",
    color: "white",
    fontWeight: 800,
    fontSize: "13px",
    cursor: disabled ? "not-allowed" : "pointer",
  };
}

const secondaryButton = {
  padding: "12px 20px",
  border: "1px solid #334155",
  borderRadius: "9px",
  background: "#111c33",
  color: "white",
  fontWeight: 700,
  fontSize: "13px",
  cursor: "pointer",
};

const dangerButton = {
  padding: "12px 20px",
  border: "none",
  borderRadius: "9px",
  background: "#dc2626",
  color: "white",
  fontWeight: 700,
  fontSize: "13px",
  cursor: "pointer",
};

function SessionRow({ label, value }: { label: string; value: string }) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        gap: "12px",
        padding: "6px 0",
        fontSize: "12px",
      }}
    >
      <span style={{ color: "#64748b" }}>{label}</span>
      <span style={{ color: "#e2e8f0", fontWeight: 600, textAlign: "right" }}>
        {value}
      </span>
    </div>
  );
}

function formatDateTime(iso: string | undefined): string {
  if (!iso) return "—";
  return new Date(iso).toLocaleString(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  });
}

function getDeviceInfo(): string {
  if (typeof navigator === "undefined") return "Unknown";

  const ua = navigator.userAgent;

  let browser = "Unknown Browser";
  if (ua.includes("Edg/")) browser = "Edge";
  else if (ua.includes("Chrome/") && !ua.includes("Chromium")) browser = "Chrome";
  else if (ua.includes("Firefox/")) browser = "Firefox";
  else if (ua.includes("Safari/") && !ua.includes("Chrome")) browser = "Safari";

  let os = "Unknown OS";
  if (ua.includes("Windows")) os = "Windows";
  else if (ua.includes("Mac OS")) os = "macOS";
  else if (ua.includes("Android")) os = "Android";
  else if (ua.includes("iPhone") || ua.includes("iPad")) os = "iOS";
  else if (ua.includes("Linux")) os = "Linux";

  return `${browser} on ${os}`;
}