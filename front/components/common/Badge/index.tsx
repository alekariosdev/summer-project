import { cn } from "@/lib/utils";
import { MasonryArticleListTheme } from "@/lib/themes/masonry-article-list";

const Badge = ({ label, theme }: { label: string, theme: MasonryArticleListTheme }) => {

  return (
    <span className={cn(theme.badge, theme.badgeText, 'px-3 py-[3px] rounded-lg')} role="note" aria-label={`Category: ${label}`}>
      {label}
    </span>
  );
};

export default Badge;