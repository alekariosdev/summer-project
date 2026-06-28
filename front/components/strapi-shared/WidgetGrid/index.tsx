import { Utensils, User } from "lucide-react";

import type { ReactNode } from "react";
import { WidgetCard } from "./WidgetCard";

// ↓ Descriptive for content editors
export type WidgetVariant = "contentCard" | "bannerCard";

export interface ContentCardData {
  id: string;
  variant: "contentCard";      // Image header + white content body
  backgroundImage: string;
  icon: ReactNode;
  title: string;
  description: string;
  linkLabel: string;
  linkHref: string;
}

export interface BannerCardData {
  id: string;
  variant: "bannerCard";       // Full image background with text overlay
  backgroundImage: string;
  circleIcon?: ReactNode;
  preTitle?: string;
  title: string;
  linkLabel: string;
  linkHref: string;
}

export type WidgetData = ContentCardData | BannerCardData;

const MetlenIcon = () => (
  <svg width="46" height="30" viewBox="0 0 46 30" fill="none" aria-hidden>
    <circle cx="15" cy="15" r="13" stroke="#1B3A5C" strokeWidth="2.5" />
    <circle cx="31" cy="15" r="13" stroke="#1B3A5C" strokeWidth="2.5" />
  </svg>
);

const DESC = "Το νέο, τεχνολογικά προηγμένο λειτουργικό μοντέλο της METLEN που οδηγεί τον ψηφιακό τη μετασχηματισμό και ενισχύει την επιχειρησιακή της αποτελεσματικότητα.";

export const widgetsData: WidgetData[] = [
  {
    id: "workzone",
    variant: "contentCard",                              // ← renamed
    backgroundImage: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80",
    icon: <MetlenIcon />,
    title: "Workzone",
    description: DESC,
    linkLabel: "Enter",
    linkHref: "/workzone",
  },
  {
    id: "restaurant-menu",
    variant: "bannerCard",                               // ← renamed
    backgroundImage: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80",
    circleIcon: <Utensils size={28} className="text-gray-800" />,
    preTitle: "Discover our",
    title: "Restaurant\nMenu",
    linkLabel: "View the menu",
    linkHref: "/restaurant-menu",
  },
  {
    id: "sustainability",
    variant: "contentCard",
    backgroundImage: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80",
    icon: <MetlenIcon />,
    title: "Sustainability",
    description: DESC,
    linkLabel: "Enter",
    linkHref: "/sustainability",
  },
  {
    id: "compliance",
    variant: "contentCard",
    backgroundImage: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=800&q=80",
    icon: <MetlenIcon />,
    title: "Compliance",
    description: DESC,
    linkLabel: "Enter",
    linkHref: "/compliance",
  },
  {
    id: "trinity",
    variant: "contentCard",
    backgroundImage: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80",
    icon: <MetlenIcon />,
    title: "Trinity",
    description: DESC,
    linkLabel: "Enter",
    linkHref: "/trinity",
  },
  {
    id: "communication-hub",
    variant: "contentCard",
    backgroundImage: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=800&q=80",
    icon: <MetlenIcon />,
    title: "Communication Hub",
    description: DESC,
    linkLabel: "Enter",
    linkHref: "/communication-hub",
  },
  {
    id: "exclusive-for-you",
    variant: "bannerCard",
    backgroundImage: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=800&q=80",
    circleIcon: <User size={28} className="text-gray-800" />,
    title: "Exclusive\nFor You",
    linkLabel: "View",
    linkHref: "/exclusive",
  },
  {
    id: "milou-smax",
    variant: "contentCard",
    backgroundImage: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=800&q=80",
    icon: <MetlenIcon />,
    title: "Milou & SMAX",
    description: DESC,
    linkLabel: "Enter",
    linkHref: "/milou-smax",
  },
];

const WidgetGrid = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {widgetsData.map((widget) => (
        <WidgetCard key={widget.id} data={widget} />
      ))}
    </div>
  );
};

export default WidgetGrid;