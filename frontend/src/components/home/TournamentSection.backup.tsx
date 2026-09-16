const tournaments = [
  {
    game: "FREE FIRE MAX",
    title: "Battle Royale Championship",
    entry: "₹50",
    prize: "₹10,000",
    players: "48 Players",
  },
  {
    game: "FREE FIRE MAX",
    title: "Clash Squad Masters",
    entry: "₹100",
    prize: "₹25,000",
    players: "24 Teams",
  },
  {
    game: "FREE FIRE MAX",
    title: "Weekend Warrior Cup",
    entry: "₹20",
    prize: "₹5,000",
    players: "48 Players",
  },
];

export default function TournamentSection() {
  return (
    <section
      style={{
        background: "#0f172a",
        color: "white",
        padding: "90px 40px",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
        <div style={{ marginBottom: "45px" }}>
          <p
            style={{
              color: "#a78bfa",
              fontWeight: "700",
              letterSpacing: "2px",
              marginBottom: "10px",
            }}
          >
            LIVE & UPCOMING
          </p>

          <h2
            style={{
              fontSize: "40px",
              margin: "0 0 12px",
            }}
          >
            Featured Tournaments
          </h2>

          <p
            style={{
              color: "#94a3b8",
              fontSize: "17px",
              maxWidth: "650px",
            }}
          >
            Choose a tournament, secure your slot and compete against the best
            players.
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "24px",
          }}
        >
          {tournaments.map((tournament) => (
            <div
              key={tournament.title}
              style={{
                background: "#111c33",
                border: "1px solid #263450",
                borderRadius: "16px",
                padding: "25px",
              }}
            >
              <span
                style={{
                  display: "inline-block",
                  background: "#312e81",
                  color: "#c4b5fd",
                  padding: "6px 10px",
                  borderRadius: "6px",
                  fontSize: "12px",
                  fontWeight: "700",
                }}
              >
                {tournament.game}
              </span>

              <h3
                style={{
                  fontSize: "22px",
                  margin: "20px 0 22px",
                }}
              >
                {tournament.title}
              </h3>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "15px",
                  marginBottom: "25px",
                }}
              >
                <div>
                  <p style={{ color: "#64748b", margin: 0 }}>Entry</p>
                  <strong style={{ fontSize: "18px" }}>
                    {tournament.entry}
                  </strong>
                </div>

                <div>
                  <p style={{ color: "#64748b", margin: 0 }}>Prize Pool</p>
                  <strong style={{ fontSize: "18px", color: "#a78bfa" }}>
                    {tournament.prize}
                  </strong>
                </div>

                <div>
                  <p style={{ color: "#64748b", margin: 0 }}>Format</p>
                  <strong>{tournament.players}</strong>
                </div>

                <div>
                  <p style={{ color: "#64748b", margin: 0 }}>Status</p>
                  <strong style={{ color: "#4ade80" }}>Open</strong>
                </div>
              </div>

              <button
                style={{
                  width: "100%",
                  padding: "13px",
                  border: "none",
                  borderRadius: "9px",
                  background: "#7c3aed",
                  color: "white",
                  fontSize: "15px",
                  fontWeight: "700",
                  cursor: "pointer",
                }}
              >
                View Tournament
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}