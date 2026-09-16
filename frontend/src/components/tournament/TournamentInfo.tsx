type TournamentInfoProps = {
  entry: string;
  prize: string;
  slots: string;
  mode: string;
};

export default function TournamentInfo({
  entry,
  prize,
  slots,
  mode,
}: TournamentInfoProps) {
  const info = [
    ["Entry Fee", entry],
    ["Prize Pool", prize],
    ["Slots", slots],
    ["Mode", mode],
  ];

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
        gap: "18px",
      }}
    >
      {info.map(([label, value]) => (
        <div
          key={label}
          style={{
            background: "#111c33",
            border: "1px solid #263450",
            borderRadius: "14px",
            padding: "24px",
          }}
        >
          <p
            style={{
              color: "#64748b",
              margin: "0 0 8px",
              fontSize: "14px",
            }}
          >
            {label}
          </p>

          <strong
            style={{
              fontSize: "21px",
              color: label === "Prize Pool" ? "#a78bfa" : "white",
            }}
          >
            {value}
          </strong>
        </div>
      ))}
    </div>
  );
}