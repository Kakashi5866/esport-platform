import Link from "next/link";

export default function CTA() {
  return (
    <section
      style={{
        padding: "85px 24px",
        background: "#020617",
        color: "white",
      }}
    >
      <div
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
          padding: "55px 35px",
          borderRadius: "22px",
          textAlign: "center",
          background:
            "radial-gradient(circle at center, rgba(124,58,237,.28), #0b1220 65%)",
          border: "1px solid #312e81",
        }}
      >
        <div style={{ fontSize: "35px" }}>⚔️</div>

        <h2
          style={{
            margin: "15px 0 10px",
            fontSize: "clamp(30px, 5vw, 45px)",
            fontWeight: "950",
          }}
        >
          Ready To Enter The Arena?
        </h2>

        <p
          style={{
            maxWidth: "560px",
            margin: "0 auto 26px",
            color: "#94a3b8",
            fontSize: "13px",
            lineHeight: 1.7,
          }}
        >
          Find your game, join the competition and start building your
          esports legacy.
        </p>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "10px",
            flexWrap: "wrap",
          }}
        >
          <Link href="/tournaments" style={primaryButton}>
            🏆 Explore Tournaments
          </Link>

          <Link href="/auth/register" style={secondaryButton}>
            Create Gamer Profile
          </Link>
        </div>
      </div>
    </section>
  );
}

const primaryButton = {
  padding: "12px 19px",
  borderRadius: "9px",
  background: "#7c3aed",
  color: "white",
  textDecoration: "none",
  fontSize: "11px",
  fontWeight: "900",
};

const secondaryButton = {
  padding: "12px 19px",
  borderRadius: "9px",
  background: "#111827",
  border: "1px solid #334155",
  color: "#cbd5e1",
  textDecoration: "none",
  fontSize: "11px",
  fontWeight: "900",
};