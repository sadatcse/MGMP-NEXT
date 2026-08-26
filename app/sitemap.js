import { siteConfig } from '../src/lib/site-config';
import { getAllNews, getAllNotices, getAllTrainerSlugs } from '../src/lib/server-data';

export default async function sitemap() {
  const staticRoutes = [
    { url: '', changeFrequency: 'daily', priority: 1.0 },
    { url: '/aboutus/about', changeFrequency: 'monthly', priority: 0.8 },
    { url: '/service', changeFrequency: 'monthly', priority: 0.8 },
    { url: '/trainers', changeFrequency: 'monthly', priority: 0.8 },
    { url: '/explore', changeFrequency: 'monthly', priority: 0.6 },
    { url: '/contactus', changeFrequency: 'monthly', priority: 0.5 },
    { url: '/branches/shiya-masjid', changeFrequency: 'monthly', priority: 0.7 },
    { url: '/branches/lalmatia', changeFrequency: 'monthly', priority: 0.7 },
    { url: '/blog', changeFrequency: 'daily', priority: 0.8 },
    { url: '/notice', changeFrequency: 'daily', priority: 0.6 },
    { url: '/legal/termsofuse', changeFrequency: 'yearly', priority: 0.3 },
    { url: '/legal/cookiepolicy', changeFrequency: 'yearly', priority: 0.3 },
    { url: '/legal/refundpolicy', changeFrequency: 'yearly', priority: 0.3 },
    { url: '/legal/appprivacypolicy', changeFrequency: 'yearly', priority: 0.3 },
  ].map((route) => ({
    url: `${siteConfig.url}${route.url}`,
    lastModified: new Date(),
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));

  const [news, notices, trainers] = await Promise.all([
    getAllNews().catch(() => []),
    getAllNotices().catch(() => []),
    getAllTrainerSlugs().catch(() => []),
  ]);

  const newsRoutes = news.map((post) => ({
    url: `${siteConfig.url}/blog/${post._id}`,
    lastModified: new Date(post.date),
    changeFrequency: 'monthly',
    priority: 0.6,
  }));

  const noticeRoutes = notices.map((notice) => ({
    url: `${siteConfig.url}/notice/${notice._id}`,
    lastModified: new Date(notice.date),
    changeFrequency: 'monthly',
    priority: 0.5,
  }));

  const trainerRoutes = trainers
    .filter((trainer) => trainer.short_name)
    .map((trainer) => ({
      url: `${siteConfig.url}/trainers/${trainer.short_name}`,
      lastModified: trainer.date ? new Date(trainer.date) : new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    }));

  return [...staticRoutes, ...newsRoutes, ...noticeRoutes, ...trainerRoutes];
}
