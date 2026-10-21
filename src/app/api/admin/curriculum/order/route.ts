import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/session";
import { parseOrder } from "@/lib/validation";
import { reorderModules } from "@/lib/curriculum-admin";
import { apiError } from "@/lib/api-errors";

// PUT, because we replace the whole ordering with the one we're sent
export async function PUT(request: NextRequest) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "You're not signed in." }, { status: 401 });
  }

  try {
    const body = await request.json().catch(() => null);
    const parsed = parseOrder(body);
    if (!parsed.ok) {
      return NextResponse.json({ error: parsed.error }, { status: 400 });
    }

    const outcome = await reorderModules(parsed.ids);
    if (outcome === "mismatch") {
      // 409 Conflict: the request is valid, but the data changed underneath it
      return NextResponse.json(
        { error: "The list was changed in another window. Refresh the page and try again." },
        { status: 409 }
      );
    }
    return NextResponse.json({ success: true });
  } catch (error) {
    return apiError(error, "Reorder modules");
  }
}