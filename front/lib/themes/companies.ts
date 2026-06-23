export const COMPANY_SLUGS = ['metlen', 'protergia', 'metka'] as const;
export type CompanySlug = (typeof COMPANY_SLUGS)[number];
export type ThemeRole = 'primary' | 'text' | 'accent' | 'secondary';

export const companyThemes = {
  metlen: {
    primary: '#0A2240',
    text: '#0A2240',
    accent: '#795AFD',
    secondary: '#00E1FF',
  },
  protergia: {
    primary: '#00E1FF',
    text: '#000000',
    accent: '#47008F',
    secondary: '#FFEDCC',
  },
  metka: {
    primary: '#002A47',
    text: '#002A47',
    accent: '#406680',
    secondary: '#D7CDB4',
  },
} as const satisfies Record<CompanySlug, Record<ThemeRole, string>>;
