import { getDynamicPageBySlug } from '@/lib/strapi/api/dynamic-pages';
import BlockRenderer from '@/components/BlockRenderer';
import { notFound } from 'next/navigation';
import Widget from '@/components/strapi-shared/Widget';

const WIDGET_DATA = {
  imageSrc:
    'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&h=400&q=80',
  title: 'Widget Title',
  subtitle: 'Widget Subtitle',
  href: '/widget',
  buttonLabel: 'Enter',
};

const DynamicPage = async ({ params }: { params: Promise<{ slug: string[] }> }) => {
  const { slug } = await params;
  const dynamicPage = await getDynamicPageBySlug(slug[0]);
  if (!dynamicPage) return notFound();

  return (
    <div>
      <BlockRenderer blocks={dynamicPage.blocks} />
      <Widget {...WIDGET_DATA} />
    </div>
  );
};

export default DynamicPage;