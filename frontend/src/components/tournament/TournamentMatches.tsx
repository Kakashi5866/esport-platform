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

const matches: Match[] = [
  {
    id: "match-1",
    round: "Semi Final",
    teamA: "Shadow Titans",
    teamB: "Night Raiders",
    scoreA: "2",
    scoreB: "1",
    status: "LIVE",
    time: "Live Now",
  },
  {
    id: "match-2",
    round: "Quarter Final",
    teamA: "Alpha Wolves",
    teamB: "Rogue Force",
    status: "UPCOMING",
    time: "Today • 8:00 PM",
  },
  {
    id: "match-3",
    round: "Quarter Final",
    teamA: "Dark Knights",
    teamB: "Phoenix Squad",
    scoreA: "2",
    scoreB: "0",
    status: "COMPLETED",
    time: "Completed",
  },
];

export default function TournamentMatches() {
  return (
    <section style={{ marginTop: "45px" }}>
      <div style={{ marginBottom: "18px" }}>
        <span
          style={{
            color: "#a78bfa",
            fontSize: "9px",
            fontWeight: "900",
            letterSpacing: "1px",
          }}
        >
          MATCH CENTER
        </span>

        <h3
          style={{
            margin: "6px 0 5px",
            fontSize: "24px",
            color: "#f8fafc",
          }}
        >
          Matches
        </h3>

        <p
          style={{
            margin: 0,
            color: "#64748b",
            fontSize: "11px",
          }}
        >
          Track live, upcoming and completed matches.
        </p>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "12px",
        }}
      >
        {matches.map((match) => {
          const statusStyle =
            match.status === "LIVE"
              ? {
                  background: "#3f1018",
                  color: "#fb7185",
                }
              : match.status === "COMPLETED"
              ? {
                  background: "#111827",
                  color: "#64748b",
                }
              : {
                  background: "#17112b",
                  color: "#a78bfa",
                };

          return (
            <div
              key={match.id}
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

              <MatchTeam
                name={match.teamA}
                score={match.scoreA}
              />

              <div
                style={{
                  height: "1px",
                  background: "#1e293b",
                  margin: "10px 0",
                }}
              />

              <MatchTeam
                name={match.teamB}
                score={match.scoreB}
              />

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
        })}
      </div>
    </section>
  );
}

function MatchTeam({
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