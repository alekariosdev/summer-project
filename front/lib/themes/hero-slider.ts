import type { CompanyData } from '@/lib/types';
import type { CompanySlug } from './companies';
import { COMPANY_SLUGS } from './companies';

export type HeroSliderTheme = {
  companyAttr: CompanySlug;
  panel: string;
  accentLine: string;
  badge: string;
  heading: string;
  subtitle: string;
  cta: string;
  dotActive: string;
  dotInactive: string;
  dotFocus: string;
  ringOffset: string;
};

export const heroSliderThemes = {
  metlen: {
    companyAttr: 'metlen',
    panel: 'bg-metlen-primary',
    accentLine: 'bg-white',
    badge: 'border-white/20 bg-white/5 text-white/80',
    heading: 'text-white',
    subtitle: 'text-white/60',
    cta: 'border-transparent bg-white text-metlen-primary hover:bg-white/90 hover:text-metlen-primary',
    dotActive: 'bg-white',
    dotInactive: 'bg-white/30 hover:bg-white/55',
    dotFocus: 'focus-visible:ring-white',
    ringOffset: 'focus-visible:ring-offset-metlen-primary',
  },
  protergia: {
    companyAttr: 'protergia',
    panel: 'bg-protergia-primary',
    accentLine: 'bg-protergia-text',
    badge: 'border-black/10 bg-black/5 text-protergia-text/80',
    heading: 'text-protergia-text',
    subtitle: 'text-protergia-text/70',
    cta: 'border-transparent bg-protergia-accent text-white hover:bg-protergia-accent/90 hover:text-white',
    dotActive: 'bg-protergia-text',
    dotInactive: 'bg-protergia-text/30 hover:bg-protergia-text/55',
    dotFocus: 'focus-visible:ring-protergia-text',
    ringOffset: 'focus-visible:ring-offset-protergia-primary',
  },
  metka: {
    companyAttr: 'metka',
    panel: 'bg-metka-primary',
    accentLine: 'bg-white',
    badge: 'border-white/20 bg-white/5 text-white/80',
    heading: 'text-white',
    subtitle: 'text-white/60',
    cta: 'border-transparent bg-metka-accent text-white hover:bg-metka-accent/90 hover:text-white',
    dotActive: 'bg-white',
    dotInactive: 'bg-white/30 hover:bg-white/55',
    dotFocus: 'focus-visible:ring-white',
    ringOffset: 'focus-visible:ring-offset-metka-primary',
  },
} as const satisfies Record<CompanySlug, HeroSliderTheme>;

export function getCompanySlug(name?: string): CompanySlug {
  const slug = name?.toLowerCase();
  if (slug && COMPANY_SLUGS.includes(slug as CompanySlug)) {
    return slug as CompanySlug;
  }
  return 'metlen';
}

export function getHeroSliderTheme(theme?: CompanyData | null): HeroSliderTheme {
  return heroSliderThemes[getCompanySlug(theme?.name)];
}
