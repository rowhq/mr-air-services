import { NextRequest, NextResponse } from "next/server";
import { sql } from "@vercel/postgres";
import { requireAuth } from "@/lib/auth";

// GET /api/cms/blocks/[id]
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const result = await sql`
    SELECT * FROM blocks WHERE id = ${id}
  `;

  if (result.rows.length === 0) {
    return NextResponse.json({ error: "Block not found" }, { status: 404 });
  }

  return NextResponse.json(result.rows[0]);
}

// PUT /api/cms/blocks/[id] - Update block
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
  const content = JSON.stringify(body.content || {});
  const settings = JSON.stringify(body.settings || {});

  const result = await sql`
    UPDATE blocks SET
      type = ${body.type},
      content = ${content}::jsonb,
      settings = ${settings}::jsonb,
      position = ${body.position},
      is_visible = ${body.is_visible}
    WHERE id = ${id}
    RETURNING *
  `;

  if (result.rows.length === 0) {
    return NextResponse.json({ error: "Block not found" }, { status: 404 });
  }

  return NextResponse.json(result.rows[0]);
}

// DELETE /api/cms/blocks/[id]
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const user = await requireAuth();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;

  await sql`DELETE FROM blocks WHERE id = ${id}`;

  return NextResponse.json({ success: true });
}
