import { NextRequest, NextResponse } from "next/server";
import { sql } from "@vercel/postgres";
import { requireAuth } from "@/lib/auth";
import type { SiteConfig } from "@/types/database";

// GET /api/cms/config - Get all config or specific key
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const key = searchParams.get("key");

    if (key) {
      const result = await sql`
        SELECT * FROM site_config WHERE key = ${key}
      `;

      if (result.rows.length === 0) {
        return NextResponse.json({ error: "Config not found" }, { status: 404 });
      }

      return NextResponse.json(result.rows[0]);
    }

    const result = await sql`
      SELECT * FROM site_config
    `;

    // Transform array to object for easier consumption
    const configMap = (result.rows as SiteConfig[]).reduce(
      (acc, config) => {
        acc[config.key] = config.value;
        return acc;
      },
      {} as Record<string, unknown>
    );

    return NextResponse.json(configMap);
  } catch (error) {
    console.error("Error fetching config:", error);
    return NextResponse.json(
      { error: "Failed to fetch config" },
      { status: 500 }
    );
  }
}

// PUT /api/cms/config - Update config by key
export async function PUT(request: NextRequest) {
  try {
    const user = await requireAuth();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { key, value } = body;

    if (!key || value === undefined) {
      return NextResponse.json(
        { error: "Key and value are required" },
        { status: 400 }
      );
    }

    const valueJson = JSON.stringify(value);

    const result = await sql`
      INSERT INTO site_config (key, value, updated_at)
      VALUES (${key}, ${valueJson}::jsonb, NOW())
      ON CONFLICT (key)
      DO UPDATE SET value = ${valueJson}::jsonb, updated_at = NOW()
      RETURNING *
    `;

    return NextResponse.json(result.rows[0]);
  } catch (error) {
    console.error("Error updating config:", error);
    return NextResponse.json(
      { error: "Failed to update config" },
      { status: 500 }
    );
  }
}
