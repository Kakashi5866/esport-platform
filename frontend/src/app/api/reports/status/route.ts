import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { requireAdmin } from "@/lib/adminAuth";

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const ALLOWED_STATUSES = ["OPEN", "IN_PROGRESS", "RESOLVED", "DISMISSED"];

export async function PATCH(request: Request) {
  const admin = await requireAdmin(request);

  if (!admin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id, status, admin_response } = await request.json();

    if (!id || !ALLOWED_STATUSES.includes(status)) {
      return NextResponse.json({ error: "Invalid request" }, { status: 400 });
    }

    const isResolved = status === "RESOLVED" || status === "DISMISSED";

    const { data, error } = await supabaseAdmin
      .from("reports")
      .update({
        status,
        admin_response: admin_response ?? null,
        resolved_at: isResolved ? new Date().toISOString() : null,
      })
      .eq("id", id)
      .select()
      .single();

    if (error) {
      console.error("Report status update error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, report: data });
  } catch (error) {
    console.error("Report status API error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}