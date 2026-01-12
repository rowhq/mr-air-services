import { NextRequest, NextResponse } from "next/server";
import { sql } from "@vercel/postgres";
import { requireAuth } from "@/lib/auth";

// PUT /api/cms/navigation/[id]
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const user = await requireAuth();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const body = await request.json();

  const result = await sql`
    UPDATE navigation_items SET
      location = ${body.location},
      label = ${body.label},
      href = ${body.href},
      parent_id = ${body.parent_id},
      position = ${body.position},
      is_external = ${body.is_external},
      is_visible = ${body.is_visible}
    WHERE id = ${id}
    RETURNING *
  `;

  if (result.rows.length === 0) {
    return NextResponse.json({ error: "Navigation item not found" }, { status: 404 });
  }

  return NextResponse.json(result.rows[0]);
}

// DELETE /api/cms/navigation/[id]
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const user = await requireAuth();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;

  await sql`DELETE FROM navigation_items WHERE id = ${id}`;

  return NextResponse.json({ success: true });
}
