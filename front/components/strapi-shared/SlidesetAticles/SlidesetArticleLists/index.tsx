"use client";

import { useState, useEffect } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import SlideCard from "../SlideCard";
import DotIndicators from "../DotIndicators";
import NewsCard from "../NewsCard";
import SectionHeader from "@/components/strapi-shared/SectionHeader";
import type { SLIDESET_LIST_DATA, ARTICLE_DATA } from "@/lib/types";

const SlidesetAticleLists = ({ data, slides, cards }: { data: SLIDESET_LIST_DATA, slides: ARTICLE_DATA[], cards: ARTICLE_DATA[] }) => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!api) return;
    api.on("select", () => setCurrent(api.selectedScrollSnap()));
    return () => {
      api.off("select", () => setCurrent(api.selectedScrollSnap()));
    };
  }, [api]);

  return (
    <div className="section-container">
      {data.header &&
        <SectionHeader {...data.header}
          classNames={{ container: 'mb-10', title: 'txt-h3 md:txt-h2 text-white', divider: 'bg-brand-secondary' }} />}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[400px_1fr]">
        <div className="w-full shrink-0">
          <Carousel
            setApi={setApi}
            opts={{ loop: true }}
            className="w-full"
          >
            <CarouselContent>
              {slides.map((slide) => (
                <CarouselItem key={slide.id}>
                  <SlideCard slide={slide} />
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>

          <DotIndicators
            count={slides.length}
            current={current}
            onSelect={(i) => api?.scrollTo(i)}
          />
        </div>
        <div className="flex grow-0 h-full min-h-0 flex-col gap-4">
          {[cards.slice(0, 2), cards.slice(2, 4)].map((row, rowIndex) => (
            <div
              key={rowIndex}
              className="flex flex-col gap-4 sm:flex-row lg:min-h-0 lg:flex-1"
            >
              {row.map((item) => (
                <NewsCard key={item.id} item={item} />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default SlidesetAticleLists;