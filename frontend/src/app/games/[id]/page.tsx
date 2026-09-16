import Link from "next/link";
import { notFound } from "next/navigation";
import { games } from "@/data/games";

type GamePageProps = {
  params: Promise<{ id: string }>;
};

export default async function GamePage({ params }: GamePageProps) {
  const { id } = await params;

  const game = games.find((item) => item.id === id);

  if (!game) {
    notFound();
  }

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#020617",
        color: "#f8fafc",
        paddingBottom: "80px",
      }}
    >
      <section
        style={{
          minHeight: "430px",
          display: "flex",
          alignItems: "flex-end",
          backgroundImage: `linear-gradient(to top, #020617 5%, rgba(2,6,23,.65), rgba(2,6,23,.15)), url(${game.image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div
          style={{
            width: "100%",
            maxWidth: "1150px",
            margin: "0 auto",
            padding: "60px 24px 40px",
          }}
        >
          <Link
            href="/games"
            style={{
              color: "#c4b5fd",
              textDecoration: "none",
              fontSize: "11px",
              fontWeight: 800,
            }}
          >
            ← BACK TO GAMES
          </Link>

          <p
            style={{
              margin: "30px 0 8px",
              color: "#a78bfa",
              fontSize: "9px",
              fontWeight: 900,
              letterSpacing: "1.5px",
            }}
          >
            {game.genre.toUpperCase()}
          </p>

          <h1
            style={{
              margin: 0,
              fontSize: "clamp(40px, 7vw, 68px)",
              fontWeight: 950,
            }}
          >
            {game.name}
          </h1>

          <p
            style={{
              maxWidth: "650px",
              color: "#cbd5e1",
              fontSize: "13px",
              lineHeight: 1.7,
            }}
          >
            {game.description}
          </p>
        </div>
      </section>

      <div
        style={{
          maxWidth: "1150px",
          margin: "0 auto",
          padding: "0 24px",
        }}
      >
        <section
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(180px,1fr))",
            gap: "12px",
            marginTop: "25px",
          }}
        >
          <Stat title="PLAYERS" value={game.players} />
          <Stat title="TOURNAMENTS" value={game.tournaments} />
          <Stat title="STATUS" value={game.status} />
        </section>

        <section
          style={{
            display: "grid",
            gridTemplateColumns: "minmax(0,1fr) 320px",
            gap: "22px",
            marginTop: "25px",
          }}
        >
          <div>
            <ContentBox title="RULES & REGULATIONS">
              {game.rules.map((rule, index) => (
                <Item key={rule} number={index + 1} text={rule} />
              ))}
            </ContentBox>

            <ContentBox title="TOURNAMENT INSTRUCTIONS">
              {game.instructions.map((instruction, index) => (
                <Item
                  key={instruction}
                  number={index + 1}
                  text={instruction}
                />
              ))}
            </ContentBox>

            <ContentBox title="FREQUENTLY ASKED QUESTIONS">
              {game.faqs.map((faq) => (
                <FaqItem
                  key={faq.question}
                  question={faq.question}
                  answer={faq.answer}
                />
              ))}
            </ContentBox>
          </div>

          <aside
            style={{
              alignSelf: "start",
              position: "sticky",
              top: "90px",
              padding: "25px",
              borderRadius: "18px",
              background: "#0b1220",
              border: "1px solid #312e81",
            }}
          >
            <span
              style={{
                color: "#a78bfa",
                fontSize: "8px",
                fontWeight: 900,
                letterSpacing: "1px",
              }}
            >
              COMPETITIVE ARENA
            </span>

            <h2
              style={{
                margin: "8px 0",
                fontSize: "24px",
                fontWeight: 950,
              }}
            >
              Ready to Compete?
            </h2>

            <p
              style={{
                color: "#94a3b8",
                fontSize: "11px",
                lineHeight: 1.7,
              }}
            >
              Find available {game.name} tournaments and
              secure your competitive slot.
            </p>

            <Link
              href={`/tournaments?game=${game.id}`}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                minHeight: "48px",
                marginTop: "18px",
                borderRadius: "10px",
                background:
                  "linear-gradient(135deg,#7c3aed,#9333ea)",
                color: "white",
                textDecoration: "none",
                fontSize: "10px",
                fontWeight: 950,
              }}
            >
              JOIN {game.name.toUpperCase()} TOURNAMENT
            </Link>
          </aside>
        </section>
      </div>
    </main>
  );
}

function Stat({ title, value }: { title: string; value: string }) {
  return (
    <div
      style={{
        padding: "17px",
        borderRadius: "12px",
        background: "#0b1220",
        border: "1px solid #1e293b",
      }}
    >
      <span
        style={{
          color: "#64748b",
          fontSize: "8px",
          fontWeight: 900,
        }}
      >
        {title}
      </span>

      <strong
        style={{
          display: "block",
          marginTop: "6px",
          fontSize: "18px",
        }}
      >
        {value}
      </strong>
    </div>
  );
}

function ContentBox({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section
      style={{
        padding: "25px",
        marginBottom: "18px",
        borderRadius: "18px",
        background: "#0b1220",
        border: "1px solid #1e293b",
      }}
    >
      <h2
        style={{
          margin: "0 0 22px",
          fontSize: "24px",
          fontWeight: 950,
        }}
      >
        {title}
      </h2>

      <div style={{ display: "grid", gap: "13px" }}>
        {children}
      </div>
    </section>
  );
}

function FaqItem({
  question,
  answer,
}: {
  question: string;
  answer: string;
}) {
  return (
    <div
      style={{
        padding: "16px",
        borderRadius: "12px",
        background: "#111c33",
        border: "1px solid #1e293b",
      }}
    >
      <p
        style={{
          margin: "0 0 8px",
          fontSize: "13px",
          fontWeight: 800,
          color: "#e2e8f0",
        }}
      >
        Q: {question}
      </p>

      <p
        style={{
          margin: 0,
          color: "#94a3b8",
          fontSize: "11px",
          lineHeight: 1.65,
        }}
      >
        {answer}
      </p>
    </div>
  );
}

function Item({
  number,
  text,
}: {
  number: number;
  text: string;
}) {
  return (
    <div
      style={{
        display: "flex",
        gap: "12px",
        alignItems: "flex-start",
      }}
    >
      <div
        style={{
          width: "28px",
          height: "28px",
          flexShrink: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "8px",
          background: "#17112b",
          color: "#a78bfa",
          fontSize: "10px",
          fontWeight: 900,
        }}
      >
        {number}
      </div>

      <p
        style={{
          margin: "4px 0 0",
          color: "#94a3b8",
          fontSize: "11px",
          lineHeight: 1.65,
        }}
      >
        {text}
      </p>
    </div>
  );
}
