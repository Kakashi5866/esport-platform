import Link from "next/link";
import type { Metadata } from "next";
import { players } from "@/data/players";

export const metadata: Metadata = {
  title: "Community | Esports Platform",
  description:
    "Explore top players, leaderboards and rankings in our esports community. See who's leading in Free Fire, BGMI, Valorant and more.",
};

const topPlayers = players.slice(0, 4);

export default function CommunityPage() {
  return (
    <main style={page}>
      <section style={hero}>
        <span style={badge}>👥 ESPORTS COMMUNITY</span>

        <h1 style={title}>
          Find Your
          <br />
          <span style={{ color: "#a78bfa" }}>Squad.</span>
        </h1>

        <p style={subtitle}>
          Meet competitive players, discover teams, share achievements
          and become part of the esports community.
        </p>
      </section>

      <section style={container}>
        <div style={cards}>
          <div style={feature}>
            <div style={icon}>👥</div>
            <h2>Find Players</h2>
            <p>
              Discover players, compare their stats and find teammates
              for your next tournament.
            </p>
            <Link href="/leaderboard" style={link}>
              Explore Players →
            </Link>
          </div>

          <div style={feature}>
            <div style={icon}>🛡️</div>
            <h2>Build Teams</h2>
            <p>
              Create your squad, recruit skilled players and compete
              together.
            </p>
            <Link href="/tournaments" style={link}>
              Find Tournaments →
            </Link>
          </div>

          <div style={feature}>
            <div style={icon}>🏆</div>
            <h2>Show Achievements</h2>
            <p>
              Build your reputation through wins, ranks, badges and
              tournament performances.
            </p>
            <Link href="/profile" style={link}>
              View Profile →
            </Link>
          </div>
        </div>

        <h2 style={heading}>🔥 Players to Watch</h2>

        <div style={playersGrid}>
          {topPlayers.map((p) => (
            <Link key={p.id} href={`/players/${p.id}`} style={player}>
              <div style={avatar}>{p.avatar}</div>

              <div style={{ flex: 1 }}>
                <strong>{p.name}</strong>

                <div style={achievementStyle}>
                  #{p.rank} on Leaderboard • {p.game}
                </div>
              </div>

              <span style={xpStyle}>{p.points} pts</span>
            </Link>
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
  fontSize: "clamp(40px, 7vw, 62px)",
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
  margin: "55px auto",
  padding: "0 24px",
};

const cards = {
  display: "grid",
  gridTemplateColumns:
    "repeat(auto-fit, minmax(260px, 1fr))",
  gap: "18px",
  marginBottom: "60px",
};

const feature = {
  padding: "25px",
  borderRadius: "16px",
  background: "#0b1220",
  border: "1px solid #1e293b",
};

const icon = {
  fontSize: "30px",
};

const link = {
  color: "#a78bfa",
  textDecoration: "none",
  fontSize: "12px",
  fontWeight: "800",
};

const heading = {
  fontSize: "28px",
  fontWeight: "900",
  marginBottom: "22px",
};

const playersGrid = {
  display: "grid",
  gridTemplateColumns:
    "repeat(auto-fit, minmax(280px, 1fr))",
  gap: "12px",
};

const player = {
  display: "flex",
  alignItems: "center",
  gap: "13px",
  padding: "16px",
  borderRadius: "13px",
  background: "#0b1220",
  border: "1px solid #1e293b",
  textDecoration: "none",
  color: "white",
};

const avatar = {
  width: "42px",
  height: "42px",
  borderRadius: "10px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  background: "linear-gradient(135deg, #7c3aed, #4338ca)",
  fontSize: "12px",
  fontWeight: "900",
};

const achievementStyle = {
  marginTop: "4px",
  color: "#64748b",
  fontSize: "11px",
};

const xpStyle = {
  color: "#a78bfa",
  fontSize: "11px",
  fontWeight: "800",
};