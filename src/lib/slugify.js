import News from '../models/News.js';

/**
 * Converts a string into a clean, URL-friendly slug.
 * Supports Unicode/multilingual characters, removes special symbols, collapses hyphens.
 *
 * @param {string} text
 * @returns {string}
 */
export function slugify(text) {
  if (!text || typeof text !== 'string') return '';

  return text
    .toString()
    .normalize('NFKD')
    .toLowerCase()
    .trim()
    // Replace characters that are not unicode letters, unicode numbers, spaces, or hyphens
    .replace(/[^\p{L}\p{N}\s-]+/gu, '')
    // Replace whitespace and underscores with a single hyphen
    .replace(/[\s_]+/g, '-')
    // Replace consecutive hyphens with a single hyphen
    .replace(/-+/g, '-')
    // Trim hyphens from beginning and end
    .replace(/^-+|-+$/g, '') || 'blog-post';
}

/**
 * Generates a guaranteed unique slug for a blog post.
 * If base slug exists, appends `-1`, `-2`, etc.
 *
 * @param {string} text - Title or custom slug string
 * @param {string|mongoose.Types.ObjectId} [excludeId=null] - Exclude current post during edit
 * @returns {Promise<string>}
 */
export async function generateUniqueNewsSlug(text, excludeId = null) {
  const baseSlug = slugify(text) || 'blog-post';
  let slug = baseSlug;
  let counter = 1;

  while (true) {
    const query = { slug };
    if (excludeId) {
      query._id = { $ne: excludeId };
    }

    const existing = await News.findOne(query).select('_id').lean();
    if (!existing) {
      break;
    }

    slug = `${baseSlug}-${counter}`;
    counter++;
  }

  return slug;
}
