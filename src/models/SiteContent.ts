import type { SiteContent, ContentType } from '../types/content';

export const validateContentValue = (type: ContentType, value: any): boolean => {
  switch (type) {
    case 'shortText':
    case 'richText':
      return typeof value === 'string';
    case 'image':
      return typeof value === 'string';
    case 'list':
      return Array.isArray(value);
    case 'repeatableBlock':
      return Array.isArray(value) && value.every(item => typeof item === 'object' && item !== null);
    default:
      return true;
  }
};

export type { SiteContent, ContentType };
