// components/Widget.tsx

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

interface WidgetProps {
  imageSrc: string;
  imageAlt?: string;
  title: string;
  subtitle: string;
  href: string;
  buttonLabel?: string;
}

const Widget: React.FC<WidgetProps> = ({
  imageSrc,
  imageAlt = "Widget image",
  title,
  subtitle,
  href,
  buttonLabel = "Enter",
}) => {
  return (
    <div
      className="
        section-container
        flex flex-col items-center gap-4
        bg-white
        rounded-2xl
        border border-gray-100
        shadow-sm
        w-full
        md:flex-row md:items-center
      "
    >
      <div className="relative w-full h-[180px] sm:h-[200px] md:w-[400px] md:h-[200px] md:shrink-0 rounded-2xl overflow-hidden bg-gray-50">
        <Image
          src={imageSrc}
          alt={imageAlt}
          loading="lazy"
          decoding="async"
          fill
          sizes="(max-width: 768px) 100vw, 400px"
          className="object-contain"
        />
      </div>
      <div className="flex-1 min-w-0 w-full text-center md:text-left">
        <div className="flex items-center justify-center gap-2.5 sm:gap-3 md:justify-start">
          <span className="shrink-0 inline-block w-[3px] h-6 sm:h-7 rounded-full bg-indigo-500" />
          <h2 className="text-base sm:text-xl md:text-2xl font-bold text-slate-800 leading-tight md:truncate">
            {title}
          </h2>
        </div>
        <p
          className="
            mt-1.5
            text-xs sm:text-sm md:text-base
            text-gray-500
            leading-snug
            line-clamp-2
            md:pl-[19px]
          "
        >
          {subtitle}
        </p>
      </div>
      <Link
        href={href}
        className="
          w-full md:w-auto md:shrink-0
          inline-flex items-center justify-center gap-1.5 sm:gap-2
          bg-violet-500 hover:bg-violet-600 active:bg-violet-700
          transition-colors duration-200
          text-white font-semibold
          text-sm sm:text-base
          px-4 md:px-5
          py-3 md:py-3.5
          rounded-xl
          whitespace-nowrap
          focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400 focus-visible:ring-offset-2
        "
      >
        <ArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.5]" />
        <span>{buttonLabel}</span>
      </Link>
    </div>
  );
};

export default Widget;