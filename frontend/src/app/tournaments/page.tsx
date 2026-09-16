"use client";

import { useMemo, useState, useEffect } from "react";

import TournamentGrid, { Tournament } from "@/components/tournament/TournamentGrid";

import TournamentFilters from "@/components/tournament/TournamentFilters";

export default function TournamentsPage() {
  const [tournaments, setTournaments] = useState<Tournament[]>([]);
  const [loading, setLoading] = useState(true);

  const [activeGame, setActiveGame] = useState("ALL");
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const game = params.get("game");

    const gameMap: Record<string, string> = {
      "free-fire": "Free Fire",
      "bgmi": "BGMI",
      "valorant": "Valorant",
      "call-of-duty": "Call of Duty",
    };

    if (game && gameMap[game]) {
      setActiveGame(gameMap[game]);
    }
  }, []);
  const [activeStatus, setActiveStatus] = useState("ALL");
  const [activeMode, setActiveMode] = useState("ALL");

  useEffect(() => {
    async function loadTournaments() {
      try {
        const response = await fetch("/api/tournaments");
        if (response.ok) {
          const data = await response.json();
          setTournaments(data.tournaments || []);
        }
      } catch (error) {
        console.error("Failed to load tournaments:", error);
      } finally {
        setLoading(false);
      }
    }

    loadTournaments();
  }, []);

  const filteredTournaments = useMemo(() => {
    return tournaments.filter((tournament) => {
      const gameMatches =
        activeGame === "ALL" ||
        tournament.game === activeGame;

      const statusMatches =
        activeStatus === "ALL" ||
        tournament.status === activeStatus;

      const modeMatches =
        activeMode === "ALL" ||
        tournament.mode === activeMode;

      return gameMatches && statusMatches && modeMatches;
    });
  }, [tournaments, activeGame, activeStatus, activeMode]);

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#020617",
        color: "white",
        padding: "60px 24px 90px",
      }}
    >
      <div
        style={{
          maxWidth: "1150px",
          margin: "0 auto",
        }}
      >
        <section
          style={{
            marginBottom: "40px",
          }}
        >
          <span
            style={{
              color: "#a78bfa",
              fontSize: "10px",
              fontWeight: "900",
              letterSpacing: "1.5px",
            }}
          >
            🏆 COMPETITIVE ARENA
          </span>

          <h1
            style={{
              margin: "10px 0 8px",
              fontSize: "clamp(32px, 5vw, 48px)",
              fontWeight: "950",
              lineHeight: 1.05,
            }}
          >
            Find Your Next{" "}
            <span style={{ color: "#a78bfa" }}>
              Tournament
            </span>
          </h1>

          <p
            style={{
              maxWidth: "650px",
              margin: 0,
              color: "#64748b",
              fontSize: "13px",
              lineHeight: 1.7,
            }}
          >
            Choose your game, enter the battlefield and compete
            for bigger prizes, better rankings and serious bragging
            rights.
          </p>
        </section>

        <section
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(180px, 1fr))",
            gap: "12px",
            marginBottom: "35px",
          }}
        >
          <Stat value="119+" label="Total Tournaments" />
          <Stat value="₹25L+" label="Prize Pool" />
          <Stat value="43K+" label="Players" />
          <Stat value="50+" label="Live Matches" />
        </section>

        <TournamentFilters
          activeGame={activeGame}
          activeStatus={activeStatus}
          activeMode={activeMode}
          onGameChange={setActiveGame}
          onStatusChange={setActiveStatus}
          onModeChange={setActiveMode}
        />

        <section
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "15px",
            flexWrap: "wrap",
            marginBottom: "20px",
          }}
        >
          <div>
            <h2
              style={{
                margin: 0,
                fontSize: "22px",
                fontWeight: "900",
              }}
            >
              Tournaments
            </h2>

            <p
              style={{
                margin: "5px 0 0",
                color: "#64748b",
                fontSize: "11px",
              }}
            >
              Showing {filteredTournaments.length} tournament
              {filteredTournaments.length === 1 ? "" : "s"}
            </p>
          </div>

          <div
            style={{
              padding: "7px 11px",
              borderRadius: "7px",
              background: "#111827",
              border: "1px solid #1e293b",
              color: "#94a3b8",
              fontSize: "9px",
              fontWeight: "800",
            }}
          >
            🔴 LIVE + UPCOMING
          </div>
        </section>

        {loading ? (
          <p style={{ color: "#94a3b8", textAlign: "center", padding: "40px 0" }}>
            Loading tournaments...
          </p>
        ) : (
          <TournamentGrid tournaments={filteredTournaments} />
        )}
      </div>
    </main>
  );
}

function Stat({
  value,
  label,
}: {
  value: string;
  label: string;
}) {
  return (
    <div
      style={{
        padding: "18px",
        borderRadius: "12px",
        background: "#0b1220",
        border: "1px solid #1e293b",
      }}
    >
      <strong
        style={{
          display: "block",
          fontSize: "21px",
          fontWeight: "950",
        }}
      >
        {value}
      </strong>

      <span
        style={{
          display: "block",
          marginTop: "4px",
          color: "#64748b",
          fontSize: "9px",
        }}
      >
        {label}
      </span>
    </div>
  );
}