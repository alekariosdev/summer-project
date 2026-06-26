import Image from "next/image";

interface SlideItem {
  id: number;
  imageSrc: string;
  imageAlt: string;
  title: string;
  description: string;
}

const SlideCard = ({ slide }: { slide: SlideItem }) => {
  return (
    <div className="rounded-2xl overflow-hidden bg-white/10 backdrop-blur-sm h-full p-4">
      {/* Thumbnail */}
      <div className="h-[300px] w-full aspect-video rounded-2xl bg-blue-200">
        <Image
          src={slide.imageSrc}
          alt={slide.imageAlt}
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Body */}
      <div className="p-5 space-y-2">
        <h2 className="text-white font-bold text-[15px] leading-snug">
          {slide.title}
        </h2>
        <p className="text-white/65 text-xs leading-relaxed line-clamp-3">
          {slide.description}
        </p>
      </div>
    </div>
  );
}

export default SlideCard;