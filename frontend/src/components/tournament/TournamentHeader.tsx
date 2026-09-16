type TournamentHeaderProps = {
  game: string;
  title: string;
  status: string;
  accentColor?: string | null;
};

export default function TournamentHeader({
  game,
  title,
  status,
  accentColor,
}: TournamentHeaderProps) {
  const accent = accentColor || "#312e81";

  return (
    <div
      style={{
        padding: "35px",
        borderRadius: "18px",
        background: "linear-gradient(135deg, #111c33, #1e1b4b)",
        border: `1px solid ${accent}`,
        borderLeft: `4px solid ${accent}`,
        marginBottom: "25px",
      }}
    >
      <span
        style={{
          display: "inline-block",
          padding: "7px 12px",
          borderRadius: "7px",
          background: accent,
          color: "white",
          fontSize: "12px",
          fontWeight: "700",
        }}
      >
        {game}
      </span>

      <h1
        style={{
          fontSize: "42px",
          margin: "20px 0 12px",
        }}
      >
        {title}
      </h1>

      {status === "LIVE" ? (
        <span
          className="live-badge"
          style={{
            marginTop: "4px",
            padding: "6px 13px",
            borderRadius: "999px",
            background: "rgba(74, 222, 128, 0.12)",
            color: "#4ade80",
            fontWeight: "800",
            fontSize: "14px",
          }}
        >
          <span className="live-badge-dot" />
          LIVE NOW
        </span>
      ) : (
        <span
          style={{
            color: "#facc15",
            fontWeight: "700",
          }}
        >
          ● {status}
        </span>
      )}
    </div>
  );
}