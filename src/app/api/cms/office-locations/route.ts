import { NextRequest, NextResponse } from "next/server";
import { sql } from "@vercel/postgres";
import { requireAuth } from "@/lib/auth";

// GET /api/cms/office-locations - List all office locations
export async function GET() {
  const result = await sql`
    SELECT * FROM office_locations
    ORDER BY position
  `;

  return NextResponse.json(result.rows);
}

// POST /api/cms/office-locations - Create new office location
export async function POST(request: NextRequest) {
  const user = await requireAuth();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const hours = JSON.stringify(body.hours || {
    weekday: "8:00 AM - 6:00 PM",
    saturday: "9:00 AM - 2:00 PM",
    sunday: "Closed"
  });

  const result = await sql`
    INSERT INTO office_locations (
      name, address, city, state, zip, latitude, longitude,
      phone, email, hours, is_primary, position
    ) VALUES (
      ${body.name}, ${body.address}, ${body.city}, ${body.state || 'TX'}, ${body.zip},
      ${body.latitude || null}, ${body.longitude || null},
      ${body.phone}, ${body.email}, ${hours}::jsonb,
      ${body.is_primary || false}, ${body.position || 0}
    )
    RETURNING *
  `;

  return NextResponse.json(result.rows[0], { status: 201 });
}
