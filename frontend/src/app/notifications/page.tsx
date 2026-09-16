import Link from "next/link";

const notifications = [
  {
    icon: "🏆",
    title: "Tournament Started",
    text: "FF BR Championship is now live.",
    time: "2 min ago",
    unread: true,
  },
  {
    icon: "⚔️",
    title: "Match Reminder",
    text: "Your upcoming match starts at 10:30 PM.",
    time: "15 min ago",
    unread: true,
  },
  {
    icon: "👑",
    title: "Leaderboard Update",
    text: "You moved up 4 positions on the leaderboard.",
    time: "1 hour ago",
    unread: true,
  },
  {
    icon: "🎮",
    title: "New Game Tournament",
    text: "A new Valorant tournament has been announced.",
    time: "3 hours ago",
    unread: false,
  },
  {
    icon: "💰",
    title: "Prize Pool Increased",
    text: "The FF Championship prize pool is now ₹50,000.",
    time: "Yesterday",
    unread: false,
  },
];

export default function NotificationsPage() {
  return (
    <main style={page}>
      <section style={hero}>
        <span style={badge}>🔔 ACTIVITY CENTER</span>

        <h1 style={title}>
          Your
          <br />
          <span style={{ color: "#a78bfa" }}>Notifications.</span>
        </h1>

        <p style={subtitle}>
          Keep track of tournaments, matches, leaderboard changes and
          everything happening around your account.
        </p>
      </section>

      <section style={container}>
        <div style={top}>
          <div>
            <h2 style={heading}>Recent Activity</h2>
            <p style={muted}>3 unread notifications</p>
          </div>

          <button style={markButton}>
            ✓ Mark all as read
          </button>
        </div>

        <div style={list}>
          {notifications.map((notification, index) => (
            <div
              key={index}
              style={{
                ...item,
                background: notification.unread
                  ? "#0f172a"
                  : "#0b1220",
              }}
            >
              <div style={notificationIcon}>
                {notification.icon}
              </div>

              <div style={{ flex: 1 }}>
                <div style={itemTop}>
                  <strong>{notification.title}</strong>

                  {notification.unread && (
                    <span style={unread}>NEW</span>
                  )}
                </div>

                <p style={text}>{notification.text}</p>

                <span style={time}>{notification.time}</span>
              </div>
            </div>
          ))}
        </div>

        <div style={bottom}>
          <Link href="/tournaments" style={link}>
            🏆 Browse Tournaments
          </Link>

          <Link href="/matches" style={link}>
            ⚔️ View Matches
          </Link>
        </div>
      </section>
    </main>
  );
}

const page = {
  minHeight: "100vh",
  background: "#020617",
  color: "white",
  paddingBottom: "80px",
};

const hero = {
  textAlign: "center" as const,
  padding: "75px 24px 60px",
  background:
    "radial-gradient(circle at top, rgba(124,58,237,.25), transparent 55%)",
  borderBottom: "1px solid #1e293b",
};

const badge = {
  color: "#a78bfa",
  fontSize: "11px",
  fontWeight: "900",
  letterSpacing: "1px",
};

const title = {
  fontSize: "clamp(38px, 7vw, 60px)",
  lineHeight: 1,
  fontWeight: "950",
  margin: "18px 0",
};

const subtitle = {
  maxWidth: "620px",
  margin: "0 auto",
  color: "#94a3b8",
  lineHeight: 1.7,
  fontSize: "14px",
};

const container = {
  maxWidth: "850px",
  margin: "55px auto",
  padding: "0 24px",
};

const top = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "end",
  gap: "20px",
  flexWrap: "wrap" as const,
  marginBottom: "22px",
};

const heading = {
  margin: 0,
  fontSize: "28px",
  fontWeight: "900",
};

const muted = {
  marginTop: "6px",
  color: "#64748b",
  fontSize: "12px",
};

const markButton = {
  padding: "9px 13px",
  borderRadius: "8px",
  border: "1px solid #334155",
  background: "#0b1220",
  color: "#94a3b8",
  cursor: "pointer",
  fontSize: "11px",
};

const list = {
  display: "grid",
  gap: "10px",
};

const item = {
  display: "flex",
  gap: "15px",
  padding: "18px",
  borderRadius: "13px",
  border: "1px solid #1e293b",
};

const notificationIcon = {
  width: "42px",
  height: "42px",
  flexShrink: 0,
  borderRadius: "10px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  background: "#17112b",
  fontSize: "18px",
};

const itemTop = {
  display: "flex",
  alignItems: "center",
  gap: "9px",
};

const unread = {
  padding: "3px 6px",
  borderRadius: "5px",
  background: "#312e81",
  color: "#c4b5fd",
  fontSize: "8px",
  fontWeight: "900",
};

const text = {
  margin: "7px 0",
  color: "#94a3b8",
  fontSize: "12px",
};

const time = {
  color: "#475569",
  fontSize: "10px",
};

const bottom = {
  display: "flex",
  justifyContent: "center",
  gap: "25px",
  marginTop: "30px",
  flexWrap: "wrap" as const,
};

const link = {
  color: "#a78bfa",
  textDecoration: "none",
  fontSize: "12px",
  fontWeight: "800",
};