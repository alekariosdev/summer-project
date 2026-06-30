import { ARTICLE_DATA } from "@/lib/types";
import { getStrapiMediaUrl } from "@/lib/strapi/normalize";
import Image from "next/image";

const SlideCard = ({ slide }: { slide: ARTICLE_DATA }) => {
  return (
    <div className="rounded-2xl overflow-hidden bg-white/10 backdrop-blur-sm h-full p-4">
      <div className="relative h-[300px] w-full overflow-hidden rounded-2xl bg-blue-200">
        <Image
          src={getStrapiMediaUrl(slide.image)}
          alt={slide.image.alternativeText ?? ''}
          loading="lazy"
          decoding="async"
          fill
          sizes="(max-width: 1024px) 100vw, 400px"
          className="object-cover"
        />
      </div>
      <div className="p-5 space-y-2">
        <h2 className="text-white font-bold text-[15px] leading-snug">
          {slide.title}
        </h2>
        <p className="text-white/65 text-xs leading-relaxed line-clamp-3">
          {slide.subtitle}
        </p>
      </div>
    </div>
  );
}

export default SlideCard;