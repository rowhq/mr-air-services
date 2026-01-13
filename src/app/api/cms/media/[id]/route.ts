import { NextRequest, NextResponse } from "next/server";
import { sql } from "@vercel/postgres";
import { requireAuth } from "@/lib/auth";
import { deleteFile } from "@/lib/blob";

// GET /api/cms/media/[id] - Get single media item
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const result = await sql`
      SELECT * FROM media WHERE id = ${id}
    `;

    if (result.rows.length === 0) {
      return NextResponse.json({ error: "Media not found" }, { status: 404 });
    }

    return NextResponse.json(result.rows[0]);
  } catch (error) {
    console.error("Error fetching media:", error);
    return NextResponse.json(
      { error: "Failed to fetch media" },
      { status: 500 }
    );
  }
}

// PUT /api/cms/media/[id] - Update media metadata
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = await requireAuth();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const body = await request.json();

    const result = await sql`
      UPDATE media
      SET alt_text = ${body.alt_text}, folder = ${body.folder}
      WHERE id = ${id}
      RETURNING *
    `;

    if (result.rows.length === 0) {
      return NextResponse.json({ error: "Media not found" }, { status: 404 });
    }

    return NextResponse.json(result.rows[0]);
  } catch (error) {
    console.error("Error updating media:", error);
    return NextResponse.json(
      { error: "Failed to update media" },
      { status: 500 }
    );
  }
}

// DELETE /api/cms/media/[id] - Delete media
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = await requireAuth();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;

    // Get the media record first to get the URL
    const selectResult = await sql`
      SELECT url FROM media WHERE id = ${id}
    `;

    if (selectResult.rows.length === 0) {
      return NextResponse.json({ error: "Media not found" }, { status: 404 });
    }

    const mediaUrl = selectResult.rows[0].url;

    // Delete from Vercel Blob
    try {
      await deleteFile(mediaUrl);
    } catch (blobError) {
      console.error("Blob delete error:", blobError);
      // Continue anyway to delete the DB record
    }

    // Delete from database
    const result = await sql`DELETE FROM media WHERE id = ${id}`;

    if (result.rowCount === 0) {
      return NextResponse.json({ error: "Media not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting media:", error);
    return NextResponse.json(
      { error: "Failed to delete media" },
      { status: 500 }
    );
  }
}
