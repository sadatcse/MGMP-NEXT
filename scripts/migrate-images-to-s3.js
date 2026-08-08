import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import mongoose from 'mongoose';
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
const mongoUri = process.env.MONGO_URI;

console.log('=== AWS S3 Team Members & Collections Image Migration ===');
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
  const ext = path.extname(filename).toLowerCase();
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
  const cleanFolder = folder.replace(/[^a-zA-Z0-9_-]/g, '').toLowerCase() || 'general';
  const s3Key = `${rootPrefix}/${cleanFolder}/${filename}`;
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

async function fetchImageBuffer(imageUrl) {
  if (imageUrl.startsWith('data:')) {
    const base64Data = imageUrl.split(',')[1];
    return Buffer.from(base64Data, 'base64');
  }

  const response = await fetch(imageUrl);
  if (!response.ok) {
    throw new Error(`Failed to fetch image HTTP ${response.status} from ${imageUrl}`);
  }
  const arrayBuffer = await response.arrayBuffer();
  return Buffer.from(arrayBuffer);
}

async function runMigration() {
  if (!mongoUri) {
    console.error('MONGO_URI not found in .env.');
    return;
  }

  await mongoose.connect(mongoUri);
  const db = mongoose.connection.db;

  // Process Teams (both 'teams' and 'Teams' collections if they exist)
  const teamCollectionNames = ['teams', 'Teams'];
  let totalTeamsUpdated = 0;

  for (const colName of teamCollectionNames) {
    const colExists = (await db.listCollections({ name: colName }).toArray()).length > 0;
    if (!colExists) continue;

    console.log(`\n--- Migrating Team Collection: '${colName}' ---`);
    const col = db.collection(colName);
    const docs = await col.find({}).toArray();

    for (const doc of docs) {
      const currentImg = doc.image_url || doc.image;
      if (!currentImg) continue;

      if (currentImg.includes(`${bucketName}.s3`)) {
        console.log(` [SKIP] Team member "${doc.full_name || doc.name || doc._id}": Already on S3`);
        continue;
      }

      try {
        console.log(` [MIGRATING] Team "${doc.full_name || doc.name || doc._id}": Fetching ${currentImg}...`);
        const buffer = await fetchImageBuffer(currentImg);
        const ext = path.extname(currentImg.split('?')[0]) || '.jpg';
        const filename = `team_${doc._id}_${Date.now()}${ext}`;
        const { s3Url } = await uploadBufferToS3(buffer, 'team', filename);

        const updateObj = doc.image_url !== undefined ? { image_url: s3Url } : { image: s3Url };
        await col.updateOne({ _id: doc._id }, { $set: updateObj });
        console.log(` [UPDATED DB] Team "${doc.full_name || doc.name || doc._id}" -> ${s3Url}`);
        totalTeamsUpdated++;
      } catch (err) {
        console.error(` [ERROR] Failed to migrate team member "${doc.full_name || doc.name || doc._id}":`, err.message);
      }
    }
  }

  // Process Testimonials (both 'testimonials' and 'testimonial')
  const testimonialCollectionNames = ['testimonials', 'testimonial'];
  let totalTestimonialsUpdated = 0;

  for (const colName of testimonialCollectionNames) {
    const colExists = (await db.listCollections({ name: colName }).toArray()).length > 0;
    if (!colExists) continue;

    console.log(`\n--- Migrating Testimonial Collection: '${colName}' ---`);
    const col = db.collection(colName);
    const docs = await col.find({}).toArray();

    for (const doc of docs) {
      const currentImg = doc.image || doc.image_url;
      if (!currentImg) continue;

      if (currentImg.includes(`${bucketName}.s3`)) {
        console.log(` [SKIP] Testimonial "${doc.name || doc.title || doc._id}": Already on S3`);
        continue;
      }

      try {
        console.log(` [MIGRATING] Testimonial "${doc.name || doc.title || doc._id}": Fetching ${currentImg}...`);
        const buffer = await fetchImageBuffer(currentImg);
        const ext = path.extname(currentImg.split('?')[0]) || '.jpg';
        const filename = `testimonial_${doc._id}_${Date.now()}${ext}`;
        const { s3Url } = await uploadBufferToS3(buffer, 'testimonial', filename);

        const updateObj = doc.image !== undefined ? { image: s3Url } : { image_url: s3Url };
        await col.updateOne({ _id: doc._id }, { $set: updateObj });
        console.log(` [UPDATED DB] Testimonial "${doc.name || doc.title || doc._id}" -> ${s3Url}`);
        totalTestimonialsUpdated++;
      } catch (err) {
        console.error(` [ERROR] Failed to migrate testimonial "${doc.name || doc.title || doc._id}":`, err.message);
      }
    }
  }

  console.log('\n========================================');
  console.log('TEAM & TESTIMONIAL MIGRATION COMPLETE');
  console.log(`Teams Updated: ${totalTeamsUpdated}`);
  console.log(`Testimonials Updated: ${totalTestimonialsUpdated}`);
  console.log('========================================\n');

  await mongoose.disconnect();
}

runMigration().catch(err => {
  console.error('Fatal migration error:', err);
  process.exit(1);
});
