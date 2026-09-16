type Match = {
  id: string;
  round: string;
  teamA: string;
  teamB: string;
  scoreA?: string;
  scoreB?: string;
  status: "LIVE" | "UPCOMING" | "COMPLETED";
  time: string;
};

type MatchCardProps = {
  match: Match;
};

export default function MatchCard({ match }: MatchCardProps) {
  const statusStyle =
    match.status === "LIVE"
      ? {
          background: "#3f1018",
          color: "#fb7185",
        }
      : match.status === "COMPLETED"
      ? {
          background: "#0f172a",
          color: "#64748b",
        }
      : {
          background: "#17112b",
          color: "#a78bfa",
        };

  return (
    <div
      style={{
        padding: "18px",
        borderRadius: "14px",
        background: "#0b1220",
        border: "1px solid #1e293b",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "16px",
        }}
      >
        <span
          style={{
            color: "#64748b",
            fontSize: "9px",
            fontWeight: "800",
            letterSpacing: ".7px",
          }}
        >
          {match.round}
        </span>

        <span
          style={{
            padding: "5px 8px",
            borderRadius: "6px",
            fontSize: "8px",
            fontWeight: "900",
            ...statusStyle,
          }}
        >
          {match.status}
        </span>
      </div>

      <div
        style={{
          display: "grid",
          gap: "9px",
        }}
      >
        <TeamRow
          name={match.teamA}
          score={match.scoreA}
        />

        <div
          style={{
            height: "1px",
            background: "#1e293b",
          }}
        />

        <TeamRow
          name={match.teamB}
          score={match.scoreB}
        />
      </div>

      <div
        style={{
          marginTop: "15px",
          color: "#64748b",
          fontSize: "9px",
        }}
      >
        🕐 {match.time}
      </div>
    </div>
  );
}

function TeamRow({
  name,
  score,
}: {
  name: string;
  score?: string;
}) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "10px",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "9px",
        }}
      >
        <div
          style={{
            width: "30px",
            height: "30px",
            borderRadius: "8px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "#111827",
            border: "1px solid #1e293b",
            fontSize: "13px",
          }}
        >
          🎮
        </div>

        <span
          style={{
            color: "#e2e8f0",
            fontSize: "11px",
            fontWeight: "800",
          }}
        >
          {name}
        </span>
      </div>

      {score !== undefined && (
        <strong
          style={{
            color: "white",
            fontSize: "16px",
          }}
        >
          {score}
        </strong>
      )}
    </div>
  );
}