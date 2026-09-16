import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us | Esports Platform",
  description:
    "Get in touch with the Esports Platform team for support, questions, or partnership inquiries.",
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}