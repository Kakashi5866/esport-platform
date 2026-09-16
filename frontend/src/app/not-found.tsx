import Link from "next/link";

export default function NotFound() {
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
        textAlign: "center",
      }}
    >
      <div
        style={{
          maxWidth: "600px",
          width: "100%",
          padding: "45px 30px",
          background: "#0f172a",
          border: "1px solid #1e293b",
          borderRadius: "18px",
        }}
      >
        <div
          style={{
            fontSize: "64px",
            fontWeight: "900",
            color: "#7c3aed",
            marginBottom: "10px",
          }}
        >
          404
        </div>

        <h1
          style={{
            fontSize: "30px",
            margin: "0 0 15px",
          }}
        >
          Page Not Found
        </h1>

        <p
          style={{
            color: "#94a3b8",
            lineHeight: 1.6,
            marginBottom: "28px",
          }}
        >
          The page or tournament you're looking for doesn't exist.
        </p>

        <Link
          href="/"
          style={{
            display: "inline-block",
            padding: "13px 26px",
            borderRadius: "9px",
            background: "#7c3aed",
            color: "white",
            textDecoration: "none",
            fontWeight: "700",
          }}
        >
          ← Back To Home
        </Link>
      </div>
    </main>
  );
}