"use client";

import { useState } from "react";
import TournamentCard from "@/components/tournament/TournamentCard";
import TournamentFilters from "@/components/tournament/TournamentFilters";

const tournaments = [
  {
    id: "ff-br-championship",
    game: "Free Fire MAX",
    title: "Battle Royale Championship",
    entry: "₹50",
    prize: "₹10,000",
    slots: "48 Players",
    status: "Open",
    mode: "Solo Battle Royale",
  },
  {
    id: "ff-clash-masters",
    game: "Free Fire MAX",
    title: "Clash Squad Masters",
    entry: "₹100",
    prize: "₹25,000",
    slots: "24 Teams",
    status: "Open",
    mode: "Squad Clash",
  },
  {
    id: "ff-weekend-cup",
    game: "Free Fire MAX",
    title: "Weekend Warrior Cup",
    entry: "₹20",
    prize: "₹5,000",
    slots: "48 Players",
    status: "Open",
    mode: "Solo Battle Royale",
  },
  {
    id: "bgmi-coming",
    game: "BGMI",
    title: "BGMI Pro League",
    entry: "₹100",
    prize: "₹30,000",
    slots: "64 Players",
    status: "Coming Soon",
    mode: "Classic Squad",
  },
  {
    id: "valorant-coming",
    game: "Valorant",
    title: "Valorant Tactical Cup",
    entry: "₹200",
    prize: "₹50,000",
    slots: "16 Teams",
    status: "Coming Soon",
    mode: "5v5 Competitive",
  },
];

export default function TournamentsPage() {
  const [activeGame, setActiveGame] = useState("All");
  const [activeStatus, setActiveStatus] = useState("All");

  const filteredTournaments = tournaments.filter((tournament) => {
    const gameMatch =
      activeGame === "All" || tournament.game === activeGame;

    const statusMatch =
      activeStatus === "All" ||
      tournament.status === activeStatus;

    return gameMatch && statusMatch;
  });

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
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
        <div style={{ marginBottom: "45px" }}>
          <p
            style={{
              color: "#a78bfa",
              fontWeight: "700",
              letterSpacing: "2px",
            }}
          >
            COMPETE
          </p>

          <h1
            style={{
              fontSize: "48px",
              margin: "10px 0",
            }}
          >
            All Tournaments
          </h1>

          <p
            style={{
              color: "#94a3b8",
              fontSize: "17px",
              maxWidth: "650px",
            }}
          >
            Find your next challenge and compete for exciting prize pools.
          </p>
        </div>

        <TournamentFilters
          activeGame={activeGame}
          activeStatus={activeStatus}
          onGameChange={setActiveGame}
          onStatusChange={setActiveStatus}
        />

        {filteredTournaments.length > 0 ? (
          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit, minmax(300px, 1fr))",
              gap: "24px",
            }}
          >
            {filteredTournaments.map((tournament) => (
              <TournamentCard
                key={tournament.id}
                tournament={tournament}
              />
            ))}
          </div>
        ) : (
          <div
            style={{
              padding: "60px 20px",
              textAlign: "center",
              border: "1px solid #1e293b",
              borderRadius: "16px",
              background: "#0f172a",
            }}
          >
            <h2>No tournaments found</h2>

            <p style={{ color: "#94a3b8" }}>
              Try changing the game or status filter.
            </p>
          </div>
        )}
      </div>
    </main>
  );
}