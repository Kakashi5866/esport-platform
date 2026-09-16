"use client";

import { useEffect, useState } from "react";
import AdminGuard from "@/components/admin/AdminGuard";
import { supabase } from "@/lib/supabase";

type Registration = {
  id: string;
  tournament_id: string | null;
  tournament_name: string;
  game_name: string | null;
  player_name: string;
  player_uid: string | null;
  email: string | null;
  team_name: string | null;
  status: "PENDING" | "CONFIRMED" | "CANCELLED";
  created_at: string;
};

function AdminRegistrationsPageContent() {
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  async function getAuthHeaders(): Promise<Record<string, string>> {
    const { data } = await supabase.auth.getSession();
    const token = data.session?.access_token;
    return token ? { Authorization: `Bearer ${token}` } : {};
  }

  async function loadRegistrations() {
    try {
      const response = await fetch("/api/registrations", {
        headers: await getAuthHeaders(),
      });

      if (!response.ok) {
        throw new Error("Failed to load registrations");
      }

      const data = await response.json();
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

  async function updateStatus(
    id: string,
    status: "CONFIRMED" | "CANCELLED"
  ) {
    setUpdatingId(id);

    try {
      const response = await fetch("/api/registrations/status", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          ...(await getAuthHeaders()),
        },
        body: JSON.stringify({
          id,
          status,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to update status");
      }

      setRegistrations((current) =>
        current.map((registration) =>
          registration.id === id
            ? { ...registration, status }
            : registration
        )
      );
    } catch (error) {
      console.error("Status update error:", error);
      alert("Status update failed.");
    } finally {
      setUpdatingId(null);
    }
  }

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#020617",
        color: "#f8fafc",
        padding: "40px 20px 80px",
      }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <h1 style={{ fontSize: "34px", marginBottom: "8px" }}>
          Admin — Registrations
        </h1>

        <p style={{ color: "#94a3b8", marginBottom: "30px" }}>
          Manage tournament registrations.
        </p>

        {loading ? (
          <p style={{ color: "#94a3b8" }}>
            Loading registrations...
          </p>
        ) : registrations.length === 0 ? (
          <p style={{ color: "#94a3b8" }}>
            No registrations found.
          </p>
        ) : (
          <div
            style={{
              display: "grid",
              gap: "16px",
            }}
          >
            {registrations.map((registration) => (
              <div
                key={registration.id}
                style={{
                  background: "#0f172a",
                  border: "1px solid #1e293b",
                  borderRadius: "14px",
                  padding: "20px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    gap: "20px",
                    flexWrap: "wrap",
                  }}
                >
                  <div>
                    <h2 style={{ margin: "0 0 8px" }}>
                      {registration.tournament_name}
                    </h2>

                    <p
                      style={{
                        margin: "4px 0",
                        color: "#a78bfa",
                      }}
                    >
                      {registration.game_name || "Game"}
                    </p>

                    <p style={{ margin: "4px 0" }}>
                      Player: {registration.player_name}
                    </p>

                    <p
                      style={{
                        margin: "4px 0",
                        color: "#94a3b8",
                      }}
                    >
                      UID: {registration.player_uid || "N/A"}
                    </p>

                    <p
                      style={{
                        margin: "4px 0",
                        color: "#94a3b8",
                      }}
                    >
                      Team: {registration.team_name || "Solo"}
                    </p>
                  </div>

                  <div style={{ minWidth: "180px" }}>
                    <div style={{ marginBottom: "12px" }}>
                      <strong>Status: </strong>
                      <span
                        style={{
                          color:
                            registration.status === "CONFIRMED"
                              ? "#4ade80"
                              : registration.status === "CANCELLED"
                                ? "#f87171"
                                : "#fbbf24",
                          fontWeight: "700",
                        }}
                      >
                        {registration.status}
                      </span>
                    </div>

                    {registration.status === "PENDING" && (
                      <div
                        style={{
                          display: "flex",
                          gap: "8px",
                        }}
                      >
                        <button
                          disabled={updatingId === registration.id}
                          onClick={() =>
                            updateStatus(
                              registration.id,
                              "CONFIRMED"
                            )
                          }
                          style={{
                            padding: "9px 14px",
                            border: "none",
                            borderRadius: "8px",
                            background: "#16a34a",
                            color: "white",
                            fontWeight: "700",
                            cursor: "pointer",
                          }}
                        >
                          Confirm
                        </button>

                        <button
                          disabled={updatingId === registration.id}
                          onClick={() =>
                            updateStatus(
                              registration.id,
                              "CANCELLED"
                            )
                          }
                          style={{
                            padding: "9px 14px",
                            border: "none",
                            borderRadius: "8px",
                            background: "#dc2626",
                            color: "white",
                            fontWeight: "700",
                            cursor: "pointer",
                          }}
                        >
                          Cancel
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}

export default function AdminRegistrationsPage() {
  return (
    <AdminGuard>
      <AdminRegistrationsPageContent />
    </AdminGuard>
  );
}