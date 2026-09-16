"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";

const PUBLIC_PATHS = [
  "/auth/login",
  "/auth/register",
  "/auth/forgot-password",
  "/auth/reset-password",
];

export default function RequireAuth({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  const isPublicPath = PUBLIC_PATHS.includes(pathname);

  useEffect(() => {
    if (loading) return;

    if (!user && !isPublicPath) {
      router.push("/auth/login");
    }
  }, [loading, user, isPublicPath, router]);

  if (loading) {
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
        Loading...
      </main>
    );
  }

  if (!user && !isPublicPath) {
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
        Redirecting to login...
      </main>
    );
  }

  return <>{children}</>;
}