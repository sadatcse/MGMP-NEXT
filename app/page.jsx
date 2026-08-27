import Home from "../src/views/Home";
import { getAllNews, getAllTestimonials, getAllTrainers } from "../src/lib/server-data";

export const metadata = {
  title: {
    absolute: "Multigym Premium | Elite Fitness Club & Training Center",
  },
  description: "Join Multigym Premium, the ultimate luxury fitness club. Get access to state-of-the-art gym equipment, professional master trainers, success stories, and custom training programs.",
  keywords: "multigym, premium gym, master trainers, luxury fitness club, training center, workout routines, wellness",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Multigym Premium | Elite Fitness Club & Training Center",
    description: "Join Multigym Premium, the ultimate luxury fitness club. Get access to state-of-the-art gym equipment, professional master trainers, success stories, and custom training programs.",
    url: "https://www.multigympremium.com",
    siteName: "Multigym Premium",
    images: [
      {
        url: "https://www.multigympremium.com/about.png",
        width: 800,
        height: 600,
        alt: "Multigym Premium Fitness Club",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Multigym Premium | Elite Fitness Club & Training Center",
    description: "Join Multigym Premium, the ultimate luxury fitness club. Get access to state-of-the-art gym equipment, professional master trainers, success stories, and custom training programs.",
    images: ["https://www.multigympremium.com/about.png"],
  },
};

export default async function Page() {
  const [newsPosts, testimonials, trainers] = await Promise.all([
    getAllNews().catch(() => []),
    getAllTestimonials().catch(() => []),
    getAllTrainers().catch(() => []),
  ]);

  return <Home newsPosts={newsPosts} testimonials={testimonials} trainers={trainers} />;
}
