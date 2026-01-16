/**
 * Migration script to populate CMS with default content from page schemas.
 * This takes the placeholder values and saves them as actual content.
 * Run with: pnpm migrate:default-content
 */

import "dotenv/config";
import { sql } from "@vercel/postgres";
import { pageSchemas } from "../src/lib/cms/page-schemas";

async function migrateDefaultContent() {
  console.log("📝 Starting default content migration...\n");

  let totalInserted = 0;
  let totalSkipped = 0;

  for (const [slug, schema] of Object.entries(pageSchemas)) {
    console.log(`\n📄 Processing: ${schema.title} (${slug})`);

    for (const section of schema.sections) {
      for (const field of section.fields) {
        // Skip image fields (they don't have default values)
        if (field.type === "image") {
          continue;
        }

        // Use placeholder as default value
        const defaultValue = field.placeholder;
        if (!defaultValue) {
          continue;
        }

        try {
          // Check if value already exists
          const existing = await sql`
            SELECT key FROM site_config WHERE key = ${field.key}
          `;

          if (existing.rows.length > 0) {
            console.log(`  ⏭ Skipped: ${field.key} (already exists)`);
            totalSkipped++;
            continue;
          }

          // Insert new value
          const valueJson = JSON.stringify(defaultValue);
          await sql`
            INSERT INTO site_config (key, value, updated_at)
            VALUES (${field.key}, ${valueJson}::jsonb, NOW())
          `;

          console.log(`  ✅ Inserted: ${field.key}`);
          totalInserted++;
        } catch (error) {
          console.error(`  ❌ Error with ${field.key}:`, error);
        }
      }
    }
  }

  console.log("\n" + "=".repeat(50));
  console.log(`✅ Migration complete!`);
  console.log(`   Inserted: ${totalInserted}`);
  console.log(`   Skipped: ${totalSkipped}`);
  console.log("=".repeat(50));
}

// Run the migration
migrateDefaultContent()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("Migration failed:", error);
    process.exit(1);
  });
