import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import type { EXTERNAL_LINKS_SLIDER_DATA } from "@/lib/types";
import ExternalLinksCarousel from "./ExternalLinksCarousel";

const SliderExternalLinks = ({
  header,
  articles,
  theme,
}: EXTERNAL_LINKS_SLIDER_DATA) => {
  const resolvedArticles = articles?.articles ?? [];
  const title = header?.title ?? "METLEN in the news";
  const cta = header?.ctaButton;

  return (
    <section
      aria-label={title}
      className="relative overflow-x-clip"
      data-company={theme}
    >
      <div className="mb-12">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span
              aria-hidden
              className="block h-9 w-[3px] shrink-0 rounded-sm bg-violet-600"
            />
            <div>
              <h2 className="text-xl font-semibold leading-tight text-[#1B1B2F] sm:text-2xl lg:text-[1.75rem]">
                {title}
              </h2>
              {header?.subtitle && (
                <p className="mt-1 text-sm text-zinc-600">{header.subtitle}</p>
              )}
            </div>
          </div>

          {cta?.url && (
            <Button
              asChild
              className="h-11 shrink-0 gap-2 rounded-xl bg-violet-600 px-5 text-sm font-medium text-white shadow-none hover:bg-violet-700"
            >
              <Link
                href={cta.url}
                target={cta.target === "_blank" ? "_blank" : undefined}
                rel={cta.target === "_blank" ? "noopener noreferrer" : undefined}
              >
                <ArrowUpRight aria-hidden className="h-4 w-4" />
                {cta.label ?? "View All"}
              </Link>
            </Button>
          )}
        </div>
      </div>

      <div className="overflow-x-auto pl-8 md:pl-[max(0px,calc((100vw-1440px)/2))]">
        <ExternalLinksCarousel articles={resolvedArticles} />
      </div>
    </section>
  );
};

export default SliderExternalLinks;
