import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const componentsCollection = defineCollection({
  loader: glob({
    pattern: '*/usage.mdx',
    base: './src/content/components',
    generateId: ({ entry }) => entry.replace(/\/usage\.mdx$/, ''),
  }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    status: z.enum(['stable', 'beta', 'deprecated', 'planned']).default('stable'),
    source: z.enum(['core', 'block']).default('core'),
    category: z.enum(['actions', 'forms', 'layout', 'navigation', 'feedback', 'data-display', 'utilities']),
    storybookId: z.string().optional(),
    figmaUrl: z.string().url().optional(),
  }),
});

// Sibling per-component accessibility docs, co-located with usage.mdx under the
// same slug folder (src/content/components/<slug>/accessibility.mdx). Most
// components don't have one yet — the accessibility tab falls back to a
// "coming soon" placeholder when getEntry() finds nothing.
const accessibilityCollection = defineCollection({
  loader: glob({
    pattern: '*/accessibility.mdx',
    base: './src/content/components',
    generateId: ({ entry }) => entry.replace(/\/accessibility\.mdx$/, ''),
  }),
  schema: z.object({}),
});

const pagesCollection = defineCollection({
  loader: glob({
    pattern: ['**/*.mdx', '!components/**'],
    base: './src/content',
    generateId: ({ entry }) => entry.replace(/(\/index)?\.mdx$/, ''),
  }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
  }),
});

export const collections = {
  pages: pagesCollection,
  components: componentsCollection,
  accessibility: accessibilityCollection,
};
