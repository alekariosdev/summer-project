import type { CAROUSEL_ITEM_DATA, CAROUSEL_DATA } from '@/lib/types';

export type { CAROUSEL_ITEM_DATA };

export type CarouselProps = Omit<CAROUSEL_DATA, '__component' | 'id' | 'items'> & {
  items?: CAROUSEL_ITEM_DATA | CAROUSEL_ITEM_DATA[] | null;
  autoplayDelay?: number;
};
