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

// ─── shared.hero-slider ──────────────────────────────────────────────────────

export interface HeroSliderItemData {
  id: number;
  title: string;
  subtitle?: string;
  badgeLabel?: string;
  image?: StrapiMedia | null;
  ctaButton?: CtaButtonData | null;
}

export interface HeroSliderData extends DynamicZoneBase {
  __component: 'shared.hero-slider';
  slides: HeroSliderItemData[];
}

// ─── Sections union — extend as you add more components ─────────────────────

export type SectionData = CarouselData | HeroSliderData; // | HeroData | ...

// ─── shared.cta-button ──────────────────────────────────────────────────────

export interface CtaButtonData {
  id: number;
  label?: string;
  icon?: string;
  target?: '_self' | '_blank';
  url?: string;
}

// ─── shared.block-header ────────────────────────────────────────────────────

export interface BlockHeaderData {
  id: number;
  title: string;
  subtitle?: string;
  image?: StrapiMedia | null;
  ctaButton?: CtaButtonData | null;
}

// ─── shared.seo ─────────────────────────────────────────────────────────────

export interface SeoData {
  id: number;
  meta_title?: string;
  meta_description?: string;
  canonical_url?: string;
  og_image?: StrapiMedia | null;
}

// ─── article.masonry-list ───────────────────────────────────────────────────

export interface ArticleFiltersData {
  featured_only: boolean;
  company_id: string;
  category_ids: string[];
  tag_ids: string[];
  sort_by: 'newest' | 'oldest' | 'featured_first';
}

export interface FilteredArticlesData {
  filters: ArticleFiltersData;
  selected_ids: string[];
}

export interface MasonryListData extends DynamicZoneBase {
  __component: 'article.masonry-list';
  header?: BlockHeaderData | null;
  articles?: FilteredArticlesData | null;
}

// ─── Dynamic page blocks union — extend as you add more components ──────────

export type BlockData = MasonryListData | HeroSliderData; // | HeroData | ...

export type RenderableBlock = SectionData | BlockData;

// ─── Dynamic page collection type ───────────────────────────────────────────

export interface DynamicPageEntry {
  id: number;
  documentId: string;
  title: string;
  slug: string;
  blocks: BlockData[];
  seo?: SeoData | null;
  createdAt: string;
  updatedAt: string;
  publishedAt?: string | null;
  locale?: string;
}

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
