import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { ReactNode } from "react";


export interface BannerCardData {
  id: string;
  variant: "bannerCard";
  backgroundImage: string;
  circleIcon?: ReactNode;
  preTitle?: string;
  title: string;
  linkLabel: string;
  linkHref: string;
}

export function BannerCard({ data }: { data: BannerCardData }) {
  return (
    <div className="relative flex h-full min-h-[340px] flex-col overflow-hidden rounded-[20px]">

      {/* Full background image */}
      <Image
        src={data.backgroundImage}
        alt={`${data.title} background`}
        fill
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        className="object-cover"
        priority
      />

      {/* Content overlay */}
      <div className="relative z-10 flex flex-1 flex-col p-6">
        <div className="flex flex-1 flex-col items-center justify-center gap-3 text-center">
          {data.circleIcon && (
            <div className="flex h-[78px] w-[78px] items-center justify-center rounded-full bg-white shadow-md">
              {data.circleIcon}
            </div>
          )}
          {data.preTitle && (
            <p className="text-sm font-medium text-gray-700">{data.preTitle}</p>
          )}
          <h3 className="whitespace-pre-line text-[22px] font-bold leading-tight text-gray-900">
            {data.title}
          </h3>
        </div>

        <Link
          href={data.linkHref}
          className="group inline-flex w-fit items-center gap-1 text-[13px] font-medium text-gray-900"
        >
          <ArrowUpRight
            size={15}
            className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
          />
          {data.linkLabel}
        </Link>
      </div>
    </div>
  );
}