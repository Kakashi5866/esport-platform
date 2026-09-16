import Link from "next/link";

export default function Footer() {
  return (
    <footer
      style={{
        background: "#020617",
        color: "white",
        borderTop: "1px solid #1e293b",
        padding: "50px 40px 25px",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          display: "flex",
          justifyContent: "space-between",
          gap: "40px",
          flexWrap: "wrap",
        }}
      >
        <div>
          <h2 style={{ marginBottom: "12px" }}>Esports Platform</h2>
          <p style={{ color: "#94a3b8", maxWidth: "350px" }}>
            Compete in tournaments, prove your skills and become the next
            esports champion.
          </p>
        </div>

        <div>
          <h3 style={{ marginBottom: "15px" }}>Quick Links</h3>
          <FooterLink href="/tournaments">Tournaments</FooterLink>
          <FooterLink href="/leaderboard">Leaderboard</FooterLink>
          <FooterLink href="/about">About Us</FooterLink>
        </div>

        <div>
          <h3 style={{ marginBottom: "15px" }}>Support</h3>
          <FooterLink href="/contact">Customer Care</FooterLink>
          <FooterLink href="/terms">Terms & Conditions</FooterLink>
          <FooterLink href="/privacy">Privacy Policy</FooterLink>
        </div>
      </div>

      <div
        style={{
          maxWidth: "1200px",
          margin: "35px auto 0",
          paddingTop: "20px",
          borderTop: "1px solid #1e293b",
          textAlign: "center",
          color: "#64748b",
        }}
      >
        © 2026 Esports Platform. All rights reserved.
      </div>
    </footer>
  );
}

function FooterLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      style={{
        display: "block",
        color: "#94a3b8",
        textDecoration: "none",
        margin: "8px 0",
        fontSize: "14px",
      }}
    >
      {children}
    </Link>
  );
}