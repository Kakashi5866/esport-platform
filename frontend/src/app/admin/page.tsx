"use client";

import { useEffect, useMemo, useState, type ReactNode } from "react";
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
  entry_fee: string | null;
  payment_status: "UNPAID" | "PAID";
  status: "PENDING" | "CONFIRMED" | "CANCELLED";
  created_at: string;
  prize_paid: boolean | null;
  prize_note: string | null;
};

type ActivityLog = {
  id: string;
  user_email: string | null;
  action: string;
  details: string | null;
  created_at: string;
};

type ContactMessage = {
  id: string;
  name: string;
  email: string;
  subject: string | null;
  message: string;
  created_at: string;
};

type CmsTournament = {
  id: string;
  game: string;
  title: string;
  entry: string;
  prize: string;
  slots: string;
  status: string;
  mode: string;
  image_url: string | null;
  description: string | null;
  rules: string | null;
  starts_at: string | null;
  team_size: number | null;
  accent_color: string | null;
};

type Report = {
  id: string;
  user_email: string;
  tournament_id: string | null;
  tournament_name: string | null;
  category: string;
  description: string;
  status: "OPEN" | "IN_PROGRESS" | "RESOLVED" | "DISMISSED";
  admin_response: string | null;
  created_at: string;
  resolved_at: string | null;
};

type TournamentFormState = {
  id: string;
  game: string;
  title: string;
  entry: string;
  prize: string;
  slots: string;
  status: string;
  mode: string;
  image_url: string;
  description: string;
  rules: string;
  starts_at: string;
  team_size: string;
  accent_color: string;
};

const EMPTY_TOURNAMENT_FORM: TournamentFormState = {
  id: "",
  game: "Free Fire",
  title: "",
  entry: "",
  prize: "",
  slots: "",
  status: "UPCOMING",
  mode: "Solo",
  image_url: "",
  description: "",
  rules: "",
  starts_at: "",
  team_size: "",
  accent_color: "#7c3aed",
};

type Tab = "overview" | "registrations" | "messages" | "activity" | "tournaments" | "reports";

function exportRegistrationsToCSV(registrations: Registration[]) {
  const headers = [
    "Tournament",
    "Game",
    "Player Name",
    "Player UID",
    "Team Name",
    "Email",
    "Entry Fee",
    "Payment Status",
    "Status",
    "Date",
  ];

  const rows = registrations.map((r) => [
    r.tournament_name,
    r.game_name || "",
    r.player_name,
    r.player_uid || "",
    r.team_name || "Solo",
    r.email || "",
    r.entry_fee || "",
    r.payment_status,
    r.status,
    new Date(r.created_at).toLocaleString(),
  ]);

  const csvContent = [headers, ...rows]
    .map((row) =>
      row
        .map((cell) => `"${String(cell).replace(/"/g, '""')}"`)
        .join(",")
    )
    .join("\n");

  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `registrations-${new Date().toISOString().slice(0, 10)}.csv`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}


function AdminDashboardContent() {
  const [activeTab, setActiveTab] = useState<Tab>("overview");

  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [logs, setLogs] = useState<ActivityLog[]>([]);
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [tournaments, setTournaments] = useState<CmsTournament[]>([]);
  const [reports, setReports] = useState<Report[]>([]);

  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [regFilter, setRegFilter] = useState<
    "ALL" | "PENDING" | "CONFIRMED" | "CANCELLED"
  >("ALL");

  const [tournamentForm, setTournamentForm] = useState<TournamentFormState>(
    EMPTY_TOURNAMENT_FORM
  );
  const [editingTournamentId, setEditingTournamentId] = useState<string | null>(
    null
  );
  const [showTournamentForm, setShowTournamentForm] = useState(false);
  const [savingTournament, setSavingTournament] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [tournamentError, setTournamentError] = useState<string | null>(null);

  const [respondingId, setRespondingId] = useState<string | null>(null);
  const [responseText, setResponseText] = useState("");
  const [updatingReportId, setUpdatingReportId] = useState<string | null>(null);

  const [markingPrizeId, setMarkingPrizeId] = useState<string | null>(null);
  const [prizeNoteInput, setPrizeNoteInput] = useState("");
  const [savingPrizeId, setSavingPrizeId] = useState<string | null>(null);

  async function getAuthHeaders(): Promise<Record<string, string>> {
    const { data } = await supabase.auth.getSession();
    const token = data.session?.access_token;
    return token ? { Authorization: `Bearer ${token}` } : {};
  }

  async function loadAll() {
    setLoading(true);
    const headers = await getAuthHeaders();

    try {
      const [regRes, logRes, msgRes, tourRes, reportRes] = await Promise.all([
        fetch("/api/registrations", { headers }),
        fetch("/api/activity/list", { headers }),
        fetch("/api/messages", { headers }),
        fetch("/api/tournaments"),
        fetch("/api/reports", { headers }),
      ]);

      if (regRes.ok) {
        const data = await regRes.json();
        setRegistrations(data.registrations || []);
      }

      if (logRes.ok) {
        const data = await logRes.json();
        setLogs(data.logs || []);
      }

      if (msgRes.ok) {
        const data = await msgRes.json();
        setMessages(data.messages || []);
      }

      if (tourRes.ok) {
        const data = await tourRes.json();
        setTournaments(data.tournaments || []);
      }

      if (reportRes.ok) {
        const data = await reportRes.json();
        setReports(data.reports || []);
      }
    } catch (error) {
      console.error("Dashboard load error:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadAll();
  }, []);

  async function updateStatus(
    id: string,
    status: "CONFIRMED" | "CANCELLED"
  ) {
    setUpdatingId(id);

    try {
      const headers = await getAuthHeaders();
      const response = await fetch("/api/registrations/status", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          ...headers,
        },
        body: JSON.stringify({ id, status }),
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

  function openPrizeForm(registration: Registration) {
    setMarkingPrizeId(registration.id);
    setPrizeNoteInput(registration.prize_note || "");
  }

  function closePrizeForm() {
    setMarkingPrizeId(null);
    setPrizeNoteInput("");
  }

  async function submitPrizePaid(id: string) {
    setSavingPrizeId(id);

    try {
      const headers = await getAuthHeaders();
      const response = await fetch("/api/registrations/prize", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          ...headers,
        },
        body: JSON.stringify({ id, prize_note: prizeNoteInput.trim() }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to mark prize as paid");
      }

      setRegistrations((current) =>
        current.map((registration) =>
          registration.id === id
            ? {
                ...registration,
                prize_paid: true,
                prize_note: prizeNoteInput.trim() || null,
              }
            : registration
        )
      );
      closePrizeForm();
    } catch (error) {
      console.error("Prize update error:", error);
      alert(
        error instanceof Error ? error.message : "Failed to mark prize as paid"
      );
    } finally {
      setSavingPrizeId(null);
    }
  }

  function openNewTournamentForm() {
    setEditingTournamentId(null);
    setTournamentForm(EMPTY_TOURNAMENT_FORM);
    setTournamentError(null);
    setShowTournamentForm(true);
  }

  function isoToDatetimeLocal(iso: string | null): string {
    if (!iso) return "";
    const date = new Date(iso);
    const offset = date.getTimezoneOffset();
    const local = new Date(date.getTime() - offset * 60000);
    return local.toISOString().slice(0, 16);
  }

  function openEditTournamentForm(tournament: CmsTournament) {
    setEditingTournamentId(tournament.id);
    setTournamentForm({
      id: tournament.id,
      game: tournament.game,
      title: tournament.title,
      entry: tournament.entry,
      prize: tournament.prize,
      slots: tournament.slots,
      status: tournament.status,
      mode: tournament.mode,
      image_url: tournament.image_url || "",
      description: tournament.description || "",
      rules: tournament.rules || "",
      starts_at: isoToDatetimeLocal(tournament.starts_at),
      team_size: tournament.team_size ? String(tournament.team_size) : "",
      accent_color: tournament.accent_color || "#7c3aed",
    });
    setTournamentError(null);
    setShowTournamentForm(true);
  }

  function closeTournamentForm() {
    setShowTournamentForm(false);
    setEditingTournamentId(null);
    setTournamentForm(EMPTY_TOURNAMENT_FORM);
    setTournamentError(null);
  }

  function slugify(text: string): string {
    return text
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .replace(/^-|-$/g, "");
  }

  function updateTournamentField(
    field: keyof TournamentFormState,
    value: string
  ) {
    setTournamentForm((current) => {
      const updated = { ...current, [field]: value };

      // Auto-generate the ID from the title, but only for NEW
      // tournaments (never overwrite an existing tournament's ID).
      if (field === "title" && !editingTournamentId) {
        updated.id = slugify(value);
      }

      return updated;
    });
  }

  async function handleTournamentImageUpload(file: File) {
    const idForUpload = editingTournamentId || tournamentForm.id.trim();

    if (!idForUpload) {
      setTournamentError("Pehle Tournament ID bhariye, uske baad image upload karein.");
      return;
    }

    setUploadingImage(true);
    setTournamentError(null);

    try {
      const headers = await getAuthHeaders();
      const formData = new FormData();
      formData.append("file", file);
      formData.append("tournamentId", idForUpload);

      const response = await fetch("/api/admin/tournaments/upload-image", {
        method: "POST",
        headers,
        body: formData,
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Image upload failed");
      }

      updateTournamentField("image_url", result.url);
    } catch (error) {
      console.error("Image upload error:", error);
      setTournamentError(
        error instanceof Error ? error.message : "Image upload failed"
      );
    } finally {
      setUploadingImage(false);
    }
  }

  async function saveTournament() {
    setTournamentError(null);

    if (!editingTournamentId && !tournamentForm.id.trim()) {
      setTournamentError("Tournament ID zaroori hai (unique slug, e.g. ff-solo-showdown-2).");
      return;
    }

    if (!tournamentForm.title.trim()) {
      setTournamentError("Title zaroori hai.");
      return;
    }

    setSavingTournament(true);

    try {
      const headers = await getAuthHeaders();
      const isEditing = Boolean(editingTournamentId);

      const payload = {
        id: isEditing ? editingTournamentId : tournamentForm.id.trim(),
        game: tournamentForm.game,
        title: tournamentForm.title.trim(),
        entry: tournamentForm.entry.trim(),
        prize: tournamentForm.prize.trim(),
        slots: tournamentForm.slots.trim(),
        status: tournamentForm.status,
        mode: tournamentForm.mode,
        image_url: tournamentForm.image_url.trim() || null,
        description: tournamentForm.description.trim() || null,
        rules: tournamentForm.rules.trim() || null,
        starts_at: tournamentForm.starts_at
          ? new Date(tournamentForm.starts_at).toISOString()
          : null,
        team_size: tournamentForm.team_size
          ? parseInt(tournamentForm.team_size, 10)
          : null,
        accent_color: tournamentForm.accent_color || null,
      };

      const response = await fetch("/api/admin/tournaments", {
        method: isEditing ? "PATCH" : "POST",
        headers: {
          "Content-Type": "application/json",
          ...headers,
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Tournament save failed");
      }

      await loadAll();
      closeTournamentForm();
    } catch (error) {
      console.error("Tournament save error:", error);
      setTournamentError(
        error instanceof Error ? error.message : "Tournament save failed"
      );
    } finally {
      setSavingTournament(false);
    }
  }

  async function deleteTournament(id: string) {
    if (!confirm("Ye tournament permanently delete karna hai?")) {
      return;
    }

    try {
      const headers = await getAuthHeaders();
      const response = await fetch("/api/admin/tournaments", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          ...headers,
        },
        body: JSON.stringify({ id }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Delete failed");
      }

      setTournaments((current) => current.filter((t) => t.id !== id));
    } catch (error) {
      console.error("Delete tournament error:", error);
      alert(error instanceof Error ? error.message : "Delete failed");
    }
  }

  function openResponseBox(report: Report) {
    setRespondingId(report.id);
    setResponseText(report.admin_response || "");
  }

  function cancelResponseBox() {
    setRespondingId(null);
    setResponseText("");
  }

  async function updateReportStatus(
    id: string,
    status: Report["status"],
    adminResponse?: string
  ) {
    setUpdatingReportId(id);

    try {
      const headers = await getAuthHeaders();
      const response = await fetch("/api/reports/status", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          ...headers,
        },
        body: JSON.stringify({
          id,
          status,
          admin_response: adminResponse,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to update report");
      }

      setReports((current) =>
        current.map((r) => (r.id === id ? result.report : r))
      );
      setRespondingId(null);
      setResponseText("");
    } catch (error) {
      console.error("Report update error:", error);
      alert(error instanceof Error ? error.message : "Failed to update report");
    } finally {
      setUpdatingReportId(null);
    }
  }

  const stats = useMemo(() => {
    const pending = registrations.filter((r) => r.status === "PENDING").length;
    const confirmed = registrations.filter((r) => r.status === "CONFIRMED").length;
    const cancelled = registrations.filter((r) => r.status === "CANCELLED").length;

    const revenue = registrations
      .filter((r) => r.payment_status === "PAID")
      .reduce((sum, r) => {
        const amount = parseFloat((r.entry_fee || "0").replace(/[^0-9.]/g, ""));
        return sum + (isNaN(amount) ? 0 : amount);
      }, 0);

    return {
      total: registrations.length,
      pending,
      confirmed,
      cancelled,
      revenue,
      totalActivity: logs.length,
      totalMessages: messages.length,
      openReports: reports.filter((r) => r.status === "OPEN").length,
    };
  }, [registrations, logs, messages, reports]);

  const filteredRegistrations =
    regFilter === "ALL"
      ? registrations
      : registrations.filter((r) => r.status === regFilter);

  return (
    <main style={page}>
      <div style={shell}>
        {/* SIDEBAR */}
        <aside style={sidebar}>
          <h1 style={sidebarTitle}>Admin</h1>
          <p style={sidebarSubtitle}>Esports Platform</p>

          <nav style={{ marginTop: "30px", display: "grid", gap: "6px" }}>
            <NavItem
              icon="📊"
              label="Overview"
              active={activeTab === "overview"}
              onClick={() => setActiveTab("overview")}
            />
            <NavItem
              icon="🎮"
              label="Registrations"
              badge={stats.pending || undefined}
              active={activeTab === "registrations"}
              onClick={() => setActiveTab("registrations")}
            />
            <NavItem
              icon="💬"
              label="Messages"
              badge={stats.totalMessages || undefined}
              active={activeTab === "messages"}
              onClick={() => setActiveTab("messages")}
            />
            <NavItem
              icon="📋"
              label="Activity Log"
              active={activeTab === "activity"}
              onClick={() => setActiveTab("activity")}
            />
            <NavItem
              icon="🏆"
              label="Tournaments"
              badge={tournaments.length || undefined}
              active={activeTab === "tournaments"}
              onClick={() => setActiveTab("tournaments")}
            />
            <NavItem
              icon="🚩"
              label="Reports"
              badge={stats.openReports || undefined}
              active={activeTab === "reports"}
              onClick={() => setActiveTab("reports")}
            />
          </nav>

          <button onClick={loadAll} style={refreshButton}>
            🔄 Refresh Data
          </button>
        </aside>

        {/* CONTENT */}
        <div style={content}>
          {loading ? (
            <p style={{ color: "#94a3b8" }}>Loading dashboard...</p>
          ) : (
            <>
              {activeTab === "overview" && (
                <OverviewTab stats={stats} registrations={registrations} />
              )}

              {activeTab === "registrations" && (
                <RegistrationsTab
                  registrations={filteredRegistrations}
                  filter={regFilter}
                  onFilterChange={setRegFilter}
                  onUpdateStatus={updateStatus}
                  updatingId={updatingId}
                  markingPrizeId={markingPrizeId}
                  prizeNoteInput={prizeNoteInput}
                  savingPrizeId={savingPrizeId}
                  onOpenPrizeForm={openPrizeForm}
                  onClosePrizeForm={closePrizeForm}
                  onPrizeNoteChange={setPrizeNoteInput}
                  onSubmitPrizePaid={submitPrizePaid}
                />
              )}

              {activeTab === "messages" && (
                <MessagesTab messages={messages} />
              )}

              {activeTab === "activity" && <ActivityTab logs={logs} />}

              {activeTab === "tournaments" && (
                <TournamentsTab
                  tournaments={tournaments}
                  showForm={showTournamentForm}
                  editingId={editingTournamentId}
                  form={tournamentForm}
                  error={tournamentError}
                  saving={savingTournament}
                  uploadingImage={uploadingImage}
                  onAddNew={openNewTournamentForm}
                  onEdit={openEditTournamentForm}
                  onDelete={deleteTournament}
                  onCancel={closeTournamentForm}
                  onFieldChange={updateTournamentField}
                  onImageUpload={handleTournamentImageUpload}
                  onSave={saveTournament}
                />
              )}

              {activeTab === "reports" && (
                <ReportsTab
                  reports={reports}
                  respondingId={respondingId}
                  responseText={responseText}
                  updatingId={updatingReportId}
                  onOpenResponse={openResponseBox}
                  onCancelResponse={cancelResponseBox}
                  onResponseTextChange={setResponseText}
                  onUpdateStatus={updateReportStatus}
                />
              )}
            </>
          )}
        </div>
      </div>
    </main>
  );
}

function NavItem({
  icon,
  label,
  active,
  badge,
  onClick,
}: {
  icon: string;
  label: string;
  active: boolean;
  badge?: number;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "11px 14px",
        borderRadius: "10px",
        border: "none",
        background: active ? "#312e81" : "transparent",
        color: active ? "white" : "#94a3b8",
        fontSize: "13px",
        fontWeight: 700,
        cursor: "pointer",
        textAlign: "left",
      }}
    >
      <span>
        {icon} {label}
      </span>
      {badge ? (
        <span
          style={{
            background: "#7c3aed",
            color: "white",
            borderRadius: "999px",
            padding: "2px 8px",
            fontSize: "10px",
            fontWeight: 900,
          }}
        >
          {badge}
        </span>
      ) : null}
    </button>
  );
}

function StatCard({
  label,
  value,
  accent,
}: {
  label: string;
  value: string;
  accent?: string;
}) {
  return (
    <div style={statCard}>
      <span style={{ color: "#64748b", fontSize: "11px", fontWeight: 700 }}>
        {label}
      </span>
      <strong
        style={{
          display: "block",
          marginTop: "8px",
          fontSize: "26px",
          color: accent || "white",
        }}
      >
        {value}
      </strong>
    </div>
  );
}

function OverviewTab({
  stats,
  registrations,
}: {
  stats: {
    total: number;
    pending: number;
    confirmed: number;
    cancelled: number;
    revenue: number;
    totalActivity: number;
    totalMessages: number;
  };
  registrations: Registration[];
}) {
  const recent = [...registrations]
    .sort(
      (a, b) =>
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    )
    .slice(0, 5);

  return (
    <div>
      <PageHeader
        title="Dashboard Overview"
        subtitle="Live snapshot of your platform"
      />

      <div style={statsGrid}>
        <StatCard label="Total Registrations" value={String(stats.total)} />
        <StatCard
          label="Pending Approval"
          value={String(stats.pending)}
          accent="#fbbf24"
        />
        <StatCard
          label="Confirmed"
          value={String(stats.confirmed)}
          accent="#4ade80"
        />
        <StatCard
          label="Revenue Collected"
          value={`₹${stats.revenue.toLocaleString()}`}
          accent="#a78bfa"
        />
        <StatCard label="Activity Events" value={String(stats.totalActivity)} />
        <StatCard label="Contact Messages" value={String(stats.totalMessages)} />
      </div>

      <h2 style={sectionTitle}>Recent Registrations</h2>

      {recent.length === 0 ? (
        <p style={{ color: "#64748b", fontSize: "13px" }}>No registrations yet.</p>
      ) : (
        <div style={{ display: "grid", gap: "10px" }}>
          {recent.map((r) => (
            <div key={r.id} style={miniRow}>
              <div>
                <strong style={{ fontSize: "13px" }}>{r.player_name}</strong>
                <span style={{ color: "#64748b", fontSize: "12px", marginLeft: "8px" }}>
                  {r.tournament_name}
                </span>
              </div>
              <StatusBadge status={r.status} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function RegistrationsTab({
  registrations,
  filter,
  onFilterChange,
  onUpdateStatus,
  updatingId,
  markingPrizeId,
  prizeNoteInput,
  savingPrizeId,
  onOpenPrizeForm,
  onClosePrizeForm,
  onPrizeNoteChange,
  onSubmitPrizePaid,
}: {
  registrations: Registration[];
  filter: "ALL" | "PENDING" | "CONFIRMED" | "CANCELLED";
  onFilterChange: (f: "ALL" | "PENDING" | "CONFIRMED" | "CANCELLED") => void;
  onUpdateStatus: (id: string, status: "CONFIRMED" | "CANCELLED") => void;
  updatingId: string | null;
  markingPrizeId: string | null;
  prizeNoteInput: string;
  savingPrizeId: string | null;
  onOpenPrizeForm: (registration: Registration) => void;
  onClosePrizeForm: () => void;
  onPrizeNoteChange: (value: string) => void;
  onSubmitPrizePaid: (id: string) => void;
}) {
  return (
    <div>
      <PageHeader
        title="Registrations"
        subtitle="Approve or reject tournament entries"
      />

      <div style={{ display: "flex", gap: "8px", marginBottom: "20px" }}>
                <button
          onClick={() => exportRegistrationsToCSV(registrations)}
          style={{
            padding: "8px 14px",
            borderRadius: "8px",
            border: "1px solid #1e293b",
            background: "#0b1220",
            color: "#a78bfa",
            fontSize: "11px",
            fontWeight: 700,
            cursor: "pointer",
          }}
        >
          📥 Export CSV
        </button>
        {(["ALL", "PENDING", "CONFIRMED", "CANCELLED"] as const).map((f) => (
          <button
            key={f}
            onClick={() => onFilterChange(f)}
            style={{
              padding: "8px 14px",
              borderRadius: "8px",
              border: filter === f ? "1px solid #7c3aed" : "1px solid #1e293b",
              background: filter === f ? "#312e81" : "#0b1220",
              color: filter === f ? "white" : "#94a3b8",
              fontSize: "11px",
              fontWeight: 700,
              cursor: "pointer",
            }}
          >
            {f}
          </button>
        ))}
      </div>

      {registrations.length === 0 ? (
        <p style={{ color: "#64748b", fontSize: "13px" }}>No registrations found.</p>
      ) : (
        <div style={{ display: "grid", gap: "14px" }}>
          {registrations.map((registration) => (
            <div key={registration.id} style={card}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  gap: "20px",
                  flexWrap: "wrap",
                }}
              >
                <div>
                  <h3 style={{ margin: "0 0 6px", fontSize: "16px" }}>
                    {registration.tournament_name}
                  </h3>
                  <p style={{ margin: "3px 0", color: "#a78bfa", fontSize: "12px" }}>
                    {registration.game_name || "Game"}
                  </p>
                  <p style={{ margin: "3px 0", fontSize: "13px" }}>
                    Player: {registration.player_name}
                  </p>
                  <p style={{ margin: "3px 0", color: "#94a3b8", fontSize: "12px" }}>
                    UID: {registration.player_uid || "N/A"} · Team:{" "}
                    {registration.team_name || "Solo"}
                  </p>
                  <p style={{ margin: "3px 0", color: "#94a3b8", fontSize: "12px" }}>
                    {registration.email}
                  </p>
                </div>

                <div style={{ minWidth: "160px", textAlign: "right" as const }}>
                  <div style={{ marginBottom: "10px" }}>
                    <StatusBadge status={registration.status} />
                  </div>
                  <span
                    style={{
                      display: "inline-block",
                      padding: "3px 8px",
                      borderRadius: "6px",
                      background: registration.payment_status === "PAID" ? "#14532d" : "#334155",
                      color: registration.payment_status === "PAID" ? "#86efac" : "#cbd5e1",
                      fontSize: "10px",
                      fontWeight: 800,
                    }}
                  >
                    {registration.payment_status}
                  </span>

                  {registration.status === "PENDING" && (
                    <div style={{ display: "flex", gap: "8px", marginTop: "12px" }}>
                      <button
                        disabled={updatingId === registration.id}
                        onClick={() => onUpdateStatus(registration.id, "CONFIRMED")}
                        style={confirmButton}
                      >
                        Confirm
                      </button>
                      <button
                        disabled={updatingId === registration.id}
                        onClick={() => onUpdateStatus(registration.id, "CANCELLED")}
                        style={cancelButton}
                      >
                        Cancel
                      </button>
                    </div>
                  )}

                  {registration.status === "CONFIRMED" && (
                    <div style={{ marginTop: "12px" }}>
                      {registration.prize_paid ? (
                        <span
                          style={{
                            display: "inline-block",
                            padding: "5px 10px",
                            borderRadius: "6px",
                            background: "#14532d",
                            color: "#86efac",
                            fontSize: "11px",
                            fontWeight: 800,
                          }}
                        >
                          ✅ Prize Paid
                          {registration.prize_note
                            ? ` — ${registration.prize_note}`
                            : ""}
                        </span>
                      ) : markingPrizeId === registration.id ? (
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "8px",
                            alignItems: "flex-end",
                          }}
                        >
                          <input
                            value={prizeNoteInput}
                            onChange={(e) => onPrizeNoteChange(e.target.value)}
                            placeholder="Transaction ID / note"
                            style={{
                              width: "180px",
                              padding: "8px 10px",
                              borderRadius: "7px",
                              border: "1px solid #1e293b",
                              background: "#0b1220",
                              color: "#f8fafc",
                              fontSize: "12px",
                            }}
                          />
                          <div style={{ display: "flex", gap: "8px" }}>
                            <button
                              disabled={savingPrizeId === registration.id}
                              onClick={() => onSubmitPrizePaid(registration.id)}
                              style={confirmButton}
                            >
                              {savingPrizeId === registration.id
                                ? "Saving..."
                                : "Save"}
                            </button>
                            <button
                              onClick={onClosePrizeForm}
                              style={editButton}
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      ) : (
                        <button
                          onClick={() => onOpenPrizeForm(registration)}
                          style={editButton}
                        >
                          💰 Mark Prize Paid
                        </button>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function TournamentsTab({
  tournaments,
  showForm,
  editingId,
  form,
  error,
  saving,
  uploadingImage,
  onAddNew,
  onEdit,
  onDelete,
  onCancel,
  onFieldChange,
  onImageUpload,
  onSave,
}: {
  tournaments: CmsTournament[];
  showForm: boolean;
  editingId: string | null;
  form: TournamentFormState;
  error: string | null;
  saving: boolean;
  uploadingImage: boolean;
  onAddNew: () => void;
  onEdit: (tournament: CmsTournament) => void;
  onDelete: (id: string) => void;
  onCancel: () => void;
  onFieldChange: (field: keyof TournamentFormState, value: string) => void;
  onImageUpload: (file: File) => void;
  onSave: () => void;
}) {
  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          gap: "15px",
          flexWrap: "wrap",
          marginBottom: "25px",
        }}
      >
        <PageHeader
          title="Tournaments"
          subtitle="Create, edit and manage tournaments shown on the site"
        />

        {!showForm && (
          <button onClick={onAddNew} style={confirmButton}>
            + Add Tournament
          </button>
        )}
      </div>

      {showForm && (
        <div style={{ ...card, marginBottom: "25px" }}>
          <h3 style={{ marginTop: 0, marginBottom: "18px" }}>
            {editingId ? `Edit: ${editingId}` : "New Tournament"}
          </h3>

          {error && (
            <p
              style={{
                color: "#f87171",
                fontSize: "13px",
                marginTop: 0,
                marginBottom: "16px",
              }}
            >
              {error}
            </p>
          )}

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
              gap: "14px",
              marginBottom: "14px",
            }}
          >
            <Field label="Tournament ID (slug)">
              <input
                value={form.id}
                disabled={Boolean(editingId)}
                onChange={(e) => onFieldChange("id", e.target.value)}
                placeholder="ff-solo-showdown-2"
                style={inputStyle}
              />
              {!editingId && (
                <span
                  style={{
                    display: "block",
                    marginTop: "-8px",
                    color: "#64748b",
                    fontSize: "11px",
                  }}
                >
                  Auto-generated from Title. Edit manually only if needed.
                </span>
              )}
            </Field>

            <Field label="Title">
              <input
                value={form.title}
                onChange={(e) => onFieldChange("title", e.target.value)}
                placeholder="FF Solo Showdown"
                style={inputStyle}
              />
            </Field>

            <Field label="Game">
              <select
                value={form.game}
                onChange={(e) => onFieldChange("game", e.target.value)}
                style={inputStyle}
              >
                <option value="Free Fire">Free Fire</option>
                <option value="BGMI">BGMI</option>
                <option value="Valorant">Valorant</option>
                <option value="Call of Duty">Call of Duty</option>
              </select>
            </Field>

            <Field label="Mode">
              <select
                value={form.mode}
                onChange={(e) => onFieldChange("mode", e.target.value)}
                style={inputStyle}
              >
                <option value="Solo">Solo</option>
                <option value="Duo">Duo</option>
                <option value="Squad">Squad</option>
              </select>
            </Field>

            <Field label="Team Size (optional)">
              <input
                type="number"
                min={1}
                max={10}
                value={form.team_size}
                onChange={(e) => onFieldChange("team_size", e.target.value)}
                placeholder="e.g. 1, 2, 4, 5"
                style={inputStyle}
              />
              <span
                style={{
                  display: "block",
                  marginTop: "-8px",
                  color: "#64748b",
                  fontSize: "11px",
                }}
              >
                Overrides Mode's default team size. Leave blank to use Mode
                default (Solo=1, Duo=2, Squad=4).
              </span>
            </Field>

            <Field label="Status">
              <select
                value={form.status}
                onChange={(e) => onFieldChange("status", e.target.value)}
                style={inputStyle}
              >
                <option value="UPCOMING">Upcoming</option>
                <option value="LIVE">Live</option>
              </select>
            </Field>

            <Field label="Start Date & Time">
              <input
                type="datetime-local"
                value={form.starts_at}
                onChange={(e) => onFieldChange("starts_at", e.target.value)}
                style={inputStyle}
              />
            </Field>

            <Field label="Entry Fee">
              <input
                value={form.entry}
                onChange={(e) => onFieldChange("entry", e.target.value)}
                placeholder="₹49"
                style={inputStyle}
              />
            </Field>

            <Field label="Prize Pool">
              <input
                value={form.prize}
                onChange={(e) => onFieldChange("prize", e.target.value)}
                placeholder="₹20,000"
                style={inputStyle}
              />
            </Field>

            <Field label="Slots">
              <input
                value={form.slots}
                onChange={(e) => onFieldChange("slots", e.target.value)}
                placeholder="38 / 48"
                style={inputStyle}
              />
            </Field>
          </div>

          <Field label="Banner Image">
            <div style={{ display: "flex", alignItems: "center", gap: "14px", flexWrap: "wrap" }}>
              {form.image_url && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={form.image_url}
                  alt="Tournament banner"
                  style={{
                    width: "90px",
                    height: "60px",
                    objectFit: "cover",
                    borderRadius: "8px",
                    border: "1px solid #1e293b",
                  }}
                />
              )}
              <input
                type="file"
                accept="image/*"
                disabled={uploadingImage}
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) onImageUpload(file);
                }}
                style={{ fontSize: "12px", color: "#94a3b8" }}
              />
              {uploadingImage && (
                <span style={{ fontSize: "12px", color: "#94a3b8" }}>Uploading...</span>
              )}
            </div>
          </Field>

          <Field label="Accent Color">
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <input
                type="color"
                value={form.accent_color  || "#7c3aed"}
                onChange={(e) => onFieldChange("accent_color", e.target.value)}
                style={{
                  width: "48px",
                  height: "38px",
                  padding: "2px",
                  borderRadius: "8px",
                  border: "1px solid #1e293b",
                  background: "#0b1220",
                  cursor: "pointer",
                }}
              />
              <input
                value={form.accent_color}
                onChange={(e) => onFieldChange("accent_color", e.target.value)}
                placeholder="#7c3aed"
                style={{ ...inputStyle, flex: 1 }}
              />
            </div>
            <span
              style={{
                display: "block",
                marginTop: "6px",
                color: "#64748b",
                fontSize: "11px",
              }}
            >
              Used for the tournament card border, badge and button color.
            </span>
          </Field>

          <Field label="Description">
            <textarea
              value={form.description}
              onChange={(e) => onFieldChange("description", e.target.value)}
              placeholder="Tournament ke baare mein short description..."
              rows={3}
              style={{ ...inputStyle, resize: "vertical" as const }}
            />
          </Field>

          <Field label="Rules (ek line mein ek rule)">
            <textarea
              value={form.rules}
              onChange={(e) => onFieldChange("rules", e.target.value)}
              placeholder={"Players must follow the tournament rules.\nAny unfair gameplay may result in disqualification."}
              rows={4}
              style={{ ...inputStyle, resize: "vertical" as const }}
            />
          </Field>

          <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
            <button disabled={saving} onClick={onSave} style={confirmButton}>
              {saving ? "Saving..." : editingId ? "Update Tournament" : "Create Tournament"}
            </button>
            <button onClick={onCancel} style={cancelButton}>
              Cancel
            </button>
          </div>
        </div>
      )}

      {tournaments.length === 0 ? (
        <p style={{ color: "#64748b", fontSize: "13px" }}>No tournaments yet.</p>
      ) : (
        <div style={{ display: "grid", gap: "12px" }}>
          {tournaments.map((tournament) => (
            <div
              key={tournament.id}
              style={{
                ...card,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap: "15px",
                flexWrap: "wrap",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                {tournament.image_url ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={tournament.image_url}
                    alt={tournament.title}
                    style={{
                      width: "64px",
                      height: "44px",
                      objectFit: "cover",
                      borderRadius: "8px",
                      border: "1px solid #1e293b",
                    }}
                  />
                ) : (
                  <div
                    style={{
                      width: "64px",
                      height: "44px",
                      borderRadius: "8px",
                      background: "#0b1220",
                      border: "1px solid #1e293b",
                    }}
                  />
                )}

                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
                    <span
                      style={{
                        width: "10px",
                        height: "10px",
                        borderRadius: "50%",
                        background: tournament.accent_color || "#7c3aed",
                        flexShrink: 0,
                      }}
                    />
                    <strong style={{ fontSize: "14px" }}>{tournament.title}</strong>
                    <span
                      style={{
                        color: tournament.status === "LIVE" ? "#4ade80" : "#facc15",
                        fontSize: "11px",
                        fontWeight: 800,
                      }}
                    >
                      ● {tournament.status}
                    </span>
                  </div>
                  <span style={{ color: "#64748b", fontSize: "12px" }}>
                    {tournament.game} · {tournament.mode} · {tournament.entry} entry · {tournament.prize} prize
                  </span>
                </div>
              </div>

              <div style={{ display: "flex", gap: "8px" }}>
                <button onClick={() => onEdit(tournament)} style={editButton}>
                  Edit
                </button>
                <button onClick={() => onDelete(tournament.id)} style={cancelButton}>
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label style={{ display: "block", marginBottom: "14px" }}>
      <span
        style={{
          display: "block",
          marginBottom: "6px",
          color: "#94a3b8",
          fontSize: "12px",
          fontWeight: 700,
        }}
      >
        {label}
      </span>
      {children}
    </label>
  );
}

function ReportsTab({
  reports,
  respondingId,
  responseText,
  updatingId,
  onOpenResponse,
  onCancelResponse,
  onResponseTextChange,
  onUpdateStatus,
}: {
  reports: Report[];
  respondingId: string | null;
  responseText: string;
  updatingId: string | null;
  onOpenResponse: (report: Report) => void;
  onCancelResponse: () => void;
  onResponseTextChange: (value: string) => void;
  onUpdateStatus: (
    id: string,
    status: Report["status"],
    adminResponse?: string
  ) => void;
}) {
  const statusColors: Record<Report["status"], { bg: string; fg: string }> = {
    OPEN: { bg: "#7f1d1d", fg: "#f87171" },
    IN_PROGRESS: { bg: "#713f12", fg: "#fbbf24" },
    RESOLVED: { bg: "#14532d", fg: "#4ade80" },
    DISMISSED: { bg: "#334155", fg: "#cbd5e1" },
  };

  return (
    <div>
      <PageHeader
        title="Reports"
        subtitle="User-submitted issues and disputes"
      />

      {reports.length === 0 ? (
        <p style={{ color: "#64748b", fontSize: "13px" }}>No reports yet.</p>
      ) : (
        <div style={{ display: "grid", gap: "14px" }}>
          {reports.map((report) => {
            const colors = statusColors[report.status] || statusColors.OPEN;
            const isResponding = respondingId === report.id;

            return (
              <div key={report.id} style={card}>
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
                    <span
                      style={{
                        display: "inline-block",
                        padding: "3px 8px",
                        borderRadius: "6px",
                        background: "#312e81",
                        color: "#c4b5fd",
                        fontSize: "10px",
                        fontWeight: 800,
                        marginRight: "8px",
                      }}
                    >
                      {report.category}
                    </span>
                    <span
                      style={{
                        padding: "3px 8px",
                        borderRadius: "999px",
                        background: colors.bg,
                        color: colors.fg,
                        fontSize: "10px",
                        fontWeight: 800,
                      }}
                    >
                      {report.status.replace("_", " ")}
                    </span>
                  </div>
                  <span style={{ color: "#64748b", fontSize: "11px" }}>
                    {new Date(report.created_at).toLocaleString()}
                  </span>
                </div>

                <p style={{ margin: "0 0 4px", fontSize: "13px" }}>
                  <strong>{report.user_email}</strong>
                  {report.tournament_name && (
                    <span style={{ color: "#94a3b8" }}>
                      {" "}
                      — {report.tournament_name}
                    </span>
                  )}
                </p>

                <p
                  style={{
                    color: "#cbd5e1",
                    fontSize: "13px",
                    lineHeight: 1.6,
                    margin: "10px 0",
                  }}
                >
                  {report.description}
                </p>

                {report.admin_response && !isResponding && (
                  <div
                    style={{
                      background: "#0b1220",
                      border: "1px solid #1e293b",
                      borderRadius: "8px",
                      padding: "10px 12px",
                      marginBottom: "10px",
                    }}
                  >
                    <span
                      style={{
                        color: "#a78bfa",
                        fontSize: "11px",
                        fontWeight: 800,
                      }}
                    >
                      Admin response:
                    </span>
                    <p
                      style={{
                        margin: "4px 0 0",
                        color: "#cbd5e1",
                        fontSize: "13px",
                      }}
                    >
                      {report.admin_response}
                    </p>
                  </div>
                )}

                {isResponding ? (
                  <div style={{ marginTop: "10px" }}>
                    <textarea
                      value={responseText}
                      onChange={(e) => onResponseTextChange(e.target.value)}
                      rows={3}
                      placeholder="Write a response to the user..."
                      style={{
                        width: "100%",
                        padding: "10px 12px",
                        borderRadius: "8px",
                        border: "1px solid #1e293b",
                        background: "#0b1220",
                        color: "#f8fafc",
                        fontSize: "13px",
                        boxSizing: "border-box",
                        marginBottom: "10px",
                        resize: "vertical",
                      }}
                    />
                    <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                      <button
                        disabled={updatingId === report.id}
                        onClick={() =>
                          onUpdateStatus(report.id, "IN_PROGRESS", responseText)
                        }
                        style={editButton}
                      >
                        Mark In Progress
                      </button>
                      <button
                        disabled={updatingId === report.id}
                        onClick={() =>
                          onUpdateStatus(report.id, "RESOLVED", responseText)
                        }
                        style={confirmButton}
                      >
                        Resolve
                      </button>
                      <button
                        disabled={updatingId === report.id}
                        onClick={() =>
                          onUpdateStatus(report.id, "DISMISSED", responseText)
                        }
                        style={cancelButton}
                      >
                        Dismiss
                      </button>
                      <button onClick={onCancelResponse} style={editButton}>
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <button
                    onClick={() => onOpenResponse(report)}
                    style={{ ...editButton, marginTop: "6px" }}
                  >
                    {report.status === "OPEN" || report.status === "IN_PROGRESS"
                      ? "Respond / Update"
                      : "Edit Response"}
                  </button>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

function MessagesTab({ messages }: { messages: ContactMessage[] }) {
  return (
    <div>
      <PageHeader title="Contact Messages" subtitle="Submissions from the Contact page" />

      {messages.length === 0 ? (
        <p style={{ color: "#64748b", fontSize: "13px" }}>No messages yet.</p>
      ) : (
        <div style={{ display: "grid", gap: "14px" }}>
          {messages.map((msg) => (
            <div key={msg.id} style={card}>
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
                  <span style={{ color: "#64748b", fontSize: "12px", marginLeft: "10px" }}>
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
                    fontWeight: 800,
                    marginBottom: "10px",
                  }}
                >
                  {msg.subject}
                </span>
              )}

              <p style={{ color: "#cbd5e1", fontSize: "13px", lineHeight: 1.6, margin: 0 }}>
                {msg.message}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function ActivityTab({ logs }: { logs: ActivityLog[] }) {
  return (
    <div>
      <PageHeader title="Activity Log" subtitle="Logins and tournament views" />

      {logs.length === 0 ? (
        <p style={{ color: "#64748b", fontSize: "13px" }}>No activity recorded yet.</p>
      ) : (
        <div style={card}>
          {logs.map((log, index) => (
            <div
              key={log.id}
              style={{
                padding: "14px 0",
                borderBottom: index === logs.length - 1 ? "none" : "1px solid #1e293b",
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
                    background: log.action === "LOGIN" ? "#14532d" : "#312e81",
                    color: log.action === "LOGIN" ? "#86efac" : "#c4b5fd",
                    fontSize: "10px",
                    fontWeight: 800,
                    marginRight: "10px",
                  }}
                >
                  {log.action === "LOGIN" ? "LOGIN" : "VIEWED"}
                </span>
                <strong style={{ fontSize: "13px" }}>{log.user_email || "Anonymous"}</strong>
                {log.details && (
                  <span style={{ color: "#64748b", fontSize: "12px", marginLeft: "8px" }}>
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
  );
}

function PageHeader({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div style={{ marginBottom: "25px" }}>
      <h1 style={{ fontSize: "28px", margin: "0 0 6px" }}>{title}</h1>
      <p style={{ color: "#94a3b8", fontSize: "13px", margin: 0 }}>{subtitle}</p>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const colorMap: Record<string, { bg: string; fg: string }> = {
    CONFIRMED: { bg: "#14532d", fg: "#4ade80" },
    CANCELLED: { bg: "#7f1d1d", fg: "#f87171" },
    PENDING: { bg: "#713f12", fg: "#fbbf24" },
  };
  const c = colorMap[status] || colorMap.PENDING;

  return (
    <span
      style={{
        padding: "4px 10px",
        borderRadius: "999px",
        background: c.bg,
        color: c.fg,
        fontSize: "11px",
        fontWeight: 800,
      }}
    >
      {status}
    </span>
  );
}

export default function AdminDashboardPage() {
  return (
    <AdminGuard>
      <AdminDashboardContent />
    </AdminGuard>
  );
}

const page = {
  minHeight: "100vh",
  background: "#020617",
  color: "#f8fafc",
};

const shell = {
  display: "flex",
  minHeight: "100vh",
  paddingTop: "72px",
};

const sidebar = {
  width: "230px",
  flexShrink: 0,
  padding: "24px 16px",
  borderRight: "1px solid #1e293b",
  display: "flex",
  flexDirection: "column" as const,
};

const sidebarTitle = {
  fontSize: "20px",
  margin: 0,
  fontWeight: 900,
};

const sidebarSubtitle = {
  color: "#64748b",
  fontSize: "11px",
  margin: "4px 0 0",
};

const refreshButton = {
  marginTop: "auto",
  padding: "10px",
  borderRadius: "8px",
  border: "1px solid #1e293b",
  background: "#0b1220",
  color: "#94a3b8",
  fontSize: "12px",
  fontWeight: 700,
  cursor: "pointer",
};

const content = {
  flex: 1,
  padding: "32px 40px",
  maxWidth: "1100px",
};

const statsGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
  gap: "14px",
  marginBottom: "35px",
};

const statCard = {
  padding: "18px",
  borderRadius: "14px",
  background: "#0b1220",
  border: "1px solid #1e293b",
};

const sectionTitle = {
  fontSize: "18px",
  margin: "0 0 15px",
};

const miniRow = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "12px 16px",
  borderRadius: "10px",
  background: "#0b1220",
  border: "1px solid #1e293b",
};

const card = {
  background: "#0f172a",
  border: "1px solid #1e293b",
  borderRadius: "14px",
  padding: "20px",
};

const confirmButton = {
  padding: "8px 14px",
  border: "none",
  borderRadius: "8px",
  background: "#16a34a",
  color: "white",
  fontWeight: 700,
  fontSize: "12px",
  cursor: "pointer",
};

const cancelButton = {
  padding: "8px 14px",
  border: "none",
  borderRadius: "8px",
  background: "#dc2626",
  color: "white",
  fontWeight: 700,
  fontSize: "12px",
  cursor: "pointer",
};

const editButton = {
  padding: "8px 14px",
  border: "1px solid #1e293b",
  borderRadius: "8px",
  background: "#0b1220",
  color: "#c4b5fd",
  fontWeight: 700,
  fontSize: "12px",
  cursor: "pointer",
};

const inputStyle = {
  width: "100%",
  padding: "10px 12px",
  borderRadius: "8px",
  border: "1px solid #1e293b",
  background: "#0b1220",
  color: "#f8fafc",
  fontSize: "13px",
  boxSizing: "border-box" as const,
};