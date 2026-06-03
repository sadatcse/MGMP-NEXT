import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

export async function POST(req) {
  try {
    const formData = await req.formData();
    const file = formData.get('image');

    if (!file) {
      return NextResponse.json({ message: 'No file uploaded' }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Create unique filename
    const originalName = file.name || 'image.jpg';
    const extension = path.extname(originalName) || '.jpg';
    const filename = `${Date.now()}_${Math.random().toString(36).substring(2, 8)}${extension}`;

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
