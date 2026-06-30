import Image from "next/image";
import type { Event } from "../types";
import TagList from "../ArticleTags";
import ReadMoreLink from "../ReadMoreLink";

interface ArticleCardProps {
  event: Event;
}



const ArticleCard = ({ event }: ArticleCardProps) => {
  const href = event.href ?? "#";

  return (
    <article className="py-5 sm:py-6">
      <div className="space-y-3 md:hidden">
        <div className="flex items-start gap-3">
          <div className="relative h-[84px] w-[84px] shrink-0 overflow-hidden rounded-xl">
            <Image
              src={event.image}
              alt={event.title}
              fill
              className="object-cover"
            />
          </div>
          <h2 className="flex-1 text-[15px] font-semibold leading-snug text-gray-800">
            {event.title}
          </h2>
        </div>
        <p className="text-xs text-gray-500">{event.date}</p>
        <TagList tags={event.tags} />
        <p className="line-clamp-2 text-sm leading-relaxed text-gray-500">
          {event.description}
        </p>
        <div className="flex justify-end pt-1">
          <ReadMoreLink href={href} />
        </div>
      </div>
      <div className="hidden md:flex items-center justify-between">
        <div className="flex items-center gap-4 shrink-0 space-y-2">
          <div className="relative h-[120px] w-[120px] overflow-hidden rounded-2xl">
            <Image
              src={event.image}
              alt={event.title}
              fill
              className="object-cover aspect-square h-full w-full"
            />
          </div>
          <div >
            <p className="text-sm text-gray-600">{event.date}</p>
            <TagList tags={event.tags} />
          </div>
        </div>
        <div className="min-w-0 max-w-[480px] space-y-2">
          <h2 className="text-[19px] font-semibold leading-snug text-gray-800">
            {event.title}
          </h2>
          <p className="line-clamp-2 text-sm leading-relaxed text-gray-500">
            {event.description}
          </p>
        </div>
        <div className="shrink-0 pt-0.5">
          <ReadMoreLink href={href} />
        </div>
      </div>
    </article>
  );
}

export default ArticleCard;