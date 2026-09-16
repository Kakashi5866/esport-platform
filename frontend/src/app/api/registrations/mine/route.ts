import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

// Returns registrations belonging ONLY to the requesting (authenticated) user.
export async function GET(request: Request) {
  const authHeader = request.headers.get("authorization") || "";
  const token = authHeader.replace(/^Bearer\s+/i, "");

  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { data: userData, error: userError } =
    await supabaseAdmin.auth.getUser(token);

  if (userError || !userData.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { data: registrations, error } = await supabaseAdmin
    .from("tournament_registrations")
    .select(
      "id, tournament_id, tournament_name, game_name, player_name, player_uid, team_name, entry_fee, status, payment_status, payment_id, paid_at, created_at"
    )
    .eq("email", userData.user.email)
    .order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const tournamentIds = Array.from(
    new Set(
      (registrations ?? [])
        .map((r) => r.tournament_id)
        .filter((id): id is string => Boolean(id))
    )
  );

  let startsAtMap: Record<string, string | null> = {};

  if (tournamentIds.length > 0) {
    const { data: tournaments } = await supabaseAdmin
      .from("cms_tournaments")
      .select("id, starts_at")
      .in("id", tournamentIds);

    startsAtMap = Object.fromEntries(
      (tournaments ?? []).map((t) => [t.id, t.starts_at])
    );
  }

  const enriched = (registrations ?? []).map((registration) => ({
    ...registration,
    starts_at: registration.tournament_id
      ? startsAtMap[registration.tournament_id] ?? null
      : null,
  }));

  return NextResponse.json({ registrations: enriched });
}