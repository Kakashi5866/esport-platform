"use client";

import { useEffect } from "react";
import { supabase } from "@/lib/supabase";

export default function TrackTournamentView({
  tournamentTitle,
}: {
  tournamentTitle: string;
}) {
  useEffect(() => {
    async function logView() {
      const { data } = await supabase.auth.getSession();
      const token = data.session?.access_token;

      fetch("/api/activity/log", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({
          action: "VIEW_TOURNAMENT",
          details: tournamentTitle,
        }),
      }).catch(() => {});
    }

    logView();
  }, [tournamentTitle]);

  return null;
}