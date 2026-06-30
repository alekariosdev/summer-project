import { cn } from "@/lib/utils";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const ReadMoreLink = ({ href }: { href: string }) => {
  return (
    <Link
      href={href}
      className={cn(
        "group inline-flex items-center gap-1 whitespace-nowrap",
        "text-sm font-medium text-violet-600 underline underline-offset-4",
        "decoration-violet-400 transition-colors",
        "hover:text-violet-800 hover:decoration-violet-600"
      )}
    >
      <ArrowUpRight
        className="h-4 w-4 shrink-0 transition-transform
                   group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
      />
      Read more
    </Link>
  );
}

export default ReadMoreLink;