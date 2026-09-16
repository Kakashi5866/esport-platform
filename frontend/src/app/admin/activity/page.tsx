"use client";

import { useEffect, useState } from "react";
import AdminGuard from "@/components/admin/AdminGuard";
import { supabase } from "@/lib/supabase";

type ActivityLog = {
  id: string;
  user_email: string | null;
  action: string;
  details: string | null;
  created_at: string;
};

function AdminActivityContent() {
  const [logs, setLogs] = useState<ActivityLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<"ALL" | "LOGIN" | "VIEW_TOURNAMENT">(
    "ALL"
  );

  useEffect(() => {
    async function loadLogs() {
      const { data: sessionData } = await supabase.auth.getSession();
      const token = sessionData.session?.access_token;

      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const response = await fetch("/api/activity/list", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.ok) {
          const data = await response.json();
          setLogs(data.logs || []);
        }
      } catch (error) {
        console.error("Failed to load activity:", error);
      } finally {
        setLoading(false);
      }
    }

    loadLogs();
  }, []);

  const filteredLogs =
    filter === "ALL" ? logs : logs.filter((log) => log.action === filter);

  const totalLogins = logs.filter((log) => log.action === "LOGIN").length;
  const totalViews = logs.filter(
    (log) => log.action === "VIEW_TOURNAMENT"
  ).length;

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#020617",
        color: "#f8fafc",
        padding: "40px 20px 80px",
      }}
    >
      <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
        <h1 style={{ fontSize: "34px", marginBottom: "8px" }}>
          Admin — User Activity
        </h1>

        <p style={{ color: "#94a3b8", marginBottom: "25px" }}>
          Live log of logins and tournament views across the platform.
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
            gap: "12px",
            marginBottom: "25px",
          }}
        >
          <StatBox label="Total Events" value={logs.length} />
          <StatBox label="Logins" value={totalLogins} />
          <StatBox label="Tournament Views" value={totalViews} />
        </div>

        <div style={{ display: "flex", gap: "8px", marginBottom: "20px" }}>
          {(["ALL", "LOGIN", "VIEW_TOURNAMENT"] as const).map((type) => (
            <button
              key={type}
              onClick={() => setFilter(type)}
              style={{
                padding: "9px 15px",
                borderRadius: "8px",
                border:
                  filter === type
                    ? "1px solid #7c3aed"
                    : "1px solid #1e293b",
                background: filter === type ? "#312e81" : "#0b1220",
                color: filter === type ? "white" : "#94a3b8",
                fontSize: "12px",
                fontWeight: "700",
                cursor: "pointer",
              }}
            >
              {type === "ALL"
                ? "All"
                : type === "LOGIN"
                  ? "Logins"
                  : "Tournament Views"}
            </button>
          ))}
        </div>

        {loading ? (
          <p style={{ color: "#94a3b8" }}>Loading activity...</p>
        ) : filteredLogs.length === 0 ? (
          <p style={{ color: "#94a3b8" }}>No activity recorded yet.</p>
        ) : (
          <div
            style={{
              border: "1px solid #1e293b",
              borderRadius: "14px",
              overflow: "hidden",
              background: "#0b1220",
            }}
          >
            {filteredLogs.map((log, index) => (
              <div
                key={log.id}
                style={{
                  padding: "16px 20px",
                  borderBottom:
                    index === filteredLogs.length - 1
                      ? "none"
                      : "1px solid #1e293b",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  gap: "15px",
                  flexWrap: "wrap",
                }}
              >
                <div>
                  <span
                    style={{
                      display: "inline-block",
                      padding: "3px 8px",
                      borderRadius: "6px",
                      background:
                        log.action === "LOGIN" ? "#14532d" : "#312e81",
                      color:
                        log.action === "LOGIN" ? "#86efac" : "#c4b5fd",
                      fontSize: "10px",
                      fontWeight: "800",
                      marginRight: "10px",
                    }}
                  >
                    {log.action === "LOGIN" ? "LOGIN" : "VIEWED"}
                  </span>

                  <strong style={{ fontSize: "13px" }}>
                    {log.user_email || "Anonymous"}
                  </strong>

                  {log.details && (
                    <span
                      style={{
                        color: "#64748b",
                        fontSize: "12px",
                        marginLeft: "8px",
                      }}
                    >
                      — {log.details}
                    </span>
                  )}
                </div>

                <span style={{ color: "#64748b", fontSize: "11px" }}>
                  {new Date(log.created_at).toLocaleString()}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}

function StatBox({ label, value }: { label: string; value: number }) {
  return (
    <div
      style={{
        padding: "18px",
        borderRadius: "12px",
        background: "#0b1220",
        border: "1px solid #1e293b",
      }}
    >
      <strong style={{ display: "block", fontSize: "24px" }}>
        {value}
      </strong>
      <span style={{ color: "#64748b", fontSize: "11px" }}>{label}</span>
    </div>
  );
}

export default function AdminActivityPage() {
  return (
    <AdminGuard>
      <AdminActivityContent />
    </AdminGuard>
  );
}