import { NextRequest, NextResponse } from "next/server";
import { sql } from "@vercel/postgres";
import { requireAuth } from "@/lib/auth";

// GET /api/cms/faqs
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const pageSlug = searchParams.get("page");
    const category = searchParams.get("category");

    let result;
    if (pageSlug && category) {
      result = await sql`
        SELECT * FROM faqs
        WHERE page_slug = ${pageSlug} AND category = ${category}
        ORDER BY position
      `;
    } else if (pageSlug) {
      result = await sql`
        SELECT * FROM faqs
        WHERE page_slug = ${pageSlug}
        ORDER BY position
      `;
    } else if (category) {
      result = await sql`
        SELECT * FROM faqs
        WHERE category = ${category}
        ORDER BY position
      `;
    } else {
      result = await sql`
        SELECT * FROM faqs
        ORDER BY position
      `;
    }

    return NextResponse.json(result.rows);
  } catch (error) {
    console.error("Error fetching FAQs:", error);
    return NextResponse.json(
      { error: "Failed to fetch FAQs" },
      { status: 500 }
    );
  }
}

// POST /api/cms/faqs
export async function POST(request: NextRequest) {
  try {
    const user = await requireAuth();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();

    const result = await sql`
      INSERT INTO faqs (
        page_slug, category, question, answer, position, is_published
      ) VALUES (
        ${body.page_slug || null}, ${body.category || "general"},
        ${body.question}, ${body.answer},
        ${body.position || 0}, ${body.is_published ?? true}
      )
      RETURNING *
    `;

    return NextResponse.json(result.rows[0], { status: 201 });
  } catch (error) {
    console.error("Error creating FAQ:", error);
    return NextResponse.json(
      { error: "Failed to create FAQ" },
      { status: 500 }
    );
  }
}
