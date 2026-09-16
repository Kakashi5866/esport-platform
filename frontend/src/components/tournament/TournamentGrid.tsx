import TournamentCard from "./TournamentCard";

export type Tournament = {
  id: string;
  game: string;
  title: string;
  entry: string;
  prize: string;
  slots: string;
  status: string;
  mode: string;
  image_url?: string | null;
  description?: string | null;
  rules?: string | null;
  accent_color?: string | null;
};

type TournamentGridProps = {
  tournaments: Tournament[];
};

export default function TournamentGrid({
  tournaments,
}: TournamentGridProps) {
  if (tournaments.length === 0) {
    return (
      <div
        style={{
          padding: "60px 20px",
          textAlign: "center",
          borderRadius: "16px",
          background: "#0b1220",
          border: "1px solid #1e293b",
        }}
      >
        <p style={{ color: "#94a3b8", margin: 0 }}>
          No tournaments match your filters.
        </p>
      </div>
    );
  }

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
        gap: "20px",
      }}
    >
      {tournaments.map((tournament) => (
        <TournamentCard key={tournament.id} tournament={tournament} />
      ))}
    </div>
  );
}