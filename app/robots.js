import { siteConfig } from '../src/lib/site-config';

export default function robots() {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/webadmin/', '/dashboard/', '/signup'],
    },
    sitemap: `${siteConfig.url}/sitemap.xml`,
  };
}
