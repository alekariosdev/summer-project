export const COMPANY_SLUGS = ['metlen', 'protergia', 'metka'] as const;
export type CompanySlug = (typeof COMPANY_SLUGS)[number];
export type ThemeRole = 'primary' | 'text' | 'accent' | 'secondary';

export const companyThemes = {
  metlen: {
    primary: '#0B1929',
    text: '#1A1F4E',
    accent: '#6B5ECD',
    secondary: '#00B4E6',
  },
  protergia: {
    primary: '#F05A00',
    text: '#000000',
    accent: '#3D1F6E',
    secondary: '#F5E6D8',
  },
  metka: {
    primary: '#0B1929',
    text: '#0B1929',
    accent: '#8B2E2E',
    secondary: '#D4C4A8',
  },
} as const satisfies Record<CompanySlug, Record<ThemeRole, string>>;
