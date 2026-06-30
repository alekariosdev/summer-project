import { ContentCard } from "../ContentCard";
import { BannerCard } from "../BannerCard";
import { THEME, WIDGET_CARD_GRID_DATA } from "@/lib/types";

export function WidgetCard({ data, theme }: { data: WIDGET_CARD_GRID_DATA, theme?: THEME | null }) {
  switch (data.type) {
    case "content": return <ContentCard data={data} />;
    case "banner": return <BannerCard data={data} />;
    default: return null;
  }
}