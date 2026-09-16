import Link from "next/link";

const matches = [
  {
    game: "Free Fire",
    teams: "ShadowX vs Hydra",
    time: "LIVE",
    score: "12 - 10",
    status: "LIVE",
  },
  {
    game: "BGMI",
    teams: "Titan Esports vs Nova",
    time: "10:30 PM",
    score: "—",
    status: "UPCOMING",
  },
  {
    game: "Valorant",
    teams: "Velocity vs Phoenix",
    time: "Tomorrow • 7:00 PM",
    score: "—",
    status: "UPCOMING",
  },
  {
    game: "Call of Duty",
    teams: "Reapers vs Ghosts",
    time: "Tomorrow • 9:30 PM",
    score: "—",
    status: "UPCOMING",
  },
];

export default function MatchesPage() {
  return (
    <main style={page}>
      <section style={hero}>
        <span style={badge}>⚔️ MATCH CENTER</span>

        <h1 style={title}>
          Every Match.
          <br />
          <span style={{ color: "#a78bfa" }}>Every Battle.</span>
        </h1>

        <p style={subtitle}>
          Track live battles, upcoming matches and competitive esports
          action from across the platform.
        </p>
      </section>

      <section style={container}>
        <div style={sectionHeader}>
          <div>
            <h2 style={heading}>Live & Upcoming</h2>
            <p style={muted}>Stay close to the action.</p>
          </div>

          <Link href="/tournaments" style={button}>
            View Tournaments →
          </Link>
        </div>

        <div style={grid}>
          {matches.map((match) => (
            <div key={match.teams} style={card}>
              <div style={cardTop}>
                <span style={game}>{match.game}</span>

                <span
                  style={{
                    ...status,
                    background:
                      match.status === "LIVE"
                        ? "#14532d"
                        : "#172033",
                    color:
                      match.status === "LIVE"
                        ? "#86efac"
                        : "#94a3b8",
                  }}
                >
                  {match.status === "LIVE" ? "● LIVE" : "UPCOMING"}
                </span>
              </div>

              <h3 style={teams}>{match.teams}</h3>

              <div style={scoreBox}>
                <strong style={score}>{match.score}</strong>
                <span style={time}>{match.time}</span>
              </div>

              <button style={watchButton}>
                {match.status === "LIVE"
                  ? "▶ Watch Live"
                  : "View Match"}
              </button>
            </div>
          ))}
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
  maxWidth: "1100px",
  margin: "55px auto 0",
  padding: "0 24px",
};

const sectionHeader = {
  display: "flex",
  alignItems: "end",
  justifyContent: "space-between",
  gap: "20px",
  flexWrap: "wrap" as const,
  marginBottom: "25px",
};

const heading = {
  margin: 0,
  fontSize: "28px",
  fontWeight: "900",
};

const muted = {
  color: "#64748b",
  fontSize: "13px",
  marginTop: "6px",
};

const grid = {
  display: "grid",
  gridTemplateColumns:
    "repeat(auto-fit, minmax(280px, 1fr))",
  gap: "18px",
};

const card = {
  padding: "22px",
  borderRadius: "17px",
  background: "#0b1220",
  border: "1px solid #1e293b",
};

const cardTop = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
};

const game = {
  color: "#a78bfa",
  fontSize: "12px",
  fontWeight: "800",
};

const status = {
  padding: "5px 8px",
  borderRadius: "6px",
  fontSize: "9px",
  fontWeight: "900",
};

const teams = {
  fontSize: "18px",
  margin: "25px 0",
};

const scoreBox = {
  padding: "20px",
  borderRadius: "10px",
  background: "#020617",
  border: "1px solid #1e293b",
  textAlign: "center" as const,
};

const score = {
  display: "block",
  fontSize: "28px",
};

const time = {
  display: "block",
  marginTop: "7px",
  color: "#64748b",
  fontSize: "11px",
};

const watchButton = {
  width: "100%",
  marginTop: "17px",
  padding: "12px",
  borderRadius: "8px",
  border: "1px solid #334155",
  background: "#111827",
  color: "white",
  fontWeight: "800",
  cursor: "pointer",
};

const button = {
  padding: "11px 15px",
  borderRadius: "8px",
  background: "#7c3aed",
  color: "white",
  textDecoration: "none",
  fontSize: "12px",
  fontWeight: "800",
};