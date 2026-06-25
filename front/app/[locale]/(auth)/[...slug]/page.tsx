import { getDynamicPageBySlug } from '@/lib/strapi/api/dynamic-pages';
import BlockRenderer from '@/components/BlockRenderer';
import { notFound } from 'next/navigation';
import MasonryArticleList from '@/components/strapi-shared/MasonryArticleList';

const DynamicPage = async ({ params }: { params: Promise<{ slug: string[] }> }) => {
  const { slug } = await params;
  const dynamicPage = await getDynamicPageBySlug(slug[0]);
  if (!dynamicPage) return notFound();

  return (
    <div>
      {JSON.stringify(dynamicPage.blocks)}
      {/* <BlockRenderer blocks={dynamicPage.blocks} /> */}
      {/* <MasonryArticleList /> */}
    </div>
  );
};

export default DynamicPage;