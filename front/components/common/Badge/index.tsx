import { cn } from "@/lib/utils";
import { MasonryArticleListTheme } from "@/lib/themes/masonry-article-list";

const Badge = ({ label, theme }: { label: string, theme: MasonryArticleListTheme }) => {

  return (
    <span className={cn(theme.badge, 'px-3 py-[3px] rounded-lg')} role="note" aria-label={`Category: ${label}`}>
      <span className={theme.badgeText}>{label}</span>
    </span>
  );
};

export default Badge;