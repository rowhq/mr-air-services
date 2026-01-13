import { NextRequest, NextResponse } from "next/server";
import { sql } from "@vercel/postgres";
import { requireAuth } from "@/lib/auth";

// GET /api/cms/navigation
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const location = searchParams.get("location");

    let result;
    if (location) {
      result = await sql`
        SELECT * FROM navigation_items
        WHERE location = ${location}
        ORDER BY position
      `;
    } else {
      result = await sql`
        SELECT * FROM navigation_items
        ORDER BY position
      `;
    }

    return NextResponse.json(result.rows);
  } catch (error) {
    console.error("Error fetching navigation:", error);
    return NextResponse.json(
      { error: "Failed to fetch navigation" },
      { status: 500 }
    );
  }
}

// POST /api/cms/navigation
export async function POST(request: NextRequest) {
  try {
    const user = await requireAuth();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();

    const result = await sql`
      INSERT INTO navigation_items (
        location, label, href, parent_id, position, is_external, is_visible
      ) VALUES (
        ${body.location}, ${body.label}, ${body.href},
        ${body.parent_id || null}, ${body.position || 0},
        ${body.is_external || false}, ${body.is_visible ?? true}
      )
      RETURNING *
    `;

    return NextResponse.json(result.rows[0], { status: 201 });
  } catch (error) {
    console.error("Error creating navigation item:", error);
    return NextResponse.json(
      { error: "Failed to create navigation item" },
      { status: 500 }
    );
  }
}

// PUT /api/cms/navigation - Bulk update for reordering
export async function PUT(request: NextRequest) {
  try {
    const user = await requireAuth();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { items } = await request.json();

    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      try {
        await sql`
          UPDATE navigation_items SET position = ${i} WHERE id = ${item.id}
        `;
      } catch (itemError) {
        console.error(`Failed to update navigation item ${item.id}:`, itemError);
        return NextResponse.json(
          { error: `Failed to update item at position ${i}` },
          { status: 500 }
        );
      }
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error bulk updating navigation:", error);
    return NextResponse.json(
      { error: "Failed to update navigation" },
      { status: 500 }
    );
  }
}
