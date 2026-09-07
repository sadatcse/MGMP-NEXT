import mongoose from 'mongoose';
import connectDB from '../src/lib/db.js';
import News from '../src/models/News.js';
import { slugify } from '../src/lib/slugify.js';

async function runMigration() {
  const force = process.argv.includes('--force');
  console.log('--- Starting Blog Slug Generation ---');
  if (force) {
    console.log('Force mode active: Regenerating slugs for ALL posts.');
  }

  try {
    await connectDB();
    console.log('Connected to MongoDB successfully.');

    // Query: either all posts if force, or only posts without a valid slug
    const query = force
      ? {}
      : { $or: [{ slug: { $exists: false } }, { slug: null }, { slug: '' }] };

    const posts = await News.find(query).sort({ date: 1 });
    console.log(`Found ${posts.length} posts to process.`);

    if (posts.length === 0) {
      console.log('No posts require slug generation. Everything is up to date.');
      await mongoose.disconnect();
      process.exit(0);
    }

    let updatedCount = 0;
    const existingSlugs = new Set();

    // Pre-populate existing slugs from DB if not forcing all
    if (!force) {
      const allExisting = await News.find({ slug: { $exists: true, $ne: '' } }).select('slug').lean();
      allExisting.forEach(doc => {
        if (doc.slug) existingSlugs.add(doc.slug);
      });
    }

    for (const post of posts) {
      const baseSlug = slugify(post.title || 'blog-post');
      let candidateSlug = baseSlug;
      let counter = 1;

      while (existingSlugs.has(candidateSlug)) {
        candidateSlug = `${baseSlug}-${counter}`;
        counter++;
      }

      existingSlugs.add(candidateSlug);

      post.slug = candidateSlug;
      await post.save();
      updatedCount++;
      console.log(`[${updatedCount}/${posts.length}] ID: ${post._id} | Title: "${post.title}" -> Slug: "${candidateSlug}"`);
    }

    console.log(`\nMigration completed! Successfully updated ${updatedCount} blog posts with slugs.`);
    await mongoose.disconnect();
    process.exit(0);
  } catch (err) {
    console.error('Migration failed:', err);
    try {
      await mongoose.disconnect();
    } catch (_) {}
    process.exit(1);
  }
}

runMigration();
