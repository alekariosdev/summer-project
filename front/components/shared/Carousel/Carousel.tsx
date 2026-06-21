'use client';

import React, { useCallback, useMemo } from 'react';
import Autoplay from 'embla-carousel-autoplay';
import {
  Carousel as CarouselRoot,
  CarouselContent,
  CarouselItem as CarouselSlide,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from '@/components/ui/carousel';
import { cn } from '@/lib/utils';
import CarouselCard from './CarouselItem';
import type { CarouselItemData, CarouselProps } from './types';

function normalizeItems(
  items?: CarouselItemData | CarouselItemData[] | null
): CarouselItemData[] {
  if (!items) return [];
  return Array.isArray(items) ? items : [items];
}

const Carousel: React.FC<CarouselProps> = ({
  title,
  orientation = 'horizontal',
  align = 'start',
  loop = false,
  dragFree = false,
  autoplay = false,
  autoplayDelay = 3000,
  showNavigation = true,
  showDots = false,
  slidesToScroll = 1,
  items,
}) => {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);

  const slideItems = useMemo(() => normalizeItems(items), [items]);

  React.useEffect(() => {
    if (!api) return;
    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap());
    api.on('select', () => setCurrent(api.selectedScrollSnap()));
  }, [api]);

  const plugins = useCallback(
    () =>
      autoplay ? [Autoplay({ delay: autoplayDelay, stopOnInteraction: true })] : [],
    [autoplay, autoplayDelay]
  );

  if (!slideItems.length) return null;

  return (
    <section className="w-full space-y-5 py-8">
      {title && (
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">{title}</h2>
      )}

      <CarouselRoot
        setApi={setApi}
        opts={{ align, loop, dragFree, slidesToScroll }}
        orientation={orientation}
        plugins={plugins()}
        className="w-full"
      >
        <CarouselContent className="-ml-4">
          {slideItems.map((item) => (
            <CarouselSlide
              key={item.id}
              className={cn(
                'pl-4',
                'basis-full',
                'sm:basis-1/2',
                'lg:basis-1/3',
                'xl:basis-1/4'
              )}
            >
              <CarouselCard item={item} />
            </CarouselSlide>
          ))}
        </CarouselContent>

        {showNavigation && (
          <>
            <CarouselPrevious className="hidden sm:flex" />
            <CarouselNext className="hidden sm:flex" />
          </>
        )}
      </CarouselRoot>

      {showDots && count > 1 && (
        <div className="flex justify-center gap-1.5 pt-1">
          {Array.from({ length: count }).map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => api?.scrollTo(i)}
              className={cn(
                'h-2 w-2 rounded-full transition-all',
                i === current ? 'w-4 bg-gray-900' : 'bg-gray-300'
              )}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default Carousel;
