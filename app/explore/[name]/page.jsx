export const metadata = {
  title: 'Equipment Details',
  robots: {
    index: false,
    follow: true,
  },
};

export default async function Page({ params }) {
  const { name } = await params;

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center text-white px-4">
      <p className="text-center text-gray-400 uppercase tracking-widest text-sm">
        {decodeURIComponent(name)}
      </p>
    </div>
  );
}
