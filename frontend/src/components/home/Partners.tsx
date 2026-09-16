const partners = [
  "GAME ARENA",
  "PRO LEAGUE",
  "NEXT LEVEL",
  "ESPORTS HUB",
  "GG NETWORK",
];

export default function Partners() {
  return (
    <section
      style={{
        padding: "35px 24px",
        background: "#030712",
        borderTop: "1px solid #0f172a",
        borderBottom: "1px solid #0f172a",
      }}
    >
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <p
          style={{
            textAlign: "center",
            margin: "0 0 22px",
            color: "#475569",
            fontSize: "9px",
            fontWeight: "900",
            letterSpacing: "1.5px",
          }}
        >
          POWERING THE COMPETITIVE ECOSYSTEM
        </p>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "12px",
            flexWrap: "wrap",
          }}
        >
          {partners.map((partner) => (
            <div
              key={partner}
              style={{
                padding: "12px 18px",
                borderRadius: "8px",
                background: "#0b1220",
                border: "1px solid #1e293b",
                color: "#64748b",
                fontSize: "10px",
                fontWeight: "900",
                letterSpacing: ".5px",
              }}
            >
              {partner}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}