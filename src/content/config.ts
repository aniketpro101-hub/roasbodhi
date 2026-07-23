import { defineCollection, z } from 'astro:content';

const blogCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    publishDate: z.coerce.date(),
    updateDate: z.coerce.date().optional(),
    author: z.string(),
    category: z.enum(['Meta Ads', 'Google Ads', 'Web Design', 'GMB SEO', 'Analytics', 'General']),
    tags: z.array(z.string()),
    image: z.string(),
    imageAlt: z.string(),
    featured: z.boolean(),
    draft: z.boolean().default(false),
    readingTime: z.number().optional(),
    relatedService: z.string().optional(),
    targetCity: z.string().optional(),
  })
});

export const collections = {
  'blog': blogCollection
};
