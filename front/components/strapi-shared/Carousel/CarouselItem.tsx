import Image from 'next/image';
import { getStrapiImageProps } from '@/lib/strapi/normalize';
import type { CAROUSEL_ITEM_DATA } from './types';

interface Props {
  item: CAROUSEL_ITEM_DATA;
}

const CarouselItem = ({ item }: Props) => {
  const imgProps = getStrapiImageProps(item.image);

  return (
    <div className="flex h-full flex-col gap-3 border-l border-gray-200 pl-4">
      {item.badge && (
        <span
          className="w-fit rounded-sm px-3 py-1 text-xs font-medium text-white"
          style={{ backgroundColor: item.badge.hex_color }}
        >
          {item.badge.title}
        </span>
      )}

      {imgProps && (
        <div className="relative aspect-video w-full overflow-hidden rounded-md">
          <Image
            src={imgProps.src}
            alt={imgProps.alt}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        </div>
      )}

      <h3 className="line-clamp-3 flex-1 text-sm font-semibold leading-snug text-gray-900">
        {item.title}
      </h3>

      {item.subtitle && (
        <p className="line-clamp-2 text-xs text-gray-500">{item.subtitle}</p>
      )}
    </div>
  );
};

export default CarouselItem;
