import { getStrapiMediaUrl } from "@/lib/strapi/normalize";
import Image from "next/image";
import { cn } from "@/lib/utils";
import Badge from "@/components/common/Badge";
import ArrowNEIcon from "../ArrowNEIcon";
import { ARTICLE_DATA } from "@/lib/types";

const ArticleCard = ({ article }: { article: ARTICLE_DATA & { imageH: number } }) => {

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
          className="relative h-[200px] w-full overflow-hidden rounded-2xl sm:h-(--image-h)"
          style={{ "--image-h": `${article.imageH}px` } as React.CSSProperties}
        >

          <Image
            src={getStrapiMediaUrl(article.image)}
            alt={article.image.alternativeText ?? ''}
            loading="lazy"
            decoding="async"
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className={cn(
              "absolute inset-0 h-full w-full object-cover",
              "scale-100 transition-transform duration-500 ease-out",
              "group-hover:scale-110 group-focus-within:scale-110",
              "motion-reduce:transition-none motion-reduce:group-hover:scale-100 motion-reduce:group-focus-within:scale-100",
            )}
          />

          <div
            className="pointer-events-none absolute inset-0 from-black/25 via-transparent to-transparent"
            aria-hidden="true"
          />

          <div className="pointer-events-none absolute left-3 top-3 z-10">
            <div className="flex gap-2">
              {article.tags.map((tag) => (
                <Badge
                  key={tag.id}
                  label={tag.name}
                  className="border-brand-secondary bg-brand-secondary"
                  textClassName="txt-fine font-weight-bold text-brand-text" />
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

        <div className="p-4">
          <h4 className={cn("txt-subtitle text-brand-text font-weight-medium leading-[100%]", "mb-4")}>
            {article.title}
          </h4>
          <p className={cn("text-brand-text/70 txt-caption font-weight-normal leading-[125%]", "line-clamp-3 text-sm  text-gray-400")}>
            {article.subtitle}
          </p>
        </div>
      </a>
    </article>
  );
}

export default ArticleCard;