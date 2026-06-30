import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { WIDGET_CARD_GRID_DATA } from "@/lib/types";
import { getStrapiMediaUrl } from "@/lib/strapi/normalize";

export function BannerCard({ data }: { data: WIDGET_CARD_GRID_DATA }) {
  return (
    <div className="mx-auto w-full md:max-w-[300px] relative flex h-full min-h-[340px] flex-col 
      overflow-hidden rounded-[20px] cursor-pointer hover:shadow-brand-accent-bottom transition-shadow duration-300">
      <Image
        src={getStrapiMediaUrl(data.image)}
        alt={`${data.image.alternativeText ?? ''}`}
        fill
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        className="object-cover"
        priority
      />
      <div className="relative z-10 flex flex-1 flex-col p-6">
        <div className="flex flex-1 flex-col items-center justify-center gap-3 text-center">
          <h3 className="whitespace-pre-line txt-lead font-bold leading-tight text-brand-text">
            {data.title}
          </h3>
          {data.subtitle && (
            <p className="txt-title font-weight-bold text-brand-text">{data.subtitle}</p>
          )}
        </div>
        {data.cta && <Link
          href={data.cta.url ?? '#'}
          className="group inline-flex w-fit items-center gap-1 text-[13px] font-medium text-gray-900"
        >
          <ArrowUpRight
            size={15}
            className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 text-brand-accent"
          />
          <span className="text-brand-accent hover:text-brand-accent/80">{data.cta.label}</span>
        </Link>}
      </div>
    </div>
  );
}