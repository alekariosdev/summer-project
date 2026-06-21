export type STRAPI_ROLE = {
  id: number;
  name: string;
  type: string;
};

export type AUTH_USER = {
  id: number;
  email: string;
  username: string;
  firstName?: string;
  lastName?: string;
  avatarUrl?: string;
  provider: string;
  confirmed: boolean;
  blocked: boolean;
  role?: STRAPI_ROLE;
  createdAt: string;
  updatedAt: string;
};

// ─── Core Strapi ────────────────────────────────────────────────────────────

export interface StrapiMeta {
  pagination?: {
    page: number;
    pageSize: number;
    pageCount: number;
    total: number;
  };
}

export interface StrapiResponse<T> {
  data: T;
  meta: StrapiMeta;
}

export interface StrapiMediaFormat {
  url: string;
  width: number;
  height: number;
  size: number;
  mime: string;
}

export interface StrapiMedia {
  id: number;
  documentId: string;
  url: string;
  alternativeText?: string | null;
  width?: number;
  height?: number;
  formats?: {
    thumbnail?: StrapiMediaFormat;
    small?: StrapiMediaFormat;
    medium?: StrapiMediaFormat;
    large?: StrapiMediaFormat;
  };
}

// ─── Dynamic Zone base ──────────────────────────────────────────────────────

export interface DynamicZoneBase {
  __component: string;
  id: number;
}

// ─── shared.badge ───────────────────────────────────────────────────────────

export interface BadgeData {
  id: number;
  title: string;
  hex_color: string;
  alignment?: string;
}

// ─── shared.carousel-item ───────────────────────────────────────────────────

export interface CarouselItemData {
  id: number;
  badge?: BadgeData | null;
  title: string;
  subtitle?: string;
  image?: StrapiMedia | null;
}

// ─── shared.carousel ────────────────────────────────────────────────────────

export interface CarouselData extends DynamicZoneBase {
  __component: 'shared.carousel';
  title?: string;
  orientation: 'horizontal' | 'vertical';
  align: 'start' | 'center' | 'end';
  loop: boolean;
  dragFree: boolean;
  autoplay: boolean;
  showNavigation: boolean;
  showDots: boolean;
  slidesToScroll: number;
  items?: CarouselItemData | CarouselItemData[] | null;
}

// ─── Sections union — extend as you add more components ─────────────────────

export type SectionData = CarouselData; // | HeroData | ...

// ─── Test collection type ───────────────────────────────────────────────────

export interface TestEntry {
  id: number;
  documentId: string;
  title: string;
  slug: string;
  sections: SectionData[];
  createdAt: string;
  updatedAt: string;
  publishedAt?: string | null;
}
