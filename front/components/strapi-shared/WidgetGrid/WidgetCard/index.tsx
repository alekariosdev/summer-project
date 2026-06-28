import { ContentCard } from "../ContentCard";
import { BannerCard } from "../BannerCard";

import type { ReactNode } from "react";

// ↓ Descriptive for content editors
export type WidgetVariant = "contentCard" | "bannerCard";

export interface ContentCardData {
  id: string;
  variant: "contentCard";
  backgroundImage: string;
  icon: ReactNode;
  title: string;
  description: string;
  linkLabel: string;
  linkHref: string;
}

export interface BannerCardData {
  id: string;
  variant: "bannerCard";
  backgroundImage: string;
  circleIcon?: ReactNode;
  preTitle?: string;
  title: string;
  linkLabel: string;
  linkHref: string;
}

export type WidgetData = ContentCardData | BannerCardData;

export function WidgetCard({ data }: { data: WidgetData }) {
  switch (data.variant) {
    case "contentCard": return <ContentCard data={data} />;
    case "bannerCard": return <BannerCard data={data} />;
    default: return null;
  }
}