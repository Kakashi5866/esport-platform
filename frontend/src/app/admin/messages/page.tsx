"use client";

import { useEffect, useState } from "react";
import AdminGuard from "@/components/admin/AdminGuard";
import { supabase } from "@/lib/supabase";

type ContactMessage = {
  id: string;
  name: string;
  email: string;
  subject: string | null;
  message: string;
  created_at: string;
};

function AdminMessagesContent() {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadMessages() {
      const { data: sessionData } = await supabase.auth.getSession();
      const token = sessionData.session?.access_token;

      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const response = await fetch("/api/messages", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.ok) {
          const data = await response.json();
          setMessages(data.messages || []);
        }
      } catch (error) {
        console.error("Failed to load messages:", error);
      } finally {
        setLoading(false);
      }
    }

    loadMessages();
  }, []);

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#020617",
        color: "#f8fafc",
        padding: "40px 20px 80px",
      }}
    >
      <div style={{ maxWidth: "900px", margin: "0 auto" }}>
        <h1 style={{ fontSize: "34px", marginBottom: "8px" }}>
          Admin — Contact Messages
        </h1>

        <p style={{ color: "#94a3b8", marginBottom: "25px" }}>
          Messages submitted through the Contact page.
        </p>

        {loading ? (
          <p style={{ color: "#94a3b8" }}>Loading messages...</p>
        ) : messages.length === 0 ? (
          <p style={{ color: "#94a3b8" }}>No messages yet.</p>
        ) : (
          <div style={{ display: "grid", gap: "14px" }}>
            {messages.map((msg) => (
              <div
                key={msg.id}
                style={{
                  padding: "20px",
                  borderRadius: "14px",
                  background: "#0b1220",
                  border: "1px solid #1e293b",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    gap: "15px",
                    flexWrap: "wrap",
                    marginBottom: "10px",
                  }}
                >
                  <div>
                    <strong>{msg.name}</strong>
                    <span
                      style={{
                        color: "#64748b",
                        fontSize: "12px",
                        marginLeft: "10px",
                      }}
                    >
                      {msg.email}
                    </span>
                  </div>

                  <span style={{ color: "#64748b", fontSize: "11px" }}>
                    {new Date(msg.created_at).toLocaleString()}
                  </span>
                </div>

                {msg.subject && (
                  <span
                    style={{
                      display: "inline-block",
                      padding: "3px 8px",
                      borderRadius: "6px",
                      background: "#312e81",
                      color: "#c4b5fd",
                      fontSize: "10px",
                      fontWeight: "800",
                      marginBottom: "10px",
                    }}
                  >
                    {msg.subject}
                  </span>
                )}

                <p
                  style={{
                    color: "#cbd5e1",
                    fontSize: "13px",
                    lineHeight: 1.6,
                    margin: 0,
                  }}
                >
                  {msg.message}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}

export default function AdminMessagesPage() {
  return (
    <AdminGuard>
      <AdminMessagesContent />
    </AdminGuard>
  );
}