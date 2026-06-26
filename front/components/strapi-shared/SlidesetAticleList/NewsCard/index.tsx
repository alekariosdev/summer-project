import { ArrowRight } from "lucide-react";

interface NewsItem {
  id: number;
  title: string;
  href: string;
}

const SlidesetCard = ({ item }: { item: NewsItem }) => {
  return (
    <div className="group flex min-h-0 flex-1 flex-col justify-between rounded-2xl bg-[#00C8D4] p-5 transition-colors duration-200 hover:bg-[#00b8c4] cursor-pointer">
      <p className="text-white font-semibold text-sm leading-snug">
        {item.title}
      </p>

      <a
        href={item.href}
        aria-label={`Read more: ${item.title}`}
        className="flex items-center gap-1.5 text-white/90 text-xs font-medium mt-4 w-fit"
      >
        <ArrowRight
          size={14}
          className="transition-transform duration-200 group-hover:translate-x-1"
        />
        <span>Read more</span>
      </a>
    </div>
  );
}

export default SlidesetCard;