import type { SiteContent, NavItem } from '../types/content';
import { initialSiteContent, initialNavItems } from '../data/seedContent';

const STORAGE_KEY_CONTENT = 'gsp_site_content_v1';
const STORAGE_KEY_NAV = 'gsp_site_nav_v1';
const EVENT_CONTENT_UPDATED = 'gsp:content_updated';
const EVENT_NAV_UPDATED = 'gsp:nav_updated';

// In-memory cache for SiteContent
let contentMapCache: Map<string, SiteContent> | null = null;
let navItemsCache: NavItem[] | null = null;

import { supabase } from './supabaseClient';

let supabaseSyncStarted = false;

const syncFromSupabase = async () => {
  try {
    const { data, error } = await supabase.from('site_content').select('*');
    if (error) {
      console.warn('Failed to fetch from Supabase:', error.message);
      return;
    }
    
    if (data && data.length > 0) {
      data.forEach((row) => {
        if (row.key === '__navigation_items__') {
          navItemsCache = row.value;
          window.dispatchEvent(new CustomEvent(EVENT_NAV_UPDATED, { detail: { items: navItemsCache } }));
          return;
        }

        if (contentMapCache!.has(row.key)) {
          const defaultItem = contentMapCache!.get(row.key)!;
          // Apply schema migrations or overrides if needed
          if (defaultItem.type === 'repeatableBlock' && Array.isArray(row.value) && (row.value.length === 0 || typeof row.value[0] === 'string')) {
            contentMapCache!.set(row.key, { ...defaultItem });
          } else {
            contentMapCache!.set(row.key, { ...defaultItem, value: row.value });
          }
        } else {
          contentMapCache!.set(row.key, row as any);
        }
      });
      window.dispatchEvent(new CustomEvent(EVENT_CONTENT_UPDATED, { detail: { key: '*' } }));
    }
  } catch (err) {
    console.error(err);
  }
};

export const loadContentFromStorage = (): Map<string, SiteContent> => {
  if (contentMapCache) return contentMapCache;

  const map = new Map<string, SiteContent>();
  initialSiteContent.forEach((item) => {
    map.set(item.key, { ...item });
  });

  contentMapCache = map;

  if (!supabaseSyncStarted) {
    supabaseSyncStarted = true;
    syncFromSupabase();
  }

  return map;
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
  let item = map.get(key) as SiteContent | undefined;
  
  if (!item) {
    item = { key, page: 'home', section: 'custom', type: 'shortText', label: key, value } as SiteContent;
  } else {
    item = { ...item, value } as SiteContent;
  }
  
  map.set(key, item);
  
  // Optimistic UI update
  window.dispatchEvent(new CustomEvent(EVENT_CONTENT_UPDATED, { detail: { key, value } }));

  // Background persist to Supabase
  supabase.from('site_content').upsert({
    key: item.key,
    page: item.page,
    section: item.section,
    type: item.type,
    label: item.label,
    value: item.value
  }, { onConflict: 'key' }).then(({ error }) => {
    if (error) {
      console.error('Failed to save content to Supabase:', error);
    }
  });

  return true;
};

export const batchUpdateContent = async (updates: Record<string, any>): Promise<boolean> => {
  const map = loadContentFromStorage();
  
  // Create a backup of the current state before saving
  const currentArray = Array.from(map.values());
  localStorage.setItem(`${STORAGE_KEY_CONTENT}_backup`, JSON.stringify(currentArray));
  
  const rowsToUpsert = [];

  for (const [key, value] of Object.entries(updates)) {
    let item = map.get(key);
    if (!item) {
      item = { key, page: 'home', section: 'custom', type: 'shortText', label: key, value } as SiteContent;
    } else {
      item = { ...item, value } as SiteContent;
    }
    map.set(key, item);
    rowsToUpsert.push({
      key: item.key,
      page: item.page,
      section: item.section,
      type: item.type,
      label: item.label,
      value: item.value
    });
  }

  // Update primary storage
  localStorage.setItem(STORAGE_KEY_CONTENT, JSON.stringify(Array.from(map.values())));

  window.dispatchEvent(new CustomEvent(EVENT_CONTENT_UPDATED, { detail: { key: '*' } }));

  if (rowsToUpsert.length > 0) {
    const { error } = await supabase.from('site_content').upsert(rowsToUpsert, { onConflict: 'key' });
    if (error) {
      console.error('Failed to batch save content to Supabase:', error);
      return false;
    }
  }
  return true;
};

export const hasUndoAvailable = (): boolean => {
  return !!localStorage.getItem(`${STORAGE_KEY_CONTENT}_backup`);
};

export const undoLastSave = async (): Promise<boolean> => {
  const backup = localStorage.getItem(`${STORAGE_KEY_CONTENT}_backup`);
  if (!backup) return false;

  try {
    const backupData: SiteContent[] = JSON.parse(backup);
    
    // Save backup back to primary storage
    localStorage.setItem(STORAGE_KEY_CONTENT, backup);
    contentMapCache = new Map(backupData.map(item => [item.key, item]));
    
    window.dispatchEvent(new CustomEvent(EVENT_CONTENT_UPDATED, { detail: { key: '*' } }));

    // Sync the restored backup to Supabase
    const rowsToUpsert = backupData.map(item => ({
      key: item.key,
      page: item.page,
      section: item.section,
      type: item.type,
      label: item.label,
      value: item.value
    }));

    if (rowsToUpsert.length > 0) {
      const { error } = await supabase.from('site_content').upsert(rowsToUpsert, { onConflict: 'key' });
      if (error) {
        console.error('Failed to restore backup to Supabase:', error);
      }
    }
    
    // Clear backup so we can't undo multiple times
    localStorage.removeItem(`${STORAGE_KEY_CONTENT}_backup`);
    
    return true;
  } catch (err) {
    console.error('Failed to undo last save:', err);
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
  if (navItemsCache) return navItemsCache;
  return initialNavItems;
};

export const updateNavItems = (items: NavItem[]): boolean => {
  try {
    navItemsCache = items;
    window.dispatchEvent(new CustomEvent(EVENT_NAV_UPDATED, { detail: { items } }));
    
    // Background persist to Supabase
    supabase.from('site_content').upsert({
      key: '__navigation_items__',
      page: 'nav',
      section: 'nav',
      type: 'repeatableBlock',
      label: 'Navigation',
      value: items
    }, { onConflict: 'key' }).then(({ error }) => {
      if (error) console.error('Failed to save nav to Supabase:', error);
    });
    
    return true;
  } catch (err) {
    console.error('Failed to save nav items:', err);
    return false;
  }
};

export const resetNavItems = (): boolean => {
  try {
    navItemsCache = null;
    window.dispatchEvent(new CustomEvent(EVENT_NAV_UPDATED, { detail: { items: initialNavItems } }));
    return true;
  } catch (err) {
    console.error('Failed to reset nav items:', err);
    return false;
  }
};

export { EVENT_CONTENT_UPDATED, EVENT_NAV_UPDATED };
