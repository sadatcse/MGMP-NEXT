import mongoose from 'mongoose';
import fs from 'fs';
import path from 'path';

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

const mongoUri = process.env.MONGO_URI;

async function verifyAll() {
  if (!mongoUri) {
    console.error('No MONGO_URI');
    return;
  }
  await mongoose.connect(mongoUri);
  const db = mongoose.connection.db;

  const targetCollections = ['blogs', 'teams', 'testimonials', 'notices'];

  console.log('=== Database AWS S3 Image Migration Status Check ===\n');

  for (const colName of targetCollections) {
    const colExists = (await db.listCollections({ name: colName }).toArray()).length > 0;
    if (!colExists) continue;

    const col = db.collection(colName);
    const docs = await col.find({}).toArray();

    console.log(`--- Collection: '${colName}' (${docs.length} docs) ---`);
    docs.forEach(doc => {
      const name = doc.full_name || doc.name || doc.title || doc._id;
      const img = doc.image || doc.image_url || 'NO IMAGE';
      const isS3 = img.includes('multigym-website.s3');
      console.log(` - ${name}: ${isS3 ? '[S3 OK]' : '[NON-S3]'} -> ${img}`);
    });
    console.log('');
  }

  await mongoose.disconnect();
}

verifyAll();
