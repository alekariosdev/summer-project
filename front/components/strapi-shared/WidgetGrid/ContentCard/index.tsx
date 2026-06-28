import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import type { ReactNode } from "react";


export interface ContentCardData {
  id: string;
  variant: "contentCard";
  backgroundImage: string;
  icon: ReactNode;
  title: string;
  description: string;
  linkLabel: string;
  linkHref: string;
}


export function ContentCard({ data }: { data: ContentCardData }) {
  return (
    <div className="flex flex-col h-full overflow-hidden rounded-[20px] border border-gray-100/80 bg-white shadow-sm">

      {/* Image header */}
      <div className="relative flex h-[200px] shrink-0 items-center justify-center overflow-hidden">
        <Image
          src={data.backgroundImage}
          alt={`${data.title} background`}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-cover"
          priority
        />
        <div className="relative z-10 flex h-[78px] w-[78px] items-center justify-center rounded-full bg-white shadow-md">
          {data.icon}
        </div>
      </div>

      {/* Content body */}
      <div className="flex flex-1 flex-col gap-2 p-5">
        <h3 className="text-[15px] font-semibold leading-snug text-gray-900">
          {data.title}
        </h3>
        <p className="flex-1 text-[13px] leading-relaxed text-gray-500">
          {data.description}
        </p>
        <Link
          href={data.linkHref}
          className="group mt-1 inline-flex w-fit items-center gap-1 text-[13px] font-medium text-gray-900"
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