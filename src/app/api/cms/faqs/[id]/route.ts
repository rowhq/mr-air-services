import { NextRequest, NextResponse } from "next/server";
import { sql } from "@vercel/postgres";
import { requireAuth } from "@/lib/auth";

// GET /api/cms/faqs/[id]
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const result = await sql`
    SELECT * FROM faqs WHERE id = ${id}
  `;

  if (result.rows.length === 0) {
    return NextResponse.json({ error: "FAQ not found" }, { status: 404 });
  }

  return NextResponse.json(result.rows[0]);
}

// PUT /api/cms/faqs/[id]
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
    UPDATE faqs SET
      page_slug = ${body.page_slug},
      category = ${body.category},
      question = ${body.question},
      answer = ${body.answer},
      position = ${body.position},
      is_published = ${body.is_published}
    WHERE id = ${id}
    RETURNING *
  `;

  if (result.rows.length === 0) {
    return NextResponse.json({ error: "FAQ not found" }, { status: 404 });
  }

  return NextResponse.json(result.rows[0]);
}

// DELETE /api/cms/faqs/[id]
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const user = await requireAuth();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;

  await sql`DELETE FROM faqs WHERE id = ${id}`;

  return NextResponse.json({ success: true });
}
