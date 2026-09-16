const stats = [
  { value: "43K+", label: "Active Gamers", icon: "👥" },
  { value: "119+", label: "Tournaments", icon: "🏆" },
  { value: "₹25L+", label: "Prize Pool", icon: "💰" },
  { value: "50+", label: "Live Matches", icon: "⚡" },
];

export default function HeroStats() {
  return (
    <section
      style={{
        padding: "24px",
        background: "#020617",
      }}
    >
      <div
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "14px",
        }}
      >
        {stats.map((stat) => (
          <div
            key={stat.label}
            style={{
              padding: "22px",
              borderRadius: "16px",
              background:
                "linear-gradient(145deg, #0f172a, #080d18)",
              border: "1px solid #1e293b",
              display: "flex",
              alignItems: "center",
              gap: "14px",
            }}
          >
            <div
              style={{
                width: "46px",
                height: "46px",
                borderRadius: "12px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "#17112b",
                fontSize: "20px",
              }}
            >
              {stat.icon}
            </div>

            <div>
              <strong
                style={{
                  display: "block",
                  color: "white",
                  fontSize: "22px",
                  fontWeight: "900",
                }}
              >
                {stat.value}
              </strong>

              <span
                style={{
                  color: "#64748b",
                  fontSize: "11px",
                }}
              >
                {stat.label}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}