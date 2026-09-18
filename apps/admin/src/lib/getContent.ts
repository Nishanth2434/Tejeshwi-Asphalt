import { useState, useEffect } from 'react';
import { 
  getContent as getStoredContent, 
  getContentByPage as getStoredContentByPage,
  getNavItems as getStoredNavItems,
  EVENT_CONTENT_UPDATED, 
  EVENT_NAV_UPDATED 
} from './contentStore';
import type { NavItem, SiteContent } from '../types/content';

/**
 * Direct static content getter with guaranteed fallback.
 */
export const getContent = <T = any>(key: string, fallbackDefault?: T): T => {
  return getStoredContent<T>(key, fallbackDefault);
};

export const getContentByPage = (page: string): SiteContent[] => {
  return getStoredContentByPage(page);
};

/**
 * React hook that subscribes to content updates and triggers re-renders instantly when admin edits.
 */
export function useSiteContent<T = any>(key: string, fallbackDefault?: T): T {
  const [val, setVal] = useState<T>(() => getStoredContent<T>(key, fallbackDefault));

  useEffect(() => {
    const handleUpdate = (e: Event) => {
      const customEvent = e as CustomEvent<{ key: string; value: any }>;
      if (customEvent.detail.key === '*' || customEvent.detail.key === key) {
        setVal(getStoredContent<T>(key, fallbackDefault));
      }
    };

    window.addEventListener(EVENT_CONTENT_UPDATED, handleUpdate);
    return () => window.removeEventListener(EVENT_CONTENT_UPDATED, handleUpdate);
  }, [key, fallbackDefault]);

  return val;
}

/**
 * React hook that returns all content keys for a page as a key-value dictionary.
 */
export function usePageContent(page: string): Record<string, any> {
  const [items, setItems] = useState<Record<string, any>>(() => {
    const raw = getStoredContentByPage(page);
    const dict: Record<string, any> = {};
    raw.forEach(item => {
      dict[item.key] = item.value;
    });
    return dict;
  });

  useEffect(() => {
    const handleUpdate = () => {
      const raw = getStoredContentByPage(page);
      const dict: Record<string, any> = {};
      raw.forEach(item => {
        dict[item.key] = item.value;
      });
      setItems(dict);
    };

    window.addEventListener(EVENT_CONTENT_UPDATED, handleUpdate);
    return () => window.removeEventListener(EVENT_CONTENT_UPDATED, handleUpdate);
  }, [page]);

  return items;
}

/**
 * React hook that subscribes to Navbar & Navigation structure updates.
 */
export function useNavItems(): NavItem[] {
  const [items, setItems] = useState<NavItem[]>(() => getStoredNavItems());

  useEffect(() => {
    const handleNavUpdate = (e: Event) => {
      const customEvent = e as CustomEvent<{ items: NavItem[] }>;
      if (customEvent.detail?.items) {
        setItems(customEvent.detail.items);
      } else {
        setItems(getStoredNavItems());
      }
    };

    window.addEventListener(EVENT_NAV_UPDATED, handleNavUpdate);
    return () => window.removeEventListener(EVENT_NAV_UPDATED, handleNavUpdate);
  }, []);

  return items;
}
