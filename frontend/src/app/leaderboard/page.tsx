import Link from "next/link";

const players = [
  {
    rank: 1,
    name: "ShadowX",
    game: "Free Fire",
    wins: 48,
    matches: 55,
    points: 2480,
    earnings: "₹85,000",
    avatar: "SX",
  },
  {
    rank: 2,
    name: "DarkHunter",
    game: "BGMI",
    wins: 44,
    matches: 52,
    points: 2310,
    earnings: "₹72,500",
    avatar: "DH",
  },
  {
    rank: 3,
    name: "Viper",
    game: "Valorant",
    wins: 41,
    matches: 50,
    points: 2190,
    earnings: "₹64,000",
    avatar: "VP",
  },
  {
    rank: 4,
    name: "Blaze",
    game: "Free Fire",
    wins: 38,
    matches: 49,
    points: 2050,
    earnings: "₹52,000",
    avatar: "BZ",
  },
  {
    rank: 5,
    name: "Ghost",
    game: "COD Mobile",
    wins: 36,
    matches: 47,
    points: 1940,
    earnings: "₹47,500",
    avatar: "GH",
  },
  {
    rank: 6,
    name: "Reaper",
    game: "BGMI",
    wins: 34,
    matches: 45,
    points: 1870,
    earnings: "₹41,000",
    avatar: "RP",
  },
  {
    rank: 7,
    name: "Nova",
    game: "Valorant",
    wins: 31,
    matches: 43,
    points: 1760,
    earnings: "₹36,500",
    avatar: "NV",
  },
  {
    rank: 8,
    name: "Inferno",
    game: "Free Fire",
    wins: 29,
    matches: 42,
    points: 1690,
    earnings: "₹32,000",
    avatar: "IF",
  },
];

const topPlayers = players.slice(0, 3);

export default function LeaderboardPage() {
  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#020617",
        color: "white",
        paddingBottom: "90px",
      }}
    >
      {/* HERO */}
      <section
        style={{
          padding: "90px 24px 55px",
          textAlign: "center",
          background:
            "radial-gradient(circle at top, rgba(124,58,237,0.22), transparent 58%)",
        }}
      >
        <div
          style={{
            maxWidth: "850px",
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
            🏆 COMPETITIVE RANKINGS
          </div>

          <h1
            style={{
              fontSize: "clamp(42px, 7vw, 70px)",
              margin: "20px 0 15px",
              lineHeight: "1",
              fontWeight: "900",
            }}
          >
            Leaderboard
          </h1>

          <p
            style={{
              maxWidth: "650px",
              margin: "0 auto",
              color: "#94a3b8",
              fontSize: "16px",
              lineHeight: "1.7",
            }}
          >
            The players at the top have earned their place. Climb the
            rankings, prove your skills and become the next champion.
          </p>
        </div>
      </section>

      {/* FILTERS */}
      <section
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
          padding: "0 24px 35px",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "15px",
            flexWrap: "wrap",
            padding: "18px",
            background: "#0b1220",
            border: "1px solid #1e293b",
            borderRadius: "16px",
          }}
        >
          <div
            style={{
              display: "flex",
              gap: "8px",
              flexWrap: "wrap",
            }}
          >
            <FilterButton active>
              All Games
            </FilterButton>

            <FilterButton>
              Free Fire
            </FilterButton>

            <FilterButton>
              BGMI
            </FilterButton>

            <FilterButton>
              Valorant
            </FilterButton>

            <FilterButton>
              COD Mobile
            </FilterButton>
          </div>

          <select
            style={{
              background: "#111827",
              color: "#cbd5e1",
              border: "1px solid #334155",
              padding: "10px 14px",
              borderRadius: "9px",
              outline: "none",
            }}
            defaultValue="all-time"
          >
            <option value="weekly">This Week</option>
            <option value="monthly">This Month</option>
            <option value="all-time">All Time</option>
          </select>
        </div>
      </section>

      {/* PODIUM */}
      <section
        style={{
          maxWidth: "1000px",
          margin: "0 auto",
          padding: "20px 24px 70px",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(220px, 1fr))",
            alignItems: "end",
            gap: "18px",
          }}
        >
          {/* SECOND */}
          <PodiumCard
            player={topPlayers[1]}
            position="2"
            medal="🥈"
          />

          {/* FIRST */}
          <PodiumCard
            player={topPlayers[0]}
            position="1"
            medal="🥇"
            winner
          />

          {/* THIRD */}
          <PodiumCard
            player={topPlayers[2]}
            position="3"
            medal="🥉"
          />
        </div>
      </section>

      {/* TABLE */}
      <section
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
          padding: "0 24px",
        }}
      >
        <div
          style={{
            marginBottom: "20px",
          }}
        >
          <h2
            style={{
              margin: 0,
              fontSize: "28px",
            }}
          >
            Global Rankings
          </h2>

          <p
            style={{
              color: "#64748b",
              marginTop: "7px",
            }}
          >
            Top competitive players on the platform.
          </p>
        </div>

        <div
          style={{
            overflowX: "auto",
            border: "1px solid #1e293b",
            borderRadius: "16px",
            background: "#0b1220",
          }}
        >
          <table
            style={{
              width: "100%",
              minWidth: "800px",
              borderCollapse: "collapse",
            }}
          >
            <thead>
              <tr
                style={{
                  color: "#64748b",
                  fontSize: "12px",
                  textTransform: "uppercase",
                  letterSpacing: "1px",
                }}
              >
                <th style={thStyle}>Rank</th>
                <th style={thStyle}>Player</th>
                <th style={thStyle}>Game</th>
                <th style={thStyle}>Wins</th>
                <th style={thStyle}>Matches</th>
                <th style={thStyle}>Win Rate</th>
                <th style={thStyle}>Points</th>
                <th style={thStyle}>Earnings</th>
              </tr>
            </thead>

            <tbody>
              {players.map((player) => {
                const winRate = Math.round(
                  (player.wins / player.matches) * 100
                );

                return (
                  <tr
                    key={player.rank}
                    style={{
                      borderTop: "1px solid #1e293b",
                    }}
                  >
                    <td style={tdStyle}>
                      <span
                        style={{
                          color:
                            player.rank <= 3
                              ? "#a78bfa"
                              : "#94a3b8",
                          fontWeight: "800",
                        }}
                      >
                        #{player.rank}
                      </span>
                    </td>

                    <td style={tdStyle}>
                      <Link
                        href={`/profile/${player.name.toLowerCase()}`}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "12px",
                          color: "white",
                          textDecoration: "none",
                        }}
                      >
                        <span
                          style={{
                            width: "38px",
                            height: "38px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            borderRadius: "50%",
                            background:
                              "linear-gradient(135deg, #7c3aed, #4338ca)",
                            fontSize: "12px",
                            fontWeight: "900",
                          }}
                        >
                          {player.avatar}
                        </span>

                        <strong>{player.name}</strong>
                      </Link>
                    </td>

                    <td style={tdStyle}>
                      <span
                        style={{
                          color: "#cbd5e1",
                        }}
                      >
                        {player.game}
                      </span>
                    </td>

                    <td style={tdStyle}>
                      {player.wins}
                    </td>

                    <td style={tdStyle}>
                      {player.matches}
                    </td>

                    <td style={tdStyle}>
                      <span
                        style={{
                          color: "#22c55e",
                          fontWeight: "700",
                        }}
                      >
                        {winRate}%
                      </span>
                    </td>

                    <td style={tdStyle}>
                      <strong>{player.points}</strong>
                    </td>

                    <td style={tdStyle}>
                      <span
                        style={{
                          color: "#fbbf24",
                          fontWeight: "700",
                        }}
                      >
                        {player.earnings}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>

      {/* CTA */}
      <section
        style={{
          maxWidth: "850px",
          margin: "80px auto 0",
          padding: "50px 24px",
          textAlign: "center",
        }}
      >
        <div
          style={{
            padding: "45px 25px",
            borderRadius: "22px",
            border: "1px solid #312e81",
            background:
              "linear-gradient(135deg, rgba(76,29,149,0.25), rgba(15,23,42,0.9))",
          }}
        >
          <h2
            style={{
              fontSize: "32px",
              margin: "0 0 12px",
            }}
          >
            Think you can reach the top?
          </h2>

          <p
            style={{
              color: "#94a3b8",
              margin: "0 auto 25px",
              maxWidth: "550px",
              lineHeight: "1.7",
            }}
          >
            Join a tournament, earn points and start your journey toward
            the number one spot.
          </p>

          <Link
            href="/tournaments"
            style={{
              display: "inline-block",
              padding: "13px 24px",
              background: "#7c3aed",
              color: "white",
              textDecoration: "none",
              borderRadius: "9px",
              fontWeight: "800",
            }}
          >
            Join Tournament →
          </Link>
        </div>
      </section>
    </main>
  );
}

/* PODIUM CARD */

function PodiumCard({
  player,
  position,
  medal,
  winner = false,
}: {
  player: (typeof players)[number];
  position: string;
  medal: string;
  winner?: boolean;
}) {
  return (
    <div
      style={{
        padding: winner ? "34px 25px" : "28px 22px",
        textAlign: "center",
        borderRadius: "20px",
        border: winner
          ? "1px solid #7c3aed"
          : "1px solid #1e293b",
        background: winner
          ? "linear-gradient(145deg, rgba(124,58,237,0.22), #0b1220)"
          : "#0b1220",
        boxShadow: winner
          ? "0 20px 60px rgba(124,58,237,0.15)"
          : "none",
      }}
    >
      <div
        style={{
          fontSize: winner ? "46px" : "38px",
          marginBottom: "10px",
        }}
      >
        {medal}
      </div>

      <div
        style={{
          width: winner ? "78px" : "68px",
          height: winner ? "78px" : "68px",
          margin: "0 auto 14px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "50%",
          background:
            "linear-gradient(135deg, #7c3aed, #4338ca)",
          fontSize: "20px",
          fontWeight: "900",
        }}
      >
        {player.avatar}
      </div>

      <div
        style={{
          color: "#64748b",
          fontSize: "12px",
          marginBottom: "5px",
        }}
      >
        RANK #{position}
      </div>

      <h3
        style={{
          margin: "0 0 5px",
          fontSize: "21px",
        }}
      >
        {player.name}
      </h3>

      <p
        style={{
          margin: "0 0 18px",
          color: "#64748b",
          fontSize: "13px",
        }}
      >
        {player.game}
      </p>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "20px",
        }}
      >
        <div>
          <strong
            style={{
              display: "block",
              fontSize: "20px",
            }}
          >
            {player.points}
          </strong>

          <span
            style={{
              color: "#64748b",
              fontSize: "11px",
            }}
          >
            POINTS
          </span>
        </div>

        <div>
          <strong
            style={{
              display: "block",
              fontSize: "20px",
              color: "#22c55e",
            }}
          >
            {Math.round(
              (player.wins / player.matches) * 100
            )}
            %
          </strong>

          <span
            style={{
              color: "#64748b",
              fontSize: "11px",
            }}
          >
            WIN RATE
          </span>
        </div>
      </div>
    </div>
  );
}

/* FILTER BUTTON */

function FilterButton({
  children,
  active = false,
}: {
  children: React.ReactNode;
  active?: boolean;
}) {
  return (
    <button
      style={{
        padding: "9px 13px",
        borderRadius: "8px",
        border: active
          ? "1px solid #7c3aed"
          : "1px solid #334155",
        background: active ? "#7c3aed" : "#111827",
        color: active ? "white" : "#94a3b8",
        cursor: "pointer",
        fontSize: "13px",
        fontWeight: "700",
      }}
    >
      {children}
    </button>
  );
}

const thStyle = {
  textAlign: "left" as const,
  padding: "16px",
  fontWeight: "700",
};

const tdStyle = {
  padding: "16px",
  color: "#cbd5e1",
  fontSize: "14px",
};