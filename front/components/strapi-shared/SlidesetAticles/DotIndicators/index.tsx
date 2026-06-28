import { cn } from "@/lib/utils";

interface DotIndicatorsProps {
  count: number;
  current: number;
  onSelect: (index: number) => void;
}

const DotIndicators = ({
  count,
  current,
  onSelect,
}: DotIndicatorsProps) => {
  return (
    <div className="flex items-center justify-center gap-2 mt-3" role="tablist">
      {Array.from({ length: count }).map((_, i) => (
        <button
          key={i}
          role="tab"
          aria-selected={i === current}
          aria-label={`Go to slide ${i + 1}`}
          onClick={() => onSelect(i)}
          className={cn(
            "rounded-full transition-all duration-300",
            i === current
              ? "w-5 h-[6px] bg-white"
              : "w-[6px] h-[6px] bg-white/40 hover:bg-white/60"
          )}
        />
      ))}
    </div>
  );
}

export default DotIndicators;