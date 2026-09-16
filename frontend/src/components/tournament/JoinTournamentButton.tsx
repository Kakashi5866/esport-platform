"use client";

import { useState } from "react";
import JoinTournamentModal from "./JoinTournamentModal";

type JoinTournamentButtonProps = {
  tournamentId: string;
  gameName: string;
  tournamentName: string;
  entryFee: string;
  prizePool: string;
  mode: string;
  teamSize?: number | null;
  disabled?: boolean;
};

export default function JoinTournamentButton({
  tournamentId,
  gameName,
  tournamentName,
  entryFee,
  prizePool,
  mode,
  teamSize,
  disabled = false,
}: JoinTournamentButtonProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        disabled={disabled}
        onClick={() => setIsOpen(true)}
        style={{
          width: "100%",
          padding: "14px",
          border: "none",
          borderRadius: "9px",
          background: disabled ? "#334155" : "#7c3aed",
          color: "white",
          fontSize: "15px",
          fontWeight: "700",
          cursor: disabled ? "not-allowed" : "pointer",
        }}
      >
        {disabled ? "Coming Soon" : "Join Tournament →"}
      </button>

      {isOpen && (
        <JoinTournamentModal
          tournamentId={tournamentId}
          gameName={gameName}
          tournamentName={tournamentName}
          entryFee={entryFee}
          prizePool={prizePool}
          mode={mode}
          teamSize={teamSize}
          onClose={() => setIsOpen(false)}
        />
      )}
    </>
  );
}
