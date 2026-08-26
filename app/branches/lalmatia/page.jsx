import BranchDetails from "../../../src/views/BranchDetails";
import { getBranchBySlug } from "../../../src/data/branches";
import branchImage from "../../../src/assets/img/photogalary/7.jpg";

const branch = getBranchBySlug("lalmatia");

export const metadata = {
  title: "Lalmatia Branch",
  description:
    "Visit Multigym Premium's Lalmatia Branch, beside Fire Service & Civil Defence, Lalmatia, Dhaka. Find the address, phone number, and Google Maps location.",
  keywords: "Lalmatia gym, gym in Lalmatia Dhaka, Multigym Premium express hub, Lalmatia Shopping Center gym",
  alternates: {
    canonical: "/branches/lalmatia",
  },
  openGraph: {
    title: "Lalmatia Branch | Multigym Premium",
    description:
      "Visit Multigym Premium's Lalmatia Branch, beside Fire Service & Civil Defence, Lalmatia, Dhaka. Find the address, phone number, and Google Maps location.",
    url: "https://www.multigympremium.com/branches/lalmatia",
    type: "website",
  },
};

export default function Page() {
  return <BranchDetails branch={branch} image={branchImage} />;
}
