// components/MetlenInsiderHub.tsx
"use client";

import * as React from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";

/* ─────────────────────────── Types ─────────────────────────── */
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

/* ─────────────────────── Sub-components ────────────────────── */

/** Left-side carousel card */
function SlideCard({ slide }: { slide: SlideItem }) {
  return (
    <div className="rounded-2xl overflow-hidden bg-white/10 backdrop-blur-sm h-full p-4">
      {/* Thumbnail */}
      <div className="h-[300px] w-full aspect-video rounded-2xl bg-blue-200">
        <Image
          src={slide.imageSrc}
          alt={slide.imageAlt}
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Body */}
      <div className="p-5 space-y-2">
        <h2 className="text-white font-bold text-[15px] leading-snug">
          {slide.title}
        </h2>
        <p className="text-white/65 text-xs leading-relaxed line-clamp-3">
          {slide.description}
        </p>
      </div>
    </div>
  );
}

/** Dot pagination indicator */
function DotIndicators({
  count,
  current,
  onSelect,
}: {
  count: number;
  current: number;
  onSelect: (index: number) => void;
}) {
  return (
    <div className="flex items-center justify-center gap-2 mt-3" role="tablist">
      {Array.from({ length: count }).map((_, i) => (
        <button
          key={i}
          role="tab"
          aria-selected={i === current}
          aria-label={`Go to slide ${i + 1}`}
          onClick={() => onSelect(i)}
          className={cn(
            "rounded-full transition-all duration-300",
            i === current
              ? "w-5 h-[6px] bg-white"
              : "w-[6px] h-[6px] bg-white/40 hover:bg-white/60"
          )}
        />
      ))}
    </div>
  );
}

/** Single cyan news card */
function NewsCard({ item }: { item: NewsItem }) {
  return (
    <div className="group flex min-h-0 flex-1 flex-col justify-between rounded-2xl bg-[#00C8D4] p-5 transition-colors duration-200 hover:bg-[#00b8c4] cursor-pointer">
      <p className="text-white font-semibold text-sm leading-snug">
        {item.title}
      </p>

      <a
        href={item.href}
        aria-label={`Read more: ${item.title}`}
        className="flex items-center gap-1.5 text-white/90 text-xs font-medium mt-4 w-fit"
      >
        <ArrowRight
          size={14}
          className="transition-transform duration-200 group-hover:translate-x-1"
        />
        <span>Read more</span>
      </a>
    </div>
  );
}

/* ─────────────────────── Main Component ────────────────────── */
export function SlidesetAticleList() {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);

  React.useEffect(() => {
    if (!api) return;

    api.on("select", () => setCurrent(api.selectedScrollSnap()));

    return () => {
      api.off("select", () => setCurrent(api.selectedScrollSnap()));
    };
  }, [api]);

  return (
    <section className="bg-[#6B3FD4] w-full p-8 md:p-24">
      <div className="container mx-auto">
        {/* ── Header ── */}
        <header className="flex items-center gap-3 mb-8">
          <span className="block w-[3px] h-7 rounded-sm bg-white" aria-hidden />
          <h1 className="text-white text-2xl font-semibold tracking-wide">
            METLEN Insider Hub
          </h1>
        </header>

        {/* ── Body ── */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[400px_1fr]">

          {/* Left — Carousel */}
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

          {/* Right — 2×2 News Grid */}
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