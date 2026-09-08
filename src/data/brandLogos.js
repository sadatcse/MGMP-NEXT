/**
 * Multigym Premium Official Brand & Logo Kit Assets
 * Rebuilt as true vector artwork, colour-separated and infinitely scalable.
 */

export const brandCategories = [
  { id: 'all', name: 'All Assets', count: 22 },
  { id: 'primary', name: 'Primary', count: 3 },
  { id: 'mark-type', name: 'Mark & Type', count: 4 },
  { id: 'one-colour', name: 'One Colour', count: 3 },
  { id: 'dark-backgrounds', name: 'Dark Backgrounds', count: 7 },
  { id: 'applications', name: 'Applications', count: 5 }
];

export const brandColors = [
  {
    name: 'Frame Red',
    hex: '#FF1F1F',
    rgb: '255, 31, 31',
    cmyk: '0, 88, 88, 0',
    role: 'Primary energy, frame border & active brand accent',
    textDark: false
  },
  {
    name: 'Brand Gold',
    hex: '#F3C86E',
    rgb: '243, 200, 110',
    cmyk: '0, 18, 55, 5',
    role: 'Signature emblem & luxury wordmark gold',
    textDark: true
  },
  {
    name: 'Bright Gold',
    hex: '#F7D48C',
    rgb: '247, 212, 140',
    cmyk: '0, 14, 43, 3',
    role: 'High-visibility gold on dark backgrounds only',
    textDark: true
  },
  {
    name: 'Dark Charcoal',
    hex: '#141416',
    rgb: '20, 20, 22',
    cmyk: '9, 9, 0, 91',
    role: 'Near-black surface, tiles & social profiles',
    textDark: false
  },
  {
    name: 'Jet Canvas',
    hex: '#0E0E10',
    rgb: '14, 14, 16',
    cmyk: '13, 13, 0, 94',
    role: 'Core background tone & media dark canvas',
    textDark: false
  },
  {
    name: 'Pure White',
    hex: '#FFFFFF',
    rgb: '255, 255, 255',
    cmyk: '0, 0, 0, 0',
    role: 'Reverse applications, print documents & light stages',
    textDark: true
  }
];

export const sizingRules = [
  {
    title: 'Primary Badge',
    minScreen: '90px width',
    minPrint: '25mm width',
    detail: 'Maintain full proportions. The badge is the primary identity on screen and apparel.'
  },
  {
    title: 'Horizontal Lockup',
    minScreen: '160px width',
    minPrint: '45mm width',
    detail: 'Best suited for horizontal website navbars, letterheads, and wide banner displays.'
  },
  {
    title: 'Favicon & Tiny Badges',
    minScreen: '16px - 24px',
    minPrint: '6mm',
    detail: 'Below 24px, always use mgp-favicon.svg (silhouette). Never use detailed figures below 24px.'
  },
  {
    title: 'Safe Clear Space',
    minScreen: '½ Badge Height',
    minPrint: '½ Badge Height',
    detail: 'Keep clear space equal to at least half the triangle’s height on all four sides.'
  }
];

export const brandRules = {
  dos: [
    'Always use vector SVG format for digital and print reproduction',
    'Use reverse or white badges when placing logos on dark photographs or black jerseys',
    'Preserve generous clear margin around all marks so the silhouette breathes',
    'Pair logos with official brand colors: Frame Red (#FF1F1F) and Brand Gold (#F3C86E)'
  ],
  donts: [
    'Do not stretch, skew, distort, rotate, or tilt the badge',
    'Do not recolour the gold into plain yellow, amber, or orange',
    'Do not place the full-colour badge directly on mid-tone photos without contrast',
    'Do not re-type or recreate the wordmark with custom fonts; it is custom outlined artwork'
  ]
};

export const brandLogos = [
  // 1. Primary
  {
    id: 'mgp-primary',
    category: 'Primary',
    categorySlug: 'primary',
    title: 'Primary Badge',
    description: 'Full colour, transparent background. The default and signature club logo.',
    filename: 'mgp-primary.svg',
    path: '/brand/mgp-primary.svg',
    isDarkStage: false,
    width: 939,
    height: 908,
    viewBox: '0 0 939 908',
    aspectRatio: '939/908',
    tags: ['primary', 'badge', 'signature', 'full colour', 'gold', 'red', 'triangle']
  },
  {
    id: 'mgp-horizontal',
    category: 'Primary',
    categorySlug: 'primary',
    title: 'Horizontal Lockup',
    description: 'Full badge with the V tucked under the triangle to create a balanced horizontal mark.',
    filename: 'mgp-horizontal.svg',
    path: '/brand/mgp-horizontal.svg',
    isDarkStage: false,
    width: 1250,
    height: 366,
    aspectRatio: '1250/366',
    tags: ['horizontal', 'lockup', 'header', 'navbar', 'banner', 'wide']
  },
  {
    id: 'mgp-horizontal-compact',
    category: 'Primary',
    categorySlug: 'primary',
    title: 'Horizontal — Compact',
    description: 'Triangle only, no V. Shortest vertical height engineered for ultra-tight navbars.',
    filename: 'mgp-horizontal-compact.svg',
    path: '/brand/mgp-horizontal-compact.svg',
    isDarkStage: false,
    width: 1346,
    height: 366,
    aspectRatio: '1346/366',
    tags: ['horizontal', 'compact', 'tight', 'navbar', 'slim']
  },

  // 2. Mark and Type
  {
    id: 'mgp-emblem-full',
    category: 'Mark and type',
    categorySlug: 'mark-type',
    title: 'Emblem — Full',
    description: 'Complete badge with the V, closed up. The iconic geometric mark on its own.',
    filename: 'mgp-emblem-full.svg',
    path: '/brand/mgp-emblem-full.svg',
    isDarkStage: false,
    width: 939,
    height: 700,
    aspectRatio: '939/700',
    tags: ['emblem', 'icon', 'mark', 'symbol', 'shield']
  },
  {
    id: 'mgp-emblem',
    category: 'Mark and type',
    categorySlug: 'mark-type',
    title: 'Emblem — Compact',
    description: 'Triangle only, cut cleanly above the name gap. Perfect for stamps, medals and stickers.',
    filename: 'mgp-emblem.svg',
    path: '/brand/mgp-emblem.svg',
    isDarkStage: false,
    width: 819,
    height: 510,
    aspectRatio: '819/510',
    tags: ['emblem', 'compact', 'stamps', 'stickers', 'medals']
  },
  {
    id: 'mgp-figures',
    category: 'Mark and type',
    categorySlug: 'mark-type',
    title: 'Figures Illustration',
    description: 'The iconic athletic figures alone. Watermarks, gym wall murals, and T-shirt backs.',
    filename: 'mgp-figures.svg',
    path: '/brand/mgp-figures.svg',
    isDarkStage: false,
    width: 559,
    height: 504,
    aspectRatio: '559/504',
    tags: ['figures', 'athletes', 'watermark', 'murals', 't-shirt', 'apparel']
  },
  {
    id: 'mgp-wordmark',
    category: 'Mark and type',
    categorySlug: 'mark-type',
    title: 'Wordmark',
    description: 'Name alone, custom outlined typography for when the emblem is already displayed nearby.',
    filename: 'mgp-wordmark.svg',
    path: '/brand/mgp-wordmark.svg',
    isDarkStage: false,
    width: 853,
    height: 229,
    aspectRatio: '853/229',
    tags: ['wordmark', 'typography', 'name', 'text', 'title']
  },

  // 3. One Colour
  {
    id: 'mgp-gold',
    category: 'One colour',
    categorySlug: 'one-colour',
    title: 'All Gold',
    description: 'Single gold ink artwork. Designed for rich red, deep black, or high-contrast photo backdrops.',
    filename: 'mgp-gold.svg',
    path: '/brand/mgp-gold.svg',
    isDarkStage: false,
    width: 939,
    height: 908,
    aspectRatio: '939/908',
    tags: ['gold', 'monochrome', 'single colour', 'luxury', 'metallic']
  },
  {
    id: 'mgp-red',
    category: 'One colour',
    categorySlug: 'one-colour',
    title: 'All Red',
    description: 'Single red ink artwork. For bright white, silver, or gold surface applications.',
    filename: 'mgp-red.svg',
    path: '/brand/mgp-red.svg',
    isDarkStage: false,
    width: 939,
    height: 908,
    aspectRatio: '939/908',
    tags: ['red', 'monochrome', 'single colour', 'screen printing']
  },
  {
    id: 'mgp-black',
    category: 'One colour',
    categorySlug: 'one-colour',
    title: 'All Black',
    description: 'Solid black for invoices, receipts, official legal forms, stamps, and laser engraving.',
    filename: 'mgp-black.svg',
    path: '/brand/mgp-black.svg',
    isDarkStage: false,
    width: 939,
    height: 908,
    aspectRatio: '939/908',
    tags: ['black', 'monochrome', 'invoices', 'stamps', 'engraving', 'print']
  },

  // 4. Dark Backgrounds
  {
    id: 'mgp-white',
    category: 'Dark backgrounds',
    categorySlug: 'dark-backgrounds',
    title: 'All White',
    description: 'Crisp white on dark surfaces. Ideal for high-contrast fitness banners and embroidery on black.',
    filename: 'mgp-white.svg',
    path: '/brand/mgp-white.svg',
    isDarkStage: true,
    width: 939,
    height: 908,
    aspectRatio: '939/908',
    tags: ['white', 'dark background', 'embroidery', 'contrast', 'dark']
  },
  {
    id: 'mgp-reverse',
    category: 'Dark backgrounds',
    categorySlug: 'dark-backgrounds',
    title: 'Reverse Badge',
    description: 'White frame with brightened gold figures — retains signature two-tone prestige on dark backgrounds.',
    filename: 'mgp-reverse.svg',
    path: '/brand/mgp-reverse.svg',
    isDarkStage: true,
    width: 939,
    height: 908,
    aspectRatio: '939/908',
    tags: ['reverse', 'dark', 'white frame', 'bright gold', 'premium']
  },
  {
    id: 'mgp-emblem-white',
    category: 'Dark backgrounds',
    categorySlug: 'dark-backgrounds',
    title: 'Emblem White',
    description: 'Compact emblem rendered in pure white for small, high-density dark UI applications.',
    filename: 'mgp-emblem-white.svg',
    path: '/brand/mgp-emblem-white.svg',
    isDarkStage: true,
    width: 819,
    height: 510,
    aspectRatio: '819/510',
    tags: ['emblem', 'white', 'dark background', 'compact']
  },
  {
    id: 'mgp-horizontal-white',
    category: 'Dark backgrounds',
    categorySlug: 'dark-backgrounds',
    title: 'Horizontal White',
    description: 'Monochrome white horizontal lockup engineered for dark theme website headers & footers.',
    filename: 'mgp-horizontal-white.svg',
    path: '/brand/mgp-horizontal-white.svg',
    isDarkStage: true,
    width: 1250,
    height: 366,
    aspectRatio: '1250/366',
    tags: ['horizontal', 'white', 'header', 'footer', 'dark mode']
  },
  {
    id: 'mgp-horizontal-reverse',
    category: 'Dark backgrounds',
    categorySlug: 'dark-backgrounds',
    title: 'Horizontal Reverse',
    description: 'White frame and bright gold accents across wide format. Designed for dark site navigation.',
    filename: 'mgp-horizontal-reverse.svg',
    path: '/brand/mgp-horizontal-reverse.svg',
    isDarkStage: true,
    width: 1250,
    height: 366,
    aspectRatio: '1250/366',
    tags: ['horizontal', 'reverse', 'dark mode', 'gold accent', 'header']
  },
  {
    id: 'mgp-emblem-full-white',
    category: 'Dark backgrounds',
    categorySlug: 'dark-backgrounds',
    title: 'Emblem Full White',
    description: 'Complete shield emblem in pure white. Zero color clash across any deep background or image.',
    filename: 'mgp-emblem-full-white.svg',
    path: '/brand/mgp-emblem-full-white.svg',
    isDarkStage: true,
    width: 939,
    height: 700,
    aspectRatio: '939/700',
    tags: ['emblem', 'full', 'white', 'dark background', 'shield']
  },
  {
    id: 'mgp-wordmark-white',
    category: 'Dark backgrounds',
    categorySlug: 'dark-backgrounds',
    title: 'Wordmark White',
    description: 'Clean white typography for video lower-thirds, reels, YouTube covers, and dark subtitles.',
    filename: 'mgp-wordmark-white.svg',
    path: '/brand/mgp-wordmark-white.svg',
    isDarkStage: true,
    width: 853,
    height: 229,
    aspectRatio: '853/229',
    tags: ['wordmark', 'white', 'video', 'youtube', 'lower-thirds', 'reels']
  },

  // 5. Applications
  {
    id: 'mgp-app-icon',
    category: 'Applications',
    categorySlug: 'applications',
    title: 'Mobile App Icon',
    description: '512×512px icon with 116px rounded corner radius ready for Google Play & Apple App Store.',
    filename: 'mgp-app-icon.svg',
    path: '/brand/mgp-app-icon.svg',
    isDarkStage: false,
    width: 512,
    height: 512,
    aspectRatio: '1/1',
    tags: ['app icon', 'mobile', 'ios', 'android', 'play store', 'app store']
  },
  {
    id: 'mgp-social-profile',
    category: 'Applications',
    categorySlug: 'applications',
    title: 'Profile — Light',
    description: '1000×1000 square asset with center safe-zone engineered for Facebook & Instagram circular crops.',
    filename: 'mgp-social-profile.svg',
    path: '/brand/mgp-social-profile.svg',
    isDarkStage: false,
    width: 1000,
    height: 1000,
    aspectRatio: '1/1',
    tags: ['profile', 'social media', 'instagram', 'facebook', 'avatar', 'light']
  },
  {
    id: 'mgp-social-profile-dark',
    category: 'Applications',
    categorySlug: 'applications',
    title: 'Profile — Dark',
    description: '1000×1000 square profile asset on luxury near-black (#141416) canvas for dark-mode feeds.',
    filename: 'mgp-social-profile-dark.svg',
    path: '/brand/mgp-social-profile-dark.svg',
    isDarkStage: false,
    width: 1000,
    height: 1000,
    aspectRatio: '1/1',
    tags: ['profile', 'social media', 'dark', 'avatar', 'tiktok', 'youtube']
  },
  {
    id: 'mgp-favicon',
    category: 'Applications',
    categorySlug: 'applications',
    title: 'Favicon Silhouette',
    description: 'Simplified badge silhouette tuned specifically for micro screens below 24px so details remain sharp.',
    filename: 'mgp-favicon.svg',
    path: '/brand/mgp-favicon.svg',
    isDarkStage: false,
    width: 64,
    height: 64,
    aspectRatio: '1/1',
    tags: ['favicon', 'micro', 'browser', 'tab', 'silhouette', '16px', '32px']
  },
  {
    id: 'mgp-favicon-detail',
    category: 'Applications',
    categorySlug: 'applications',
    title: 'Favicon — Detailed Figures',
    description: 'Figure version for browser bookmarks, desktop taskbars, and Retina screens at 32px and above.',
    filename: 'mgp-favicon-detail.svg',
    path: '/brand/mgp-favicon-detail.svg',
    isDarkStage: false,
    width: 64,
    height: 64,
    aspectRatio: '1/1',
    tags: ['favicon', 'detail', 'retina', 'bookmarks', 'desktop']
  }
];
