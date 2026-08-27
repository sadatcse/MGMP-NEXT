import BranchDetails from "../../../src/views/BranchDetails";
import { getBranchBySlug } from "../../../src/data/branches";
import branchImage from "../../../src/assets/img/photogalary/3.jpg";

const branch = getBranchBySlug("shiya-masjid");

export const metadata = {
  title: "Shiya Masjid Branch",
  description:
    "Visit Multigym Premium's Shiya Masjid Branch in Mohammadpur, Dhaka — our main branch. Find the address, phone number, and Google Maps location.",
  keywords: "Shiya Masjid gym, Mohammadpur gym, Multigym Premium main branch, gym near Shia Masjid Mor",
  alternates: {
    canonical: "/branches/shiya-masjid",
  },
  openGraph: {
    title: "Shiya Masjid Branch | Multigym Premium",
    description:
      "Visit Multigym Premium's Shiya Masjid Branch in Mohammadpur, Dhaka — our main branch. Find the address, phone number, and Google Maps location.",
    url: "https://www.multigympremium.com/branches/shiya-masjid",
    type: "website",
    images: [{ url: branchImage.src, width: branchImage.width, height: branchImage.height }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Shiya Masjid Branch | Multigym Premium",
    description:
      "Visit Multigym Premium's Shiya Masjid Branch in Mohammadpur, Dhaka — our main branch. Find the address, phone number, and Google Maps location.",
    images: [branchImage.src],
  },
};

export default function Page() {
  return <BranchDetails branch={branch} image={branchImage} />;
}
