type Team = {
  id: string;
  name: string;
  tag: string;
  players: number;
  wins: number;
  status: "REGISTERED" | "ELIMINATED";
};

const teams: Team[] = [
  {
    id: "team-1",
    name: "Shadow Titans",
    tag: "STX",
    players: 4,
    wins: 7,
    status: "REGISTERED",
  },
  {
    id: "team-2",
    name: "Night Raiders",
    tag: "NTR",
    players: 4,
    wins: 6,
    status: "REGISTERED",
  },
  {
    id: "team-3",
    name: "Alpha Wolves",
    tag: "AW",
    players: 4,
    wins: 5,
    status: "REGISTERED",
  },
  {
    id: "team-4",
    name: "Rogue Force",
    tag: "RGF",
    players: 4,
    wins: 3,
    status: "REGISTERED",
  },
];

export default function TournamentTeams() {
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
          COMPETITION
        </span>

        <h3
          style={{
            margin: "6px 0 5px",
            fontSize: "24px",
            color: "#f8fafc",
          }}
        >
          Participating Teams
        </h3>

        <p
          style={{
            margin: 0,
            color: "#64748b",
            fontSize: "11px",
          }}
        >
          Teams currently competing in this tournament.
        </p>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "12px",
        }}
      >
        {teams.map((team) => (
          <div
            key={team.id}
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
                  fontSize: "13px",
                  fontWeight: "950",
                }}
              >
                {team.tag}
              </div>

              <div>
                <h4
                  style={{
                    margin: 0,
                    color: "#f8fafc",
                    fontSize: "13px",
                    fontWeight: "900",
                  }}
                >
                  {team.name}
                </h4>

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
                  }}
                >
                  WINS
                </span>

                <strong
                  style={{
                    display: "block",
                    marginTop: "4px",
                    color: "#cbd5e1",
                    fontSize: "12px",
                  }}
                >
                  {team.wins}
                </strong>
              </div>

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
                  }}
                >
                  STATUS
                </span>

                <strong
                  style={{
                    display: "block",
                    marginTop: "4px",
                    color:
                      team.status === "REGISTERED"
                        ? "#4ade80"
                        : "#fb7185",
                    fontSize: "10px",
                  }}
                >
                  {team.status === "REGISTERED"
                    ? "Ready"
                    : "Eliminated"}
                </strong>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}