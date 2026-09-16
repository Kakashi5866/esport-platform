"use client";
import { useEffect } from "react";
import RegistrationForm from "./RegistrationForm";

type JoinTournamentModalProps = {
  tournamentId: string;
  gameName: string;
  tournamentName: string;
  entryFee: string;
  prizePool: string;
  mode: string;
  teamSize?: number | null;
  onClose: () => void;
};

export default function JoinTournamentModal({
  tournamentId,
  gameName,
  tournamentName,
  entryFee,
  prizePool,
  mode,
  teamSize,
  onClose,
}: JoinTournamentModalProps) {
  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, []);

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 100,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
        background: "rgba(0, 0, 0, 0.75)",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "500px",
          maxHeight: "90vh",
          overflowY: "auto",
          background: "#0f172a",
          border: "1px solid #334155",
          borderRadius: "18px",
          padding: "30px",
          color: "white",
          boxShadow: "0 25px 70px rgba(0, 0, 0, 0.5)",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            gap: "20px",
          }}
        >
          <div>
            <p
              style={{
                margin: "0 0 8px",
                color: "#a78bfa",
                fontSize: "13px",
                fontWeight: "700",
                letterSpacing: "1px",
              }}
            >
              JOIN TOURNAMENT
            </p>

            <h2
              style={{
                margin: 0,
                fontSize: "25px",
              }}
            >
              {tournamentName}
            </h2>
          </div>

          <button
            onClick={onClose}
            aria-label="Close"
            style={{
              border: "none",
              background: "transparent",
              color: "#94a3b8",
              fontSize: "25px",
              cursor: "pointer",
            }}
          >
            ×
          </button>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "14px",
            marginTop: "28px",
          }}
        >
          <div
            style={{
              background: "#111c33",
              borderRadius: "12px",
              padding: "18px",
            }}
          >
            <small style={{ color: "#64748b" }}>Entry Fee</small>

            <div
              style={{
                marginTop: "7px",
                fontSize: "20px",
                fontWeight: "700",
              }}
            >
              {entryFee}
            </div>
          </div>

          <div
            style={{
              background: "#111c33",
              borderRadius: "12px",
              padding: "18px",
            }}
          >
            <small style={{ color: "#64748b" }}>Prize Pool</small>

            <div
              style={{
                marginTop: "7px",
                fontSize: "20px",
                fontWeight: "700",
                color: "#a78bfa",
              }}
            >
              {prizePool}
            </div>
          </div>
        </div>

        <div
          style={{
            marginTop: "25px",
            padding: "15px",
            borderRadius: "10px",
            background: "rgba(124, 58, 237, 0.1)",
            border: "1px solid #312e81",
            color: "#c4b5fd",
            fontSize: "14px",
            lineHeight: "1.6",
          }}
        >
          Registration is ready. Complete the form below to secure your
          tournament slot. Payment integration will be added later — this is
          currently a preview of the joining experience.
        </div>

        <RegistrationForm
          tournamentId={tournamentId}
          gameName={gameName}
          tournamentName={tournamentName}
          entryFee={entryFee}
          mode={mode}
          teamSize={teamSize}
        />

        <div
          style={{
            display: "flex",
            gap: "12px",
            marginTop: "25px",
          }}
        >
          <button
            onClick={onClose}
            style={{
              flex: 1,
              padding: "13px",
              border: "1px solid #334155",
              borderRadius: "9px",
              background: "#111c33",
              color: "white",
              fontWeight: "700",
              cursor: "pointer",
            }}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}