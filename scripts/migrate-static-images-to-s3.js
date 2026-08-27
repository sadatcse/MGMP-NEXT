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

console.log('=== AWS S3 Static (Hardcoded) Image Migration ===');

const s3Client = new S3Client({
  region,
  credentials: { accessKeyId, secretAccessKey },
});

function getContentType(filename) {
  const ext = path.extname(filename.split('?')[0]).toLowerCase();
  switch (ext) {
    case '.png': return 'image/png';
    case '.webp': return 'image/webp';
    case '.gif': return 'image/gif';
    case '.svg': return 'image/svg+xml';
    case '.jpg':
    case '.jpeg':
    default: return 'image/jpeg';
  }
}

async function migrateOne(url, folder, filename) {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`Failed to fetch ${url}: HTTP ${response.status}`);
  const buffer = Buffer.from(await response.arrayBuffer());

  const rootPrefix = 'Multigym premium';
  const s3Key = `${rootPrefix}/${folder}/${filename}`;

  await s3Client.send(new PutObjectCommand({
    Bucket: bucketName,
    Key: s3Key,
    Body: buffer,
    ContentType: getContentType(filename),
  }));

  const s3Url = `https://${bucketName}.s3.${region}.amazonaws.com/${encodeURI(s3Key)}`;
  console.log(` [MIGRATED] ${url} -> ${s3Url}`);
  return s3Url;
}

const targets = [
  { url: 'https://i.ibb.co/CbHJM6j/Screenshot-2024-06-29-085216.png', folder: 'static', filename: 'error404_illustration_1.png' },
  { url: 'https://i.ibb.co/ck1SGFJ/Group.png', folder: 'static', filename: 'error404_illustration_2.png' },
  { url: 'https://i.ibb.co/DYRBvXH/356154662-278385804702827-8405110985639410813-n.jpg', folder: 'static', filename: 'classes_1.jpg' },
  { url: 'https://i.ibb.co/xDXPbtm/356386940-278386884702719-3303309731686936601-n-1.jpg', folder: 'static', filename: 'classes_2.jpg' },
];

async function run() {
  const results = {};
  for (const t of targets) {
    try {
      results[t.url] = await migrateOne(t.url, t.folder, t.filename);
    } catch (err) {
      console.error(` [ERROR] ${t.url}:`, err.message);
    }
  }
  console.log('\n=== Result map (old -> new) ===');
  console.log(JSON.stringify(results, null, 2));
}

run();
