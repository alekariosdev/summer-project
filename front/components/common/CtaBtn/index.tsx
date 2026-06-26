import { CTA_BUTTON_DATA } from "@/lib/types";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

type CtaBtnProps = CTA_BUTTON_DATA & {
  className?: string;
};

const CtaBtn = ({ className, ...data }: CtaBtnProps) => {
  return (
    <Button
      variant="outline"
      className={cn(
        "w-fit gap-2 rounded-xl border-white/20 bg-transparent px-5 py-5 text-white hover:bg-white/10 hover:text-white",
        className
      )}
      asChild
    >
      <Link href={data.url ?? "#"} target={data.target}>
        <ArrowUpRight className="h-4 w-4" />
        {data.label}
      </Link>
    </Button>
  );
};

export default CtaBtn;