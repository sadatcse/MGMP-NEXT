import { Oswald, Roboto, Acme, Bebas_Neue, Poppins } from 'next/font/google';
import Script from 'next/script';
import Image from 'next/image';
import '../src/index.css';
import AppShell from '../src/components/AppShell';
import { siteConfig } from '../src/lib/site-config';
import { getVisitorSummary } from '../src/lib/server-data';
import Logo from '../src/assets/logo.png';

// Dismisses #site-preloader below as soon as the page is actually ready.
// Runs via `beforeInteractive`, so it fires right after Next's lean core
// runtime loads — not after the full app bundle (Firebase, framer-motion,
// Quill, etc.) finishes downloading/hydrating. That decoupling matters:
// on slow mobile connections/devices, waiting on full hydration to
// dismiss the preloader could otherwise leave it stuck on screen for as
// long as hydration takes, which read as a permanent hang.
const preloaderHideScript = `
(function () {
  try {
    var MIN_MS = 300;
    var SAFETY_MS = 1500;
    var el = document.getElementById('site-preloader');
    if (!el) return;
    var start = Date.now();
    var hidden = false;

    var readFlag = function () {
      try { return sessionStorage.getItem('preloaded'); } catch (e) { return null; }
    };
    var writeFlag = function () {
      try { sessionStorage.setItem('preloaded', 'true'); } catch (e) {}
    };

    var hide = function () {
      if (hidden) return;
      hidden = true;
      var wait = readFlag() ? 0 : Math.max(MIN_MS - (Date.now() - start), 0);
      setTimeout(function () {
        el.style.opacity = '0';
        el.style.pointerEvents = 'none';
        writeFlag();
        setTimeout(function () { el.style.display = 'none'; }, 400);
      }, wait);
    };

    if (readFlag() || document.readyState === 'complete') {
      hide();
    } else {
      window.addEventListener('load', hide, { once: true });
    }
    setTimeout(hide, SAFETY_MS);
  } catch (e) {
    var fallback = document.getElementById('site-preloader');
    if (fallback) fallback.style.display = 'none';
  }
})();
`;

const oswald = Oswald({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-oswald',
  display: 'swap',
});

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-roboto',
  display: 'swap',
});

const acme = Acme({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-acme',
  display: 'swap',
});

const bebasNeue = Bebas_Neue({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-bebas-neue',
  display: 'swap',
});

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-poppins',
  display: 'swap',
});

export const metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.title,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: siteConfig.title,
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.ogImage,
        width: 800,
        height: 600,
        alt: `${siteConfig.name} Fitness Club`,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.title,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
  },
};

export default async function RootLayout({ children }) {
  const gaId = process.env.NEXT_PUBLIC_GA_ID || 'G-1051232E5C';
  const initialVisitorStats = await getVisitorSummary().catch(() => null);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'HealthClub',
    name: siteConfig.business.legalName,
    url: siteConfig.url,
    telephone: siteConfig.business.phone,
    email: siteConfig.business.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: siteConfig.business.streetAddress,
      addressLocality: siteConfig.business.addressLocality,
      addressRegion: siteConfig.business.addressRegion,
      postalCode: siteConfig.business.postalCode,
      addressCountry: siteConfig.business.addressCountry,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: siteConfig.geo.latitude,
      longitude: siteConfig.geo.longitude,
    },
    sameAs: Object.values(siteConfig.social),
  };

  return (
    <html
      lang="en"
      className={`${oswald.variable} ${roboto.variable} ${acme.variable} ${bebasNeue.variable} ${poppins.variable}`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', '${gaId}');
          `}
        </Script>
      </head>
      <body suppressHydrationWarning>
        <div
          id="site-preloader"
          suppressHydrationWarning
          aria-hidden="true"
          className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-[#050505] select-none pointer-events-auto"
        >
          <div className="absolute w-[350px] h-[350px] bg-red-600/10 rounded-full blur-[120px] pointer-events-none"></div>
          <div className="absolute w-[250px] h-[250px] bg-custom-yellow/10 rounded-full blur-[100px] pointer-events-none"></div>

          <div className="relative flex items-center justify-center mb-8">
            <div className="preloader-ring absolute w-36 h-36 rounded-full border-2 border-transparent border-t-red-600 border-r-custom-yellow opacity-80" />
            <div className="preloader-logo w-28 h-28 relative flex items-center justify-center p-3 rounded-2xl bg-black/60 border border-white/10 shadow-2xl backdrop-blur-md">
              <Image
                src={Logo}
                alt="Multigym Premium"
                className="w-full h-full object-contain"
                priority
              />
            </div>
          </div>

          <div className="text-center space-y-2 mb-8">
            <h1 className="text-2xl md:text-3xl font-black uppercase tracking-[0.3em] text-white">
              Multigym <span className="text-custom-yellow">Premium</span>
            </h1>
            <p className="text-xs font-bold uppercase tracking-[0.4em] text-red-600">
              Elevate Your Fitness
            </p>
          </div>

          <div className="w-64 sm:w-80 flex flex-col items-center gap-2">
            <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden relative">
              <div className="preloader-bar-fill h-full w-1/3 bg-gradient-to-r from-red-600 via-custom-yellow to-red-600 rounded-full" />
            </div>
            <div className="flex justify-between w-full text-[11px] font-black uppercase tracking-widest text-gray-500">
              <span>Loading Experience</span>
            </div>
          </div>
        </div>
        <Script
          id="site-preloader-hide"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: preloaderHideScript }}
        />
        <AppShell initialVisitorStats={initialVisitorStats}>{children}</AppShell>
      </body>
    </html>
  );
}
