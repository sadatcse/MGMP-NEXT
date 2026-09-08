import LogoKitView from '../../src/views/LogoKitView';
import { siteConfig } from '../../src/lib/site-config';

export const metadata = {
  title: 'Official Brand & Logo Kit | Vector Assets & Guidelines',
  description:
    'Download official vector logos, brand emblems, wordmarks, app icons, and identity specifications for Multigym Premium. 22 production-grade scalable SVG assets with complete brand rules.',
  keywords: [
    'Multigym Premium logo',
    'Multigym logo kit',
    'brand assets',
    'vector logo svg',
    'gym brand guidelines',
    'Multigym emblem',
    'official fitness logo'
  ],
  alternates: {
    canonical: '/logo'
  },
  openGraph: {
    title: 'Official Brand & Logo Kit | Multigym Premium',
    description:
      'Download official vector logos, brand emblems, wordmarks, and identity specifications for Multigym Premium. Scalable vector artwork, color codes, and usage guidelines.',
    url: `${siteConfig.url}/logo`,
    siteName: siteConfig.name,
    images: [
      {
        url: '/about.png',
        width: 800,
        height: 600,
        alt: 'Multigym Premium Brand Kit'
      }
    ],
    type: 'website'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Official Brand & Logo Kit | Multigym Premium',
    description:
      'Download official vector logos, brand emblems, wordmarks, and identity specifications for Multigym Premium.',
    images: ['/about.png']
  }
};

export default function LogoPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Multigym Premium Brand & Logo Kit',
    description:
      'Official brand assets and vector logo files for Multigym Premium.',
    url: `${siteConfig.url}/logo`,
    isPartOf: {
      '@type': 'WebSite',
      name: siteConfig.name,
      url: siteConfig.url
    },
    about: {
      '@type': 'Brand',
      name: siteConfig.name,
      logo: `${siteConfig.url}/brand/mgp-primary.svg`
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <LogoKitView />
    </>
  );
}
