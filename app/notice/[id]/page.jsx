import { notFound } from 'next/navigation';
import NoticeDetails from '../../../src/views/Notice_Details';
import { getNotice, getAllNotices } from '../../../src/lib/server-data';
import { siteConfig } from '../../../src/lib/site-config';

function plainText(html, length = 160) {
  if (!html) return siteConfig.description;
  const text = html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
  return text.length > length ? `${text.slice(0, length).trim()}...` : text;
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  const notice = await getNotice(id);

  if (!notice) {
    return { title: 'Notice Not Found' };
  }

  const description = plainText(notice.description);

  return {
    title: notice.title,
    description,
    alternates: {
      canonical: `/notice/${id}`,
    },
    openGraph: {
      title: notice.title,
      description,
      url: `${siteConfig.url}/notice/${id}`,
      type: 'article',
      images: notice.image ? [{ url: notice.image }] : undefined,
    },
  };
}

export default async function Page({ params }) {
  const { id } = await params;
  const notice = await getNotice(id);

  if (!notice) {
    notFound();
  }

  const notices = await getAllNotices();

  return <NoticeDetails notice={notice} notices={notices} currentId={id} />;
}
