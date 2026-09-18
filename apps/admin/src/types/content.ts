export type ContentType = 'shortText' | 'richText' | 'image' | 'list' | 'repeatableBlock';

export interface SiteContent<T = any> {
  key: string;
  page: 'home' | 'about' | 'services' | 'projects' | 'equipment' | 'gallery' | 'contact' | 'footer' | 'nav';
  section?: string;
  type: ContentType;
  label: string;
  value: T;
  description?: string;
  updatedAt?: string;
  updatedBy?: string;
}

export interface NavItem {
  id: string;
  label: string;
  href: string;
  order: number;
  parentId?: string | null;
  isActive: boolean;
  isExternal?: boolean;
  children?: NavItem[];
}

