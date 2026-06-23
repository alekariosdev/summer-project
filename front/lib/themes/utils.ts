import type { CompanySlug, ThemeRole } from './companies';

export function companyColor(
  company: CompanySlug,
  role: ThemeRole,
  prop: 'bg' | 'text' | 'border' = 'bg'
) {
  return `${prop}-${company}-${role}`;
}
