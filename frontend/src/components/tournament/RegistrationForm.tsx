"use client";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/hooks/useAuth";

import { FormEvent, useState } from "react";

type RegistrationFormProps = {
  tournamentId: string;
  gameName: string;
  tournamentName: string;
  entryFee: string;
  mode: string;
  teamSize?: number | null;
  onSuccess?: () => void;
};

function getTeammateCount(
  mode: string | undefined,
  teamSize?: number | null
): number {
  if (typeof teamSize === "number" && teamSize > 0) {
    return Math.max(teamSize - 1, 0);
  }

  const normalized = (mode || "").toLowerCase();
  if (normalized === "duo") return 1;
  if (normalized === "squad") return 3;
  if (normalized === "5v5") return 4;
  return 0;
}

export default function RegistrationForm({
  tournamentId,
  gameName,
  tournamentName,
  entryFee,
  mode,
  teamSize,
  onSuccess,
}: RegistrationFormProps) {
  const { user } = useAuth();
  const [name, setName] = useState("");
  const [playerId, setPlayerId] = useState("");
  const [teamName, setTeamName] = useState("");
  const [ageConfirmed, setAgeConfirmed] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [checking, setChecking] = useState(false);
  const [formError, setFormError] = useState("");

  const teammateCount = getTeammateCount(mode, teamSize);
  const [teammates, setTeammates] = useState(
    Array.from({ length: teammateCount }, () => ({ name: "", uid: "" }))
  );

  function updateTeammate(index: number, field: "name" | "uid", value: string) {
    setTeammates((current) =>
      current.map((teammate, i) =>
        i === index ? { ...teammate, [field]: value } : teammate
      )
    );
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFormError("");

    if (!name.trim() || !playerId.trim() || !user?.email) {
      return;
    }

    if (!ageConfirmed) {
      return;
    }

    if (teammateCount > 0 && !teamName.trim()) {
      return;
    }

    const filledTeammates = teammates.filter(
      (t) => t.name.trim() || t.uid.trim()
    );

    if (teammateCount > 0 && filledTeammates.length < teammateCount) {
      return;
    }

    setChecking(true);

    // Check if this user is banned
    const banCheckRes = await fetch("/api/check-banned", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: user.email }),
    });
    const banCheckData = await banCheckRes.json();

    if (banCheckData.banned) {
      setFormError(
        "Your account is not allowed to register for tournaments. Contact support if you think this is a mistake."
      );
      setChecking(false);
      return;
    }

    // Check if this user already registered for this tournament
    const { data: existing, error: checkError } = await supabase
      .from("tournament_registrations")
      .select("id")
      .eq("tournament_id", tournamentId)
      .eq("email", user.email)
      .maybeSingle();

    if (checkError) {
      console.error("Duplicate check error:", checkError);
    }

    if (existing) {
      setFormError(
        "You have already registered for this tournament with this account."
      );
      setChecking(false);
      return;
    }

    const { error } = await supabase
      .from("tournament_registrations")
      .insert({
        tournament_id: tournamentId,
        tournament_name: tournamentName,
        game_name: gameName,
        entry_fee: entryFee,
        player_name: name.trim(),
        player_uid: playerId.trim(),
        email: user.email,
        team_name: teamName.trim() || null,
        teammates: teammateCount > 0 ? filledTeammates : null,
      });

    setChecking(false);

    if (error) {
      console.error("Registration error:", { message: error.message, code: error.code, details: error.details, hint: error.hint });
      return;
    }

    setSubmitted(true);
    onSuccess?.();
  }

  if (submitted) {
    return (
      <div
        style={{
          padding: "22px",
          borderRadius: "12px",
          background: "#071a13",
          border: "1px solid #14532d",
        }}
      >
        <h3
          style={{
            margin: "0 0 8px",
            color: "#4ade80",
            fontSize: "18px",
          }}
        >
          Registration Successful
        </h3>

        <p
          style={{
            margin: 0,
            color: "#94a3b8",
            fontSize: "11px",
            lineHeight: 1.6,
          }}
        >
          Your registration for {tournamentName} has been submitted.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        display: "grid",
        gap: "14px",
        marginTop: "20px",
      }}
    >
      {formError && (
        <div
          style={{
            padding: "12px 14px",
            borderRadius: "9px",
            background: "#450a0a",
            border: "1px solid #7f1d1d",
            color: "#fca5a5",
            fontSize: "12px",
          }}
        >
          {formError}
        </div>
      )}

      <Field
        label="PLAYER NAME"
        value={name}
        onChange={setName}
        placeholder="Enter your player name"
      />

      <Field
        label="GAME UID / PLAYER ID"
        value={playerId}
        onChange={setPlayerId}
        placeholder="Enter your game UID"
      />

      <label style={{ display: "grid", gap: "7px" }}>
        <span
          style={{
            color: "#94a3b8",
            fontSize: "8px",
            fontWeight: 900,
            letterSpacing: "0.8px",
          }}
        >
          EMAIL (FROM YOUR ACCOUNT)
        </span>

        <div
          style={{
            width: "100%",
            boxSizing: "border-box",
            minHeight: "43px",
            padding: "0 12px",
            display: "flex",
            alignItems: "center",
            borderRadius: "8px",
            border: "1px solid #334155",
            background: "#0b1220",
            color: "#94a3b8",
            fontSize: "11px",
          }}
        >
          {user?.email}
        </div>
      </label>

      {teammateCount > 0 && (
        <>
          <Field
            label="TEAM NAME"
            value={teamName}
            onChange={setTeamName}
            placeholder="Enter your team name"
          />

          <div
            style={{
              padding: "14px",
              borderRadius: "10px",
              background: "rgba(124, 58, 237, 0.08)",
              border: "1px solid #312e81",
            }}
          >
            <p
              style={{
                margin: "0 0 12px",
                color: "#c4b5fd",
                fontSize: "11px",
                fontWeight: 800,
                letterSpacing: "0.5px",
              }}
            >
              TEAMMATES ({teammateCount} required for {mode})
            </p>

            <div style={{ display: "grid", gap: "12px" }}>
              {teammates.map((teammate, index) => (
                <div
                  key={index}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "8px",
                  }}
                >
                  <input
                    value={teammate.name}
                    onChange={(e) =>
                      updateTeammate(index, "name", e.target.value)
                    }
                    placeholder={`Teammate ${index + 1} Name`}
                    style={teammateInputStyle}
                  />
                  <input
                    value={teammate.uid}
                    onChange={(e) =>
                      updateTeammate(index, "uid", e.target.value)
                    }
                    placeholder={`Teammate ${index + 1} UID`}
                    style={teammateInputStyle}
                  />
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      {teammateCount === 0 && (
        <Field
          label="TEAM NAME (OPTIONAL)"
          value={teamName}
          onChange={setTeamName}
          placeholder="Enter team name"
        />
      )}

      <label
        style={{
          display: "flex",
          alignItems: "flex-start",
          gap: "10px",
          padding: "12px 14px",
          borderRadius: "9px",
          background: "#0b1220",
          border: "1px solid #334155",
          cursor: "pointer",
        }}
      >
        <input
          type="checkbox"
          checked={ageConfirmed}
          onChange={(e) => setAgeConfirmed(e.target.checked)}
          style={{
            marginTop: "2px",
            width: "16px",
            height: "16px",
            flexShrink: 0,
            cursor: "pointer",
          }}
        />
        <span
          style={{
            color: "#cbd5e1",
            fontSize: "11px",
            lineHeight: 1.5,
          }}
        >
          I confirm that I am 18 years of age or older (or the legal age
          required in my country/region to participate in this tournament).
        </span>
      </label>

      <button
        type="submit"
        disabled={!ageConfirmed || checking}
        style={{
          marginTop: "5px",
          minHeight: "46px",
          border: 0,
          borderRadius: "9px",
          background:
            ageConfirmed && !checking
              ? "linear-gradient(135deg,#7c3aed,#9333ea)"
              : "#334155",
          color: ageConfirmed && !checking ? "white" : "#64748b",
          fontSize: "10px",
          fontWeight: 950,
          cursor: ageConfirmed && !checking ? "pointer" : "not-allowed",
        }}
      >
        {checking ? "CHECKING..." : "SUBMIT REGISTRATION"}
      </button>
    </form>
  );
}

function Field({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  type?: string;
}) {
  return (
    <label
      style={{
        display: "grid",
        gap: "7px",
      }}
    >
      <span
        style={{
          color: "#94a3b8",
          fontSize: "8px",
          fontWeight: 900,
          letterSpacing: "0.8px",
        }}
      >
        {label}
      </span>

      <input
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        required={label !== "TEAM NAME (OPTIONAL)"}
        style={{
          width: "100%",
          boxSizing: "border-box",
          minHeight: "43px",
          padding: "0 12px",
          borderRadius: "8px",
          border: "1px solid #334155",
          background: "#020617",
          color: "white",
          outline: "none",
          fontSize: "11px",
        }}
      />
    </label>
  );
}

const teammateInputStyle = {
  width: "100%",
  boxSizing: "border-box" as const,
  minHeight: "38px",
  padding: "0 10px",
  borderRadius: "7px",
  border: "1px solid #334155",
  background: "#020617",
  color: "white",
  outline: "none",
  fontSize: "10px",
};