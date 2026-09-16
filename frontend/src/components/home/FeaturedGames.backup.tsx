const games = [
  {
    name: "Free Fire MAX",
    description: "Battle Royale & Clash Squad tournaments",
    status: "Popular",
  },
  {
    name: "BGMI",
    description: "Competitive mobile battle royale tournaments",
    status: "Coming Soon",
  },
  {
    name: "Valorant",
    description: "Team-based tactical esports competitions",
    status: "Coming Soon",
  },
];

export default function FeaturedGames() {
  return (
    <section
      style={{
        background: "#0f172a",
        color: "white",
        padding: "90px 40px",
      }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <div style={{ marginBottom: "40px" }}>
          <p
            style={{
              color: "#a78bfa",
              fontWeight: "700",
              letterSpacing: "2px",
            }}
          >
            GAMES
          </p>

          <h2
            style={{
              fontSize: "40px",
              margin: "10px 0",
            }}
          >
            Choose Your Game
          </h2>

          <p style={{ color: "#94a3b8", fontSize: "17px" }}>
            Select your favorite game and get ready for competitive action.
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "24px",
          }}
        >
          {games.map((game) => (
            <div
              key={game.name}
              style={{
                minHeight: "200px",
                padding: "28px",
                borderRadius: "16px",
                background: "#111c33",
                border: "1px solid #263450",
              }}
            >
              <span
                style={{
                  display: "inline-block",
                  padding: "6px 10px",
                  borderRadius: "6px",
                  background:
                    game.status === "Popular" ? "#312e81" : "#1e293b",
                  color:
                    game.status === "Popular" ? "#c4b5fd" : "#94a3b8",
                  fontSize: "12px",
                  fontWeight: "700",
                }}
              >
                {game.status}
              </span>

              <h3
                style={{
                  fontSize: "25px",
                  margin: "25px 0 12px",
                }}
              >
                {game.name}
              </h3>

              <p
                style={{
                  color: "#94a3b8",
                  lineHeight: "1.6",
                  margin: 0,
                }}
              >
                {game.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}