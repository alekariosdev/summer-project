import type { THEME } from '@/lib/types';
import type { CompanySlug } from './companies';
import { COMPANY_SLUGS } from './companies';

export type MASONRY_ARTICLE_LIST_THEME = {
  badge: string;
  companyAttr: CompanySlug;
  badgeText: string;
  articleTitle: string;
  articleSubtitle: string;
};

export const HERO_SLIDER_THEMEs = {
  metlen: {
    companyAttr: 'metlen',
    badge: 'border-metlen-secondary bg-metlen-secondary text-metlen-primary',
    badgeText: 'txt-color-metlen txt-small font-weight-bold',
    articleTitle: 'txt-h4 txt-color-metlen font-weight-medium leading-[100%]',
    articleSubtitle: 'text-[#0A224080] txt-medium font-weight-normal leading-[125%]',
  },
  protergia: {
    companyAttr: 'protergia',
    badge: 'border-protergia-secondary bg-protergia-secondary text-protergia-primary',
    badgeText: 'txt-color-protergia txt-small font-weight-bold',
    articleTitle: 'txt-h4 txt-color-protergia font-weight-medium leading-[100%]',
    articleSubtitle: 'text-[#002A4780] txt-medium font-weight-normal leading-[125%]',
  },
  metka: {
    companyAttr: 'metka',
    badge: 'border-metka-secondary bg-metka-secondary text-metka-primary',
    badgeText: 'txt-color-metka txt-small font-weight-bold',
    articleTitle: 'txt-h4 txt-color-metka font-weight-medium leading-[100%]',
    articleSubtitle: 'text-[#00000080] txt-medium font-weight-normal leading-[125%]',
  },
} as const satisfies Record<CompanySlug, MASONRY_ARTICLE_LIST_THEME>;

export function getCompanySlug(name?: string): CompanySlug {
  const slug = name?.toLowerCase();
  if (slug && COMPANY_SLUGS.includes(slug as CompanySlug)) {
    return slug as CompanySlug;
  }
  return 'metlen';
}

export function getMASONRY_ARTICLE_LIST_THEME(theme?: THEME | null): MASONRY_ARTICLE_LIST_THEME {
  return HERO_SLIDER_THEMEs[theme ?? 'metlen'];
}
