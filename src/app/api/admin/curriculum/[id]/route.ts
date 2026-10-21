import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/session";
import { parseModuleInput } from "@/lib/validation";
import { updateModule, deleteModule } from "@/lib/curriculum-admin";
import { apiError } from "@/lib/api-errors";

type Context = { params: Promise<{ id: string }> };

async function readId(context: Context) {
  const { id: raw } = await context.params;
  const id = Number(raw);
  return Number.isInteger(id) && id > 0 ? id : null;
}

export async function PUT(request: NextRequest, context: Context) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "You're not signed in." }, { status: 401 });
  }

  const id = await readId(context);
  if (id === null) {
    return NextResponse.json({ error: "Invalid module." }, { status: 400 });
  }

  try {
    const body = await request.json().catch(() => null);
    const parsed = parseModuleInput(body);
    if (!parsed.ok) {
      return NextResponse.json({ error: parsed.error }, { status: 400 });
    }

    const found = await updateModule(id, parsed.data);
    if (!found) {
      return NextResponse.json({ error: "That module no longer exists." }, { status: 404 });
    }
    return NextResponse.json({ success: true });
  } catch (error) {
    return apiError(error, "Update module");
  }
}

export async function DELETE(_request: NextRequest, context: Context) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "You're not signed in." }, { status: 401 });
  }

  const id = await readId(context);
  if (id === null) {
    return NextResponse.json({ error: "Invalid module." }, { status: 400 });
  }

  try {
    const outcome = await deleteModule(id);
    if (outcome === "not_found") {
      return NextResponse.json({ error: "That module no longer exists." }, { status: 404 });
    }
    return NextResponse.json({ success: true });
  } catch (error) {
    return apiError(error, "Delete module");
  }
}