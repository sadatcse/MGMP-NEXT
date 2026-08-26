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

console.log('Bucket:', bucketName);
console.log('Region:', region);

const s3Client = new S3Client({
  region,
  credentials: {
    accessKeyId,
    secretAccessKey,
  },
});

async function uploadNutritionist() {
  const imagePath = path.join(process.cwd(), 'Nutritionist.jpeg');
  if (!fs.existsSync(imagePath)) {
    console.error('File Nutritionist.jpeg not found at:', imagePath);
    process.exit(1);
  }

  const fileBuffer = fs.readFileSync(imagePath);
  const rootPrefix = 'Multigym premium';
  const s3Key = `${rootPrefix}/services/Nutritionist_${Date.now()}.jpeg`;

  console.log('Uploading Nutritionist.jpeg to S3 key:', s3Key);

  const command = new PutObjectCommand({
    Bucket: bucketName,
    Key: s3Key,
    Body: fileBuffer,
    ContentType: 'image/jpeg',
  });

  await s3Client.send(command);

  const s3Url = `https://${bucketName}.s3.${region}.amazonaws.com/${encodeURI(s3Key)}`;
  console.log('SUCCESS! AWS S3 URL:', s3Url);
}

uploadNutritionist().catch(err => {
  console.error('Upload failed:', err);
  process.exit(1);
});
