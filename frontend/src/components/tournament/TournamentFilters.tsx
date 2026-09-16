type TournamentFiltersProps = {
  activeGame: string;
  activeStatus: string;
  activeMode: string;
  onGameChange: (game: string) => void;
  onStatusChange: (status: string) => void;
  onModeChange: (mode: string) => void;
};

export default function TournamentFilters({
  activeGame,
  activeStatus,
  activeMode,
  onGameChange,
  onStatusChange,
  onModeChange,
}: TournamentFiltersProps) {
  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "12px",
        marginBottom: "35px",
        padding: "16px",
        borderRadius: "14px",
        background: "#0b1220",
        border: "1px solid #1e293b",
      }}
    >
      <select
        value={activeGame}
        onChange={(event) => onGameChange(event.target.value)}
        style={selectStyle}
      >
        <option value="ALL">All Games</option>
        <option value="Free Fire">Free Fire</option>
        <option value="BGMI">BGMI</option>
        <option value="Valorant">Valorant</option>
        <option value="Call of Duty">Call of Duty</option>
      </select>

      <select
        value={activeMode}
        onChange={(event) => onModeChange(event.target.value)}
        style={selectStyle}
      >
        <option value="ALL">All Modes</option>
        <option value="Solo">Solo</option>
        <option value="Duo">Duo</option>
        <option value="Squad">Squad</option>
      </select>

      <select
        value={activeStatus}
        onChange={(event) => onStatusChange(event.target.value)}
        style={selectStyle}
      >
        <option value="ALL">All Status</option>
        <option value="LIVE">Live</option>
        <option value="UPCOMING">Upcoming</option>
      </select>
    </div>
  );
}

const selectStyle = {
  minWidth: "170px",
  padding: "11px 13px",
  background: "#111c33",
  color: "white",
  border: "1px solid #334155",
  borderRadius: "8px",
  outline: "none",
  fontSize: "11px",
  fontWeight: "700",
  cursor: "pointer",
};