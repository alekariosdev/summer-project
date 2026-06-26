import { cn } from "@/lib/utils";

const Badge = ({ label, className, textClassName }: { label: string, className?: string, textClassName?: string }) => {

  return (
    <div
      className={cn(
        "inline-flex items-center justify-center px-3 py-[3px] rounded-lg",
        className,
        textClassName,
      )}
      role="note"
      aria-label={`Category: ${label}`}
    >
      {label}
    </div>
  );
};

export default Badge;