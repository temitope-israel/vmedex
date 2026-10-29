import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/session";
import { parseAccountInput } from "@/lib/validation";
import { createUser } from "@/lib/users-admin";
import { apiError } from "@/lib/api-errors";

export async function POST(request: NextRequest) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "You're not signed in." }, { status: 401 });
  }
  // 403 Forbidden: signed in, but not allowed to do this
  if (session.role !== "admin") {
    return NextResponse.json({ error: "Only admins can manage accounts." }, { status: 403 });
  }

  try {
    const body = await request.json().catch(() => null);
    const parsed = parseAccountInput(body);
    if (!parsed.ok) {
      return NextResponse.json({ error: parsed.error }, { status: 400 });
    }

    const outcome = await createUser(parsed.data);
    if (outcome === "duplicate") {
      return NextResponse.json(
        { error: "An account with that email already exists." },
        { status: 409 }
      );
    }
    return NextResponse.json({ success: true }, { status: 201 });
  } catch (error) {
    return apiError(error, "Create account");
  }
}