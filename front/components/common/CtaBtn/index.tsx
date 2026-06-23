import { CtaButtonData } from "@/lib/types";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const CtaBtn = (data: CtaButtonData) => {
  return (
    <Button
      variant="outline"
      className="w-fit gap-2 rounded-xl border-white/20 bg-transparent px-5 py-5 text-white hover:bg-white/10 hover:text-white"
      asChild
    >
      <Link href={data.url ?? "#"}>
        <ArrowUpRight className="h-4 w-4" />
        {data.label}
      </Link>
    </Button>
  );
};

export default CtaBtn;