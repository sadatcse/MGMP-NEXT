import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import fs from 'fs';
import path from 'path';

// 1. Load .env
const envPath = path.join(process.cwd(), '.env');
if (fs.existsSync(envPath)) {
  const envText = fs.readFileSync(envPath, 'utf8');
  envText.split('\n').forEach(line => {
    const trimmed = line.trim();
    if (trimmed && !trimmed.startsWith('#') && trimmed.includes('=')) {
      const idx = trimmed.indexOf('=');
      const key = trimmed.substring(0, idx).trim();
      const val = trimmed.substring(idx + 1).trim();
      process.env[key] = val;
    }
  });
}

const accessKeyId = process.env.AWS_S3_ACCESS_KEY_ID;
const secretAccessKey = process.env.AWS_S3_SECRET_ACCESS_KEY;
const region = process.env.AWS_S3_REGION || 'ap-southeast-1';
const bucketName = process.env.AWS_STORAGE_BUCKET_NAME || 'multigym-website';

console.log('=== AWS S3 Explore Data Image Processor & Migration ===');
console.log('Target S3 Bucket:', bucketName);
console.log('Target S3 Region:', region);

const s3Client = new S3Client({
  region,
  credentials: {
    accessKeyId,
    secretAccessKey,
  },
});

function getContentType(filename) {
  const ext = path.extname(filename.split('?')[0]).toLowerCase();
  switch (ext) {
    case '.png':
      return 'image/png';
    case '.webp':
      return 'image/webp';
    case '.gif':
      return 'image/gif';
    case '.svg':
      return 'image/svg+xml';
    case '.jpg':
    case '.jpeg':
    default:
      return 'image/jpeg';
  }
}

async function uploadBufferToS3(buffer, folder, filename) {
  const rootPrefix = 'Multigym premium';
  const s3Key = `${rootPrefix}/${folder}/${filename}`;
  const contentType = getContentType(filename);

  const command = new PutObjectCommand({
    Bucket: bucketName,
    Key: s3Key,
    Body: buffer,
    ContentType: contentType,
  });

  await s3Client.send(command);
  const s3Url = `https://${bucketName}.s3.${region}.amazonaws.com/${encodeURI(s3Key)}`;
  return { s3Key, s3Url };
}

async function processExploreData() {
  const dataPath = path.join(process.cwd(), 'public', 'Data.json');
  const items = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

  console.log(`Initial items count: ${items.length}`);

  const validItems = [];
  const removedItems = [];

  for (let i = 0; i < items.length; i++) {
    const item = items[i];
    const imgUrl = item.image;

    console.log(`\n[${i + 1}/${items.length}] Processing "${item.name}"...`);

    if (!imgUrl) {
      console.log(` ❌ REMOVE: No image URL specified.`);
      removedItems.push(item);
      continue;
    }

    try {
      // Check if image URL is accessible
      let res;
      try {
        res = await fetch(imgUrl, { method: 'GET' });
      } catch (err) {
        console.log(` ❌ REMOVE: Fetch error (${err.message}) for ${imgUrl}`);
        removedItems.push(item);
        continue;
      }

      if (!res.ok) {
        console.log(` ❌ REMOVE: HTTP ${res.status} for ${imgUrl}`);
        removedItems.push(item);
        continue;
      }

      const arrayBuffer = await res.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      if (buffer.length < 100) {
        console.log(` ❌ REMOVE: Image buffer too small (${buffer.length} bytes) for ${imgUrl}`);
        removedItems.push(item);
        continue;
      }

      // If already on S3
      if (imgUrl.includes(`${bucketName}.s3`)) {
        console.log(` ✅ KEEP: Already on S3 -> ${imgUrl}`);
        validItems.push(item);
        continue;
      }

      // Upload to S3
      const cleanName = item.name.replace(/[^a-zA-Z0-9_-]/g, '_').toLowerCase();
      let ext = path.extname(imgUrl.split('?')[0]) || '.jpg';
      if (ext.length > 5) ext = '.jpg';
      const filename = `equipment_${cleanName}_${Date.now()}${ext}`;

      console.log(` 📤 UPLOADING to S3: ${filename}...`);
      const { s3Url } = await uploadBufferToS3(buffer, 'explore', filename);
      console.log(` ✅ SUCCESS: Uploaded to S3 -> ${s3Url}`);

      validItems.push({
        ...item,
        image: s3Url
      });
    } catch (err) {
      console.log(` ❌ REMOVE: Failed processing image for "${item.name}":`, err.message);
      removedItems.push(item);
    }
  }

  console.log('\n========================================');
  console.log(`SUMMARY:`);
  console.log(`- Kept & Migrated to S3: ${validItems.length} items`);
  console.log(`- Removed (Broken images): ${removedItems.length} items`);
  console.log('========================================\n');

  // Write updated Data.json
  fs.writeFileSync(dataPath, JSON.stringify(validItems, null, 2), 'utf8');
  console.log(`Updated ${dataPath} with ${validItems.length} valid S3-hosted items.`);
}

processExploreData().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
