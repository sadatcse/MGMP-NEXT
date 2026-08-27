import PageComponent from '../../src/views/Contact_us';
import contactImage from '../../src/assets/img/photogalary/1.jpg';

export const metadata = {
  title: "Contact Us",
  description: "Get in touch with Multigym Premium. Find our phone numbers, physical address, support email, and operational hours, or submit an inquiry directly through our portal.",
  keywords: "contact multigym, gym address, support number, multigym locations, membership inquiries",
  alternates: {
    canonical: "/contactus",
  },
  openGraph: {
    title: "Contact Us | Multigym Premium Club Support",
    description: "Get in touch with Multigym Premium. Find our phone numbers, physical address, support email, and operational hours, or submit an inquiry directly through our portal.",
    url: "https://www.multigympremium.com/contactus",
    type: "website",
    images: [{ url: contactImage.src, width: contactImage.width, height: contactImage.height }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Us | Multigym Premium Club Support",
    description: "Get in touch with Multigym Premium. Find our phone numbers, physical address, support email, and operational hours, or submit an inquiry directly through our portal.",
    images: [contactImage.src],
  },
};

export default function Page() {
  return <PageComponent />;
}
