"use client";

import { useState, useEffect } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import SlideCard from "./SlideCard";
import DotIndicators from "./DotIndicators";
import NewsCard from "./NewsCard";
import SectionHeader from "@/components/strapi-shared/SectionHeader";
import type { SLIDESET_LIST_DATA } from "@/lib/types";

interface SlideItem {
  id: number;
  imageSrc: string;
  imageAlt: string;
  title: string;
  description: string;
}

interface NewsItem {
  id: number;
  title: string;
  href: string;
}

/* ─────────────────────────── Mock Data ─────────────────────── */
const SLIDES: SlideItem[] = [
  {
    id: 1,
    imageSrc: "/images/turbine.jpg",
    imageAlt: "Industrial turbine",
    title: "A leading global industrial and energy company",
    description:
      "The expansion, heavily focused on scaling operations in high-growth networks throughout Italy, Spain...",
  },
  {
    id: 2,
    imageSrc: "/images/plant.jpg",
    imageAlt: "Energy plant",
    title: "Pioneering sustainable energy solutions worldwide",
    description:
      "Committed to reducing carbon footprint while delivering reliable energy to millions globally...",
  },
  {
    id: 3,
    imageSrc: "/images/solar.jpg",
    imageAlt: "Solar farm",
    title: "Expanding operations across emerging markets",
    description:
      "Strategic investments driving growth across European and high-growth emerging markets...",
  },
];

const NEWS_ITEMS: NewsItem[] = [
  {
    id: 1,
    title: "Security Alert: Verifying New Vendor Invoices Post-Rebrand",
    href: "#",
  },
  {
    id: 2,
    title: "Security Alert: Verifying New Vendor Invoices Post-Rebrand",
    href: "#",
  },
  {
    id: 3,
    title: "Security Alert: Verifying New Vendor Invoices Post-Rebrand",
    href: "#",
  },
  {
    id: 4,
    title: "Security Alert: Verifying New Vendor Invoices Post-Rebrand",
    href: "#",
  },
];


const SlidesetAticleList = (data: SLIDESET_LIST_DATA) => {
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
    <section className="w-full py-10 bg-brand-accent" data-company={data.theme}>
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
                {SLIDES.map((slide) => (
                  <CarouselItem key={slide.id}>
                    <SlideCard slide={slide} />
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>

            <DotIndicators
              count={SLIDES.length}
              current={current}
              onSelect={(i) => api?.scrollTo(i)}
            />
          </div>
          <div className="flex grow-0 h-full min-h-0 flex-col gap-4">
            {[NEWS_ITEMS.slice(0, 2), NEWS_ITEMS.slice(2, 4)].map((row, rowIndex) => (
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
    </section>
  );
}

export default SlidesetAticleList;