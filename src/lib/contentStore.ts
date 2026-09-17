import type { SiteContent, NavItem } from '../types/content';
import { initialSiteContent, initialNavItems } from '../data/seedContent';

const STORAGE_KEY_CONTENT = 'gsp_site_content_v1';
const STORAGE_KEY_NAV = 'gsp_site_nav_v1';
const EVENT_CONTENT_UPDATED = 'gsp:content_updated';
const EVENT_NAV_UPDATED = 'gsp:nav_updated';

// In-memory cache
let contentMapCache: Map<string, SiteContent> | null = null;
let navItemsCache: NavItem[] | null = null;

export const loadContentFromStorage = (): Map<string, SiteContent> => {
  if (contentMapCache) return contentMapCache;

  const map = new Map<string, SiteContent>();
  // 1. Seed defaults first
  initialSiteContent.forEach((item) => {
    map.set(item.key, { ...item });
  });

  // 2. Overlay with stored overrides
  try {
    const raw = localStorage.getItem(STORAGE_KEY_CONTENT);
    if (raw) {
      const parsed: SiteContent[] = JSON.parse(raw);
      parsed.forEach((item) => {
        if (map.has(item.key)) {
          const defaultItem = map.get(item.key)!;
          // If default schema changed to repeatableBlock of objects but localStorage has old strings, upgrade to defaults
          if (defaultItem.type === 'repeatableBlock' && Array.isArray(item.value) && (item.value.length === 0 || typeof item.value[0] === 'string')) {
            map.set(item.key, { ...defaultItem });
          } else {
            map.set(item.key, { ...defaultItem, ...item, value: item.value });
          }
        } else {
          map.set(item.key, item);
        }
      });
    }
  } catch (err) {
    console.warn('Failed to parse site content from localStorage:', err);
  }

  contentMapCache = map;
  return map;
};

export const loadNavItemsFromStorage = (): NavItem[] => {
  if (navItemsCache) return navItemsCache;

  try {
    const raw = localStorage.getItem(STORAGE_KEY_NAV);
    if (raw) {
      const parsed: NavItem[] = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        navItemsCache = parsed;
        return parsed;
      }
    }
  } catch (err) {
    console.warn('Failed to parse nav items from localStorage:', err);
  }

  navItemsCache = JSON.parse(JSON.stringify(initialNavItems));
  return navItemsCache!;
};

export const getContent = <T = any>(key: string, defaultValue?: T): T => {
  const map = loadContentFromStorage();
  if (map.has(key)) {
    return map.get(key)!.value as T;
  }
  return defaultValue as T;
};

export const getContentItem = (key: string): SiteContent | undefined => {
  const map = loadContentFromStorage();
  return map.get(key);
};

export const getContentByPage = (page: string): SiteContent[] => {
  const map = loadContentFromStorage();
  const results: SiteContent[] = [];
  map.forEach((item) => {
    if (item.page === page) {
      results.push(item);
    }
  });
  return results;
};

export const getAllContent = (): SiteContent[] => {
  const map = loadContentFromStorage();
  return Array.from(map.values());
};

export const updateContent = (key: string, value: any): boolean => {
  const map = loadContentFromStorage();
  let item = map.get(key);
  if (!item) {
    console.warn(`Content key "${key}" not found in seed registry.`);
    return false;
  }

  const updated: SiteContent = {
    ...item,
    value,
    updatedAt: new Date().toISOString(),
    updatedBy: 'Admin'
  };

  map.set(key, updated);
  contentMapCache = map;

  // Persist array to localStorage
  try {
    const arrayToPersist = Array.from(map.values());
    localStorage.setItem(STORAGE_KEY_CONTENT, JSON.stringify(arrayToPersist));
    window.dispatchEvent(new CustomEvent(EVENT_CONTENT_UPDATED, { detail: { key, value } }));
    return true;
  } catch (err) {
    console.error('Failed to save content to localStorage:', err);
    return false;
  }
};

export const resetContentKey = (key: string): boolean => {
  const initial = initialSiteContent.find((item) => item.key === key);
  if (!initial) return false;
  return updateContent(key, initial.value);
};

export const resetAllContent = (): boolean => {
  try {
    localStorage.removeItem(STORAGE_KEY_CONTENT);
    contentMapCache = null;
    loadContentFromStorage();
    window.dispatchEvent(new CustomEvent(EVENT_CONTENT_UPDATED, { detail: { key: '*' } }));
    return true;
  } catch (err) {
    console.error('Failed to reset all content:', err);
    return false;
  }
};

// Navigation operations
export const getNavItems = (): NavItem[] => {
  return loadNavItemsFromStorage();
};

export const updateNavItems = (items: NavItem[]): boolean => {
  try {
    localStorage.setItem(STORAGE_KEY_NAV, JSON.stringify(items));
    navItemsCache = items;
    window.dispatchEvent(new CustomEvent(EVENT_NAV_UPDATED, { detail: { items } }));
    return true;
  } catch (err) {
    console.error('Failed to save nav items to localStorage:', err);
    return false;
  }
};

export const resetNavItems = (): boolean => {
  try {
    localStorage.removeItem(STORAGE_KEY_NAV);
    navItemsCache = null;
    loadNavItemsFromStorage();
    window.dispatchEvent(new CustomEvent(EVENT_NAV_UPDATED, { detail: { items: initialNavItems } }));
    return true;
  } catch (err) {
    console.error('Failed to reset nav items:', err);
    return false;
  }
};

export { EVENT_CONTENT_UPDATED, EVENT_NAV_UPDATED };
