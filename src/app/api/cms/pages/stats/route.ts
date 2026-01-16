import { NextResponse } from "next/server";
import { sql, db } from "@vercel/postgres";
import { pageSchemas, getAllKeysFromSchema } from "@/lib/cms/page-schemas";

interface PageStats {
  slug: string;
  filledFields: number;
  totalFields: number;
  lastModified: string | null;
}

// GET /api/cms/pages/stats - Get stats for all service pages
export async function GET() {
  try {
    const stats: PageStats[] = [];
    const client = await db.connect();

    for (const slug of Object.keys(pageSchemas)) {
      const keys = getAllKeysFromSchema(slug);
      const totalFields = keys.length;

      if (keys.length === 0) {
        stats.push({
          slug,
          filledFields: 0,
          totalFields: 0,
          lastModified: null,
        });
        continue;
      }

      // Get all config entries for this page's keys
      const result = await client.query(
        `SELECT key, value, updated_at
         FROM site_config
         WHERE key = ANY($1::text[])`,
        [keys]
      );

      // Count filled fields (non-null, non-empty values)
      let filledFields = 0;
      let lastModified: Date | null = null;

      for (const row of result.rows) {
        // Check if value is not null and not empty string
        const value = row.value;
        if (value !== null && value !== "" && value !== '""' && value !== "null") {
          filledFields++;
        }

        // Track most recent update
        if (row.updated_at) {
          const rowDate = new Date(row.updated_at);
          if (!lastModified || rowDate > lastModified) {
            lastModified = rowDate;
          }
        }
      }

      stats.push({
        slug,
        filledFields,
        totalFields,
        lastModified: lastModified?.toISOString() || null,
      });
    }

    client.release();

    return NextResponse.json(stats);
  } catch (error) {
    console.error("Error fetching page stats:", error);
    return NextResponse.json(
      { error: "Failed to fetch page stats" },
      { status: 500 }
    );
  }
}
