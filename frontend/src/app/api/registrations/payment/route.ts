import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function PATCH(request: Request) {
  try {
    const { id, amount } = await request.json();

    if (!id) {
      return NextResponse.json(
        { error: "Registration ID is required" },
        { status: 400 }
      );
    }

    if (typeof amount !== "number" || amount <= 0) {
      return NextResponse.json(
        { error: "Invalid payment amount" },
        { status: 400 }
      );
    }

    const paymentId = `DEMO_${Date.now()}`;

    const { data, error } = await supabaseAdmin
      .from("tournament_registrations")
      .update({
        payment_status: "PAID",
        amount_paid: String(amount),
        payment_id: paymentId,
        paid_at: new Date().toISOString(),
      })
      .eq("id", id)
      .select(
        "id, tournament_name, entry_fee, amount_paid, payment_status, payment_id, paid_at"
      )
      .single();

    if (error) {
      console.error("PAYMENT UPDATE ERROR:", error);

      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      amount,
      payment: data,
    });
  } catch (error) {
    console.error("PAYMENT API ERROR:", error);

    return NextResponse.json(
      { error: "Payment failed" },
      { status: 500 }
    );
  }
}