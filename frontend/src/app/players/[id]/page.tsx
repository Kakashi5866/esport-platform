import Link from "next/link";
import { players } from "@/data/players";
import ShareButton from "@/components/shared/ShareButton";

type PlayerPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function PlayerProfilePage({
  params,
}: PlayerPageProps) {
  const { id } = await params;

  const player = players.find((item) => item.id === id);

  if (!player) {
    return (
      <main
        style={{
          minHeight: "100vh",
          background: "#020617",
          color: "white",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "40px 20px",
          textAlign: "center",
        }}
      >
        <div>
          <h1 style={{ fontSize: "40px", marginBottom: "10px" }}>
            Player Not Found
          </h1>

          <p style={{ color: "#94a3b8" }}>
            No player with this profile exists.
          </p>

          <Link
            href="/leaderboard"
            style={{
              display: "inline-block",
              marginTop: "20px",
              color: "#a78bfa",
              textDecoration: "none",
              fontWeight: "700",
            }}
          >
            ← Back to Leaderboard
          </Link>
        </div>
      </main>
    );
  }

  const winRate = Math.round((player.wins / player.matches) * 100);

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#020617",
        color: "white",
        padding: "100px 24px 90px",
      }}
    >
      <div style={{ maxWidth: "820px", margin: "0 auto" }}>
        <Link
          href="/leaderboard"
          style={{
            color: "#64748b",
            textDecoration: "none",
            fontSize: "13px",
            fontWeight: "700",
          }}
        >
          ← Back to Leaderboard
        </Link>

        <section
          style={{
            marginTop: "20px",
            display: "flex",
            alignItems: "center",
            gap: "20px",
            padding: "30px",
            borderRadius: "18px",
            border: "1px solid #1e293b",
            background: "#0b1220",
          }}
        >
          <span
            style={{
              width: "80px",
              height: "80px",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "linear-gradient(135deg, #7c3aed, #4338ca)",
              fontSize: "26px",
              fontWeight: "900",
              flexShrink: 0,
            }}
          >
            {player.avatar}
          </span>

          <div>
            <h1 style={{ margin: "0 0 6px", fontSize: "30px" }}>
              {player.name}
            </h1>

            <p
              style={{
                margin: 0,
                color: "#a78bfa",
                fontSize: "13px",
                fontWeight: "700",
              }}
            >
              #{player.rank} on Leaderboard • {player.game}
            </p>

            <p
              style={{
                margin: "6px 0 0",
                color: "#64748b",
                fontSize: "12px",
              }}
            >
              UID: {player.uid}
            </p>
          </div>
        </section>

        <section
          style={{
            marginTop: "20px",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
            gap: "12px",
          }}
        >
          <StatCard label="Wins" value={String(player.wins)} />
          <StatCard label="Matches Played" value={String(player.matches)} />
          <StatCard label="Win Rate" value={`${winRate}%`} />
          <StatCard label="Points" value={String(player.points)} />
          <StatCard label="Total Earnings" value={player.earnings} />
        </section>

        <div style={{ marginTop: "20px" }}>
          <ShareButton
            label="Share Profile"
            path={`/players/${player.id}`}
            text={`Check out ${player.name}'s profile on Esports Platform — #${player.rank} on the leaderboard with ${player.points} points!`}
          />
        </div>
      </div>
    </main>
  );
}

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div
      style={{
        padding: "18px",
        borderRadius: "12px",
        background: "#0b1220",
        border: "1px solid #1e293b",
        textAlign: "center",
      }}
    >
      <strong style={{ display: "block", fontSize: "22px" }}>
        {value}
      </strong>

      <span
        style={{
          display: "block",
          marginTop: "4px",
          color: "#64748b",
          fontSize: "11px",
        }}
      >
        {label}
      </span>
    </div>
  );
}