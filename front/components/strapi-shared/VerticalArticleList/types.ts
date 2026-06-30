export interface Event {
  id: number | string;
  image: string;
  date: string;
  tags: string[];
  title: string;
  description: string;
  href?: string;
}
export type PageItem = number | 'ellipsis';
