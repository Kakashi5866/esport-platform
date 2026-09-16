type Team = {
  id: string;
  name: string;
  tag: string;
  players: number;
  wins: number;
  status: "REGISTERED" | "ELIMINATED";
};

type TeamCardProps = {
  team: Team;
};

export default function TeamCard({ team }: TeamCardProps) {
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
          alignItems: "center",
          gap: "12px",
        }}
      >
        <div
          style={{
            width: "48px",
            height: "48px",
            flexShrink: 0,
            borderRadius: "12px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background:
              "linear-gradient(135deg, #312e81, #7c3aed)",
            color: "white",
            fontSize: "15px",
            fontWeight: "950",
          }}
        >
          {team.tag.slice(0, 3).toUpperCase()}
        </div>

        <div style={{ minWidth: 0 }}>
          <h3
            style={{
              margin: 0,
              color: "#f8fafc",
              fontSize: "13px",
              fontWeight: "900",
            }}
          >
            {team.name}
          </h3>

          <p
            style={{
              margin: "4px 0 0",
              color: "#64748b",
              fontSize: "9px",
            }}
          >
            {team.players} players
          </p>
        </div>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "8px",
          marginTop: "16px",
        }}
      >
        <Stat label="Wins" value={String(team.wins)} />

        <Stat
          label="Status"
          value={team.status === "REGISTERED" ? "Ready" : "Out"}
        />
      </div>
    </div>
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
    <div
      style={{
        padding: "10px",
        borderRadius: "8px",
        background: "#111827",
      }}
    >
      <span
        style={{
          display: "block",
          color: "#475569",
          fontSize: "8px",
          fontWeight: "800",
        }}
      >
        {label}
      </span>

      <strong
        style={{
          display: "block",
          marginTop: "4px",
          color: "#cbd5e1",
          fontSize: "10px",
        }}
      >
        {value}
      </strong>
    </div>
  );
}