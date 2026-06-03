import Home from "../src/views/Home";

export const metadata = {
  title: "Multigym Premium | Elite Fitness Club & Training Center",
  description: "Join Multigym Premium, the ultimate luxury fitness club. Get access to state-of-the-art gym equipment, professional master trainers, success stories, and custom training programs.",
  keywords: "multigym, premium gym, master trainers, luxury fitness club, training center, workout routines, wellness",
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
};

export default function Page() {
  return <Home />;
}
