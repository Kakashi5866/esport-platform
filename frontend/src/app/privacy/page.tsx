import Link from "next/link";

export default function PrivacyPage() {
  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#020617",
        color: "white",
        padding: "100px 24px 80px",
      }}
    >
      <div style={{ maxWidth: "760px", margin: "0 auto" }}>
        <Link
          href="/"
          style={{
            color: "#64748b",
            textDecoration: "none",
            fontSize: "13px",
            fontWeight: "700",
          }}
        >
          ← Back to Home
        </Link>

        <h1 style={{ fontSize: "38px", margin: "20px 0 10px" }}>
          Privacy Policy
        </h1>

        <p style={{ color: "#64748b", fontSize: "13px", marginBottom: "35px" }}>
          Last updated: August 2026
        </p>

        <Section title="1. Information We Collect">
          We collect information you provide directly, such as your email
          address, player name/UID, team name, and tournament registration
          details when you create an account or register for a tournament.
        </Section>

        <Section title="2. How We Use Your Information">
          Your information is used to manage your account, process
          tournament registrations, communicate important updates (such as
          Room ID and match timing), and improve the platform.
        </Section>

        <Section title="3. Data Storage">
          Your data is stored securely using Supabase's infrastructure.
          Passwords are never stored in plain text and are handled
          securely by our authentication provider.
        </Section>

        <Section title="4. Sharing of Information">
          We do not sell your personal information to third parties. Your
          registration details are only visible to platform administrators
          for the purpose of managing tournaments.
        </Section>

        <Section title="5. Cookies & Sessions">
          We use browser storage to keep you logged in between visits.
          This is essential for the platform to function and is not used
          for third-party advertising.
        </Section>

        <Section title="6. Your Rights">
          You may request access to, correction of, or deletion of your
          personal data by contacting us through the Contact page.
        </Section>

        <Section title="7. Changes to This Policy">
          This privacy policy may be updated periodically. Continued use
          of the platform after changes constitutes acceptance of the
          revised policy.
        </Section>

        <Section title="8. Contact">
          For any privacy-related questions, please reach out via our
          Contact page.
        </Section>
      </div>
    </main>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div style={{ marginBottom: "28px" }}>
      <h2 style={{ fontSize: "18px", marginBottom: "8px", color: "#e2e8f0" }}>
        {title}
      </h2>
      <p style={{ color: "#94a3b8", lineHeight: 1.8, fontSize: "14px", margin: 0 }}>
        {children}
      </p>
    </div>
  );
}