"use client";

import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
// import { Badge } from "@/components/ui/badge";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";

/* ─── Types ─────────────────────────────────────────────────── */
export interface NewsArticle {
  id: number;
  source: string;
  title: string;
  href: string;
  underlined?: boolean;
}

/* ─── Mock Data ─────────────────────────────────────────────── */
export const MOCK_NEWS: NewsArticle[] = [
  {
    id: 1,
    source: "Capital",
    title:
      "Κομισιόν: Πράσινο φως στο joint venture ΔΕΗ – Metlen για μπαταρίες σε Βαλκάνια και Ιταλία",
    href: "#",
  },
  {
    id: 2,
    source: "Mononews",
    title:
      "Το comeback της μετοχής της Metlen – Κέρδη 28% από τα χαμηλά του Μαρτίου",
    href: "#",
    underlined: true,
  },
  {
    id: 3,
    source: "Bankingnews",
    title:
      "Υπάρχει μια μετοχή που με επένδυση 100.000 ευρώ ή 2.380 μετοχές Θα πετύχουμε απόδοση.... 238.000 ευρώ;",
    href: "#",
  },
  {
    id: 4,
    source: "Capital",
    title:
      "Κομισιόν: Πράσινο φως στο joint venture ΔΕΗ – Metlen για μπαταρίες σε Βαλκάνια και Ιταλία",
    href: "#",
  },
  {
    id: 5,
    source: "Reuters",
    title:
      "Metlen Energy & Metals expands renewable portfolio with 500MW Balkan wind project in Greece",
    href: "#",
  },
  {
    id: 6,
    source: "Bloomberg",
    title:
      "Greek industrial giant Metlen posts record quarterly earnings on green energy expansion",
    href: "#",
  },
];

/* ─── NewsCard ──────────────────────────────────────────────── */
interface NewsCardProps {
  article: NewsArticle;
}

function NewsCard({ article }: NewsCardProps) {
  return (
    <article className="group/card flex h-full min-h-[210px] flex-col gap-5 px-8 py-5">
      {/* Source label */}
      {/* <Badge
        variant="secondary"
        className="w-fit cursor-default rounded-full bg-zinc-200/80 px-3 py-1 text-xs font-normal text-zinc-600 hover:bg-zinc-200"
      >
        {article.source}
      </Badge> */}

      {/* Headline */}
      <h3
        className={cn(
          "flex-1 text-[15px] font-medium leading-[1.7] text-[#1B1B2F]",
          "transition-colors duration-200 group-hover/card:text-violet-800",
          article.underlined &&
          "underline decoration-current underline-offset-[3px]",
        )}
      >
        {article.title}
      </h3>

      {/* Read more CTA */}
      <Link
        href={article.href}
        aria-label={`Read more: ${article.title}`}
        className="group mt-auto inline-flex w-fit items-center gap-1.5 text-sm font-semibold text-violet-700"
      >
        <ArrowUpRight
          aria-hidden
          className="h-4 w-4 transition-transform duration-150 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        />
        Read more
      </Link>
    </article>
  );
}

/* ─── MetlenInTheNews ───────────────────────────────────────── */
export default function SliderExternalLinks() {
  return (
    <section
      aria-label="METLEN in the news"
      className="relative overflow-hidden bg-[#EAEAEE] py-16"
    >
      {/* ── Header — container-constrained ─────────────────── */}
      <div className="container mx-auto mb-12 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          {/* Title with left accent bar */}
          <div className="flex items-center gap-3">
            <span
              aria-hidden
              className="block h-9 w-[3px] shrink-0 rounded-sm bg-violet-600"
            />
            <h2 className="text-xl font-semibold leading-tight text-[#1B1B2F] sm:text-2xl lg:text-[1.75rem]">
              METLEN in the news
            </h2>
          </div>

          {/* View All button */}
          <Button
            asChild
            className="h-11 shrink-0 gap-2 rounded-xl bg-violet-600 px-5 text-sm font-medium text-white shadow-none hover:bg-violet-700"
          >
            <Link href="#">
              <ArrowUpRight aria-hidden className="h-4 w-4" />
              View All
            </Link>
          </Button>
        </div>
      </div>

      {/* ── Carousel — bleeds to the right ─────────────────── */}
      {/*
       * padding-left aligns the first card with the container's left-content edge:
       *   • screens < 1280 px  →  always 2 rem (32 px)  = lg:px-8
       *   • screens ≥ 1280 px  →  (viewport − 1280px) / 2 + 32px  (centering)
       *
       * The right side overflows naturally — clipped by the section's
       * overflow-hidden — giving the "peek-at-next-card" effect.
       */}
      <div
        style={{
          paddingLeft: "max(2rem, calc((100vw - 1280px) / 2 + 2rem))",
        }}
      >
        <Carousel
          opts={{
            align: "start",
            dragFree: true,
            slidesToScroll: 1,
          }}
        >
          {/* ml-0 overrides Shadcn's default -ml-4 gutter */}
          <CarouselContent className="ml-0">
            {MOCK_NEWS.map((article) => (
              /* pl-0 overrides Shadcn's default pl-4 per-slide gutter */
              <CarouselItem
                key={article.id}
                className={cn(
                  "pl-0",
                  "basis-[320px] sm:basis-[360px] lg:basis-[390px]",
                  "border-r border-zinc-300 last:border-r-0",
                )}
              >
                <NewsCard article={article} />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </section>
  );
}