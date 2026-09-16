"use client";

import Link from "next/link";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";

const recentMatches = [
  {
    game: "Free Fire",
    tournament: "FF BR Championship",
    result: "WIN",
    score: "12 - 7",
    date: "2 hours ago",
  },
  {
    game: "BGMI",
    tournament: "India Squad Cup",
    result: "WIN",
    score: "10 - 6",
    date: "Yesterday",
  },
  {
    game: "Valorant",
    tournament: "Valorant Night League",
    result: "LOSS",
    score: "8 - 13",
    date: "2 days ago",
  },
  {
    game: "Free Fire",
    tournament: "Pro Battle Series",
    result: "WIN",
    score: "15 - 9",
    date: "4 days ago",
  },
];

const achievements = [
  {
    icon: "🏆",
    title: "Tournament Champion",
    text: "Won FF BR Championship",
  },
  {
    icon: "🔥",
    title: "Winning Streak",
    text: "10 consecutive tournament wins",
  },
  {
    icon: "🥇",
    title: "Top 10 Player",
    text: "Reached global Top 10",
  },
  {
    icon: "⚡",
    title: "MVP",
    text: "Most Valuable Player × 5",
  },
];

export default function ProfilePage() {
  const router = useRouter();
  const { user, loading } = useAuth();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/auth/login");
    }
  }, [loading, user, router]);

  if (loading || !user) {
    return (
      <main
        style={{
          minHeight: "100vh",
          background: "#020617",
          color: "#94a3b8",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        Loading profile...
      </main>
    );
  }

  const username = user.email?.split("@")[0] ?? "player";
  const initials = username.slice(0, 2).toUpperCase();

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#020617",
        color: "white",
        paddingBottom: "90px",
      }}
    >
      {/* PROFILE HERO */}
      <section
        style={{
          background:
            "radial-gradient(circle at top left, rgba(124,58,237,0.25), transparent 45%)",
          borderBottom: "1px solid #1e293b",
        }}
      >
        <div
          style={{
            maxWidth: "1100px",
            margin: "0 auto",
            padding: "70px 24px 55px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "28px",
              flexWrap: "wrap",
            }}
          >
            {/* AVATAR */}
            <div
              style={{
                width: "110px",
                height: "110px",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background:
                  "linear-gradient(135deg, #7c3aed, #4338ca)",
                border: "4px solid #312e81",
                fontSize: "32px",
                fontWeight: "900",
                boxShadow:
                  "0 15px 50px rgba(124,58,237,0.25)",
              }}
            >
              {initials}
            </div>

            {/* NAME */}
            <div style={{ flex: 1, minWidth: "250px" }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  flexWrap: "wrap",
                }}
              >
                <h1
                  style={{
                    margin: 0,
                    fontSize: "42px",
                    fontWeight: "900",
                  }}
                >
                  {username}
                </h1>

                <span
                  style={{
                    padding: "5px 9px",
                    borderRadius: "999px",
                    background: "#14532d",
                    color: "#86efac",
                    fontSize: "11px",
                    fontWeight: "800",
                  }}
                >
                  VERIFIED
                </span>
              </div>

              <p
                style={{
                  color: "#94a3b8",
                  margin: "8px 0",
                }}
              >
                @{username}
              </p>

              <p
                style={{
                  color: "#64748b",
                  margin: 0,
                  fontSize: "14px",
                }}
              >
                Competitive esports player • Free Fire main
              </p>
            </div>

            {/* BUTTONS */}
            <div
              style={{
                display: "flex",
                gap: "10px",
                flexWrap: "wrap",
              }}
            >
              <button style={editButton}>
                Edit Profile
              </button>

              <button style={shareButton}>
                Share Profile
              </button>
            </div>
          </div>

          {/* RANK BAR */}
          <div
            style={{
              marginTop: "45px",
              padding: "22px",
              borderRadius: "16px",
              border: "1px solid #1e293b",
              background: "rgba(11,18,32,0.85)",
              display: "flex",
              justifyContent: "space-between",
              gap: "20px",
              flexWrap: "wrap",
            }}
          >
            <div>
              <span style={smallLabel}>GLOBAL RANK</span>

              <strong
                style={{
                  display: "block",
                  fontSize: "27px",
                  marginTop: "5px",
                }}
              >
                #01
              </strong>
            </div>

            <div>
              <span style={smallLabel}>RANK POINTS</span>

              <strong
                style={{
                  display: "block",
                  fontSize: "27px",
                  marginTop: "5px",
                }}
              >
                2,480
              </strong>
            </div>

            <div>
              <span style={smallLabel}>CURRENT RANK</span>

              <strong
                style={{
                  display: "block",
                  fontSize: "27px",
                  marginTop: "5px",
                  color: "#a78bfa",
                }}
              >
                LEGEND
              </strong>
            </div>

            <div>
              <span style={smallLabel}>SEASON</span>

              <strong
                style={{
                  display: "block",
                  fontSize: "27px",
                  marginTop: "5px",
                }}
              >
                S06
              </strong>
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
          padding: "45px 24px",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(150px, 1fr))",
            gap: "15px",
          }}
        >
          <StatCard
            value="248"
            label="Matches"
          />

          <StatCard
            value="186"
            label="Wins"
            green
          />

          <StatCard
            value="75%"
            label="Win Rate"
            purple
          />

          <StatCard
            value="2.84"
            label="K/D Ratio"
          />

          <StatCard
            value="₹85K"
            label="Earnings"
            gold
          />
        </div>
      </section>

      {/* MAIN CONTENT */}
      <section
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
          padding: "0 24px",
          display: "grid",
          gridTemplateColumns: "1.4fr 0.8fr",
          gap: "25px",
        }}
      >
        {/* RECENT MATCHES */}
        <div>
          <SectionTitle
            title="Recent Matches"
            subtitle="Latest competitive performances"
          />

          <div
            style={{
              border: "1px solid #1e293b",
              borderRadius: "16px",
              overflow: "hidden",
              background: "#0b1220",
            }}
          >
            {recentMatches.map((match, index) => (
              <div
                key={match.tournament}
                style={{
                  padding: "19px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: "15px",
                  flexWrap: "wrap",
                  borderBottom:
                    index === recentMatches.length - 1
                      ? "none"
                      : "1px solid #1e293b",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "13px",
                  }}
                >
                  <div
                    style={{
                      width: "43px",
                      height: "43px",
                      borderRadius: "10px",
                      background: "#111827",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "20px",
                    }}
                  >
                    🎮
                  </div>

                  <div>
                    <strong
                      style={{
                        display: "block",
                        fontSize: "14px",
                      }}
                    >
                      {match.tournament}
                    </strong>

                    <span
                      style={{
                        color: "#64748b",
                        fontSize: "12px",
                      }}
                    >
                      {match.game} • {match.date}
                    </span>
                  </div>
                </div>

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "18px",
                  }}
                >
                  <strong>{match.score}</strong>

                  <span
                    style={{
                      minWidth: "45px",
                      textAlign: "center",
                      padding: "5px 8px",
                      borderRadius: "6px",
                      background:
                        match.result === "WIN"
                          ? "#14532d"
                          : "#450a0a",
                      color:
                        match.result === "WIN"
                          ? "#86efac"
                          : "#fca5a5",
                      fontSize: "11px",
                      fontWeight: "900",
                    }}
                  >
                    {match.result}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ACHIEVEMENTS */}
        <div>
          <SectionTitle
            title="Achievements"
            subtitle="Milestones unlocked"
          />

          <div
            style={{
              display: "grid",
              gap: "12px",
            }}
          >
            {achievements.map((achievement) => (
              <div
                key={achievement.title}
                style={{
                  display: "flex",
                  gap: "14px",
                  padding: "17px",
                  borderRadius: "13px",
                  background: "#0b1220",
                  border: "1px solid #1e293b",
                }}
              >
                <div
                  style={{
                    width: "42px",
                    height: "42px",
                    flexShrink: 0,
                    borderRadius: "10px",
                    background: "#17112b",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "20px",
                  }}
                >
                  {achievement.icon}
                </div>

                <div>
                  <strong
                    style={{
                      display: "block",
                      fontSize: "14px",
                    }}
                  >
                    {achievement.title}
                  </strong>

                  <span
                    style={{
                      color: "#64748b",
                      fontSize: "12px",
                    }}
                  >
                    {achievement.text}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* GAME PERFORMANCE */}
      <section
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
          padding: "65px 24px 0",
        }}
      >
        <SectionTitle
          title="Game Performance"
          subtitle="Performance across different titles"
        />

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "16px",
          }}
        >
          <GameCard
            game="Free Fire"
            icon="🔥"
            matches="142"
            wins="112"
            rate="79%"
          />

          <GameCard
            game="BGMI"
            icon="🎯"
            matches="64"
            wins="44"
            rate="69%"
          />

          <GameCard
            game="Valorant"
            icon="⚔️"
            matches="42"
            wins="30"
            rate="71%"
          />
        </div>
      </section>

      {/* FOOTER CTA */}
      <section
        style={{
          maxWidth: "900px",
          margin: "70px auto 0",
          padding: "0 24px",
          textAlign: "center",
        }}
      >
        <div
          style={{
            padding: "42px 25px",
            borderRadius: "20px",
            border: "1px solid #312e81",
            background:
              "linear-gradient(135deg, rgba(76,29,149,0.22), #0b1220)",
          }}
        >
          <h2
            style={{
              margin: "0 0 10px",
              fontSize: "30px",
            }}
          >
            Ready for the next match?
          </h2>

          <p
            style={{
              color: "#64748b",
              marginBottom: "23px",
            }}
          >
            Find your next tournament and keep climbing the rankings.
          </p>

          <Link
            href="/tournaments"
            style={{
              display: "inline-block",
              padding: "13px 22px",
              borderRadius: "9px",
              background: "#7c3aed",
              color: "white",
              textDecoration: "none",
              fontWeight: "800",
            }}
          >
            Explore Tournaments →
          </Link>
        </div>
      </section>

      <style>{`
        @media (max-width: 800px) {
          main > section:nth-of-type(3) > div {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </main>
  );
}

/* STAT CARD */

function StatCard({
  value,
  label,
  green = false,
  purple = false,
  gold = false,
}: {
  value: string;
  label: string;
  green?: boolean;
  purple?: boolean;
  gold?: boolean;
}) {
  return (
    <div
      style={{
        padding: "22px",
        borderRadius: "14px",
        background: "#0b1220",
        border: "1px solid #1e293b",
        textAlign: "center",
      }}
    >
      <strong
        style={{
          display: "block",
          fontSize: "27px",
          color: green
            ? "#4ade80"
            : purple
            ? "#a78bfa"
            : gold
            ? "#fbbf24"
            : "white",
        }}
      >
        {value}
      </strong>

      <span
        style={{
          display: "block",
          marginTop: "5px",
          color: "#64748b",
          fontSize: "12px",
        }}
      >
        {label}
      </span>
    </div>
  );
}

/* GAME CARD */

function GameCard({
  game,
  icon,
  matches,
  wins,
  rate,
}: {
  game: string;
  icon: string;
  matches: string;
  wins: string;
  rate: string;
}) {
  return (
    <div
      style={{
        padding: "23px",
        borderRadius: "16px",
        background: "#0b1220",
        border: "1px solid #1e293b",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "12px",
          marginBottom: "20px",
        }}
      >
        <div
          style={{
            width: "45px",
            height: "45px",
            borderRadius: "10px",
            background: "#111827",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "22px",
          }}
        >
          {icon}
        </div>

        <strong>{game}</strong>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          color: "#94a3b8",
          fontSize: "13px",
        }}
      >
        <span>Matches</span>
        <strong style={{ color: "white" }}>
          {matches}
        </strong>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: "12px",
          color: "#94a3b8",
          fontSize: "13px",
        }}
      >
        <span>Wins</span>
        <strong style={{ color: "#4ade80" }}>
          {wins}
        </strong>
      </div>

      <div
        style={{
          marginTop: "17px",
          height: "6px",
          borderRadius: "999px",
          background: "#1e293b",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            width: rate,
            height: "100%",
            background:
              "linear-gradient(90deg, #7c3aed, #a78bfa)",
            borderRadius: "999px",
          }}
        />
      </div>

      <div
        style={{
          textAlign: "right",
          marginTop: "8px",
          color: "#a78bfa",
          fontSize: "12px",
          fontWeight: "800",
        }}
      >
        {rate} WIN RATE
      </div>
    </div>
  );
}

/* SECTION TITLE */

function SectionTitle({
  title,
  subtitle,
}: {
  title: string;
  subtitle: string;
}) {
  return (
    <div style={{ marginBottom: "20px" }}>
      <h2
        style={{
          margin: 0,
          fontSize: "27px",
        }}
      >
        {title}
      </h2>

      <p
        style={{
          margin: "6px 0 0",
          color: "#64748b",
          fontSize: "13px",
        }}
      >
        {subtitle}
      </p>
    </div>
  );
}

const smallLabel = {
  color: "#64748b",
  fontSize: "11px",
  fontWeight: "800",
  letterSpacing: "1px",
};

const editButton = {
  padding: "11px 17px",
  borderRadius: "8px",
  border: "1px solid #7c3aed",
  background: "#7c3aed",
  color: "white",
  fontWeight: "800",
  cursor: "pointer",
};

const shareButton = {
  padding: "11px 17px",
  borderRadius: "8px",
  border: "1px solid #334155",
  background: "#0f172a",
  color: "#cbd5e1",
  fontWeight: "700",
  cursor: "pointer",
};