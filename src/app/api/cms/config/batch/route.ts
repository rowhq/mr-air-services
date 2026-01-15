import { NextRequest, NextResponse } from "next/server";
import { sql, db } from "@vercel/postgres";
import { requireAuth } from "@/lib/auth";

interface ConfigUpdate {
  key: string;
  value: string;
}

// POST /api/cms/config/batch - Get multiple configs by keys
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { keys } = body as { keys: string[] };

    if (!keys || !Array.isArray(keys) || keys.length === 0) {
      return NextResponse.json(
        { error: "Keys array is required" },
        { status: 400 }
      );
    }

    // Fetch all requested keys using parameterized query for arrays
    const client = await db.connect();
    const result = await client.query(
      'SELECT key, value FROM site_config WHERE key = ANY($1::text[])',
      [keys]
    );
    client.release();

    // Transform to key-value map
    const configMap: Record<string, string> = {};
    for (const row of result.rows) {
      configMap[row.key] = row.value;
    }

    return NextResponse.json(configMap);
  } catch (error) {
    console.error("Error fetching configs:", error);
    return NextResponse.json(
      { error: "Failed to fetch configs" },
      { status: 500 }
    );
  }
}

// PUT /api/cms/config/batch - Update multiple configs
export async function PUT(request: NextRequest) {
  try {
    const user = await requireAuth();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { configs } = body as { configs: ConfigUpdate[] };

    if (!configs || !Array.isArray(configs) || configs.length === 0) {
      return NextResponse.json(
        { error: "Configs array is required" },
        { status: 400 }
      );
    }

    // Update each config
    const results = [];
    for (const config of configs) {
      const valueJson = JSON.stringify(config.value);
      const result = await sql`
        INSERT INTO site_config (key, value, updated_at)
        VALUES (${config.key}, ${valueJson}::jsonb, NOW())
        ON CONFLICT (key)
        DO UPDATE SET value = ${valueJson}::jsonb, updated_at = NOW()
        RETURNING key, value
      `;
      results.push(result.rows[0]);
    }

    return NextResponse.json({
      success: true,
      updated: results.length,
      configs: results
    });
  } catch (error) {
    console.error("Error updating configs:", error);
    return NextResponse.json(
      { error: "Failed to update configs" },
      { status: 500 }
    );
  }
}
