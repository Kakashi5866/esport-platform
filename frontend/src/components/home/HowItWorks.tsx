const steps = [
  {
    number: "01",
    icon: "👤",
    title: "Create Your Profile",
    text: "Set up your gamer identity and start building your competitive profile.",
  },
  {
    number: "02",
    icon: "🎮",
    title: "Choose Your Battle",
    text: "Find your game, discover tournaments and pick the competition you want.",
  },
  {
    number: "03",
    icon: "⚔️",
    title: "Compete",
    text: "Join the action, play your matches and prove what you can do.",
  },
  {
    number: "04",
    icon: "🏆",
    title: "Climb & Win",
    text: "Earn recognition, climb the leaderboard and chase bigger prizes.",
  },
];

export default function HowItWorks() {
  return (
    <section
    id="how-it-works"
      style={{
        padding: "80px 24px",
        background: "#030712",
        color: "white",
        borderTop: "1px solid #0f172a",
      }}
    >
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <div style={{ marginBottom: "42px" }}>
          <span
            style={{
              color: "#a78bfa",
              fontSize: "10px",
              fontWeight: "900",
              letterSpacing: "1px",
            }}
          >
            YOUR JOURNEY STARTS HERE
          </span>

          <h2
            style={{
              margin: "10px 0 6px",
              fontSize: "34px",
              fontWeight: "950",
            }}
          >
            From Player To <span style={{ color: "#a78bfa" }}>Champion.</span>
          </h2>

          <p
            style={{
              margin: 0,
              color: "#64748b",
              fontSize: "13px",
            }}
          >
            Four steps. One arena. Your game.
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(230px, 1fr))",
            gap: "14px",
          }}
        >
          {steps.map((step) => (
            <div
              key={step.number}
              style={{
                position: "relative",
                padding: "25px",
                minHeight: "205px",
                borderRadius: "16px",
                background: "#0b1220",
                border: "1px solid #1e293b",
              }}
            >
              <span
                style={{
                  position: "absolute",
                  top: "18px",
                  right: "20px",
                  color: "#334155",
                  fontSize: "22px",
                  fontWeight: "950",
                }}
              >
                {step.number}
              </span>

              <div
                style={{
                  width: "48px",
                  height: "48px",
                  borderRadius: "12px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background:
                    "linear-gradient(135deg, #312e81, #7c3aed)",
                  fontSize: "21px",
                }}
              >
                {step.icon}
              </div>

              <h3
                style={{
                  margin: "20px 0 8px",
                  fontSize: "16px",
                }}
              >
                {step.title}
              </h3>

              <p
                style={{
                  margin: 0,
                  color: "#64748b",
                  fontSize: "11px",
                  lineHeight: 1.7,
                }}
              >
                {step.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}