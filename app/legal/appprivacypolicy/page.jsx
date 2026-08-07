import PageComponent from '../../../src/views/legal/App_Privacy_Policy';

export const metadata = {
  title: "Privacy Policy",
  description: "Read the Multigym Premium privacy policy covering how member data is collected, used, and protected across our website and app.",
  alternates: {
    canonical: "/legal/appprivacypolicy",
  },
};

export default function Page() {
  return <PageComponent />;
}
