import { NextRequest, NextResponse } from "next/server";
import { sql } from "@vercel/postgres";
import { requireAuth } from "@/lib/auth";

// GET /api/cms/services/[id]
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const result = await sql`
    SELECT * FROM services WHERE id = ${id}
  `;

  if (result.rows.length === 0) {
    return NextResponse.json({ error: "Service not found" }, { status: 404 });
  }

  return NextResponse.json(result.rows[0]);
}

// PUT /api/cms/services/[id]
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
  const features = JSON.stringify(body.features || []);

  const result = await sql`
    UPDATE services SET
      title = ${body.title},
      slug = ${body.slug},
      description = ${body.description},
      short_description = ${body.short_description},
      icon = ${body.icon},
      features = ${features}::jsonb,
      cta_text = ${body.cta_text},
      cta_link = ${body.cta_link},
      is_featured = ${body.is_featured},
      position = ${body.position},
      is_published = ${body.is_published}
    WHERE id = ${id}
    RETURNING *
  `;

  if (result.rows.length === 0) {
    return NextResponse.json({ error: "Service not found" }, { status: 404 });
  }

  return NextResponse.json(result.rows[0]);
}

// DELETE /api/cms/services/[id]
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const user = await requireAuth();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;

  await sql`DELETE FROM services WHERE id = ${id}`;

  return NextResponse.json({ success: true });
}
