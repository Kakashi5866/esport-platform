import Link from "next/link";
import Image from "next/image";

type Tournament = {
  id: string;
  game: string;
  title: string;
  entry: string;
  prize: string;
  slots: string;
  status: string;
  mode: string;
  image_url?: string | null;
  accent_color?: string | null;
};

type TournamentCardProps = {
  tournament: Tournament;
};

export default function TournamentCard({
  tournament,
}: TournamentCardProps) {
  const accent = tournament.accent_color || "#7c3aed";

  return (
    <article
      style={{
        background: "#111c33",
        border: "1px solid #263450",
        borderTop: `3px solid ${accent}`,
        borderRadius: "16px",
        overflow: "hidden",
      }}
    >
      {tournament.image_url && (
        <div
          style={{
            position: "relative",
            width: "100%",
            height: "140px",
          }}
        >
          <Image
            src={tournament.image_url}
            alt={tournament.title}
            fill
            sizes="(max-width: 768px) 100vw, 360px"
            style={{ objectFit: "cover" }}
          />
        </div>
      )}

      <div style={{ padding: "24px" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "18px",
          }}
        >
          <span
            style={{
              background: "#312e81",
              color: "#c4b5fd",
              padding: "6px 10px",
              borderRadius: "8px",
              fontSize: "12px",
              fontWeight: 600,
            }}
          >
            {tournament.game}
          </span>

          {tournament.status === "LIVE" ? (
            <span
              className="live-badge"
              style={{
                padding: "5px 11px",
                borderRadius: "999px",
                background: "rgba(74, 222, 128, 0.12)",
                color: "#4ade80",
                fontSize: "12px",
                fontWeight: 800,
              }}
            >
              <span className="live-badge-dot" />
              LIVE NOW
            </span>
          ) : (
            <span
              style={{
                color: "#facc15",
                fontSize: "13px",
                fontWeight: 600,
              }}
            >
              {tournament.status}
            </span>
          )}
        </div>

        <h3
          style={{
            color: "white",
            fontSize: "20px",
            marginBottom: "10px",
          }}
        >
          {tournament.title}
        </h3>

        <div
          style={{
            color: "#94a3b8",
            fontSize: "14px",
            lineHeight: "1.8",
            marginBottom: "20px",
          }}
        >
          <div>
            Entry:{" "}
            <strong style={{ color: "white" }}>{tournament.entry}</strong>
          </div>

          <div>
            Prize Pool:{" "}
            <strong style={{ color: "white" }}>{tournament.prize}</strong>
          </div>

          <div>
            Slots:{" "}
            <strong style={{ color: "white" }}>{tournament.slots}</strong>
          </div>

          <div>
            Mode:{" "}
            <strong style={{ color: "white" }}>{tournament.mode}</strong>
          </div>
        </div>

        <Link
          href={`/tournaments/${tournament.id}`}
          style={{
            display: "block",
            width: "100%",
            padding: "13px",
            borderRadius: "9px",
            background: accent,
            color: "white",
            fontSize: "15px",
            fontWeight: 600,
            textAlign: "center",
            textDecoration: "none",
            boxSizing: "border-box",
          }}
        >
          View Tournament →
        </Link>
      </div>
    </article>
  );
}