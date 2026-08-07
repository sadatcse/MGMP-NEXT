import PageComponent from '../../src/views/Notice';

export const metadata = {
  title: "Notices & Announcements",
  description: "Stay up to date with the latest notices, schedule changes, and announcements from Multigym Premium.",
  alternates: {
    canonical: "/notice",
  },
};

export default function Page() {
  return <PageComponent />;
}
