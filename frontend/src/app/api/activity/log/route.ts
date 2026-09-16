import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(request: Request) {
  try {
    const { action, details } = await request.json();

    if (!action) {
      return NextResponse.json(
        { error: "action is required" },
        { status: 400 }
      );
    }

    let userEmail: string | null = null;

    const authHeader = request.headers.get("authorization") || "";
    const token = authHeader.replace(/^Bearer\s+/i, "");

    if (token) {
      const { data } = await supabaseAdmin.auth.getUser(token);
      userEmail = data.user?.email ?? null;
    }

    const { error: insertError } = await supabaseAdmin
      .from("activity_logs")
      .insert({
        user_email: userEmail,
        action,
        details: details ?? null,
      });

    if (insertError) {
      console.error("Activity insert failed:", insertError);
      return NextResponse.json(
        { error: insertError.message },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Activity log error:", error);
    return NextResponse.json(
      { error: "Failed to log activity" },
      { status: 500 }
    );
  }
}