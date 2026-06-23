
import Carousel from '@/components/strapi-shared/Carousel';
import HeroSlider from '@/components/strapi-shared/HeroSlider';
import type { RenderableBlock } from '@/lib/types';

interface Props {
  blocks: RenderableBlock[] | null | undefined;
}

function renderBlock(block: RenderableBlock, index: number) {
  const key = `${block.__component}-${block.id ?? index}`;

  switch (block.__component) {
    case 'shared.carousel': {
      return <Carousel key={key} {...block} />;
    }
    case 'shared.hero-slider':
      return <HeroSlider key={key} {...block} />;
    case 'article.masonry-list':
      console.warn(`[BlockRenderer] Unimplemented component: ${block.__component}`);
      return null;
    default: {
      const unknownComponent = (block as { __component: string }).__component;
      console.warn(`[BlockRenderer] Unknown component: ${unknownComponent}`);
      return null;
    }
  }
}

const BlockRenderer = ({ blocks }: Props) => {
  if (!blocks?.length) return null;

  return <>{blocks.map(renderBlock)}</>;
};

export default BlockRenderer;
