"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import RatingWidget from "@/components/shared/RatingWidget";

type Registration = {
  id: string;
  tournament_id: string | null;
  tournament_name: string;
  game_name: string | null;
  player_name: string;
  player_uid: string | null;
  team_name: string | null;
  entry_fee: string | null;
  status: "PENDING" | "CONFIRMED" | "CANCELLED";
  payment_status: "UNPAID" | "PAID";
  payment_id: string | null;
  paid_at: string | null;
  starts_at: string | null;
};

const REPORT_CATEGORIES = [
  "Payment Issue",
  "Player Behavior / Cheating",
  "Technical Issue",
  "Registration Issue",
  "Other",
];

export default function MyTournamentsPage() {
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [loading, setLoading] = useState(true);
  const [payingId, setPayingId] = useState<string | null>(null);

  const [reportingFor, setReportingFor] = useState<Registration | null>(null);
  const [reportCategory, setReportCategory] = useState("");
  const [reportDescription, setReportDescription] = useState("");
  const [submittingReport, setSubmittingReport] = useState(false);
  const [reportError, setReportError] = useState<string | null>(null);
  const [reportedIds, setReportedIds] = useState<string[]>([]);

  async function loadRegistrations() {
    try {
      const { data: sessionData } = await supabase.auth.getSession();
      const token = sessionData.session?.access_token;

      if (!token) {
        setLoading(false);
        return;
      }

      const response = await fetch("/api/registrations/mine", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const text = await response.text();

      let data: { registrations?: Registration[]; error?: string };

      try {
        data = text ? JSON.parse(text) : {};
      } catch {
        throw new Error(
          `Registrations API returned invalid response (${response.status})`
        );
      }

      if (!response.ok) {
        throw new Error(data.error || "Failed to load registrations");
      }

      setRegistrations(data.registrations || []);
    } catch (error) {
      console.error("Registration load error:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadRegistrations();
  }, []);

  async function payEntryFee(id: string) {
    const registration = registrations.find((r) => r.id === id);
    const amount = parseFloat(
      (registration?.entry_fee || "0").replace(/[^0-9.]/g, "")
    );

    if (!amount || amount <= 0) {
      alert("Could not determine entry fee amount.");
      return;
    }

    setPayingId(id);

    try {
      const response = await fetch("/api/registrations/payment", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id, amount }),
      });

      const text = await response.text();

      let result: {
        success?: boolean;
        error?: string;
        payment?: {
          id: string;
          payment_status: "PAID";
          payment_id: string;
          paid_at: string;
        };
      };

      try {
        result = text ? JSON.parse(text) : {};
      } catch {
        throw new Error(
          `Payment API returned invalid response (${response.status})`
        );
      }

      if (!response.ok) {
        throw new Error(result.error || "Payment failed");
      }

      if (!result.payment) {
        throw new Error("Payment API returned no payment data");
      }

      setRegistrations((current) =>
        current.map((registration) =>
          registration.id === id
            ? {
                ...registration,
                payment_status: "PAID",
                payment_id: result.payment!.payment_id,
                paid_at: result.payment!.paid_at,
              }
            : registration
        )
      );
    } catch (error) {
      console.error("Payment error:", error);

      alert(
        error instanceof Error
          ? error.message
          : "Payment failed"
      );
    } finally {
      setPayingId(null);
    }
  }

  function openReportForm(registration: Registration) {
    setReportingFor(registration);
    setReportCategory("");
    setReportDescription("");
    setReportError(null);
  }

  function closeReportForm() {
    setReportingFor(null);
    setReportCategory("");
    setReportDescription("");
    setReportError(null);
  }

  async function submitReport() {
    if (!reportingFor) return;

    if (!reportCategory) {
      setReportError("Please select a category.");
      return;
    }

    if (!reportDescription.trim()) {
      setReportError("Please describe the issue.");
      return;
    }

    setSubmittingReport(true);
    setReportError(null);

    try {
      const { data: sessionData } = await supabase.auth.getSession();
      const token = sessionData.session?.access_token;

      if (!token) {
        throw new Error("You must be logged in to submit a report.");
      }

      const response = await fetch("/api/reports", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          tournament_id: reportingFor.tournament_id,
          tournament_name: reportingFor.tournament_name,
          category: reportCategory,
          description: reportDescription.trim(),
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to submit report");
      }

      setReportedIds((current) => [...current, reportingFor.id]);
      closeReportForm();
    } catch (error) {
      console.error("Report submit error:", error);
      setReportError(
        error instanceof Error ? error.message : "Failed to submit report"
      );
    } finally {
      setSubmittingReport(false);
    }
  }

  const upcomingMatches = registrations
    .filter(
      (r) =>
        r.starts_at &&
        r.status !== "CANCELLED" &&
        new Date(r.starts_at).getTime() > Date.now()
    )
    .sort(
      (a, b) =>
        new Date(a.starts_at!).getTime() - new Date(b.starts_at!).getTime()
    );

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#020617",
        color: "#f8fafc",
        padding: "40px 20px 80px",
      }}
    >
      <div
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
        }}
      >
        <Link
          href="/tournaments"
          style={{
            color: "#a78bfa",
            textDecoration: "none",
            fontWeight: "600",
          }}
        >
          ← Back to Tournaments
        </Link>

        <h1
          style={{
            fontSize: "34px",
            marginTop: "24px",
            marginBottom: "8px",
          }}
        >
          My Tournaments
        </h1>

        <p
          style={{
            color: "#94a3b8",
            marginBottom: "30px",
          }}
        >
          Your tournament registrations
        </p>

        {upcomingMatches.length > 0 && (
          <div
            style={{
              marginBottom: "30px",
              padding: "20px",
              borderRadius: "14px",
              background: "#0f172a",
              border: "1px solid #1e293b",
            }}
          >
            <h2
              style={{
                margin: "0 0 14px",
                fontSize: "16px",
                color: "#c4b5fd",
              }}
            >
              📅 Upcoming Matches
            </h2>

            <div style={{ display: "grid", gap: "10px" }}>
              {upcomingMatches.map((match) => (
                <div
                  key={match.id}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "10px 14px",
                    borderRadius: "9px",
                    background: "#0b1220",
                    border: "1px solid #1e293b",
                    flexWrap: "wrap",
                    gap: "8px",
                  }}
                >
                  <span style={{ fontSize: "13px", color: "#e2e8f0" }}>
                    <strong>{formatMatchDay(match.starts_at!)}</strong>
                    {": "}
                    {match.tournament_name}
                  </span>
                  <span
                    style={{
                      fontSize: "12px",
                      color: "#a78bfa",
                      fontWeight: 700,
                    }}
                  >
                    {formatMatchTime(match.starts_at!)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {loading ? (
          <p style={{ color: "#94a3b8" }}>
            Loading registrations...
          </p>
        ) : registrations.length === 0 ? (
          <p style={{ color: "#94a3b8" }}>
            No tournaments yet.
          </p>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "18px",
            }}
          >
            {registrations.map((registration) => (
              <div
                key={registration.id}
                style={{
                  background: "#0f172a",
                  border: "1px solid #1e293b",
                  borderRadius: "16px",
                  padding: "22px",
                }}
              >
                <p
                  style={{
                    margin: 0,
                    color: "#a78bfa",
                    fontSize: "13px",
                    fontWeight: "700",
                  }}
                >
                  {registration.game_name || "Game"}
                </p>

                <h2
                  style={{
                    margin: "8px 0",
                    fontSize: "20px",
                  }}
                >
                  {registration.tournament_name}
                </h2>

                <p style={{ margin: "8px 0" }}>
                  Player: {registration.player_name}
                </p>

                <p
                  style={{
                    color: "#94a3b8",
                    margin: "6px 0",
                  }}
                >
                  UID: {registration.player_uid || "N/A"}
                </p>

                <p
                  style={{
                    color: "#94a3b8",
                    margin: "6px 0 16px",
                  }}
                >
                  Team: {registration.team_name || "Solo"}
                </p>

                <div
                  style={{
                    display: "flex",
                    gap: "10px",
                    flexWrap: "wrap",
                  }}
                >
                  <span
                    style={{
                      padding: "6px 10px",
                      borderRadius: "999px",
                      background:
                        registration.status === "CONFIRMED"
                          ? "#14532d"
                          : registration.status === "CANCELLED"
                            ? "#7f1d1d"
                            : "#713f12",
                      fontSize: "12px",
                      fontWeight: "700",
                    }}
                  >
                    {registration.status}
                  </span>

                  <span
                    style={{
                      padding: "6px 10px",
                      borderRadius: "999px",
                      background:
                        registration.payment_status === "PAID"
                          ? "#14532d"
                          : "#334155",
                      fontSize: "12px",
                      fontWeight: "700",
                    }}
                  >
                    Payment: {registration.payment_status}
                  </span>
                </div>

                {registration.payment_status !== "PAID" &&
                  registration.status !== "CANCELLED" && (
                    <button
                      onClick={() =>
                        payEntryFee(registration.id)
                      }
                      disabled={payingId === registration.id}
                      style={{
                        width: "100%",
                        marginTop: "18px",
                        padding: "12px",
                        border: "none",
                        borderRadius: "9px",
                        background:
                          payingId === registration.id
                            ? "#475569"
                            : "#7c3aed",
                        color: "white",
                        fontWeight: "700",
                        cursor:
                          payingId === registration.id
                            ? "not-allowed"
                            : "pointer",
                      }}
                    >
                      {payingId === registration.id
                        ? "Processing..."
                        : "Pay Entry Fee"}
                    </button>
                  )}

                {registration.payment_status === "PAID" && (
                  <div
                    style={{
                      marginTop: "18px",
                      padding: "12px",
                      borderRadius: "9px",
                      background: "#14532d",
                      color: "#86efac",
                      fontSize: "13px",
                      fontWeight: "700",
                    }}
                  >
                    Payment Successful
                  </div>
                )}

                {reportedIds.includes(registration.id) ? (
                  <div
                    style={{
                      marginTop: "10px",
                      padding: "10px",
                      borderRadius: "9px",
                      background: "#0b1220",
                      border: "1px solid #1e293b",
                      color: "#94a3b8",
                      fontSize: "12px",
                      fontWeight: "700",
                      textAlign: "center",
                    }}
                  >
                    ✓ Report submitted
                  </div>
                ) : (
                  <button
                    onClick={() => openReportForm(registration)}
                    style={{
                      width: "100%",
                      marginTop: "10px",
                      padding: "10px",
                      border: "1px solid #7f1d1d",
                      borderRadius: "9px",
                      background: "transparent",
                      color: "#f87171",
                      fontWeight: "700",
                      fontSize: "13px",
                      cursor: "pointer",
                    }}
                  >
                    Report an Issue
                  </button>
                )}

                {registration.tournament_id && (
                  <RatingWidget tournamentId={registration.tournament_id} />
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {reportingFor && (
        <div
          onClick={closeReportForm}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(2, 6, 23, 0.8)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "20px",
            zIndex: 50,
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              width: "100%",
              maxWidth: "460px",
              background: "#0f172a",
              border: "1px solid #1e293b",
              borderRadius: "16px",
              padding: "26px",
              maxHeight: "90vh",
              overflowY: "auto",
            }}
          >
            <h2 style={{ margin: "0 0 4px", fontSize: "20px" }}>
              Report an Issue
            </h2>
            <p
              style={{
                color: "#94a3b8",
                fontSize: "13px",
                margin: "0 0 20px",
              }}
            >
              {reportingFor.tournament_name}
            </p>

            {reportError && (
              <p
                style={{
                  color: "#f87171",
                  fontSize: "13px",
                  marginBottom: "14px",
                }}
              >
                {reportError}
              </p>
            )}

            <label style={{ display: "block", marginBottom: "16px" }}>
              <span
                style={{
                  display: "block",
                  marginBottom: "6px",
                  color: "#94a3b8",
                  fontSize: "12px",
                  fontWeight: 700,
                }}
              >
                Category
              </span>
              <select
                value={reportCategory}
                onChange={(e) => setReportCategory(e.target.value)}
                style={{
                  width: "100%",
                  padding: "10px 12px",
                  borderRadius: "8px",
                  border: "1px solid #1e293b",
                  background: "#0b1220",
                  color: "#f8fafc",
                  fontSize: "13px",
                  boxSizing: "border-box",
                }}
              >
                <option value="">Select a category</option>
                {REPORT_CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </label>

            <label style={{ display: "block", marginBottom: "20px" }}>
              <span
                style={{
                  display: "block",
                  marginBottom: "6px",
                  color: "#94a3b8",
                  fontSize: "12px",
                  fontWeight: 700,
                }}
              >
                Describe the issue
              </span>
              <textarea
                value={reportDescription}
                onChange={(e) => setReportDescription(e.target.value)}
                rows={4}
                placeholder="Please share as much detail as possible..."
                style={{
                  width: "100%",
                  padding: "10px 12px",
                  borderRadius: "8px",
                  border: "1px solid #1e293b",
                  background: "#0b1220",
                  color: "#f8fafc",
                  fontSize: "13px",
                  boxSizing: "border-box",
                  resize: "vertical",
                }}
              />
            </label>

            <div style={{ display: "flex", gap: "10px" }}>
              <button
                onClick={submitReport}
                disabled={submittingReport}
                style={{
                  flex: 1,
                  padding: "12px",
                  border: "none",
                  borderRadius: "9px",
                  background: submittingReport ? "#475569" : "#dc2626",
                  color: "white",
                  fontWeight: "700",
                  cursor: submittingReport ? "not-allowed" : "pointer",
                }}
              >
                {submittingReport ? "Submitting..." : "Submit Report"}
              </button>
              <button
                onClick={closeReportForm}
                style={{
                  padding: "12px 18px",
                  border: "1px solid #1e293b",
                  borderRadius: "9px",
                  background: "transparent",
                  color: "#94a3b8",
                  fontWeight: "700",
                  cursor: "pointer",
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

function formatMatchDay(iso: string): string {
  const date = new Date(iso);
  const today = new Date();
  const tomorrow = new Date();
  tomorrow.setDate(today.getDate() + 1);

  const isSameDay = (a: Date, b: Date) =>
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate();

  if (isSameDay(date, today)) return "Today";
  if (isSameDay(date, tomorrow)) return "Tomorrow";

  return date.toLocaleDateString(undefined, {
    weekday: "short",
    day: "numeric",
    month: "short",
  });
}

function formatMatchTime(iso: string): string {
  return new Date(iso).toLocaleTimeString(undefined, {
    hour: "numeric",
    minute: "2-digit",
  });
}