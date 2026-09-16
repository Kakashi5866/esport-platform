import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { requireAdmin } from "@/lib/adminAuth";

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(request: Request) {
  const admin = await requireAdmin(request);
  if (!admin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const formData = await request.formData();
  const file = formData.get("file") as File | null;
  const tournamentId = formData.get("tournamentId") as string | null;

  if (!file || !tournamentId) {
    return NextResponse.json(
      { error: "file and tournamentId are required" },
      { status: 400 }
    );
  }

  const fileExt = file.name.split(".").pop();
  const fileName = `${tournamentId}-${Date.now()}.${fileExt}`;
  const arrayBuffer = await file.arrayBuffer();

  const { error: uploadError } = await supabaseAdmin.storage
    .from("tournament-images")
    .upload(fileName, arrayBuffer, {
      contentType: file.type,
      upsert: true,
    });

  if (uploadError) {
    return NextResponse.json({ error: uploadError.message }, { status: 500 });
  }

  const { data: publicUrlData } = supabaseAdmin.storage
    .from("tournament-images")
    .getPublicUrl(fileName);

  return NextResponse.json({ url: publicUrlData.publicUrl });
}