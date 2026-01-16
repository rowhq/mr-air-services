import { NextRequest, NextResponse } from "next/server";
import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";
import { requireAuth } from "@/lib/auth";

// Map page slugs to their actual URL paths
function getPagePath(slug: string): string {
  const pathMap: Record<string, string> = {
    'home': '/',
    'privacy-policy': '/privacy-policy',
    'terms-of-use': '/terms-of-use',
    'contact': '/contact',
    'services': '/services',
  };
  return pathMap[slug] || `/${slug}`;
}

// GET /api/cms/pages/[slug] - Get page with blocks
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;

    // Get page
    const pageResult = await sql`
      SELECT * FROM pages WHERE slug = ${slug}
    `;

    if (pageResult.rows.length === 0) {
      return NextResponse.json({ error: "Page not found" }, { status: 404 });
    }

    const page = pageResult.rows[0];

    // Get blocks for this page
    const blocksResult = await sql`
      SELECT * FROM blocks
      WHERE page_id = ${page.id}
      ORDER BY position
    `;

    return NextResponse.json({
      ...page,
      blocks: blocksResult.rows || [],
    });
  } catch (error) {
    console.error("Error fetching page:", error);
    return NextResponse.json(
      { error: "Failed to fetch page" },
      { status: 500 }
    );
  }
}

// PUT /api/cms/pages/[slug] - Update page
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const user = await requireAuth();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { slug } = await params;
    const body = await request.json();

    const publishedAt = body.is_published ? new Date().toISOString() : null;

    const result = await sql`
      UPDATE pages SET
        title = ${body.title},
        description = ${body.description},
        seo_title = ${body.seo_title},
        seo_description = ${body.seo_description},
        og_image = ${body.og_image},
        is_published = ${body.is_published},
        published_at = ${publishedAt}
      WHERE slug = ${slug}
      RETURNING *
    `;

    if (result.rows.length === 0) {
      return NextResponse.json({ error: "Page not found" }, { status: 404 });
    }

    // Revalidate the page cache when publishing
    if (body.is_published) {
      const pagePath = getPagePath(slug);
      revalidatePath(pagePath);
      // Also revalidate the home page if it might include this content
      if (pagePath !== '/') {
        revalidatePath('/');
      }
    }

    return NextResponse.json(result.rows[0]);
  } catch (error) {
    console.error("Error updating page:", error);
    return NextResponse.json(
      { error: "Failed to update page" },
      { status: 500 }
    );
  }
}

// DELETE /api/cms/pages/[slug] - Delete page
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const user = await requireAuth();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { slug } = await params;

    // Prevent deletion of core pages
    const coreSlugs = ["home", "contact", "services"];
    if (coreSlugs.includes(slug)) {
      return NextResponse.json(
        { error: "Cannot delete core pages" },
        { status: 400 }
      );
    }

    const result = await sql`DELETE FROM pages WHERE slug = ${slug}`;

    if (result.rowCount === 0) {
      return NextResponse.json({ error: "Page not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting page:", error);
    return NextResponse.json(
      { error: "Failed to delete page" },
      { status: 500 }
    );
  }
}
