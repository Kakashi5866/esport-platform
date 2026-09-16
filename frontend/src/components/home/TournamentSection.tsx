import Link from "next/link";

const tournaments = [
  {
    game: "FREE FIRE",
    title: "FF BR Championship",
    prize: "₹50,000",
    slots: "48 / 64",
    status: "LIVE",
  },
  {
    game: "BGMI",
    title: "BGMI Squad Masters",
    prize: "₹75,000",
    slots: "52 / 64",
    status: "UPCOMING",
  },
  {
    game: "VALORANT",
    title: "Valorant Rising Cup",
    prize: "₹1,00,000",
    slots: "18 / 32",
    status: "UPCOMING",
  },
];

export default function TournamentSection() {
  return (
    <section
      style={{
        padding: "75px 24px",
        background: "#030712",
        color: "white",
        borderTop: "1px solid #0f172a",
        borderBottom: "1px solid #0f172a",
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
              🏆 ENTER THE COMPETITION
            </span>

            <h2
              style={{
                margin: "9px 0 5px",
                fontSize: "32px",
                fontWeight: "950",
              }}
            >
              Featured Tournaments
            </h2>

            <p
              style={{
                margin: 0,
                color: "#64748b",
                fontSize: "13px",
              }}
            >
              Your next opportunity to prove yourself.
            </p>
          </div>

          <Link
            href="/tournaments"
            style={{
              color: "#a78bfa",
              textDecoration: "none",
              fontSize: "12px",
              fontWeight: "800",
            }}
          >
            Explore All →
          </Link>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(290px, 1fr))",
            gap: "16px",
          }}
        >
          {tournaments.map((tournament) => (
            <div
              key={tournament.title}
              style={{
                padding: "22px",
                borderRadius: "16px",
                background: "#0b1220",
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
                <span
                  style={{
                    color: "#a78bfa",
                    fontSize: "9px",
                    fontWeight: "900",
                    letterSpacing: "1px",
                  }}
                >
                  {tournament.game}
                </span>

                <span
                  style={{
                    padding: "5px 8px",
                    borderRadius: "6px",
                    background:
                      tournament.status === "LIVE"
                        ? "#14532d"
                        : "#172033",
                    color:
                      tournament.status === "LIVE"
                        ? "#86efac"
                        : "#94a3b8",
                    fontSize: "8px",
                    fontWeight: "900",
                  }}
                >
                  {tournament.status === "LIVE"
                    ? "● LIVE"
                    : "UPCOMING"}
                </span>
              </div>

              <h3
                style={{
                  margin: "20px 0",
                  fontSize: "18px",
                }}
              >
                {tournament.title}
              </h3>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "10px",
                  marginBottom: "18px",
                }}
              >
                <div style={statBox}>
                  <span style={label}>PRIZE POOL</span>
                  <strong style={value}>
                    {tournament.prize}
                  </strong>
                </div>

                <div style={statBox}>
                  <span style={label}>SLOTS</span>
                  <strong style={value}>
                    {tournament.slots}
                  </strong>
                </div>
              </div>

              <Link
                href="/tournaments"
                style={{
                  display: "block",
                  padding: "11px",
                  textAlign: "center",
                  borderRadius: "8px",
                  background: "#7c3aed",
                  color: "white",
                  textDecoration: "none",
                  fontSize: "11px",
                  fontWeight: "900",
                }}
              >
                {tournament.status === "LIVE"
                  ? "View Tournament"
                  : "Join Tournament"}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const statBox = {
  padding: "12px",
  borderRadius: "8px",
  background: "#020617",
  border: "1px solid #1e293b",
};

const label = {
  display: "block",
  color: "#475569",
  fontSize: "8px",
  fontWeight: "800",
};

const value = {
  display: "block",
  marginTop: "5px",
  fontSize: "14px",
};