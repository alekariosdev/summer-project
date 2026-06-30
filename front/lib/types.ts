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

export type BLOCK_DATA =
  | CAROUSEL_DATA
  | HERO_SLIDER_DATA
  | MASONRY_LIST_DATA
  | SLIDESET_LIST_DATA
  | SEPARATOR_DATA
  | WIDGET_DATA
  | WIDGET_GRID_DATA
  | VERTICAL_ARTICLE_LIST_DATA;

export type THEME = 'metlen' | 'protergia' | 'metka';

export interface CATEGORY_DATA {
  id: number;
  documentId: string;
  name: string;
}

export interface COMPANY_DATA {
  id: number;
  documentId: string;
  name: string;
}

export interface TAG_DATA {
  id: number;
  documentId: string;
  name: string;
}

export interface ARTICLE_DATA {
  id: number;
  documentId: string;
  title: string;
  slug: string;
  subtitle: string;
  image: STRAPI_MEDIA;
  featured: boolean;
  categories: CATEGORY_DATA[];
  companies: COMPANY_DATA[];
  tags: TAG_DATA[];
}

// ─── Core Strapi ────────────────────────────────────────────────────────────

export interface STRAPI_META {
  pagination?: {
    page: number;
    pageSize: number;
    pageCount: number;
    total: number;
  };
}

export interface STRAPI_RESPONSE<T> {
  data: T;
  meta: STRAPI_META;
}

export interface STRAPI_MEDIA_FORMAT {
  url: string;
  width: number;
  height: number;
  size: number;
  mime: string;
}

export interface STRAPI_MEDIA {
  id: number;
  documentId: string;
  url: string;
  alternativeText?: string | null;
  width?: number;
  height?: number;
  formats?: {
    thumbnail?: STRAPI_MEDIA_FORMAT;
    small?: STRAPI_MEDIA_FORMAT;
    medium?: STRAPI_MEDIA_FORMAT;
    large?: STRAPI_MEDIA_FORMAT;
  };
}

// ─── Dynamic Zone base ──────────────────────────────────────────────────────

export interface DYNAMIC_ZONE_BASE {
  __component: string;
  id: number;
}

// ─── shared.badge ───────────────────────────────────────────────────────────

export interface BADGE_DATA {
  id: number;
  title: string;
  hex_color: string;
  alignment?: string;
}

// ─── shared.carousel-item ───────────────────────────────────────────────────

export interface CAROUSEL_ITEM_DATA {
  id: number;
  badge?: BADGE_DATA | null;
  title: string;
  subtitle?: string;
  image?: STRAPI_MEDIA | null;
}

// ─── shared.carousel ────────────────────────────────────────────────────────

export interface CAROUSEL_DATA extends DYNAMIC_ZONE_BASE {
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
  items?: CAROUSEL_ITEM_DATA | CAROUSEL_ITEM_DATA[] | null;
}

// ─── shared.cta-button ──────────────────────────────────────────────────────

export interface CTA_BUTTON_DATA {
  id: number;
  label?: string;
  icon?: string;
  target?: '_self' | '_blank';
  url?: string;
}

// ─── shared.block-header ────────────────────────────────────────────────────

export interface BLOCK_HEADER_DATA {
  id: number;
  title: string;
  subtitle?: string;
  image?: STRAPI_MEDIA | null;
  ctaButton?: CTA_BUTTON_DATA | null;
}

export interface WITH_BLOCK_HEADER {
  header?: BLOCK_HEADER_DATA | null;
}

// ─── shared.hero-slider ──────────────────────────────────────────────────────

export interface HERO_SLIDER_ITEM_DATA {
  id: number;
  title: string;
  subtitle?: string;
  badgeLabel?: string;
  image?: STRAPI_MEDIA | null;
  ctaButton?: CTA_BUTTON_DATA | null;
}

export interface HERO_SLIDER_DATA extends DYNAMIC_ZONE_BASE {
  __component: 'shared.hero-slider';
  slides: HERO_SLIDER_ITEM_DATA[];
  theme?: THEME | null;
}

// ─── shared.seo ─────────────────────────────────────────────────────────────

export interface SEO_DATA {
  id: number;
  meta_title?: string;
  meta_description?: string;
  canonical_url?: string;
  og_image?: STRAPI_MEDIA | null;
}

// ─── article.masonry-list ───────────────────────────────────────────────────

export interface ARTICLE_FILTERS_DATA {
  featured_only: boolean;
  company_id: string;
  category_ids: string[];
  tag_ids: string[];
  sort_by: 'newest' | 'oldest' | 'featured_first';
}

export interface FILTERED_ARTICLES_DATA {
  filters: ARTICLE_FILTERS_DATA;
  selected_ids: string[];
}

export interface MASONRY_LIST_DATA extends DYNAMIC_ZONE_BASE, WITH_BLOCK_HEADER {
  __component: 'article.masonry-list';
  articles?: FILTERED_ARTICLES_DATA | null;
  theme?: THEME | null;
}

// ─── article.slideset-list ───────────────────────────────────────────────────

export interface SLIDESET_LIST_DATA extends DYNAMIC_ZONE_BASE, WITH_BLOCK_HEADER {
  __component: 'article.slideset-list';
  header?: BLOCK_HEADER_DATA | null;
  slides?: FILTERED_ARTICLES_DATA | null;
  cards?: FILTERED_ARTICLES_DATA | null;
  theme?: THEME | null;
}

// ─── Separator ───────────────────────────────────────────────────────────────
export type SEPARATOR_STYLE = 'blank' | 'line' | 'dashed' | 'dotted';
export type SEPARATOR_SIZE = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export interface SEPARATOR_DATA extends DYNAMIC_ZONE_BASE {
  __component: 'shared.seperator';
  style: SEPARATOR_STYLE;
  size: SEPARATOR_SIZE;
  color: string;
  label: string;
  hideOnMobile: boolean;
  hideOnDesktop: boolean;
}

// ─── shared.widget ────────────────────────────────────────────────────────────

export interface WIDGET_DATA extends DYNAMIC_ZONE_BASE {
  __component: 'shared.widget';
  title: string;
  subtitle: string;
  image: STRAPI_MEDIA;
  cta: CTA_BUTTON_DATA;
  theme?: THEME | null;
}

// ─── shared.widget-grid ──────────────────────────────────────────────────────

export interface WIDGET_CARD_GRID_DATA extends DYNAMIC_ZONE_BASE {
  __component: 'shared.widghet-card-grid';
  type: 'content' | 'banner';
  title: string;
  subtitle?: string;
  description?: string;
  image: STRAPI_MEDIA;
  cta: CTA_BUTTON_DATA;
  theme?: THEME | null;
}

export interface WIDGET_GRID_DATA extends DYNAMIC_ZONE_BASE {
  __component: 'shared.widget-grid';
  widgets: WIDGET_CARD_GRID_DATA[];
  theme?: THEME | null;
}

// ─── article.vertical-list ───────────────────────────────────────────────────

export interface VERTICAL_ARTICLE_LIST_DATA extends DYNAMIC_ZONE_BASE {
  __component: 'article.vertical-list';
  header?: BLOCK_HEADER_DATA | null;
  articles: FILTERED_ARTICLES_DATA[];
  theme?: THEME | null;
}

// ─── Dynamic page collection type ───────────────────────────────────────────

export interface DYNAMIC_PAGE_ENTRY {
  id: number;
  documentId: string;
  title: string;
  slug: string;
  blocks: BLOCK_DATA[];
  seo?: SEO_DATA | null;
  createdAt: string;
  updatedAt: string;
  publishedAt?: string | null;
  locale?: string;
}
