import { NextRequest, NextResponse } from "next/server";
import { sql } from "@vercel/postgres";
import { requireAuth } from "@/lib/auth";
import { uploadFile, deleteFile } from "@/lib/blob";

// POST /api/cms/media/[id]/replace - Replace image file
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = await requireAuth();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;

    // Get existing media record
    const existingResult = await sql`
      SELECT * FROM media WHERE id = ${id}
    `;

    if (existingResult.rows.length === 0) {
      return NextResponse.json({ error: "Media not found" }, { status: 404 });
    }

    const existingMedia = existingResult.rows[0];

    // Parse the new file from form data
    const formData = await request.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    // Validate file type
    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/gif",
      "image/webp",
      "image/svg+xml",
    ];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { error: "Invalid file type. Only images are allowed." },
        { status: 400 }
      );
    }

    // Validate file size (max 5MB)
    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
      return NextResponse.json(
        { error: "File too large. Maximum size is 5MB." },
        { status: 400 }
      );
    }

    // Upload new file to Vercel Blob (same folder as original)
    const { url: newUrl, filename: newFilename } = await uploadFile(
      file,
      existingMedia.folder
    );

    // Delete old file from Vercel Blob
    try {
      await deleteFile(existingMedia.url);
    } catch (blobError) {
      console.error("Failed to delete old file from blob:", blobError);
      // Continue anyway - the new file is already uploaded
    }

    // Update database with new file info (keep same ID, alt_text, folder)
    const result = await sql`
      UPDATE media
      SET
        filename = ${newFilename},
        original_name = ${file.name},
        mime_type = ${file.type},
        size = ${file.size},
        url = ${newUrl}
      WHERE id = ${id}
      RETURNING *
    `;

    return NextResponse.json(result.rows[0]);
  } catch (error) {
    console.error("Error replacing media:", error);
    return NextResponse.json(
      { error: "Failed to replace media" },
      { status: 500 }
    );
  }
}
