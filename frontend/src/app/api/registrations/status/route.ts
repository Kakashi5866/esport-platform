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
    const { id, status } = await request.json();

    if (
      !id ||
      !["PENDING", "CONFIRMED", "CANCELLED"].includes(status)
    ) {
      return NextResponse.json(
        { error: "Invalid request" },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from("tournament_registrations")
      .update({ status })
      .eq("id", id)
      .select("id, status")
      .single();

    if (error) {
      console.error("Status update error:", error);

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
    console.error("Status API error:", error);

    return NextResponse.json(
      { error: "Server error" },
      { status: 500 }
    );
  }
}