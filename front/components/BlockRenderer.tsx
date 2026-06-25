import { Fragment } from 'react';
import Carousel from '@/components/strapi-shared/Carousel';
import HeroSlider from '@/components/strapi-shared/HeroSlider';
import MasonryArticleList from '@/components/strapi-shared/MasonryArticleList';
import type { BlockData } from '@/lib/types';

const FULL_BLEED_COMPONENTS = new Set(['shared.hero-slider']);

const PAGE_CONTAINER_CLASS = 'mx-auto w-full max-w-[1440px]';

interface Props {
  blocks: BlockData[] | null | undefined;
}

function renderBlock(block: BlockData, index: number) {
  const key = `${block.__component}-${block.id ?? index}`;
  let node: React.ReactNode;

  switch (block.__component) {
    case 'shared.carousel':
      node = <Carousel {...block} />;
      break;
    case 'shared.hero-slider':
      node = <HeroSlider {...block} />;
      break;
    case 'article.masonry-list':
      node = <MasonryArticleList {...block} />;
      break;
    default: {
      const unknownComponent = (block as { __component: string }).__component;
      console.warn(`[BlockRenderer] Unknown component: ${unknownComponent}`);
      return null;
    }
  }

  if (FULL_BLEED_COMPONENTS.has(block.__component)) {
    return <Fragment key={key}>{node}</Fragment>;
  }

  return (
    <div key={key} className={PAGE_CONTAINER_CLASS}>
      {node}
    </div>
  );
}

const BlockRenderer = ({ blocks }: Props) => {
  if (!blocks?.length) return null;

  return <>{blocks.map(renderBlock)}</>;
};

export default BlockRenderer;
