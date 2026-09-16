import { createClient } from "@supabase/supabase-js";

const ADMIN_EMAILS = ["mt514714@gmail.com","mayurt072@gmail.com","thakormayur773@gmail.com"];

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

/**
 * Verifies the request's Authorization: Bearer <token> against Supabase
 * and confirms the user's email is in ADMIN_EMAILS.
 * Returns the admin user on success, or null if unauthorized.
 */
export async function requireAdmin(request: Request) {
  const authHeader = request.headers.get("authorization") || "";
  const token = authHeader.replace(/^Bearer\s+/i, "");

  if (!token) return null;

  const { data, error } = await supabaseAdmin.auth.getUser(token);

  if (error || !data.user?.email) return null;

  const email = data.user.email.trim().toLowerCase();
  const isAdmin = ADMIN_EMAILS.some(
    (adminEmail) => adminEmail.trim().toLowerCase() === email
  );

  return isAdmin ? data.user : null;
}