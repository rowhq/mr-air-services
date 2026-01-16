/**
 * Migration script to update dimensions for existing images in the database.
 * Run with: npx tsx scripts/migrate-image-dimensions.ts
 */

import { sql } from "@vercel/postgres";
import imageSize from "image-size";

async function getImageDimensionsFromUrl(url: string): Promise<{ width: number | null; height: number | null }> {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      console.log(`  ⚠ Failed to fetch: ${response.status}`);
      return { width: null, height: null };
    }

    const buffer = Buffer.from(await response.arrayBuffer());
    const dimensions = imageSize(buffer);

    return {
      width: dimensions.width || null,
      height: dimensions.height || null,
    };
  } catch (error) {
    console.log(`  ⚠ Error getting dimensions: ${error}`);
    return { width: null, height: null };
  }
}

async function migrateImageDimensions() {
  console.log("🖼️  Starting image dimensions migration...\n");

  // Get all media without dimensions
  const result = await sql`
    SELECT id, url, original_name, width, height
    FROM media
    WHERE width IS NULL OR height IS NULL
    ORDER BY created_at DESC
  `;

  const images = result.rows;
  console.log(`Found ${images.length} images without dimensions.\n`);

  if (images.length === 0) {
    console.log("✅ All images already have dimensions. Nothing to migrate.");
    return;
  }

  let updated = 0;
  let failed = 0;

  for (const image of images) {
    console.log(`Processing: ${image.original_name}`);

    const { width, height } = await getImageDimensionsFromUrl(image.url);

    if (width && height) {
      await sql`
        UPDATE media
        SET width = ${width}, height = ${height}
        WHERE id = ${image.id}
      `;
      console.log(`  ✅ Updated: ${width} × ${height} px`);
      updated++;
    } else {
      console.log(`  ❌ Could not get dimensions`);
      failed++;
    }
  }

  console.log("\n" + "=".repeat(50));
  console.log(`✅ Migration complete!`);
  console.log(`   Updated: ${updated}`);
  console.log(`   Failed: ${failed}`);
  console.log("=".repeat(50));
}

// Run the migration
migrateImageDimensions()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("Migration failed:", error);
    process.exit(1);
  });
