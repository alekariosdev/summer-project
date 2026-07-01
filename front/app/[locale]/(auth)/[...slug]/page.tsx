import { getDynamicPageBySlug } from '@/lib/strapi/api/dynamic-pages';
import BlockRenderer from '@/components/BlockRenderer';
import { notFound } from 'next/navigation';

const DynamicPage = async ({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string[] }>;
  searchParams: Promise<{ page?: string }>;
}) => {
  const { slug } = await params;
  const { page: pageParam } = await searchParams;
  const page = Math.max(1, Number.parseInt(pageParam ?? '1', 10) || 1);
  const dynamicPage = await getDynamicPageBySlug(slug[0]);
  if (!dynamicPage) return notFound();

  return (
    <div>
      <BlockRenderer blocks={dynamicPage.blocks} page={page} />
    </div>
  );
};

export default DynamicPage;