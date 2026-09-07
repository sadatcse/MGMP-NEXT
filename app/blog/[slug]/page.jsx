import { notFound, permanentRedirect } from 'next/navigation';
import NewsDetails from '../../../src/components/Newspage/NewsDetails';
import { getNewsPost, getAllNews } from '../../../src/lib/server-data';
import { siteConfig } from '../../../src/lib/site-config';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

function plainText(html, length = 160) {
  if (!html) return siteConfig.description;
  const text = html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
  return text.length > length ? `${text.slice(0, length).trim()}...` : text;
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = await getNewsPost(slug);

  if (!post) {
    return { title: 'News Not Found' };
  }

  const postSlug = post.slug || post._id;
  const description = plainText(post.description);

  return {
    title: post.title,
    description,
    alternates: {
      canonical: `/blog/${postSlug}`,
    },
    openGraph: {
      title: post.title,
      description,
      url: `${siteConfig.url}/blog/${postSlug}`,
      type: 'article',
      images: post.image ? [{ url: post.image }] : undefined,
    },
  };
}

export default async function Page({ params }) {
  const { slug } = await params;
  const post = await getNewsPost(slug);

  if (!post) {
    notFound();
  }

  // If accessed by legacy MongoDB _id but post has a slug, permanently redirect to the slug URL
  if (post.slug && post.slug !== slug) {
    permanentRedirect(`/blog/${post.slug}`);
  }

  const allNews = await getAllNews();
  const related = allNews.filter((item) => String(item._id) !== String(post._id)).slice(0, 4);

  return <NewsDetails post={post} related={related} />;
}
