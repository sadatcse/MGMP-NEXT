import { NextResponse } from 'next/server';
import connectDB from '../../../../src/lib/db';
import News from '../../../../src/models/News';
import { requireAdmin, unauthorizedResponse } from '../../../../src/lib/auth-guard';
import { generateUniqueNewsSlug } from '../../../../src/lib/slugify.js';

import { revalidatePath } from 'next/cache';

export const dynamic = 'force-dynamic';

export async function POST(req) {
  if (!requireAdmin(req)) return unauthorizedResponse();
  try {
    await connectDB();
    const data = await req.json();

    let postDate = data.date ? new Date(data.date) : new Date();
    if (isNaN(postDate.getTime())) {
      postDate = new Date();
    }

    let tags = data.tags;
    if (typeof tags === 'string') {
      tags = tags.split(',').map(t => t.trim()).filter(Boolean);
    }

    const slug = await generateUniqueNewsSlug(data.slug || data.title);

    const newPost = await News.create({
      ...data,
      slug,
      date: postDate,
      tags: tags || []
    });

    try {
      revalidatePath('/blog');
      revalidatePath('/');
      revalidatePath(`/blog/${newPost.slug}`);
      revalidatePath('/blog/[slug]', 'page');
      revalidatePath('/dashboard/blog_view');
    } catch (revError) {
      console.warn('Revalidate error:', revError.message);
    }

    return NextResponse.json(newPost, { 
      status: 201,
      headers: {
        'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
      }
    });
  } catch (error) {
    console.error('News POST Error:', error);
    return NextResponse.json({ message: error.message || 'Server error' }, { status: 500 });
  }
}
