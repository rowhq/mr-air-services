import { NextResponse } from "next/server";
import { sql } from "@vercel/postgres";
import { requireAuth } from "@/lib/auth";

// GET /api/cms/leads/count - Get count of new leads (admin only)
export async function GET() {
  try {
    const user = await requireAuth();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const result = await sql`
      SELECT COUNT(*) as count FROM leads WHERE status = 'new'
    `;

    return NextResponse.json({ count: parseInt(result.rows[0].count) });
  } catch (error) {
    console.error("Error fetching leads count:", error);
    return NextResponse.json(
      { error: "Failed to fetch leads count" },
      { status: 500 }
    );
  }
}
