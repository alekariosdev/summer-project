import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getTestBySlug } from '@/lib/strapi';
import BlockRenderer from '@/components/BlockRenderer';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const entry = await getTestBySlug(slug);
  if (!entry) return {};
  return { title: entry.title };
}

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function TestPage({ params }: Props) {
  const { slug } = await params;
  const entry = await getTestBySlug(slug);
  if (!entry) notFound();

  return (
    <main className="container mx-auto max-w-7xl overflow-auto px-4 py-12">
      <h1 className="mb-10 text-4xl font-bold">{entry.title}</h1>
      <BlockRenderer sections={entry.sections} />
    </main>
  );
}
