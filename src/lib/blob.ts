import { put, del, list } from "@vercel/blob";

export { put, del, list };

// Generate unique filename for uploads
export function generateFilename(originalName: string, folder: string): string {
  const timestamp = Date.now();
  const randomStr = Math.random().toString(36).substring(2, 9);
  const extension = originalName.split(".").pop();
  return `${folder}/${timestamp}-${randomStr}.${extension}`;
}

// Upload file to Vercel Blob
export async function uploadFile(
  file: File,
  folder: string = "general"
): Promise<{ url: string; filename: string }> {
  const filename = generateFilename(file.name, folder);

  const blob = await put(filename, file, {
    access: "public",
    addRandomSuffix: false,
  });

  return {
    url: blob.url,
    filename: filename,
  };
}

// Delete file from Vercel Blob
export async function deleteFile(url: string): Promise<void> {
  await del(url);
}
