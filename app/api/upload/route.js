import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';
import sharp from 'sharp';

const COMPRESSIBLE_EXTENSIONS = new Set(['.jpg', '.jpeg', '.png', '.webp']);

export async function POST(req) {
  try {
    const formData = await req.formData();
    const file = formData.get('image');

    if (!file) {
      return NextResponse.json({ message: 'No file uploaded' }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const rawBuffer = Buffer.from(bytes);

    // Create unique filename
    const originalName = file.name || 'image.jpg';
    const extension = (path.extname(originalName) || '.jpg').toLowerCase();
    const filename = `${Date.now()}_${Math.random().toString(36).substring(2, 8)}${extension}`;

    // Resize (cap at 1600px wide) and compress known raster formats;
    // pass through anything else (gif/svg/etc.) untouched.
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
        console.error('Image compression failed, storing original file:', compressionError);
        buffer = rawBuffer;
      }
    }

    // Target upload directory inside public
    const uploadDir = path.join(process.cwd(), 'public', 'uploads');
    await fs.mkdir(uploadDir, { recursive: true });

    // Write file to public/uploads
    const filePath = path.join(uploadDir, filename);
    await fs.writeFile(filePath, buffer);

    const relativeUrl = `/uploads/${filename}`;

    return NextResponse.json({ 
      success: true, 
      url: relativeUrl,
      data: { url: relativeUrl }
    }, { status: 200 });
  } catch (error) {
    console.error('File Upload Error:', error);
    return NextResponse.json({ message: error.message || 'Server error during upload' }, { status: 500 });
  }
}
