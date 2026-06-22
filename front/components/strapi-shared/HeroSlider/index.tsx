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

/* ─────────────────────────────────────────────────────────────────── */

const FADE_MS = 400;

export const HeroSlider = ({
  slides,
  autoPlayInterval = 5000,
}: HeroSliderProps) => {
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
            <h1 className="font-semibold leading-[1.15] text-white">
              {slide.title}
            </h1>

            {/* Description */}
            {slide.description && (
              <p className="text-medium font-normal leading-relaxed text-white/60 max-w-[44ch]">
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