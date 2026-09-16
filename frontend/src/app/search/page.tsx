"use client";

import Link from "next/link";
import { Suspense, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { tournaments } from "@/data/tournaments";
import { games } from "@/data/games";
import { players } from "@/data/players";

type SearchResult = {
  type: "PLAYER" | "GAME" | "TOURNAMENT";
  icon: string;
  title: string;
  subtitle: string;
  meta: string;
  searchTerms: string;
  href: string;
};

const results: SearchResult[] = [
  ...players.map((player) => ({
    type: "PLAYER" as const,
    icon: "👤",
    title: player.name,
    subtitle: `#${player.rank} • ${player.game}`,
    meta: `UID: ${player.uid} • ${player.points} pts`,
    searchTerms: `${player.name} ${player.uid}`.toLowerCase(),
    href: `/players/${player.id}`,
  })),
  ...games.map((game) => ({
    type: "GAME" as const,
    icon: "🎮",
    title: game.name,
    subtitle: game.genre,
    meta: `${game.players} Players • ${game.tournaments} Tournaments`,
    searchTerms: `${game.name} ${game.genre}`.toLowerCase(),
    href: `/games/${game.id}`,
  })),
  ...tournaments.map((tournament) => ({
    type: "TOURNAMENT" as const,
    icon: "🏆",
    title: tournament.title,
    subtitle: `${tournament.game} • ${tournament.mode}`,
    meta: `${tournament.prize} Prize Pool`,
    searchTerms: `${tournament.title} ${tournament.game}`.toLowerCase(),
    href: `/tournaments/${tournament.id}`,
  })),
];

type ResultFilter = "ALL" | "PLAYER" | "GAME" | "TOURNAMENT";

function SearchPageContent() {
  const searchParams = useSearchParams();
  const [query, setQuery] = useState("");
  const [activeType, setActiveType] = useState<ResultFilter>("ALL");

  
  useEffect(() => {
    const q = searchParams.get("q");
    if (q) setQuery(q);
  }, [searchParams]);

  const filteredResults = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return results.filter((result) => {
      const typeMatches = activeType === "ALL" || result.type === activeType;

      const queryMatches =
        normalizedQuery === "" ||
        result.title.toLowerCase().includes(normalizedQuery) ||
        result.subtitle.toLowerCase().includes(normalizedQuery) ||
        result.searchTerms.includes(normalizedQuery);

      return typeMatches && queryMatches;
    });
  }, [query, activeType]);

  return (
    <main style={page}>
      <section style={hero}>
        <span style={badge}>🔍 DISCOVER ESPORTS</span>

        <h1 style={title}>
          Search the
          <br />
          <span style={{ color: "#a78bfa" }}>Arena.</span>
        </h1>

        <p style={subtitle}>
          Find players, games and tournaments across the esports
          platform.
        </p>

        <div style={searchBox}>
          <span style={{ fontSize: "18px" }}>🔍</span>

          <input
            placeholder="Search players, UID, games, tournaments..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            style={input}
          />

          <button
            style={searchButton}
            onClick={() => setQuery((q) => q.trim())}
          >
            Search
          </button>
        </div>
      </section>

      <section style={container}>
        <div style={top}>
          <div>
            <h2 style={heading}>Search Results</h2>
            <p style={muted}>
              Popular results from across the platform
            </p>
          </div>

          <div style={resultCount}>
            {filteredResults.length} result
            {filteredResults.length === 1 ? "" : "s"}
          </div>
        </div>

        <div style={filters}>
          <button
            style={activeType === "ALL" ? activeFilter : filter}
            onClick={() => setActiveType("ALL")}
          >
            All
          </button>
          <button
            style={activeType === "PLAYER" ? activeFilter : filter}
            onClick={() => setActiveType("PLAYER")}
          >
            Players
          </button>
          <button
            style={activeType === "GAME" ? activeFilter : filter}
            onClick={() => setActiveType("GAME")}
          >
            Games
          </button>
          <button
            style={activeType === "TOURNAMENT" ? activeFilter : filter}
            onClick={() => setActiveType("TOURNAMENT")}
          >
            Tournaments
          </button>
        </div>

        {filteredResults.length === 0 ? (
          <div
            style={{
              padding: "50px 20px",
              textAlign: "center",
              color: "#64748b",
              fontSize: "13px",
            }}
          >
            No results found for &quot;{query}&quot;.
          </div>
        ) : (
        <div style={resultsGrid}>
          {filteredResults.map((result) => (
            <Link
              href={result.href}
              key={`${result.type}-${result.title}`}
              style={resultCard}
            >
              <div style={resultIcon}>{result.icon}</div>

              <div style={{ flex: 1 }}>
                <div style={resultType}>{result.type}</div>

                <h3 style={resultTitle}>{result.title}</h3>

                <p style={resultSubtitle}>
                  {result.subtitle}
                </p>

                <span style={resultMeta}>
                  {result.meta}
                </span>
              </div>

              <span style={arrow}>→</span>
            </Link>
          ))}
        </div>
        )}

        <section style={explore}>
          <div>
            <span style={exploreIcon}>⚡</span>

            <h2 style={{ margin: "10px 0 6px" }}>
              Can't find what you're looking for?
            </h2>

            <p
              style={{
                margin: 0,
                color: "#64748b",
                fontSize: "13px",
              }}
            >
              Explore everything happening across the platform.
            </p>
          </div>

          <div style={exploreLinks}>
            <Link href="/games" style={exploreButton}>
              🎮 Games
            </Link>

            <Link href="/tournaments" style={exploreButton}>
              🏆 Tournaments
            </Link>

            <Link href="/leaderboard" style={exploreButton}>
              👑 Leaderboard
            </Link>
          </div>
        </section>
      </section>
    </main>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={null}>
      <SearchPageContent />
    </Suspense>
  );
}

const page = {
  minHeight: "100vh",
  background: "#020617",
  color: "white",
  paddingBottom: "90px",
};

const hero = {
  textAlign: "center" as const,
  padding: "75px 24px 65px",
  background:
    "radial-gradient(circle at top, rgba(124,58,237,.25), transparent 58%)",
  borderBottom: "1px solid #1e293b",
};

const badge = {
  color: "#a78bfa",
  fontSize: "11px",
  fontWeight: "900",
  letterSpacing: "1px",
};

const title = {
  margin: "18px 0 12px",
  fontSize: "clamp(40px, 7vw, 62px)",
  lineHeight: 1,
  fontWeight: "950",
};

const subtitle = {
  maxWidth: "600px",
  margin: "0 auto",
  color: "#94a3b8",
  fontSize: "14px",
  lineHeight: 1.7,
};

const searchBox = {
  maxWidth: "720px",
  margin: "30px auto 0",
  display: "flex",
  alignItems: "center",
  gap: "10px",
  padding: "8px 9px 8px 15px",
  borderRadius: "12px",
  background: "#0b1220",
  border: "1px solid #334155",
};

const input = {
  flex: 1,
  minWidth: 0,
  border: "none",
  outline: "none",
  background: "transparent",
  color: "white",
  fontSize: "13px",
};

const searchButton = {
  padding: "11px 18px",
  border: "none",
  borderRadius: "8px",
  background: "#7c3aed",
  color: "white",
  fontWeight: "800",
  cursor: "pointer",
};

const container = {
  maxWidth: "1100px",
  margin: "55px auto",
  padding: "0 24px",
};

const top = {
  display: "flex",
  alignItems: "end",
  justifyContent: "space-between",
  gap: "20px",
  flexWrap: "wrap" as const,
  marginBottom: "20px",
};

const heading = {
  margin: 0,
  fontSize: "28px",
  fontWeight: "900",
};

const muted = {
  margin: "6px 0 0",
  color: "#64748b",
  fontSize: "12px",
};

const resultCount = {
  padding: "8px 11px",
  borderRadius: "7px",
  background: "#0b1220",
  border: "1px solid #1e293b",
  color: "#94a3b8",
  fontSize: "11px",
};

const filters = {
  display: "flex",
  gap: "8px",
  flexWrap: "wrap" as const,
  marginBottom: "22px",
};

const activeFilter = {
  padding: "9px 15px",
  borderRadius: "8px",
  border: "1px solid #7c3aed",
  background: "#312e81",
  color: "white",
  fontSize: "11px",
  fontWeight: "800",
};

const filter = {
  padding: "9px 15px",
  borderRadius: "8px",
  border: "1px solid #1e293b",
  background: "#0b1220",
  color: "#94a3b8",
  fontSize: "11px",
  fontWeight: "700",
};

const resultsGrid = {
  display: "grid",
  gridTemplateColumns:
    "repeat(auto-fit, minmax(300px, 1fr))",
  gap: "12px",
};

const resultCard = {
  display: "flex",
  alignItems: "center",
  gap: "14px",
  padding: "18px",
  borderRadius: "14px",
  background: "#0b1220",
  border: "1px solid #1e293b",
  color: "white",
  textDecoration: "none",
};

const resultIcon = {
  width: "48px",
  height: "48px",
  flexShrink: 0,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: "11px",
  background: "#17112b",
  fontSize: "21px",
};

const resultType = {
  color: "#7c3aed",
  fontSize: "8px",
  fontWeight: "900",
  letterSpacing: "1px",
};

const resultTitle = {
  margin: "4px 0",
  fontSize: "16px",
};

const resultSubtitle = {
  margin: 0,
  color: "#64748b",
  fontSize: "11px",
};

const resultMeta = {
  display: "block",
  marginTop: "7px",
  color: "#94a3b8",
  fontSize: "10px",
};

const arrow = {
  color: "#64748b",
  fontSize: "20px",
};

const explore = {
  marginTop: "45px",
  padding: "28px",
  borderRadius: "16px",
  background:
    "linear-gradient(135deg, rgba(76,29,149,.2), #0b1220)",
  border: "1px solid #312e81",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: "25px",
  flexWrap: "wrap" as const,
};

const exploreIcon = {
  fontSize: "25px",
};

const exploreLinks = {
  display: "flex",
  gap: "8px",
  flexWrap: "wrap" as const,
};

const exploreButton = {
  padding: "10px 13px",
  borderRadius: "8px",
  background: "#111827",
  border: "1px solid #334155",
  color: "#cbd5e1",
  textDecoration: "none",
  fontSize: "11px",
  fontWeight: "800",
};