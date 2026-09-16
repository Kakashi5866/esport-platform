import Link from "next/link";
import type { Game } from "@/data/games";

type GameCardProps = {
  game: Game;
};

export default function GameCard({ game }: GameCardProps) {
  return (
    <Link
      href={`/games/${game.id}`}
      style={{
        display: "block",
        color: "inherit",
        textDecoration: "none",
      }}
    >
      <article
        style={{
          position: "relative",
          overflow: "hidden",
          minHeight: "310px",
          borderRadius: "18px",
          border: "1px solid #1e293b",
          background: "#0b1220",
          cursor: "pointer",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: `linear-gradient(
              to top,
              rgba(2,6,23,.98) 5%,
              rgba(2,6,23,.65) 50%,
              rgba(2,6,23,.1) 100%
            ), url(${game.image})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />

        <div
          style={{
            position: "relative",
            minHeight: "310px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
            padding: "22px",
          }}
        >
          <span
            style={{
              alignSelf: "flex-start",
              marginBottom: "10px",
              padding: "6px 9px",
              borderRadius: "7px",
              background: "#7c3aed",
              color: "white",
              fontSize: "8px",
              fontWeight: "900",
            }}
          >
            {game.status}
          </span>

          <span
            style={{
              color: "#c4b5fd",
              fontSize: "9px",
              fontWeight: "900",
              letterSpacing: "1px",
            }}
          >
            {game.genre.toUpperCase()}
          </span>

          <h2
            style={{
              margin: "6px 0",
              color: "white",
              fontSize: "25px",
              fontWeight: "950",
            }}
          >
            {game.name}
          </h2>

          <p
            style={{
              margin: 0,
              color: "#cbd5e1",
              fontSize: "10px",
              lineHeight: 1.6,
            }}
          >
            {game.description}
          </p>

          <div
            style={{
              display: "flex",
              gap: "20px",
              marginTop: "15px",
            }}
          >
            <Stat label="PLAYERS" value={game.players} />
            <Stat label="TOURNAMENTS" value={game.tournaments} />
          </div>
        </div>
      </article>
    </Link>
  );
}

function Stat({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div>
      <span
        style={{
          display: "block",
          color: "#64748b",
          fontSize: "7px",
          fontWeight: "900",
        }}
      >
        {label}
      </span>

      <strong
        style={{
          display: "block",
          marginTop: "3px",
          color: "white",
          fontSize: "12px",
        }}
      >
        {value}
      </strong>
    </div>
  );
}