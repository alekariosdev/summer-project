import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { WIDGET_CARD_GRID_DATA } from "@/lib/types";
import { getStrapiMediaUrl } from "@/lib/strapi/normalize";


export function ContentCard({ data }: { data: WIDGET_CARD_GRID_DATA }) {
  return (
    <div className="mx-auto w-full md:max-w-[300px] flex flex-col h-full overflow-hidden rounded-[20px] 
      border border-gray-100/80 bg-white shadow-sm hover:shadow-brand-accent-bottom transition-shadow duration-300 cursor-pointer">
      <div className="relative flex h-[200px] shrink-0 items-center justify-center overflow-hidden">
        <Image
          src={getStrapiMediaUrl(data.image)}
          alt={`${data.image.alternativeText ?? ''}`}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-cover rounded-[20px]"
          priority
        />
      </div>
      <div className="flex flex-1 flex-col gap-2 p-3">
        <h3 className="txt-h5 font-bold leading-snug text-brand-text">
          {data.title}
        </h3>
        <p className="flex-1 txt-medium font-weight-normal leading-[120%] text-brand-text">
          {data.description}
        </p>
        {data.cta && <Link
          href={data.cta.url ?? '#'}
          className="group mt-1 inline-flex w-fit items-center gap-1 text-[13px] font-medium text-gray-900"
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