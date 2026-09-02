import { NextRequest, NextResponse } from "next/server";
import { uploadFile } from "@/lib/uploadFile";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;
    const label = formData.get("label") as string | null;

    if (!file || !label) {
      return NextResponse.json(
        { error: "Missing file or label." },
        { status: 400 }
      );
    }

    // Basic server-side validation — mirrors what we enforced via
    // Supabase's bucket restrictions before (size, allowed types)
    const allowedTypes = ["image/jpeg", "image/png", "image/webp", "application/pdf"];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { error: "Unsupported file type." },
        { status: 400 }
      );
    }
    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json(
        { error: "File exceeds the 5MB limit." },
        { status: 400 }
      );
    }

    // Convert the browser File object into a Buffer our upload function can use
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const fileExt = file.name.split(".").pop();
    const filename = `${Date.now()}-${label}.${fileExt}`;

    await uploadFile(buffer, filename);

    return NextResponse.json({ success: true, filename });
  } catch (error) {
    console.error("File upload error:", error);
    return NextResponse.json(
      { error: "Failed to upload file. Please try again." },
      { status: 500 }
    );
  }
}