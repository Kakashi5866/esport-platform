const stats = [
  { value: "10K+", label: "Players" },
  { value: "500+", label: "Tournaments" },
  { value: "₹25L+", label: "Prize Distributed" },
  { value: "24/7", label: "Support" },
];

export default function HeroStats() {
  return (
    <section
      style={{
        background: "#0f172a",
        padding: "0 40px 70px",
        color: "white",
      }}
    >
      <div
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
          gap: "1px",
          background: "#334155",
          border: "1px solid #334155",
          borderRadius: "14px",
          overflow: "hidden",
        }}
      >
        {stats.map((stat) => (
          <div
            key={stat.label}
            style={{
              background: "#111c33",
              padding: "25px 15px",
              textAlign: "center",
            }}
          >
            <h3
              style={{
                fontSize: "28px",
                margin: "0 0 6px",
                color: "#a78bfa",
              }}
            >
              {stat.value}
            </h3>

            <p
              style={{
                margin: 0,
                color: "#94a3b8",
              }}
            >
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}