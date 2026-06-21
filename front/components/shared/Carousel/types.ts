import type { CarouselItemData, CarouselData } from '@/lib/types';

export type { CarouselItemData };

export type CarouselProps = Omit<CarouselData, '__component' | 'id' | 'items'> & {
  items?: CarouselItemData | CarouselItemData[] | null;
  autoplayDelay?: number;
};
