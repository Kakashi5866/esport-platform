import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { requireAdmin } from "@/lib/adminAuth";

export async function PATCH(request: Request) {
  const admin = await requireAdmin(request);

  if (!admin) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  try {
    const { id, prize_note } = await request.json();

    if (!id) {
      return NextResponse.json(
        { error: "Invalid request" },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from("tournament_registrations")
      .update({
        prize_paid: true,
        prize_note: prize_note || null,
      })
      .eq("id", id)
      .select("id, prize_paid, prize_note")
      .single();

    if (error) {
      console.error("Prize update error:", error);

      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      registration: data,
    });
  } catch (error) {
    console.error("Prize API error:", error);

    return NextResponse.json(
      { error: "Server error" },
      { status: 500 }
    );
  }
}