import { defineCollection, z } from 'astro:content';
import { file, glob } from 'astro/loaders';

const projects = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/projects' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string().max(180),
      tech: z.array(z.string()).min(1),
      url: z.string().url(),
      image: image(),
      imageAlt: z.string(),
      featured: z.boolean().default(true),
      order: z.number().default(0),
    }),
});

const experienceSchema = z.object({
  company: z.string(),
  role: z.string(),
  startDate: z.string().regex(/^\d{4}-\d{2}(-\d{2})?$/, 'Use YYYY-MM or YYYY-MM-DD'),
  endDate: z
    .string()
    .regex(/^\d{4}-\d{2}(-\d{2})?$/)
    .optional(),
  location: z.string().optional(),
  bullets: z.array(z.string()).min(1).max(4),
  order: z.number().default(0),
});

const photoSchema = z.object({
  src: z.string(),
  alt: z.string(),
  caption: z.string(),
});

const experiences = defineCollection({
  loader: file('src/content/experiences.json'),
  schema: experienceSchema,
});

const photos = defineCollection({
  loader: file('src/content/photos.json'),
  schema: photoSchema,
});

const about = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/about' }),
  schema: z.object({
    title: z.string(),
    values: z
      .array(z.object({ lead: z.string(), body: z.string() }))
      .max(5)
      .default([]),
    note: z.string().min(1),
  }),
});

export const collections = { projects, experiences, photos, about };
