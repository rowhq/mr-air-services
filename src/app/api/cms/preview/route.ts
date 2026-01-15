import { NextRequest, NextResponse } from 'next/server';

// In-memory store for preview configs (in production, use Redis)
// Map<previewId, { config: object, expiresAt: number }>
const previewStore = new Map<string, { config: Record<string, unknown>; slug: string; expiresAt: number }>();

// Clean up expired previews every minute
const PREVIEW_TTL = 60 * 60 * 1000; // 1 hour

function cleanupExpired() {
  const now = Date.now();
  for (const [id, data] of previewStore.entries()) {
    if (data.expiresAt < now) {
      previewStore.delete(id);
    }
  }
}

// Run cleanup periodically
setInterval(cleanupExpired, 60 * 1000);

// POST /api/cms/preview - Save preview config
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { slug, config } = body as { slug: string; config: Record<string, unknown> };

    if (!slug || !config) {
      return NextResponse.json(
        { error: 'slug and config are required' },
        { status: 400 }
      );
    }

    const previewId = crypto.randomUUID();
    const expiresAt = Date.now() + PREVIEW_TTL;

    previewStore.set(previewId, { config, slug, expiresAt });

    return NextResponse.json({ previewId, expiresAt });
  } catch (error) {
    console.error('Error saving preview:', error);
    return NextResponse.json(
      { error: 'Failed to save preview' },
      { status: 500 }
    );
  }
}

// GET /api/cms/preview?id=xxx - Get preview config
export async function GET(request: NextRequest) {
  try {
    const previewId = request.nextUrl.searchParams.get('id');

    if (!previewId) {
      return NextResponse.json(
        { error: 'Preview ID is required' },
        { status: 400 }
      );
    }

    const preview = previewStore.get(previewId);

    if (!preview) {
      return NextResponse.json(
        { error: 'Preview not found or expired' },
        { status: 404 }
      );
    }

    // Check if expired
    if (preview.expiresAt < Date.now()) {
      previewStore.delete(previewId);
      return NextResponse.json(
        { error: 'Preview expired' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      slug: preview.slug,
      config: preview.config,
      expiresAt: preview.expiresAt,
    });
  } catch (error) {
    console.error('Error getting preview:', error);
    return NextResponse.json(
      { error: 'Failed to get preview' },
      { status: 500 }
    );
  }
}

// PUT /api/cms/preview - Update existing preview
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { previewId, config } = body as { previewId: string; config: Record<string, unknown> };

    if (!previewId || !config) {
      return NextResponse.json(
        { error: 'previewId and config are required' },
        { status: 400 }
      );
    }

    const existing = previewStore.get(previewId);
    if (!existing) {
      return NextResponse.json(
        { error: 'Preview not found' },
        { status: 404 }
      );
    }

    // Update config and extend expiry
    const expiresAt = Date.now() + PREVIEW_TTL;
    previewStore.set(previewId, { ...existing, config, expiresAt });

    return NextResponse.json({ previewId, expiresAt });
  } catch (error) {
    console.error('Error updating preview:', error);
    return NextResponse.json(
      { error: 'Failed to update preview' },
      { status: 500 }
    );
  }
}
