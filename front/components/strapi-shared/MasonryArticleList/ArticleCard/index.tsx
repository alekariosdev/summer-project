import { getStrapiMediaUrl } from "@/lib/strapi/normalize";
import Image from "next/image";
import { cn } from "@/lib/utils";
import Badge from "@/components/common/Badge";
import ArrowNEIcon from "../ArrowNEIcon";
import { ArticleData } from "@/lib/types";

const ArticleCard = ({ article }: { article: ArticleData & { imageH: number } }) => {
  return (
    <article
      className="group overflow-hidden rounded-2xl bg-white shadow-sm
                 transition-shadow duration-300 ease-out hover:shadow-xl"
    >
      <a
        href={article.slug}
        aria-label={`${article.title}: ${article.subtitle}`}
        className="block rounded-2xl
                   focus-visible:outline-none focus-visible:ring-2
                   focus-visible:ring-violet-500 focus-visible:ring-offset-2"
      >
        <div
          className="relative w-full overflow-hidden rounded-2xl"
          style={{ height: `${article.imageH}px` }}
        >
          <Image
            src={getStrapiMediaUrl(article.image)}
            alt={article.image.alternativeText ?? ''}
            loading="lazy"
            decoding="async"
            fill
            className={cn(
              "absolute inset-0 h-full w-full object-cover",
              "scale-100 transition-transform duration-500 ease-out",
              "group-hover:scale-110 group-focus-within:scale-110",
              "motion-reduce:transition-none motion-reduce:group-hover:scale-100 motion-reduce:group-focus-within:scale-100",
            )}
          />

          {/* Scrim */}
          <div
            className="pointer-events-none absolute inset-0 from-black/25 via-transparent to-transparent"
            aria-hidden="true"
          />

          <div className="pointer-events-none absolute left-3 top-3 z-10">
            <div className="flex gap-2">
              {article.tags.map((tag) => (
                <Badge key={tag.id} label={tag.name} />
              ))}
            </div>
          </div>

          <div
            className={cn(
              "absolute inset-0 z-10 flex items-center justify-center",
              "bg-black/10 opacity-0 transition-opacity duration-300",
              "group-hover:opacity-100 group-focus-within:opacity-100",
              "motion-reduce:transition-none",
            )}
            aria-hidden="true"
          >
            <span
              className={cn(
                "flex h-12 w-12 items-center justify-center rounded-full",
                "bg-white shadow-lg",
                "scale-75 transition-transform duration-200",
                "group-hover:scale-100 group-focus-within:scale-100",
                "motion-reduce:transition-none motion-reduce:group-hover:scale-100 motion-reduce:group-focus-within:scale-100",
              )}
            >
              <ArrowNEIcon className="text-gray-800" />
            </span>
          </div>
        </div>

        {/* ── Text ── */}
        <div className="p-4">
          <h2 className="mb-1.5 text-[15px] font-bold leading-snug text-gray-900">
            {article.title}
          </h2>
          <p className="line-clamp-3 text-sm leading-relaxed text-gray-400">
            {article.subtitle}
          </p>
        </div>
      </a>
    </article>
  );
}

export default ArticleCard;