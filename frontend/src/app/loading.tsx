export default function Loading() {
  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#020617",
        color: "white",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "40px 20px",
      }}
    >
      <div
        style={{
          textAlign: "center",
        }}
      >
        <div
          style={{
            width: "50px",
            height: "50px",
            border: "4px solid #1e293b",
            borderTop: "4px solid #7c3aed",
            borderRadius: "50%",
            margin: "0 auto 20px",
            animation: "spin 0.8s linear infinite",
          }}
        />

        <h2
          style={{
            margin: "0 0 8px",
            fontSize: "24px",
          }}
        >
          Loading...
        </h2>

        <p
          style={{
            margin: 0,
            color: "#94a3b8",
          }}
        >
          Please wait a moment.
        </p>
      </div>

      <style>{`
        @keyframes spin {
          from {
            transform: rotate(0deg);
          }

          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </main>
  );
}