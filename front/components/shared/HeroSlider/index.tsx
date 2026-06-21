"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

/* ── Types ─────────────────────────────────────────────────────── */

export interface HeroSlideImage {
  url: string;
  alternativeText?: string | null;
}

export interface HeroSlide {
  id: number;
  badge?: string | null;
  title: string;
  description?: string | null;
  buttonText?: string | null;
  buttonLink?: string | null;
  image: HeroSlideImage;
}

export interface HeroSliderProps {
  slides: HeroSlide[];
  autoPlayInterval?: number;
}

/* ── Sample Data ────────────────────────────────────────────────── */

export const HERO_SLIDER_SAMPLE_DATA: HeroSlide[] = [
  {
    id: 1,
    badge: "Energy & Metals",
    title: "A leading global industrial and energy company",
    description:
      "Operating two business Sectors: Energy and Metals that are highly interconnected and complementary, enabling synergies that unlock hidden value for the Company and significantly amplify its performance.",
    buttonText: "About METLEN",
    buttonLink: "/about",
    image: {
      url: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=920&q=80",
      alternativeText: "Energy industrial facility at dusk",
    },
  },
  {
    id: 2,
    badge: "Sustainability",
    title: "Committed to a greener and more sustainable future",
    description:
      "We are investing heavily in renewable energy sources and cutting-edge technologies to reduce our carbon footprint and lead the transition to a cleaner world.",
    buttonText: "Our ESG Strategy",
    buttonLink: "/sustainability",
    image: {
      url: "https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=920&q=80",
      alternativeText: "Wind turbines in a green field",
    },
  },
  {
    id: 3,
    badge: "Innovation",
    title: "Pioneering technologies that shape tomorrow's industry",
    description:
      "From advanced metallurgy to smart grid solutions, our R&D teams push boundaries every day to deliver innovative products and services across global markets.",
    buttonText: "Explore Innovation",
    buttonLink: "/innovation",
    image: {
      url: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=920&q=80",
      alternativeText: "High-tech industrial machinery",
    },
  },
  {
    id: 4,
    badge: "Global Reach",
    title: "Operating across 35+ countries with 25,000+ people",
    description:
      "Our diverse and talented workforce spans every continent, working together to deliver exceptional value for our customers, shareholders, and communities worldwide.",
    buttonText: "Meet Our People",
    buttonLink: "/careers",
    image: {
      url: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=920&q=80",
      alternativeText: "Modern corporate headquarters skyline",
    },
  },
];

/* ── Constants ─────────────────────────────────────────────────── */

const FADE_MS = 400;

/* ── Component ─────────────────────────────────────────────────── */

export function HeroSlider({
  slides,
  autoPlayInterval = 5000,
}: HeroSliderProps) {
  const [active, setActive] = useState(0);
  const [fading, setFading] = useState(false);

  const goto = useCallback(
    (index: number) => {
      if (fading || index === active) return;
      setFading(true);
      setTimeout(() => {
        setActive(index);
        setFading(false);
      }, FADE_MS);
    },
    [active, fading]
  );

  useEffect(() => {
    if (!autoPlayInterval || slides.length <= 1) return;
    const id = setInterval(
      () => goto((active + 1) % slides.length),
      autoPlayInterval
    );
    return () => clearInterval(id);
  }, [active, goto, autoPlayInterval, slides.length]);

  if (!slides.length) return null;

  const slide = slides[active];

  return (
    <section className="relative left-1/2 -translate-x-1/2 w-screen py-6">
      <div
        className={cn(
          "grid grid-cols-1 lg:grid-cols-[1fr_400px] xl:grid-cols-[1fr_650px]",
          "h-[500px] md:h-[560px] lg:h-[640px]"
        )}
      >
        {/* ── Left – Content ───────────────────────────────────── */}
        <div className="h-full bg-[#0B1929] flex flex-col justify-between gap-10 px-10 md:px-16 lg:px-24 py-14 lg:py-20 overflow-hidden">

          {/* Animated content */}
          <div
            className={cn(
              "flex flex-col gap-7 max-w-xl transition-all ease-in-out",
              fading
                ? "opacity-0 translate-y-3"
                : "opacity-100 translate-y-0"
            )}
            style={{ transitionDuration: `${FADE_MS}ms` }}
          >
            {/* Badge */}
            {slide.badge && (
              <div className="flex items-center gap-4">
                <span
                  aria-hidden
                  className="block h-12 w-px rounded-full bg-white/20"
                />
                <span className="inline-flex items-center rounded-md border border-white/20 bg-white/5 px-3 py-1 text-sm text-white/80">
                  {slide.badge}
                </span>
              </div>
            )}

            {/* Title */}
            <h1 className="text-4xl md:text-5xl lg:text-[3.2rem] font-semibold leading-[1.15] text-white">
              {slide.title}
            </h1>

            {/* Description */}
            {slide.description && (
              <p className="text-sm md:text-[0.95rem] leading-relaxed text-white/60 max-w-[44ch]">
                {slide.description}
              </p>
            )}

            {/* CTA */}
            {slide.buttonText && (
              <Button
                variant="outline"
                className="w-fit gap-2 rounded-xl border-white/20 bg-transparent px-5 py-5 text-white hover:bg-white/10 hover:text-white"
                asChild
              >
                <Link href={slide.buttonLink ?? "#"}>
                  <ArrowUpRight className="h-4 w-4" />
                  {slide.buttonText}
                </Link>
              </Button>
            )}
          </div>

          {/* Dot navigation */}
          {slides.length > 1 && (
            <div className="flex items-center gap-2">
              {slides.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goto(i)}
                  aria-label={`Go to slide ${i + 1}`}
                  className={cn(
                    "rounded-full outline-none transition-all duration-300",
                    "focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2",
                    "focus-visible:ring-offset-[#0B1929]",
                    i === active
                      ? "h-2.5 w-2.5 bg-white"
                      : "h-2 w-2 bg-white/30 hover:bg-white/55"
                  )}
                />
              ))}
            </div>
          )}
        </div>
        <div
          className={cn(
            "relative h-full overflow-hidden bg-[#0B1929]",
            "transition-opacity ease-in-out",
            fading ? "opacity-0" : "opacity-100"
          )}
          style={{ transitionDuration: `${FADE_MS}ms` }}
        >
          <Image
            key={slide.id}
            src={slide.image.url}
            alt={slide.image.alternativeText ?? slide.title}
            fill
            className="object-cover object-center"
            priority
          />
        </div>
      </div>
    </section>
  );
}