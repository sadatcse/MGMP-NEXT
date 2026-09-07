import { Suspense } from 'react';
import PageComponent from '../../src/views/WebLogin';

export const metadata = {
  title: "Admin Login",
  robots: {
    index: false,
    follow: false,
  },
};

export default function Page() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center text-white">Loading...</div>}>
      <PageComponent />
    </Suspense>
  );
}
