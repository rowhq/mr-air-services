import { NextRequest, NextResponse } from "next/server";
import { sql } from "@vercel/postgres";
import { requireAuth } from "@/lib/auth";

// GET /api/cms/pages - List all pages
export async function GET() {
  const result = await sql`
    SELECT * FROM pages ORDER BY title
  `;

  return NextResponse.json(result.rows);
}

// POST /api/cms/pages - Create new page
export async function POST(request: NextRequest) {
  const user = await requireAuth();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();

  const result = await sql`
    INSERT INTO pages (
      slug, title, description, seo_title, seo_description, og_image, is_published
    ) VALUES (
      ${body.slug}, ${body.title}, ${body.description || null},
      ${body.seo_title || null}, ${body.seo_description || null},
      ${body.og_image || null}, ${body.is_published || false}
    )
    RETURNING *
  `;

  return NextResponse.json(result.rows[0], { status: 201 });
}
