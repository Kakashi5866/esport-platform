import Link from "next/link";

export default function TermsPage() {
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
          Terms & Conditions
        </h1>

        <p style={{ color: "#64748b", fontSize: "13px", marginBottom: "35px" }}>
          Last updated: August 2026
        </p>

        <Section title="1. Acceptance of Terms">
          By creating an account or registering for a tournament on this
          platform, you agree to be bound by these Terms & Conditions. If
          you do not agree, please do not use this platform.
        </Section>

        <Section title="2. Eligibility">
          Users must provide accurate registration and player details. The
          platform reserves the right to disqualify any participant found
          providing false information.
        </Section>

        <Section title="3. Tournament Entry & Fees">
          Entry fees, where applicable, must be paid in full to confirm a
          tournament slot. Entry fees are used to fund the prize pool and
          platform operations.
        </Section>

        <Section title="4. Fair Play">
          Cheating, use of unauthorized software, smurfing, or any form of
          unfair play is strictly prohibited and may result in immediate
          disqualification and account suspension, without refund.
        </Section>

        <Section title="5. Prize Distribution">
          Prizes will be distributed to verified winners after match
          results are confirmed by the tournament administrators. The
          platform is not responsible for delays caused by incorrect
          participant information.
        </Section>

        <Section title="6. Account Suspension">
          The platform reserves the right to suspend or terminate any
          account found violating these terms, engaging in abusive
          behavior, or attempting to exploit the platform.
        </Section>

        <Section title="7. Changes to Terms">
          These terms may be updated from time to time. Continued use of
          the platform after changes constitutes acceptance of the revised
          terms.
        </Section>

        <Section title="8. Contact">
          For any questions regarding these terms, please reach out via
          our Contact page.
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