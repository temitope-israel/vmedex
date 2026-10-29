import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/session";
import { setCohortFlyer, removeCohortFlyer } from "@/lib/training-admin";
import { detectImageType } from "@/lib/image-type";
import { readId, type IdContext } from "@/lib/route-params";
import { MAX_FLYER_BYTES } from "@/lib/constants";
import { apiError } from "@/lib/api-errors";

export async function POST(request: NextRequest, context: IdContext) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "You're not signed in." }, { status: 401 });
  }

  const id = await readId(context);
  if (id === null) {
    return NextResponse.json({ error: "Invalid cohort." }, { status: 400 });
  }

  try {
    // Files arrive as multipart form data, not JSON
    const form = await request.formData().catch(() => null);
    const file = form?.get("file");
    if (!(file instanceof File)) {
      return NextResponse.json({ error: "Choose an image to upload." }, { status: 400 });
    }
    if (file.size > MAX_FLYER_BYTES) {
      return NextResponse.json(
        { error: `That image is too large. The limit is ${MAX_FLYER_BYTES / 1024 / 1024} MB.` },
        { status: 400 }
      );
    }

    const buffer = Buffer.from(await file.arrayBuffer());

    // Trust the bytes, never the browser's claim about the type
    const mime = detectImageType(buffer);
    if (!mime) {
      return NextResponse.json(
        { error: "That file isn't a JPG, PNG or WebP image." },
        { status: 400 }
      );
    }

    const token = await setCohortFlyer(id, buffer, mime);
    if (token === null) {
      return NextResponse.json({ error: "That cohort no longer exists." }, { status: 404 });
    }
    return NextResponse.json({ success: true, token });
  } catch (error) {
    const code = (error as { code?: string })?.code;
    if (code === "ER_NET_PACKET_TOO_LARGE") {
      // 413 Payload Too Large: the database server refused something this big
      return NextResponse.json(
        { error: "The server couldn't accept an image that large. Try a smaller file." },
        { status: 413 }
      );
    }
    return apiError(error, "Upload flyer");
  }
}

export async function DELETE(_request: NextRequest, context: IdContext) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "You're not signed in." }, { status: 401 });
  }

  const id = await readId(context);
  if (id === null) {
    return NextResponse.json({ error: "Invalid cohort." }, { status: 400 });
  }

  try {
    const found = await removeCohortFlyer(id);
    if (!found) {
      return NextResponse.json({ error: "That cohort no longer exists." }, { status: 404 });
    }
    return NextResponse.json({ success: true });
  } catch (error) {
    return apiError(error, "Remove flyer");
  }
}