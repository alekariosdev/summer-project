import { getDynamicPageBySlug } from '@/lib/strapi/api/dynamic-pages';
import BlockRenderer from '@/components/BlockRenderer';
import { notFound } from 'next/navigation';
import WidgetGrid from '@/components/strapi-shared/WidgetGrid';

const DynamicPage = async ({ params }: { params: Promise<{ slug: string[] }> }) => {
  const { slug } = await params;
  const dynamicPage = await getDynamicPageBySlug(slug[0]);
  if (!dynamicPage) return notFound();

  return (
    <div>
      <BlockRenderer blocks={dynamicPage.blocks} />
      <WidgetGrid />
    </div>
  );
};

export default DynamicPage;