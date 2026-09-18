import { initialSiteContent, initialNavItems } from '../data/seedContent';
import { updateContent, updateNavItems } from '../lib/contentStore';

/**
 * Seeds or resets the full SiteContent and NavItem entries.
 */
export const runSeedContent = () => {
  console.log(`[Seed Engine] Seeding ${initialSiteContent.length} SiteContent items...`);
  initialSiteContent.forEach((item) => {
    updateContent(item.key, item.value);
  });

  console.log(`[Seed Engine] Seeding ${initialNavItems.length} NavItem items...`);
  updateNavItems(initialNavItems);

  console.log('[Seed Engine] Seeding completed successfully.');
};

if (typeof window !== 'undefined') {
  // Expose on window for easy developer/admin invocation in browser console
  (window as any).__runGspSeedContent = runSeedContent;
}
