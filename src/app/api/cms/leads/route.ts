import { NextRequest, NextResponse } from "next/server";
import { sql } from "@vercel/postgres";
import { requireAuth } from "@/lib/auth";

// POST /api/cms/leads - Submit contact form (public)
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Basic validation
    if (!body.name || !body.email) {
      return NextResponse.json(
        { error: "Name and email are required" },
        { status: 400 }
      );
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      );
    }

    const services = body.services || [];

    const result = await sql`
      INSERT INTO leads (
        name, email, phone, preferred_time, services, message, source
      ) VALUES (
        ${body.name}, ${body.email}, ${body.phone || null},
        ${body.preferredTime || null}, ${services},
        ${body.message || null}, ${body.source || "contact_form"}
      )
      RETURNING id
    `;

    return NextResponse.json({ success: true, id: result.rows[0].id }, { status: 201 });
  } catch (error) {
    console.error("Error submitting lead:", error);
    return NextResponse.json(
      { error: "Failed to submit lead" },
      { status: 500 }
    );
  }
}

// GET /api/cms/leads - List leads (admin only)
export async function GET(request: NextRequest) {
  try {
    const user = await requireAuth();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status");
    const limit = parseInt(searchParams.get("limit") || "50");

    let result;
    if (status) {
      result = await sql`
        SELECT * FROM leads
        WHERE status = ${status}
        ORDER BY created_at DESC
        LIMIT ${limit}
      `;
    } else {
      result = await sql`
        SELECT * FROM leads
        ORDER BY created_at DESC
        LIMIT ${limit}
      `;
    }

    return NextResponse.json(result.rows);
  } catch (error) {
    console.error("Error fetching leads:", error);
    return NextResponse.json(
      { error: "Failed to fetch leads" },
      { status: 500 }
    );
  }
}
