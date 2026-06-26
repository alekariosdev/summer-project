import { cn } from "@/lib/utils";
import { MASONRY_ARTICLE_LIST_THEME } from "@/lib/themes/masonry-article-list";

const Badge = ({ label, theme }: { label: string, theme: MASONRY_ARTICLE_LIST_THEME }) => {

  return (
    <span className={cn(theme.badge, theme.badgeText, 'px-3 py-[3px] rounded-lg')} role="note" aria-label={`Category: ${label}`}>
      {label}
    </span>
  );
};

export default Badge;