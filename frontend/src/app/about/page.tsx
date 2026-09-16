import Link from "next/link";

export default function AboutPage() {
  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#020617",
        color: "white",
      }}
    >
      {/* HERO */}
      <section
        style={{
          padding: "110px 24px 80px",
          textAlign: "center",
          background:
            "radial-gradient(circle at top, rgba(124,58,237,0.22), transparent 55%)",
        }}
      >
        <div style={{ maxWidth: "850px", margin: "0 auto" }}>
          <div
            style={{
              display: "inline-block",
              padding: "7px 14px",
              border: "1px solid #4c1d95",
              borderRadius: "999px",
              color: "#c4b5fd",
              fontSize: "13px",
              fontWeight: "700",
              marginBottom: "20px",
            }}
          >
            ABOUT OUR PLATFORM
          </div>

          <h1
            style={{
              fontSize: "clamp(40px, 7vw, 72px)",
              lineHeight: "1.05",
              margin: "0 0 22px",
              fontWeight: "900",
              letterSpacing: "-2px",
            }}
          >
            Where Gamers
            <br />
            <span style={{ color: "#8b5cf6" }}>
              Compete & Rise.
            </span>
          </h1>

          <p
            style={{
              maxWidth: "700px",
              margin: "0 auto",
              color: "#94a3b8",
              fontSize: "17px",
              lineHeight: "1.8",
            }}
          >
            We are building a competitive esports platform where players
            can discover tournaments, compete against skilled opponents,
            climb the leaderboard and fight for real rewards.
          </p>
        </div>
      </section>
     {/* QUICK START FOR BEGINNERS */}
      <section
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
          padding: "0 24px 70px",
        }}
      >
        <div
          style={{
            padding: "35px",
            borderRadius: "20px",
            background:
              "linear-gradient(135deg, rgba(124,58,237,.15), #0b1220)",
            border: "1px solid #312e81",
          }}
        >
          <p
            style={{
              color: "#8b5cf6",
              fontWeight: "800",
              fontSize: "13px",
              letterSpacing: "2px",
              margin: "0 0 8px",
            }}
          >
            NEW HERE?
          </p>

          <h2
            style={{
              fontSize: "26px",
              margin: "0 0 25px",
            }}
          >
            Here's exactly how it works, in 3 steps.
          </h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit, minmax(220px, 1fr))",
              gap: "20px",
            }}
          >
            <div>
              <div
                style={{
                  fontSize: "26px",
                  marginBottom: "8px",
                }}
              >
                1️⃣
              </div>
              <strong style={{ display: "block", marginBottom: "6px" }}>
                Pick a Tournament
              </strong>
              <p
                style={{
                  color: "#94a3b8",
                  fontSize: "13px",
                  lineHeight: 1.6,
                  margin: 0,
                }}
              >
                Browse tournaments for your game (Free Fire, BGMI,
                Valorant and more) and check the entry fee and prize
                pool.
              </p>
            </div>

            <div>
              <div
                style={{
                  fontSize: "26px",
                  marginBottom: "8px",
                }}
              >
                2️⃣
              </div>
              <strong style={{ display: "block", marginBottom: "6px" }}>
                Register & Pay Entry
              </strong>
              <p
                style={{
                  color: "#94a3b8",
                  fontSize: "13px",
                  lineHeight: 1.6,
                  margin: 0,
                }}
              >
                Fill in your player details and pay the small entry fee
                to lock your slot in the tournament.
              </p>
            </div>

            <div>
              <div
                style={{
                  fontSize: "26px",
                  marginBottom: "8px",
                }}
              >
                3️⃣
              </div>
              <strong style={{ display: "block", marginBottom: "6px" }}>
                Get Room ID & Play
              </strong>
              <p
                style={{
                  color: "#94a3b8",
                  fontSize: "13px",
                  lineHeight: 1.6,
                  margin: 0,
                }}
              >
                Shortly before your match starts, check your profile for
                the Room ID and password — then jump in and compete for
                the prize pool.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* MISSION */}
      {/* MISSION */}
      <section
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
          padding: "70px 24px",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "50px",
            alignItems: "center",
          }}
        >
          <div>
            <p
              style={{
                color: "#8b5cf6",
                fontWeight: "800",
                fontSize: "13px",
                letterSpacing: "2px",
              }}
            >
              OUR MISSION
            </p>

            <h2
              style={{
                fontSize: "40px",
                margin: "12px 0 20px",
              }}
            >
              Built for the competitive gamer.
            </h2>

            <p
              style={{
                color: "#94a3b8",
                lineHeight: "1.8",
                fontSize: "16px",
              }}
            >
              Esports is more than just playing games. It is about
              competition, strategy, teamwork and the desire to become
              better every day.
            </p>

            <p
              style={{
                color: "#94a3b8",
                lineHeight: "1.8",
                fontSize: "16px",
              }}
            >
              Our goal is to make competitive gaming simple, accessible
              and exciting for everyone — from newcomers to experienced
              players.
            </p>
          </div>

          <div
            style={{
              minHeight: "300px",
              borderRadius: "24px",
              border: "1px solid #1e293b",
              background:
                "linear-gradient(145deg, #111827, #0f172a)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                position: "absolute",
                width: "220px",
                height: "220px",
                borderRadius: "50%",
                background: "#7c3aed",
                opacity: 0.15,
                filter: "blur(50px)",
              }}
            />

            <div
              style={{
                position: "relative",
                textAlign: "center",
              }}
            >
              <div
                style={{
                  fontSize: "70px",
                  marginBottom: "10px",
                }}
              >
                🏆
              </div>

              <strong
                style={{
                  fontSize: "22px",
                }}
              >
                Compete. Win. Rise.
              </strong>

              <p
                style={{
                  color: "#64748b",
                  marginTop: "8px",
                }}
              >
                Your esports journey starts here.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* WHAT WE OFFER */}
      <section
        style={{
          padding: "80px 24px",
          background: "#070d1a",
          borderTop: "1px solid #111827",
          borderBottom: "1px solid #111827",
        }}
      >
        <div
          style={{
            maxWidth: "1100px",
            margin: "0 auto",
          }}
        >
          <div
            style={{
              textAlign: "center",
              marginBottom: "45px",
            }}
          >
            <p
              style={{
                color: "#8b5cf6",
                fontWeight: "800",
                fontSize: "13px",
                letterSpacing: "2px",
              }}
            >
              WHAT WE OFFER
            </p>

            <h2
              style={{
                fontSize: "40px",
                margin: "10px 0",
              }}
            >
              Everything you need to compete.
            </h2>

            <p
              style={{
                color: "#64748b",
                maxWidth: "600px",
                margin: "0 auto",
              }}
            >
              From finding tournaments to tracking your competitive
              journey, everything is designed around the player.
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit, minmax(220px, 1fr))",
              gap: "18px",
            }}
          >
            <FeatureCard
              icon="🏆"
              title="Esports Tournaments"
              text="Discover competitive tournaments across multiple games."
            />

            <FeatureCard
              icon="⚡"
              title="Live Competition"
              text="Stay updated with upcoming, live and completed matches."
            />

            <FeatureCard
              icon="🥇"
              title="Leaderboards"
              text="Track your performance and climb the competitive rankings."
            />

            <FeatureCard
              icon="💰"
              title="Rewards & Prizes"
              text="Compete for exciting prize pools and competitive rewards."
            />

            <FeatureCard
              icon="👤"
              title="Player Profiles"
              text="Build your esports identity with stats and achievements."
            />

            <FeatureCard
              icon="🛡️"
              title="Fair Play"
              text="A competitive environment built around clear rules and fair competition."
            />
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
          padding: "90px 24px",
        }}
      >
        <div
          style={{
            textAlign: "center",
            marginBottom: "50px",
          }}
        >
          <p
            style={{
              color: "#8b5cf6",
              fontWeight: "800",
              fontSize: "13px",
              letterSpacing: "2px",
            }}
          >
            HOW IT WORKS
          </p>

          <h2
            style={{
              fontSize: "40px",
              margin: "10px 0",
            }}
          >
            Four steps. One competitive journey.
          </h2>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "20px",
          }}
        >
          <StepCard
            number="01"
            title="Create Account"
            text="Create your player profile and enter the esports arena."
          />

          <StepCard
            number="02"
            title="Find Tournament"
            text="Choose a game and find a tournament that fits you."
          />

          <StepCard
            number="03"
            title="Compete"
            text="Join the match, play your best and prove your skills."
          />

          <StepCard
            number="04"
            title="Rise"
            text="Win rewards, improve your ranking and build your legacy."
          />
        </div>
      </section>

      {/* STATS */}
      <section
        style={{
          padding: "70px 24px",
          background:
            "linear-gradient(135deg, #111827, #0f172a)",
          borderTop: "1px solid #1e293b",
          borderBottom: "1px solid #1e293b",
        }}
      >
        <div
          style={{
            maxWidth: "1000px",
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(180px, 1fr))",
            gap: "30px",
            textAlign: "center",
          }}
        >
          <Stat number="10K+" label="Players" />
          <Stat number="500+" label="Tournaments" />
          <Stat number="₹25L+" label="Prize Pool" />
          <Stat number="20+" label="Games" />
        </div>
      </section>

      {/* CTA */}
      <section
        style={{
          padding: "100px 24px",
          textAlign: "center",
        }}
      >
        <h2
          style={{
            fontSize: "clamp(34px, 5vw, 52px)",
            marginBottom: "18px",
          }}
        >
          Ready to enter the competition?
        </h2>

        <p
          style={{
            color: "#94a3b8",
            maxWidth: "600px",
            margin: "0 auto 30px",
            lineHeight: "1.7",
          }}
        >
          Find your next tournament, compete with the best and start
          building your esports legacy.
        </p>

        <Link
          href="/tournaments"
          style={{
            display: "inline-block",
            padding: "14px 25px",
            borderRadius: "10px",
            background: "#7c3aed",
            color: "white",
            textDecoration: "none",
            fontWeight: "800",
          }}
        >
          Explore Tournaments →
        </Link>
      </section>

      <style>{`
        @media (max-width: 750px) {
          section > div {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </main>
  );
}

function FeatureCard({
  icon,
  title,
  text,
}: {
  icon: string;
  title: string;
  text: string;
}) {
  return (
    <div
      style={{
        padding: "24px",
        borderRadius: "16px",
        background: "#0f172a",
        border: "1px solid #1e293b",
      }}
    >
      <div
        style={{
          fontSize: "30px",
          marginBottom: "15px",
        }}
      >
        {icon}
      </div>

      <h3
        style={{
          margin: "0 0 10px",
        }}
      >
        {title}
      </h3>

      <p
        style={{
          margin: 0,
          color: "#64748b",
          lineHeight: "1.6",
          fontSize: "14px",
        }}
      >
        {text}
      </p>
    </div>
  );
}

function StepCard({
  number,
  title,
  text,
}: {
  number: string;
  title: string;
  text: string;
}) {
  return (
    <div
      style={{
        padding: "25px",
        border: "1px solid #1e293b",
        borderRadius: "16px",
        background: "#0b1220",
      }}
    >
      <div
        style={{
          color: "#8b5cf6",
          fontWeight: "900",
          fontSize: "14px",
          marginBottom: "15px",
        }}
      >
        {number}
      </div>

      <h3
        style={{
          margin: "0 0 10px",
        }}
      >
        {title}
      </h3>

      <p
        style={{
          color: "#64748b",
          lineHeight: "1.6",
          fontSize: "14px",
          margin: 0,
        }}
      >
        {text}
      </p>
    </div>
  );
}

function Stat({
  number,
  label,
}: {
  number: string;
  label: string;
}) {
  return (
    <div>
      <div
        style={{
          fontSize: "34px",
          fontWeight: "900",
          color: "#a78bfa",
        }}
      >
        {number}
      </div>

      <div
        style={{
          color: "#64748b",
          marginTop: "5px",
        }}
      >
        {label}
      </div>
    </div>
  );
}