import PageComponent from '../../../src/views/About_us';

export const metadata = {
  title: "About Us",
  description: "Learn about the mission, values, and elite culture at Multigym Premium. Discover our luxury workout facilities, custom solutions, and how we empower members to hit their goals.",
  keywords: "about multigym, premium gym, multigym fitness mission, gym culture, gym membership, luxury gym details",
  alternates: {
    canonical: "/aboutus/about",
  },
  openGraph: {
    title: "About Us | Multigym Premium Fitness Club",
    description: "Learn about the mission, values, and elite culture at Multigym Premium. Discover our luxury workout facilities, custom solutions, and how we empower members to hit their goals.",
    url: "https://www.multigympremium.com/aboutus/about",
    type: "website",
    images: ["https://www.multigympremium.com/about.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "About Us | Multigym Premium Fitness Club",
    description: "Learn about the mission, values, and elite culture at Multigym Premium. Discover our luxury workout facilities, custom solutions, and how we empower members to hit their goals.",
    images: ["https://www.multigympremium.com/about.png"],
  },
};

export default function Page() {
  return <PageComponent />;
}
