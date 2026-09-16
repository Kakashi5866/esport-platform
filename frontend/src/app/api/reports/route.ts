import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { requireAdmin } from "@/lib/adminAuth";

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const ALLOWED_CATEGORIES = [
  "Payment Issue",
  "Player Behavior / Cheating",
  "Technical Issue",
  "Registration Issue",
  "Other",
];

// USER submits a new report. Requires a logged-in user (Bearer token).
export async function POST(request: Request) {
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

  const body = await request.json();
  const { tournament_id, tournament_name, category, description } = body;

  if (!category || !ALLOWED_CATEGORIES.includes(category)) {
    return NextResponse.json(
      { error: "Please select a valid category." },
      { status: 400 }
    );
  }

  if (!description || !description.trim()) {
    return NextResponse.json(
      { error: "Please describe the issue." },
      { status: 400 }
    );
  }

  const { data: report, error } = await supabaseAdmin
    .from("reports")
    .insert({
      user_email: userData.user.email,
      tournament_id: tournament_id || null,
      tournament_name: tournament_name || null,
      category,
      description: description.trim(),
    })
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ report });
}

// ADMIN lists all reports.
export async function GET(request: Request) {
  const admin = await requireAdmin(request);

  if (!admin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { data: reports, error } = await supabaseAdmin
    .from("reports")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ reports: reports ?? [] });
}