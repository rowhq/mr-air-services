import { NextRequest, NextResponse } from "next/server";
import { sql } from "@vercel/postgres";
import { requireAuth } from "@/lib/auth";

// GET /api/cms/office-locations/[id]
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const result = await sql`
      SELECT * FROM office_locations WHERE id = ${id}
    `;

    if (result.rows.length === 0) {
      return NextResponse.json({ error: "Office location not found" }, { status: 404 });
    }

    return NextResponse.json(result.rows[0]);
  } catch (error) {
    console.error("Error fetching office location:", error);
    return NextResponse.json(
      { error: "Failed to fetch office location" },
      { status: 500 }
    );
  }
}

// PUT /api/cms/office-locations/[id]
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
    const hours = JSON.stringify(body.hours || {});

    const result = await sql`
      UPDATE office_locations SET
        name = ${body.name},
        address = ${body.address},
        city = ${body.city},
        state = ${body.state},
        zip = ${body.zip},
        latitude = ${body.latitude},
        longitude = ${body.longitude},
        phone = ${body.phone},
        email = ${body.email},
        hours = ${hours}::jsonb,
        is_primary = ${body.is_primary},
        position = ${body.position}
      WHERE id = ${id}
      RETURNING *
    `;

    if (result.rows.length === 0) {
      return NextResponse.json({ error: "Office location not found" }, { status: 404 });
    }

    return NextResponse.json(result.rows[0]);
  } catch (error) {
    console.error("Error updating office location:", error);
    return NextResponse.json(
      { error: "Failed to update office location" },
      { status: 500 }
    );
  }
}

// DELETE /api/cms/office-locations/[id]
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

    const result = await sql`DELETE FROM office_locations WHERE id = ${id}`;

    if (result.rowCount === 0) {
      return NextResponse.json({ error: "Office location not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting office location:", error);
    return NextResponse.json(
      { error: "Failed to delete office location" },
      { status: 500 }
    );
  }
}
