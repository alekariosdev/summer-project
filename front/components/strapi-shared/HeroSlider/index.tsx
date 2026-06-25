"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import CtaBtn from "@/components/common/CtaBtn";
import { HeroSliderData } from "@/lib/types";
import { getStrapiMediaUrl } from "@/lib/strapi/normalize";
import { getHeroSliderTheme } from "@/lib/themes/hero-slider";

const FADE_MS = 400;

const AUTO_PLAY_INTERVAL = 5000;

const HeroSlider = (data: HeroSliderData) => {
  const [active, setActive] = useState(0);
  const [fading, setFading] = useState(false);
  const theme = getHeroSliderTheme(data.theme);

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
    if (!AUTO_PLAY_INTERVAL || data.slides.length <= 1) return;
    const id = setInterval(
      () => goto((active + 1) % data.slides.length),
      AUTO_PLAY_INTERVAL
    );
    return () => clearInterval(id);
  }, [active, goto, data.slides.length]);

  if (!data.slides.length) return null;

  const slide = data.slides[active];

  return (
    <section
      className="relative w-full"
      data-company={theme.companyAttr}
    >
      <div
        className={cn(
          "grid grid-cols-1 lg:grid-cols-[1fr_400px] xl:grid-cols-[1fr_650px]",
          "h-[500px] md:h-[560px] lg:h-[640px]"
        )}
      >
        <div
          className={cn(
            "h-full flex flex-col justify-center gap-10 px-10 md:px-16 lg:px-24 py-14 lg:py-20 overflow-hidden",
            theme.panel
          )}
        >
          <div
            className={cn(
              "flex gap-0 md:gap-4 max-w-xl min-w-0 transition-all ease-in-out",
              fading
                ? "opacity-0 translate-y-3"
                : "opacity-100 translate-y-0"
            )}
            style={{ transitionDuration: `${FADE_MS}ms` }}
          >
            <span
              aria-hidden
              className={cn(
                "hidden md:block w-[2px] shrink-0 self-stretch rounded-full",
                theme.accentLine
              )}
            />
            <div className="flex min-w-0 flex-1 flex-col gap-4 md:gap-7">
              {slide.badgeLabel && (
                <span
                  className={cn(
                    "inline-flex w-fit items-center rounded-md border px-3 py-1 text-xs md:text-sm",
                    theme.badge
                  )}
                >
                  {slide.badgeLabel}
                </span>
              )}
              <h1
                className={cn(
                  "txt-h3 md:txt-h1 font-semibold leading-[1.15]",
                  theme.heading
                )}
              >
                {slide.title}
              </h1>
              {slide.subtitle && (
                <p
                  className={cn(
                    "text-xs md:txt-medium font-normal leading-relaxed max-w-[440px] wrap-break-word",
                    theme.subtitle
                  )}
                >
                  {slide.subtitle}
                </p>
              )}
              {slide.ctaButton && (
                <CtaBtn {...slide.ctaButton} className={theme.cta} />
              )}
            </div>
          </div>
          {data.slides.length > 1 && (
            <div className="flex items-center gap-2">
              {data.slides.map((_, i) => (
                <Button
                  variant="ghost"
                  size="icon"
                  key={i}
                  onClick={() => goto(i)}
                  aria-label={`Go to slide ${i + 1}`}
                  className={cn(
                    "rounded-full outline-none transition-all duration-300",
                    "focus-visible:ring-2 focus-visible:ring-offset-2",
                    theme.dotFocus,
                    theme.ringOffset,
                    i === active
                      ? cn("h-2.5 w-2.5", theme.dotActive)
                      : cn("h-2 w-2", theme.dotInactive)
                  )}
                />
              ))}
            </div>
          )}
        </div>
        <div
          className={cn(
            "relative h-full overflow-hidden",
            theme.panel,
            "transition-opacity ease-in-out",
            fading ? "opacity-0" : "opacity-100"
          )}
          style={{ transitionDuration: `${FADE_MS}ms` }}
        >
          {slide.image && <Image
            key={slide.id}
            src={getStrapiMediaUrl(slide.image)}
            alt={slide.image.alternativeText ?? slide.title}
            fill
            className="object-cover object-center"
            priority
          />}
        </div>
      </div>
    </section>
  );
}

export default HeroSlider;