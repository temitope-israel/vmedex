import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/session";
import { parseModuleInput } from "@/lib/validation";
import { createModule } from "@/lib/curriculum-admin";
import { apiError } from "@/lib/api-errors";
import { MAX_MODULES } from "@/lib/constants";

export async function POST(request: NextRequest) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "You're not signed in." }, { status: 401 });
  }

  try {
    const body = await request.json().catch(() => null);
    const parsed = parseModuleInput(body);
    if (!parsed.ok) {
      return NextResponse.json({ error: parsed.error }, { status: 400 });
    }

    const outcome = await createModule(parsed.data);
    if (outcome === "limit_reached") {
      return NextResponse.json(
        {
          error: `You can have at most ${MAX_MODULES} modules. Delete one before adding another.`,
        },
        { status: 409 }
      );
    }
    return NextResponse.json({ success: true }, { status: 201 });
  } catch (error) {
    return apiError(error, "Create module");
  }
}