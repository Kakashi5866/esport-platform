"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { useLanguage } from "@/hooks/useLanguage";

const navLinks = [
  { key: "nav_home" as const, href: "/" },
  { key: "nav_tournaments" as const, href: "/tournaments" },
  { key: "nav_games" as const, href: "/games" },
  { key: "nav_matches" as const, href: "/matches" },
  { key: "nav_leaderboard" as const, href: "/leaderboard" },
  { key: "nav_community" as const, href: "/community" },
  { key: "nav_about" as const, href: "/about" },
];

export default function Navbar() {
  const router = useRouter();
  const { user, logout } = useAuth();
  const { language, toggleLanguage, t } = useLanguage();
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const displayName = user?.email?.split("@")[0] ?? "Guest";
  const initials = displayName.slice(0, 2).toUpperCase();

  const searchRef = useRef<HTMLDivElement>(null);
  const notificationsRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const target = event.target as Node;

      if (searchRef.current && !searchRef.current.contains(target)) {
        setSearchOpen(false);
      }

      if (
        notificationsRef.current &&
        !notificationsRef.current.contains(target)
      ) {
        setNotificationsOpen(false);
      }

      if (profileRef.current && !profileRef.current.contains(target)) {
        setProfileOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function handleSearchSubmit() {
    if (!searchQuery.trim()) return;
    router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    setSearchOpen(false);
    setSearchQuery("");
  }

  async function handleLogout() {
    await logout();
    setProfileOpen(false);
  }

  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 1000,
        background: "rgba(2, 6, 23, 0.92)",
        backdropFilter: "blur(18px)",
        borderBottom: "1px solid #1e293b",
      }}
    >
      <nav
        style={{
          maxWidth: "1400px",
          height: "72px",
          margin: "0 auto",
          padding: "0 24px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "20px",
        }}
      >
        {/* LOGO */}
        <Link
          href="/"
          style={{
            color: "white",
            textDecoration: "none",
            fontSize: "21px",
            fontWeight: "900",
            whiteSpace: "nowrap",
          }}
        >
          <span style={{ color: "#a78bfa" }}>ESPORTS</span>{" "}
          PLATFORM
        </Link>

        {/* DESKTOP NAV */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "22px",
          }}
          className="desktop-nav"
        >
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              style={linkStyle}
            >
              {t(link.key)}
            </Link>
          ))}
        </div>

        {/* ACTIONS */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          {/* LANGUAGE TOGGLE */}
          <button
            type="button"
            onClick={toggleLanguage}
            style={langButton}
            aria-label="Toggle language"
            title={language === "en" ? "Switch to Hindi" : "Switch to English"}
          >
            {language === "en" ? "EN" : "हिं"}
          </button>

          {/* SEARCH */}
          <div style={{ position: "relative" }} ref={searchRef}>
            <button
              type="button"
              onClick={() => setSearchOpen(!searchOpen)}
              style={iconButton}
              aria-label="Search"
            >
              🔍
            </button>

            {searchOpen && (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSearchSubmit();
                }}
                style={dropdownSearch}
              >
                <input
                  autoFocus
                  type="search"
                  placeholder={t("nav_search_placeholder")}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  style={searchInput}
                />

                <button
                  type="submit"
                  style={searchSubmitButton}
                  aria-label="Search"
                >
                  🔍
                </button>
              </form>
            )}
          </div>

          {/* NOTIFICATIONS */}
          <div style={{ position: "relative" }} ref={notificationsRef}>
            <button
              type="button"
              onClick={() =>
                setNotificationsOpen(!notificationsOpen)
              }
              style={iconButton}
              aria-label="Notifications"
            >
              🔔
              <span style={notificationDot}>3</span>
            </button>

            {notificationsOpen && (
              <div style={dropdown}>
                <div style={dropdownHeader}>
                  {t("nav_notifications")}
                </div>

                <Notification
                  icon="🏆"
                  text="FF BR Championship has started."
                />

                <Notification
                  icon="⚡"
                  text="Your next match starts soon."
                />

                <Notification
                  icon="👑"
                  text="You moved up in leaderboard."
                />

                <Link
                  href="/notifications"
                  style={viewAll}
                  onClick={() => setNotificationsOpen(false)}
                >
                  {t("nav_view_all_notifications")}
                </Link>
              </div>
            )}
          </div>

          {/* PROFILE */}
          {user ? (
            <div style={{ position: "relative" }} ref={profileRef}>
              <button
                type="button"
                onClick={() => setProfileOpen(!profileOpen)}
                style={profileButton}
              >
                <span style={avatar}>{initials}</span>
                <span className="profile-name">{displayName}</span>
                <span>▾</span>
              </button>

              {profileOpen && (
                <div style={dropdown}>
                  <Link
                    href="/profile"
                    style={dropdownLink}
                    onClick={() => setProfileOpen(false)}
                  >
                    👤 {t("nav_my_profile")}
                  </Link>

                  <Link
                    href="/settings"
                    style={dropdownLink}
                    onClick={() => setProfileOpen(false)}
                  >
                    ⚙️ {t("nav_settings")}
                  </Link>

                  <Link
                    href="/my-tournaments"
                    style={dropdownLink}
                    onClick={() => setProfileOpen(false)}
                  >
                    🏆 {t("nav_my_tournaments")}
                  </Link>

                  <div
                    style={{
                      height: "1px",
                      background: "#1e293b",
                      margin: "6px 0",
                    }}
                  />

                  <button
                    type="button"
                    onClick={handleLogout}
                    style={logoutButton}
                  >
                    🚪 {t("nav_logout")}
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link href="/auth/login" style={profileButton}>
              {t("nav_login")}
            </Link>
          )}

          {/* MOBILE */}
          <button
            type="button"
            className="mobile-menu"
            onClick={() => setMobileOpen(!mobileOpen)}
            style={mobileButton}
          >
            ☰
          </button>
        </div>
      </nav>

      {/* MOBILE NAV */}
      {mobileOpen && (
        <div
          style={{
            padding: "15px 24px 22px",
            borderTop: "1px solid #1e293b",
            background: "#020617",
          }}
        >
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              style={mobileLink}
            >
              {t(link.key)}
            </Link>
          ))}
        </div>
      )}

      <style>{`
        .mobile-menu {
          display: none;
        }

        @media (max-width: 1050px) {
          .desktop-nav {
            display: none !important;
          }

          .mobile-menu {
            display: block !important;
          }

          .profile-name {
            display: none;
          }
        }
      `}</style>
    </header>
  );
}

function Notification({
  icon,
  text,
}: {
  icon: string;
  text: string;
}) {
  return (
    <div
      style={{
        display: "flex",
        gap: "10px",
        padding: "13px 15px",
        borderBottom: "1px solid #1e293b",
      }}
    >
      <span>{icon}</span>

      <span
        style={{
          color: "#cbd5e1",
          fontSize: "12px",
          lineHeight: "1.5",
        }}
      >
        {text}
      </span>
    </div>
  );
}

const linkStyle = {
  color: "#94a3b8",
  textDecoration: "none",
  fontSize: "13px",
  fontWeight: "700",
};

const langButton = {
  width: "42px",
  height: "38px",
  borderRadius: "9px",
  border: "1px solid #1e293b",
  background: "#0b1220",
  color: "#a78bfa",
  cursor: "pointer",
  fontSize: "12px",
  fontWeight: "800",
};

const iconButton = {
  position: "relative" as const,
  width: "38px",
  height: "38px",
  borderRadius: "9px",
  border: "1px solid #1e293b",
  background: "#0b1220",
  color: "white",
  cursor: "pointer",
  fontSize: "15px",
};

const notificationDot = {
  position: "absolute" as const,
  top: "-5px",
  right: "-5px",
  width: "17px",
  height: "17px",
  borderRadius: "50%",
  background: "#7c3aed",
  color: "white",
  fontSize: "9px",
  fontWeight: "900",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const profileButton = {
  display: "flex",
  alignItems: "center",
  gap: "7px",
  padding: "5px 9px 5px 5px",
  borderRadius: "10px",
  border: "1px solid #1e293b",
  background: "#0b1220",
  color: "#cbd5e1",
  cursor: "pointer",
  fontSize: "12px",
  fontWeight: "700",
  textDecoration: "none" as const,
};

const avatar = {
  width: "28px",
  height: "28px",
  borderRadius: "8px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  background: "linear-gradient(135deg, #7c3aed, #4338ca)",
  color: "white",
  fontSize: "10px",
  fontWeight: "900",
};

const dropdown = {
  position: "absolute" as const,
  top: "48px",
  right: 0,
  width: "280px",
  borderRadius: "12px",
  border: "1px solid #1e293b",
  background: "#0b1220",
  boxShadow: "0 20px 50px rgba(0,0,0,0.45)",
  overflow: "hidden",
};

const dropdownSearch = {
  position: "absolute" as const,
  top: "48px",
  right: 0,
  width: "280px",
  padding: "10px",
  borderRadius: "12px",
  border: "1px solid #1e293b",
  background: "#0b1220",
  boxShadow: "0 20px 50px rgba(0,0,0,0.45)",
  display: "flex",
  gap: "8px",
};

const searchSubmitButton = {
  flexShrink: 0,
  width: "38px",
  border: "1px solid #334155",
  borderRadius: "8px",
  background: "#7c3aed",
  color: "white",
  cursor: "pointer",
  fontSize: "14px",
};

const searchInput = {
  flex: 1,
  minWidth: 0,
  boxSizing: "border-box" as const,
  padding: "11px 12px",
  borderRadius: "8px",
  border: "1px solid #334155",
  background: "#020617",
  color: "white",
  outline: "none",
};

const dropdownHeader = {
  padding: "15px",
  fontWeight: "800",
  fontSize: "14px",
  borderBottom: "1px solid #1e293b",
};

const dropdownLink = {
  display: "block",
  padding: "12px 15px",
  color: "#cbd5e1",
  textDecoration: "none",
  fontSize: "13px",
};

const viewAll = {
  display: "block",
  padding: "13px 15px",
  color: "#a78bfa",
  textDecoration: "none",
  fontSize: "12px",
  fontWeight: "800",
};

const logoutButton = {
  width: "100%",
  padding: "12px 15px",
  border: "none",
  background: "transparent",
  color: "#f87171",
  textAlign: "left" as const,
  cursor: "pointer",
  fontSize: "13px",
};

const mobileButton = {
  width: "38px",
  height: "38px",
  borderRadius: "9px",
  border: "1px solid #1e293b",
  background: "#0b1220",
  color: "white",
  cursor: "pointer",
  fontSize: "18px",
};

const mobileLink = {
  display: "block",
  padding: "14px 0",
  borderBottom: "1px solid #1e293b",
  color: "#cbd5e1",
  textDecoration: "none",
  fontWeight: "700",
  fontSize: "14px",
};