import Image from "next/image";
import TagList from "../ArticleTags";
import ReadMoreLink from "../ReadMoreLink";
import { getStrapiMediaUrl } from "@/lib/strapi/normalize";
import { ARTICLE_DATA } from "@/lib/types";




const ArticleCard = ({ data }: { data: ARTICLE_DATA }) => {

  return (
    <article className="py-5 sm:py-6">
      <div className="space-y-3 md:hidden">
        <div className="flex items-start gap-3">
          <div className="relative h-[84px] w-[84px] shrink-0 overflow-hidden rounded-xl">
            <Image
              src={getStrapiMediaUrl(data.image)}
              alt={data.image.alternativeText ?? ''}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 84px"
            />
          </div>
          <h2 className="flex-1 text-[15px] font-semibold leading-snug text-gray-800">
            {data.title}
          </h2>
        </div>
        {/* <p className="txt-caption font-weight-bold leading-[120%] text-brand-text">{data.date}</p> */}
        <TagList tags={data.tags} />
        <p className="line-clamp-2 text-sm leading-relaxed text-gray-500">
          {data.subtitle}
        </p>
        <div className="flex justify-end pt-1">
          <ReadMoreLink href={data.slug} />
        </div>
      </div>
      <div className="hidden md:flex items-center justify-between">
        <div className="flex items-center gap-4 shrink-0 space-y-2 w-full max-w-[250px]">
          <div className="relative h-[120px] w-[120px] overflow-hidden rounded-2xl">
            <Image
              src={getStrapiMediaUrl(data.image)}
              alt={data.image.alternativeText ?? ''}
              fill
              className="object-cover aspect-square h-full w-full"
              sizes="(max-width: 768px) 100vw, 120px"
            />
          </div>
          <div >
            {/* <p className="txt-caption font-weight-bold leading-[120%] text-brand-text">{event.date}</p> */}
            <TagList tags={data.tags} />
          </div>
        </div>
        <div className="min-w-0 space-y-2">
          <h2 className="txt-subtitle text-brand-text font-semibold leading-snug">
            {data.title}
          </h2>
          <p className="max-w-[480px] txt-body leading-[150%] text-brand-text/70">
            {data.subtitle}
          </p>
        </div>
        <div className="shrink-0 pt-0.5">
          <ReadMoreLink href={data.slug} />
        </div>
      </div>
    </article>
  );
}

export default ArticleCard;