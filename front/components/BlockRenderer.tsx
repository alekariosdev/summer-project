import Carousel from '@/components/strapi-shared/Carousel';
import type { CarouselData, SectionData } from '@/lib/types';

const BLOCK_MAP = {
  'shared.carousel': Carousel,
} as const;

type BlockKey = keyof typeof BLOCK_MAP;

interface Props {
  sections: SectionData[];
}

const BlockRenderer = ({ sections }: Props) => {
  if (!sections?.length) return null;

  return (
    <>
      {sections.map((section, index) => {
        const Component = BLOCK_MAP[section.__component as BlockKey];
        if (!Component) {
          console.warn(`[BlockRenderer] Unknown component: ${section.__component}`);
          return null;
        }

        const { __component, id, ...props } = section;
        return (
          <Component
            key={`${__component}-${id ?? index}`}
            {...(props as Omit<CarouselData, '__component' | 'id'>)}
          />
        );
      })}
    </>
  );
};

export default BlockRenderer;
