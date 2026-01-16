import { NextRequest, NextResponse } from "next/server";
import { sql } from "@vercel/postgres";
import { requireAuth } from "@/lib/auth";
import { uploadFile } from "@/lib/blob";
import imageSize from "image-size";

// Extract image dimensions from file buffer
async function getImageDimensions(file: File): Promise<{ width: number | null; height: number | null }> {
  try {
    const buffer = Buffer.from(await file.arrayBuffer());
    const dimensions = imageSize(buffer);
    return {
      width: dimensions.width || null,
      height: dimensions.height || null,
    };
  } catch {
    return { width: null, height: null };
  }
}

// GET /api/cms/media - List all media
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const folder = searchParams.get("folder");

    let result;
    if (folder) {
      result = await sql`
        SELECT * FROM media
        WHERE folder = ${folder}
        ORDER BY created_at DESC
      `;
    } else {
      result = await sql`
        SELECT * FROM media
        ORDER BY created_at DESC
      `;
    }

    return NextResponse.json(result.rows);
  } catch (error) {
    console.error("Error fetching media:", error);
    return NextResponse.json(
      { error: "Failed to fetch media" },
      { status: 500 }
    );
  }
}

// POST /api/cms/media - Upload file
export async function POST(request: NextRequest) {
  try {
    const user = await requireAuth();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const formData = await request.formData();
    const file = formData.get("file") as File;
    const folder = (formData.get("folder") as string) || "general";
    const altText = formData.get("altText") as string;

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

    // Get image dimensions
    const { width, height } = await getImageDimensions(file);

    // Upload to Vercel Blob
    const { url, filename } = await uploadFile(file, folder);

    // Save metadata to database
    const result = await sql`
      INSERT INTO media (filename, original_name, mime_type, size, url, alt_text, folder, width, height)
      VALUES (${filename}, ${file.name}, ${file.type}, ${file.size}, ${url}, ${altText || null}, ${folder}, ${width}, ${height})
      RETURNING *
    `;

    return NextResponse.json(result.rows[0], { status: 201 });
  } catch (error) {
    console.error("Error uploading media:", error);
    return NextResponse.json(
      { error: "Failed to upload file" },
      { status: 500 }
    );
  }
}
