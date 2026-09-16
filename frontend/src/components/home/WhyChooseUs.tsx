const features = [
  {
    icon: "🏆",
    title: "Compete & Win",
    text: "Enter competitive tournaments and fight for real prize pools.",
  },
  {
    icon: "⚡",
    title: "Live Competition",
    text: "Track active matches, tournament activity and competitive action.",
  },
  {
    icon: "👑",
    title: "Build Your Rank",
    text: "Climb the leaderboard, improve your stats and become a top player.",
  },
  {
    icon: "🛡️",
    title: "Competitive Arena",
    text: "A dedicated esports environment built around gamers and competition.",
  },
];

export default function WhyChooseUs() {
  return (
    <section
      style={{
        padding: "80px 24px",
        background: "#020617",
        color: "white",
      }}
    >
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "42px" }}>
          <span
            style={{
              color: "#a78bfa",
              fontSize: "10px",
              fontWeight: "900",
              letterSpacing: "1px",
            }}
          >
            WHY PLAY HERE
          </span>

          <h2
            style={{
              margin: "10px 0",
              fontSize: "34px",
              fontWeight: "950",
            }}
          >
            Built For The <span style={{ color: "#a78bfa" }}>Grind.</span>
          </h2>

          <p
            style={{
              maxWidth: "580px",
              margin: "0 auto",
              color: "#64748b",
              fontSize: "13px",
              lineHeight: 1.7,
            }}
          >
            Everything you need to compete, improve, connect and make
            your mark in the esports arena.
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(240px, 1fr))",
            gap: "15px",
          }}
        >
          {features.map((feature) => (
            <div
              key={feature.title}
              style={{
                padding: "26px",
                borderRadius: "16px",
                background:
                  "linear-gradient(145deg, #0f172a, #080d18)",
                border: "1px solid #1e293b",
              }}
            >
              <div
                style={{
                  width: "50px",
                  height: "50px",
                  borderRadius: "13px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: "#17112b",
                  fontSize: "22px",
                }}
              >
                {feature.icon}
              </div>

              <h3
                style={{
                  margin: "20px 0 8px",
                  fontSize: "17px",
                }}
              >
                {feature.title}
              </h3>

              <p
                style={{
                  margin: 0,
                  color: "#64748b",
                  fontSize: "11px",
                  lineHeight: 1.7,
                }}
              >
                {feature.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}