import { notFound } from 'next/navigation';
import NewsDetails from '../../../src/components/Newspage/NewsDetails';
import { getNewsPost, getAllNews } from '../../../src/lib/server-data';
import { siteConfig } from '../../../src/lib/site-config';

function plainText(html, length = 160) {
  if (!html) return siteConfig.description;
  const text = html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
  return text.length > length ? `${text.slice(0, length).trim()}...` : text;
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  const post = await getNewsPost(id);

  if (!post) {
    return { title: 'News Not Found' };
  }

  const description = plainText(post.description);

  return {
    title: post.title,
    description,
    alternates: {
      canonical: `/blog/${id}`,
    },
    openGraph: {
      title: post.title,
      description,
      url: `${siteConfig.url}/blog/${id}`,
      type: 'article',
      images: post.image ? [{ url: post.image }] : undefined,
    },
  };
}

export default async function Page({ params }) {
  const { id } = await params;
  const post = await getNewsPost(id);

  if (!post) {
    notFound();
  }

  const allNews = await getAllNews();
  const related = allNews.filter((item) => item._id !== id).slice(0, 4);

  return <NewsDetails post={post} related={related} />;
}
