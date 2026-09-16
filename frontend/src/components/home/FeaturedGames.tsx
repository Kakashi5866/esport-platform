import Link from "next/link";

const games = [
  {
    name: "Free Fire",
    type: "Battle Royale",
    players: "12.4K",
    tournaments: "38",
    icon: "🔥",
  },
  {
    name: "BGMI",
    type: "Battle Royale",
    players: "9.8K",
    tournaments: "27",
    icon: "🎯",
  },
  {
    name: "Valorant",
    type: "Tactical Shooter",
    players: "7.6K",
    tournaments: "19",
    icon: "⚡",
  },
  {
    name: "Call of Duty",
    type: "FPS",
    players: "5.9K",
    tournaments: "14",
    icon: "💀",
  },
];

export default function FeaturedGames() {
  return (
    <section
      style={{
        padding: "75px 24px",
        background: "#020617",
        color: "white",
      }}
    >
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "end",
            gap: "20px",
            flexWrap: "wrap",
            marginBottom: "28px",
          }}
        >
          <div>
            <span
              style={{
                color: "#a78bfa",
                fontSize: "10px",
                fontWeight: "900",
                letterSpacing: "1px",
              }}
            >
              🎮 COMPETE YOUR WAY
            </span>

            <h2
              style={{
                margin: "9px 0 5px",
                fontSize: "32px",
                fontWeight: "950",
              }}
            >
              Featured Games
            </h2>

            <p
              style={{
                margin: 0,
                color: "#64748b",
                fontSize: "13px",
              }}
            >
              Choose your battlefield and start competing.
            </p>
          </div>

          <Link
            href="/games"
            style={{
              color: "#a78bfa",
              textDecoration: "none",
              fontSize: "12px",
              fontWeight: "800",
            }}
          >
            View All Games →
          </Link>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(245px, 1fr))",
            gap: "16px",
          }}
        >
          {games.map((game) => (
            <Link
              key={game.name}
              href="/games"
              style={{
                textDecoration: "none",
                color: "white",
              }}
            >
              <div
                style={{
                  padding: "23px",
                  minHeight: "205px",
                  borderRadius: "17px",
                  background:
                    "linear-gradient(145deg, #0f172a, #080d18)",
                  border: "1px solid #1e293b",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <div
                    style={{
                      width: "54px",
                      height: "54px",
                      borderRadius: "13px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      background:
                        "linear-gradient(135deg, #312e81, #7c3aed)",
                      fontSize: "25px",
                    }}
                  >
                    {game.icon}
                  </div>

                  <span
                    style={{
                      color: "#86efac",
                      fontSize: "9px",
                      fontWeight: "900",
                    }}
                  >
                    ● ACTIVE
                  </span>
                </div>

                <h3
                  style={{
                    margin: "20px 0 4px",
                    fontSize: "18px",
                  }}
                >
                  {game.name}
                </h3>

                <span
                  style={{
                    color: "#64748b",
                    fontSize: "11px",
                  }}
                >
                  {game.type}
                </span>

                <div
                  style={{
                    display: "flex",
                    gap: "22px",
                    marginTop: "20px",
                  }}
                >
                  <div>
                    <strong>{game.players}</strong>
                    <div style={small}>Players</div>
                  </div>

                  <div>
                    <strong>{game.tournaments}</strong>
                    <div style={small}>Tournaments</div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

const small = {
  color: "#64748b",
  fontSize: "9px",
  marginTop: "3px",
};