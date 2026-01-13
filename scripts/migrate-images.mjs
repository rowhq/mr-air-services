// Script to migrate images from public/images/ to Vercel Blob + media table
// Run with: node scripts/migrate-images.mjs

import { sql } from '@vercel/postgres';
import { put } from '@vercel/blob';
import { config } from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join, basename, extname } from 'path';
import { readdir, readFile, stat } from 'fs/promises';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load .env.local
config({ path: join(__dirname, '..', '.env.local') });

// MIME types mapping
const mimeTypes = {
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.gif': 'image/gif',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml',
};

// Generate descriptive alt text from filename
function generateAltText(filename, folder) {
  // Remove extension and replace dashes/underscores with spaces
  const name = basename(filename, extname(filename))
    .replace(/[-_]/g, ' ')
    .replace(/\b\w/g, c => c.toUpperCase()); // Capitalize words

  const folderLabel = {
    brands: 'Logo',
    financing: 'Financing',
    services: 'Service',
    general: '',
  };

  const prefix = folderLabel[folder] || '';
  return prefix ? `${prefix}: ${name}` : name;
}

// Generate unique filename for blob storage
function generateBlobFilename(originalName, folder) {
  const timestamp = Date.now();
  const randomStr = Math.random().toString(36).substring(2, 9);
  const extension = extname(originalName);
  return `${folder}/${timestamp}-${randomStr}${extension}`;
}

// Get all image files recursively
async function getImageFiles(dir, baseDir = dir) {
  const files = [];
  const entries = await readdir(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = join(dir, entry.name);

    if (entry.isDirectory()) {
      files.push(...await getImageFiles(fullPath, baseDir));
    } else {
      const ext = extname(entry.name).toLowerCase();
      if (mimeTypes[ext]) {
        const relativePath = fullPath.replace(baseDir + '/', '');
        const folder = relativePath.includes('/')
          ? relativePath.split('/')[0]
          : 'general';

        files.push({
          path: fullPath,
          name: entry.name,
          folder,
          mimeType: mimeTypes[ext],
        });
      }
    }
  }

  return files;
}

async function migrateImages() {
  console.log('🚀 Starting image migration to CMS...\n');

  const publicImagesDir = join(__dirname, '..', 'public', 'images');

  try {
    // Get all image files
    const imageFiles = await getImageFiles(publicImagesDir);
    console.log(`Found ${imageFiles.length} images to migrate:\n`);

    let successCount = 0;
    let skipCount = 0;
    let errorCount = 0;

    for (const image of imageFiles) {
      try {
        // Check if image already exists in media table (by original_name)
        const existing = await sql`
          SELECT id FROM media WHERE original_name = ${image.name}
        `;

        if (existing.rows.length > 0) {
          console.log(`⏭️  Skipping (already exists): ${image.name}`);
          skipCount++;
          continue;
        }

        // Read file
        const fileBuffer = await readFile(image.path);
        const fileStats = await stat(image.path);

        // Generate blob filename
        const blobFilename = generateBlobFilename(image.name, image.folder);

        // Upload to Vercel Blob
        console.log(`📤 Uploading: ${image.name} -> ${blobFilename}`);
        const blob = await put(blobFilename, fileBuffer, {
          access: 'public',
          addRandomSuffix: false,
          contentType: image.mimeType,
        });

        // Generate alt text
        const altText = generateAltText(image.name, image.folder);

        // Insert into media table
        await sql`
          INSERT INTO media (filename, original_name, mime_type, size, url, alt_text, folder)
          VALUES (${blobFilename}, ${image.name}, ${image.mimeType}, ${fileStats.size}, ${blob.url}, ${altText}, ${image.folder})
        `;

        console.log(`✅ Migrated: ${image.name} (${altText})`);
        successCount++;

      } catch (err) {
        console.error(`❌ Error migrating ${image.name}:`, err.message);
        errorCount++;
      }
    }

    console.log('\n' + '='.repeat(50));
    console.log('📊 Migration Summary:');
    console.log(`   ✅ Success: ${successCount}`);
    console.log(`   ⏭️  Skipped: ${skipCount}`);
    console.log(`   ❌ Errors: ${errorCount}`);
    console.log('='.repeat(50));

    if (successCount > 0) {
      console.log('\n🎉 Images are now available in /admin/media');
    }

  } catch (error) {
    console.error('Migration failed:', error);
    process.exit(1);
  }
}

migrateImages();
