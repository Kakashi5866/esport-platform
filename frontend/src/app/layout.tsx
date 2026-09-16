import type { Metadata } from "next";
import "./globals.css";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import RequireAuth from "@/components/auth/RequireAuth";
import { LanguageProvider } from "@/hooks/useLanguage";
import OnboardingModal from "@/components/onboarding/OnboardingModal";

export const metadata: Metadata = {
  title: "Esports Platform",
  description: "Professional Esports Tournament Platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <LanguageProvider>
          <RequireAuth>
            <Navbar />

            {children}

            <Footer />

            <OnboardingModal />
          </RequireAuth>
        </LanguageProvider>
      </body>
    </html>
  );
}