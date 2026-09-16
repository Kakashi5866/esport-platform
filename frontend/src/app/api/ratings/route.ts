import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

async function getUserEmail(request: Request): Promise<string | null> {
  const authHeader = request.headers.get("authorization") || "";
  const token = authHeader.replace(/^Bearer\s+/i, "");

  if (!token) return null;

  const { data, error } = await supabaseAdmin.auth.getUser(token);

  if (error || !data.user?.email) return null;

  return data.user.email;
}

// USER submits or updates their rating for a tournament (1-5 stars).
export async function POST(request: Request) {
  const email = await getUserEmail(request);

  if (!email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { tournament_id, rating } = await request.json();

  if (!tournament_id || typeof rating !== "number" || rating < 1 || rating > 5) {
    return NextResponse.json(
      { error: "A tournament_id and a rating between 1-5 are required." },
      { status: 400 }
    );
  }

  const { data, error } = await supabaseAdmin
    .from("tournament_ratings")
    .upsert(
      {
        tournament_id,
        user_email: email,
        rating,
      },
      { onConflict: "tournament_id,user_email" }
    )
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ rating: data });
}

// Fetch the average rating + count for a tournament, and the requesting
// user's own rating if they're logged in and have one.
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const tournamentId = searchParams.get("tournament_id");

  if (!tournamentId) {
    return NextResponse.json(
      { error: "tournament_id query param is required" },
      { status: 400 }
    );
  }

  const { data: ratings, error } = await supabaseAdmin
    .from("tournament_ratings")
    .select("rating, user_email")
    .eq("tournament_id", tournamentId);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const count = ratings?.length ?? 0;
  const average =
    count > 0
      ? Math.round(
          (ratings!.reduce((sum, r) => sum + r.rating, 0) / count) * 10
        ) / 10
      : 0;

  const email = await getUserEmail(request);
  const myRating = email
    ? ratings?.find((r) => r.user_email === email)?.rating ?? null
    : null;

  return NextResponse.json({ average, count, myRating });
}