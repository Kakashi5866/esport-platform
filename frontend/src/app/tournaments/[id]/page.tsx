import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { cache } from "react";
import { createClient } from "@supabase/supabase-js";
import TournamentHeader from "@/components/tournament/TournamentHeader";
import TournamentInfo from "@/components/tournament/TournamentInfo";
import JoinTournamentButton from "@/components/tournament/JoinTournamentButton";
import TournamentTeams from "@/components/tournament/TournamentTeams";
import TournamentMatches from "@/components/tournament/TournamentMatches";
import TrackTournamentView from "@/components/tournament/TrackTournamentView";
import TournamentCountdown from "@/components/tournament/TournamentCountdown";
import ShareButton from "@/components/shared/ShareButton";
import TournamentRatingBadge from "@/components/tournament/TournamentRatingBadge";

type TournamentPageProps = {
  params: Promise<{
    id: string;
  }>;
};

type TournamentRow = {
  id: string;
  game: string;
  title: string;
  entry: string;
  prize: string;
  slots: string;
  status: string;
  mode: string;
  image_url: string | null;
  description: string | null;
  rules: string | null;
  starts_at: string | null;
  team_size: number | null;
  accent_color: string | null;
};

const getTournament = cache(
  async (id: string): Promise<TournamentRow | null> => {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!
    );

    const { data, error } = await supabase
      .from("cms_tournaments")
      .select("*")
      .eq("id", id)
      .maybeSingle();

    if (error || !data) {
      return null;
    }

    return data as TournamentRow;
  }
);

const DEFAULT_RULES = [
  "Players must follow the tournament rules.",
  "Players must be available at the scheduled match time.",
  "Any unfair gameplay may result in disqualification.",
  "Match results will be verified by the tournament team.",
];

export async function generateMetadata({
  params,
}: TournamentPageProps): Promise<Metadata> {
  const { id } = await params;
  const tournament = await getTournament(id);

  if (!tournament) {
    return {
      title: "Tournament Not Found | Esports Platform",
    };
  }

  const description =
    tournament.description ||
    `${tournament.title} — ${tournament.game} ${tournament.mode} tournament. Entry: ${tournament.entry}, Prize Pool: ${tournament.prize}.`;

  return {
    title: `${tournament.title} | Esports Platform`,
    description,
    openGraph: {
      title: tournament.title,
      description,
      images: tournament.image_url ? [tournament.image_url] : undefined,
    },
  };
}

export default async function TournamentPage({
  params,
}: TournamentPageProps) {
  const { id } = await params;

  const tournament = await getTournament(id);

  if (!tournament) {
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
          <h1
            style={{
              fontSize: "40px",
              marginBottom: "10px",
            }}
          >
            Tournament Not Found
          </h1>

          <p
            style={{
              color: "#94a3b8",
            }}
          >
            The tournament you are looking for does not exist.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#020617",
        color: "white",
        padding: "100px 40px",
      }}
    >
      <div
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
        }}
      >
        <TrackTournamentView tournamentTitle={tournament.title} />

        <Link
          href="/tournaments"
          style={{
            display: "inline-block",
            marginBottom: "20px",
            color: "#64748b",
            textDecoration: "none",
            fontSize: "13px",
            fontWeight: "700",
          }}
        >
          ← Back to Tournaments
        </Link>

        {tournament.image_url && (
          <div
            style={{
              position: "relative",
              width: "100%",
              height: "320px",
              overflow: "hidden",
              borderRadius: "16px",
              marginBottom: "20px",
              border: "1px solid #1e293b",
            }}
          >
            <Image
              src={tournament.image_url}
              alt={tournament.title}
              fill
              priority
              sizes="(max-width: 768px) 100vw, 1100px"
              style={{ objectFit: "cover" }}
            />
          </div>
        )}

        <TournamentHeader
          game={tournament.game}
          title={tournament.title}
          status={tournament.status}
          accentColor={tournament.accent_color}
        />

        <TournamentRatingBadge tournamentId={id} />

        <TournamentCountdown startsAt={tournament.starts_at} />

        <TournamentInfo
          entry={tournament.entry}
          prize={tournament.prize}
          slots={tournament.slots}
          mode={tournament.mode}
        />

        <section
          style={{
            marginTop: "30px",
            display: "grid",
            gridTemplateColumns: "1fr 320px",
            gap: "25px",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "25px",
            }}
          >
          <div
            style={{
              background: "#0f172a",
              border: "1px solid #1e293b",
              borderRadius: "16px",
              padding: "30px",
            }}
          >
            <h2
              style={{
                fontSize: "25px",
                marginTop: 0,
                marginBottom: "15px",
              }}
            >
              About This Tournament
            </h2>

            <p
              style={{
                color: "#94a3b8",
                lineHeight: "1.8",
                margin: 0,
                whiteSpace: "pre-line",
              }}
            >
              {tournament.description ||
                "Get ready for a competitive esports battle. Join the tournament, compete against skilled players and fight for your share of the prize pool."}
            </p>

            <h3
              style={{
                marginTop: "30px",
                marginBottom: "15px",
              }}
            >
              Tournament Rules
            </h3>

            <ul
              style={{
                color: "#94a3b8",
                lineHeight: "2",
                paddingLeft: "20px",
              }}
            >
              {(tournament.rules
                ? tournament.rules.split("\n").filter((line) => line.trim().length > 0)
                : DEFAULT_RULES
              ).map((rule, index) => (
                <li key={index}>{rule}</li>
              ))}
            </ul>
          </div>

          <TournamentTeams />

          <TournamentMatches />
          </div>

          <aside
            style={{
              background: "#111c33",
              border: "1px solid #263450",
              borderRadius: "16px",
              padding: "25px",
              height: "fit-content",
            }}
          >
            <h3
              style={{
                fontSize: "21px",
                marginTop: 0,
              }}
            >
              Ready To Compete?
            </h3>

            <p
              style={{
                color: "#94a3b8",
                lineHeight: "1.6",
              }}
            >
              Secure your slot and compete for the prize pool.
            </p>

            <div style={{ marginTop: "10px" }}>
              <JoinTournamentButton
                tournamentId={id}
                gameName={tournament.game}
                tournamentName={tournament.title}
                entryFee={tournament.entry}
                prizePool={tournament.prize}
                mode={tournament.mode}
                teamSize={tournament.team_size}
                disabled={tournament.status !== "LIVE"}
              />
            </div>

            <div style={{ marginTop: "12px" }}>
              <ShareButton
                label="Share Tournament"
                path={`/tournaments/${id}`}
                text={`I just joined ${tournament.title} on Esports Platform! Prize pool: ${tournament.prize}. Join me`}
              />
            </div>
          </aside>
        </section>
      </div>
    </main>
  );
}