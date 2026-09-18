import type { NavItem } from '../types/content';

export const validateNavItem = (item: Partial<NavItem>): boolean => {
  return typeof item.label === 'string' && 
         item.label.trim().length > 0 && 
         typeof item.href === 'string' &&
         typeof item.order === 'number';
};

export type { NavItem };
