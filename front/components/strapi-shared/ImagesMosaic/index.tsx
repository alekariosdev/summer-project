import Image from "next/image"
import type { IMAGES_MOSAIC_DATA, STRAPI_MEDIA } from "@/lib/types"
import { getStrapiMediaUrl } from "@/lib/strapi/normalize"

const MosaicTile = ({ image, index, sizes }: { image: STRAPI_MEDIA, index: number, sizes: string }) => {
  return (
    <div className="relative h-[380px] w-full overflow-hidden rounded-[20px]">
      <Image
        src={getStrapiMediaUrl(image)}
        alt={image.alternativeText ?? ''}
        fill
        priority={index < 2}
        sizes={sizes}
        className="object-cover"
      />
    </div>
  )
}

const ImagesMosaic = ({ images }: IMAGES_MOSAIC_DATA) => {
  const topRow = images.slice(0, 2)
  const bottomRow = images.slice(2, 5)

  return (
    <div className="flex w-full flex-col gap-3 section-container">
      <div className="grid grid-cols-2 gap-3">
        {topRow.map((img, i) => (
          <MosaicTile
            key={img.id ?? `top-${i}`}
            image={img}
            index={i}
            sizes="(max-width: 640px) 50vw, 50vw"
          />
        ))}
      </div>
      <div className="grid grid-cols-3 gap-3">
        {bottomRow.map((img, i) => (
          <MosaicTile
            key={img.id ?? `bot-${i}`}
            image={img}
            index={i + 2}
            sizes="(max-width: 640px) 33vw, 33vw"
          />
        ))}
      </div>
    </div>
  )
}

export default ImagesMosaic
