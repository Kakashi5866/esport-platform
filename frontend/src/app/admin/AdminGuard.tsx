"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";

const ADMIN_EMAILS = [
  "mt514714@gmail.com",
];

export default function AdminGuard({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, loading } = useAuth();
  const router = useRouter();

  const userEmail = user?.email?.trim().toLowerCase() ?? "";
  const isAdmin = ADMIN_EMAILS.some(
    (email) => email.trim().toLowerCase() === userEmail
  );

  useEffect(() => {
    if (loading) return;

    console.log("AdminGuard check:", {
      loggedInEmail: userEmail,
      allowedEmails: ADMIN_EMAILS,
      isAdmin,
    });

    // if (!user) {
    //   router.push("/auth/login");
    //   return;
    // }

    // if (!isAdmin) {
    //   router.push("/");
    // }
  }, [loading, user, isAdmin, router, userEmail]);

  if (loading || !user || !isAdmin) {
    return (
      <main
        style={{
          minHeight: "100vh",
          background: "#020617",
          color: "#94a3b8",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        Checking access...
      </main>
    );
  }

  return <>{children}</>;
}