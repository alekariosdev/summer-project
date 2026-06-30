import CTAButton from '@/components/common/CtaBtn';
import type { BLOCK_HEADER_DATA } from '@/lib/types';
import { cn } from '@/lib/utils';
import Image from 'next/image';


type SECTION_HEADER_DATA = BLOCK_HEADER_DATA & {
  classNames?: {
    image?: string;
    title?: string;
    subtitle?: string;
    cta?: string;
    divider?: string;
    container?: string;
  };
};

const SectionHeader = ({
  image,
  title,
  subtitle,
  ctaButton,
  classNames,
}: SECTION_HEADER_DATA) => {
  return (
    <div className={cn("w-full flex items-center justify-between", classNames?.container)}>
      <div className="flex items-center gap-5">
        {image && (
          <div className={cn('relative h-12 w-12 shrink-0', classNames?.image)}>
            <Image
              src={image.url}
              alt={image.alternativeText ?? ''}
              fill
              sizes="48px"
              className="object-contain"
            />
          </div>
        )}
        <div className="flex items-stretch gap-3">
          <div className={cn('w-px shrink-0', classNames?.divider)} />
          <div>
            <h2 className={cn('font-normal', classNames?.title)}>
              {title}
            </h2>
            {subtitle && (
              <h2 className={cn('font-normal', classNames?.subtitle)}>
                {subtitle}
              </h2>
            )}
          </div>
        </div>
      </div>

      {ctaButton && (
        <CTAButton
          {...ctaButton}
          className={cn(
            'flex items-center gap-2 px-5 py-3 rounded-2xl border text-sm font-medium bg-white hover:bg-white/90 hover:text-white transition-all duration-300 shrink-0 cursor-pointer',
            classNames?.cta,
          )}
        />
      )}
    </div>
  );
};

export default SectionHeader;