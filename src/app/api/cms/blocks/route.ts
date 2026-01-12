import { NextRequest, NextResponse } from "next/server";
import { sql } from "@vercel/postgres";
import { requireAuth } from "@/lib/auth";

// POST /api/cms/blocks - Create new block
export async function POST(request: NextRequest) {
  const user = await requireAuth();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const content = JSON.stringify(body.content || {});
  const settings = JSON.stringify(body.settings || { padding: "md", background: "white" });

  const result = await sql`
    INSERT INTO blocks (
      page_id, type, content, settings, position, is_visible
    ) VALUES (
      ${body.page_id}, ${body.type}, ${content}::jsonb,
      ${settings}::jsonb, ${body.position || 0}, ${body.is_visible ?? true}
    )
    RETURNING *
  `;

  return NextResponse.json(result.rows[0], { status: 201 });
}

// PUT /api/cms/blocks - Bulk update blocks (for reordering)
export async function PUT(request: NextRequest) {
  const user = await requireAuth();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { blocks } = await request.json();

  // Update each block's position
  for (let i = 0; i < blocks.length; i++) {
    const block = blocks[i];
    await sql`
      UPDATE blocks SET position = ${i} WHERE id = ${block.id}
    `;
  }

  return NextResponse.json({ success: true });
}
