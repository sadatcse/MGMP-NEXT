import { notFound } from 'next/navigation';
import TrainersDetails from '../../../src/views/Trainers_Details';
import { getTrainerBySlug } from '../../../src/lib/server-data';
import { siteConfig } from '../../../src/lib/site-config';

export async function generateMetadata({ params }) {
  const { name } = await params;
  const trainer = await getTrainerBySlug(name);

  if (!trainer) {
    return { title: 'Trainer Not Found' };
  }

  const description = trainer.bio
    ? trainer.bio.slice(0, 160)
    : `Meet ${trainer.full_name}, ${trainer.certification || 'certified trainer'} at ${siteConfig.name}.`;

  return {
    title: trainer.full_name,
    description,
    alternates: {
      canonical: `/trainers/${name}`,
    },
    openGraph: {
      title: trainer.full_name,
      description,
      url: `${siteConfig.url}/trainers/${name}`,
      type: 'profile',
      images: trainer.image_url ? [{ url: trainer.image_url }] : undefined,
    },
  };
}

export default async function Page({ params }) {
  const { name } = await params;
  const trainer = await getTrainerBySlug(name);

  if (!trainer) {
    notFound();
  }

  return <TrainersDetails data={trainer} />;
}
