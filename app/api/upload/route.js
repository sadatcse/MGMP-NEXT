import { NextResponse } from 'next/server';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { promises as fs } from 'fs';
import path from 'path';
import sharp from 'sharp';
import { requireAdmin, unauthorizedResponse } from '../../../src/lib/auth-guard';

const COMPRESSIBLE_EXTENSIONS = new Set(['.jpg', '.jpeg', '.png', '.webp']);

const s3Region = process.env.AWS_S3_REGION || 'ap-southeast-1';
const bucketName = process.env.AWS_STORAGE_BUCKET_NAME || 'multigym-website';
const accessKeyId = process.env.AWS_S3_ACCESS_KEY_ID;
const secretAccessKey = process.env.AWS_S3_SECRET_ACCESS_KEY;

const hasS3Config = Boolean(accessKeyId && secretAccessKey && bucketName);

const s3Client = hasS3Config
  ? new S3Client({
      region: s3Region,
      credentials: {
        accessKeyId,
        secretAccessKey,
      },
    })
  : null;

function getContentType(ext) {
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

export async function POST(req) {
  if (!requireAdmin(req)) return unauthorizedResponse();
  try {
    const formData = await req.formData();
    const file = formData.get('image');
    const rawFolder = formData.get('folder') || 'general';

    if (!file) {
      return NextResponse.json({ message: 'No file uploaded' }, { status: 400 });
    }

    // Clean folder path (e.g. 'blog', 'team', 'testimonial', 'notice')
    const folder = String(rawFolder).trim().replace(/[^a-zA-Z0-9_-]/g, '').toLowerCase() || 'general';

    const bytes = await file.arrayBuffer();
    const rawBuffer = Buffer.from(bytes);

    // Create unique filename
    const originalName = file.name || 'image.jpg';
    const extension = (path.extname(originalName) || '.jpg').toLowerCase();
    const filename = `${Date.now()}_${Math.random().toString(36).substring(2, 8)}${extension}`;

    // Resize (cap at 1600px wide) and compress known raster formats
    let buffer = rawBuffer;
    if (COMPRESSIBLE_EXTENSIONS.has(extension)) {
      try {
        let pipeline = sharp(rawBuffer).rotate().resize({ width: 1600, withoutEnlargement: true });
        if (extension === '.png') {
          pipeline = pipeline.png({ compressionLevel: 9 });
        } else if (extension === '.webp') {
          pipeline = pipeline.webp({ quality: 82 });
        } else {
          pipeline = pipeline.jpeg({ quality: 82, mozjpeg: true });
        }
        buffer = await pipeline.toBuffer();
      } catch (compressionError) {
        console.error('Image compression failed, uploading original file:', compressionError);
        buffer = rawBuffer;
      }
    }

    const contentType = getContentType(extension);

    // Attempt AWS S3 Upload if configured
    if (s3Client) {
      try {
        const rootPrefix = 'Multigym premium';
        const s3Key = `${rootPrefix}/${folder}/${filename}`;

        const uploadCommand = new PutObjectCommand({
          Bucket: bucketName,
          Key: s3Key,
          Body: buffer,
          ContentType: contentType,
        });

        await s3Client.send(uploadCommand);

        const s3Url = `https://${bucketName}.s3.${s3Region}.amazonaws.com/${encodeURI(s3Key)}`;

        return NextResponse.json(
          {
            success: true,
            url: s3Url,
            data: { url: s3Url },
            key: s3Key,
            provider: 'aws-s3',
          },
          { status: 200 }
        );
      } catch (s3Error) {
        console.error('AWS S3 Upload Error, attempting local fallback:', s3Error);
      }
    }

    // Local Storage Fallback
    const uploadDir = path.join(process.cwd(), 'public', 'uploads', folder);
    await fs.mkdir(uploadDir, { recursive: true });

    const filePath = path.join(uploadDir, filename);
    await fs.writeFile(filePath, buffer);

    const relativeUrl = `/uploads/${folder}/${filename}`;

    return NextResponse.json(
      {
        success: true,
        url: relativeUrl,
        data: { url: relativeUrl },
        provider: 'local',
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('File Upload Error:', error);
    return NextResponse.json(
      { message: error.message || 'Server error during upload' },
      { status: 500 }
    );
  }
}
