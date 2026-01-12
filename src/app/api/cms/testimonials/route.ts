import { NextRequest, NextResponse } from "next/server";
import { sql } from "@vercel/postgres";
import { requireAuth } from "@/lib/auth";

// GET /api/cms/testimonials
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const featured = searchParams.get("featured");

  let result;
  if (featured === "true") {
    result = await sql`
      SELECT * FROM testimonials
      WHERE is_featured = true
      ORDER BY position
    `;
  } else {
    result = await sql`
      SELECT * FROM testimonials
      ORDER BY position
    `;
  }

  return NextResponse.json(result.rows);
}

// POST /api/cms/testimonials
export async function POST(request: NextRequest) {
  const user = await requireAuth();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();

  const result = await sql`
    INSERT INTO testimonials (
      initials, location, rating, text, source, is_featured, position, is_published
    ) VALUES (
      ${body.initials}, ${body.location}, ${body.rating || 5}, ${body.text},
      ${body.source || "Google"}, ${body.is_featured || false},
      ${body.position || 0}, ${body.is_published ?? true}
    )
    RETURNING *
  `;

  return NextResponse.json(result.rows[0], { status: 201 });
}
