"use client";

import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import type { EXTERNAL_ARTICLE_DATA } from "@/lib/types";
import { cn } from "@/lib/utils";


function NewsCard({ article }: { article: EXTERNAL_ARTICLE_DATA }) {
  const { title, url } = article;
  const href = url ?? "#";

  return (
    <article className="group/card flex h-full min-h-[210px] flex-col gap-5 px-8 py-5">
      <h3
        className={cn(
          "flex-1 text-[15px] font-medium leading-[1.7] text-[#1B1B2F]",
          "transition-colors duration-200 group-hover/card:text-violet-800",
        )}
      >
        {title}
      </h3>

      <Link
        href={href}
        target={href.startsWith("http") ? "_blank" : undefined}
        rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
        aria-label={`Read more: ${title}`}
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

export default function ExternalLinksCarousel({ articles }: { articles: EXTERNAL_ARTICLE_DATA[] }) {
  if (!articles.length) return null;

  return (
    <Carousel
      opts={{
        align: "start",
        dragFree: true,
        slidesToScroll: 1,
      }}
    >
      <CarouselContent className="ml-0">
        {articles.map((article) => (
          <CarouselItem
            key={article.documentId ?? article.id}
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
  );
}
