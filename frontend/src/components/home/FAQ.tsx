const faqs = [
  {
    q: "What is Esports Platform?",
    a: "A competitive gaming platform where players can discover games, tournaments, matches and leaderboard rankings.",
  },
  {
    q: "Can I join tournaments?",
    a: "Yes. Players can explore available tournaments and use the tournament registration flow to participate.",
  },
  {
    q: "How do leaderboards work?",
    a: "Players can compete, improve their performance and climb the rankings based on competitive results.",
  },
  {
    q: "Which games are supported?",
    a: "The platform is designed to support multiple competitive games including battle royale and tactical shooter titles.",
  },
];

export default function FAQ() {
  return (
    <section
      style={{
        padding: "75px 24px",
        background: "#020617",
        color: "white",
      }}
    >
      <div style={{ maxWidth: "850px", margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "35px" }}>
          <span
            style={{
              color: "#a78bfa",
              fontSize: "10px",
              fontWeight: "900",
              letterSpacing: "1px",
            }}
          >
            GOT QUESTIONS?
          </span>

          <h2
            style={{
              margin: "9px 0",
              fontSize: "32px",
              fontWeight: "950",
            }}
          >
            Frequently Asked
          </h2>

          <p
            style={{
              margin: 0,
              color: "#64748b",
              fontSize: "13px",
            }}
          >
            Everything you need to know before entering the arena.
          </p>
        </div>

        <div style={{ display: "grid", gap: "10px" }}>
          {faqs.map((faq) => (
            <details
              key={faq.q}
              style={{
                padding: "18px 20px",
                borderRadius: "12px",
                background: "#0b1220",
                border: "1px solid #1e293b",
              }}
            >
              <summary
                style={{
                  cursor: "pointer",
                  fontWeight: "800",
                  fontSize: "13px",
                  color: "#e2e8f0",
                }}
              >
                {faq.q}
              </summary>

              <p
                style={{
                  margin: "13px 0 0",
                  color: "#64748b",
                  fontSize: "11px",
                  lineHeight: 1.7,
                }}
              >
                {faq.a}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}