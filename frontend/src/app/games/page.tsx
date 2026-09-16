import Link from "next/link";
import { games } from "@/data/games";

export default function GamesPage() {
  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#020617",
        color: "#f8fafc",
        padding: "60px 24px 90px",
      }}
    >
      <div
        style={{
          maxWidth: "1150px",
          margin: "0 auto",
        }}
      >
        <section style={{ marginBottom: "35px" }}>
          <p
            style={{
              margin: 0,
              color: "#a78bfa",
              fontSize: "10px",
              fontWeight: 900,
              letterSpacing: "1.5px",
            }}
          >
            COMPETITIVE GAMING
          </p>

          <h1
            style={{
              margin: "10px 0",
              fontSize: "clamp(36px, 6vw, 58px)",
              fontWeight: 950,
              lineHeight: 1,
            }}
          >
            Choose Your Game
          </h1>

          <p
            style={{
              maxWidth: "650px",
              color: "#94a3b8",
              fontSize: "13px",
              lineHeight: 1.7,
            }}
          >
            Select a game to view its rules, tournament
            instructions and available competitive events.
          </p>
        </section>

        <section
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "20px",
          }}
        >
          {games.map((game) => (
            <Link
              key={game.id}
              href={`/games/${game.id}`}
              style={{
                minHeight: "300px",
                display: "flex",
                alignItems: "flex-end",
                position: "relative",
                overflow: "hidden",
                borderRadius: "18px",
                textDecoration: "none",
                color: "white",
                backgroundImage: `linear-gradient(
                  to top,
                  rgba(2,6,23,1) 5%,
                  rgba(2,6,23,.45) 60%,
                  rgba(2,6,23,.05)
                ), url(${game.image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                border: "1px solid #1e293b",
              }}
            >
              <div style={{ padding: "24px" }}>
                <span
                  style={{
                    color: "#a78bfa",
                    fontSize: "8px",
                    fontWeight: 900,
                    letterSpacing: "1px",
                  }}
                >
                  {game.genre.toUpperCase()}
                </span>

                <h2
                  style={{
                    margin: "7px 0",
                    fontSize: "28px",
                    fontWeight: 950,
                  }}
                >
                  {game.name}
                </h2>

                <p
                  style={{
                    margin: 0,
                    color: "#cbd5e1",
                    fontSize: "10px",
                  }}
                >
                  {game.players} players •{" "}
                  {game.tournaments} tournaments
                </p>

                <div
                  style={{
                    marginTop: "14px",
                    color: "#c4b5fd",
                    fontSize: "9px",
                    fontWeight: 900,
                  }}
                >
                  VIEW GAME →
                </div>
              </div>
            </Link>
          ))}
        </section>
      </div>
    </main>
  );
}
