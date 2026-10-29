import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/session";
import { deleteUser } from "@/lib/users-admin";
import { readId, type IdContext } from "@/lib/route-params";
import { apiError } from "@/lib/api-errors";

export async function DELETE(_request: NextRequest, context: IdContext) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "You're not signed in." }, { status: 401 });
  }
  if (session.role !== "admin") {
    return NextResponse.json({ error: "Only admins can manage accounts." }, { status: 403 });
  }

  const id = await readId(context);
  if (id === null) {
    return NextResponse.json({ error: "Invalid account." }, { status: 400 });
  }
  if (id === session.adminId) {
    return NextResponse.json(
      { error: "You can't remove your own account. Ask another admin to do it." },
      { status: 400 }
    );
  }

  try {
    const outcome = await deleteUser(id);
    if (outcome === "not_found") {
      return NextResponse.json({ error: "That account no longer exists." }, { status: 404 });
    }
    if (outcome === "last_admin") {
      return NextResponse.json(
        { error: "That is the last admin account, so it can't be removed." },
        { status: 409 }
      );
    }
    return NextResponse.json({ success: true });
  } catch (error) {
    return apiError(error, "Remove account");
  }
}