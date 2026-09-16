import GameCard from "@/components/games/GameCard";
import { games } from "@/data/games";

export default function GameGrid() {
  return (
    <section
      style={{
        display: "grid",
        gridTemplateColumns:
          "repeat(auto-fit, minmax(280px, 1fr))",
        gap: "18px",
      }}
    >
      {games.map((game) => (
        <GameCard key={game.id} game={game} />
      ))}
    </section>
  );
}