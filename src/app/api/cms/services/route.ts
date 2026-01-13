import { NextRequest, NextResponse } from "next/server";
import { sql } from "@vercel/postgres";
import { requireAuth } from "@/lib/auth";

// GET /api/cms/services - List all services
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const featured = searchParams.get("featured");

    let result;
    if (featured === "true") {
      result = await sql`
        SELECT * FROM services
        WHERE is_featured = true
        ORDER BY position
      `;
    } else {
      result = await sql`
        SELECT * FROM services
        ORDER BY position
      `;
    }

    return NextResponse.json(result.rows);
  } catch (error) {
    console.error("Error fetching services:", error);
    return NextResponse.json(
      { error: "Failed to fetch services" },
      { status: 500 }
    );
  }
}

// POST /api/cms/services - Create new service
export async function POST(request: NextRequest) {
  try {
    const user = await requireAuth();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const features = JSON.stringify(body.features || []);

    const result = await sql`
      INSERT INTO services (
        title, slug, description, short_description, icon, features,
        cta_text, cta_link, is_featured, position, is_published
      ) VALUES (
        ${body.title}, ${body.slug}, ${body.description}, ${body.short_description},
        ${body.icon}, ${features}::jsonb, ${body.cta_text}, ${body.cta_link},
        ${body.is_featured || false}, ${body.position || 0}, ${body.is_published ?? true}
      )
      RETURNING *
    `;

    return NextResponse.json(result.rows[0], { status: 201 });
  } catch (error) {
    console.error("Error creating service:", error);
    return NextResponse.json(
      { error: "Failed to create service" },
      { status: 500 }
    );
  }
}
