import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tournaments | Esports Platform",
  description:
    "Browse live and upcoming esports tournaments for Free Fire, BGMI, Valorant and Call of Duty. Filter by game, mode and entry fee.",
};

export default function TournamentsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}