import { defineCollection, z } from 'astro:content';
import { file } from 'astro/loaders';

const projectSchema = z.object({
  name: z.string(),
  tagline: z.string(),
  description: z.string(),
  technologies: z.array(z.string()),
  desktopImage: z.string(),
  mobileImage: z.string(),
  demoUrl: z.string().url().optional(),
  repoUrl: z.string().url().optional(),
  highlights: z.array(z.string()).default([]),
});

const experienceSchema = z.object({
  company: z.string(),
  logo: z.string(),
  position: z.string(),
  startDate: z.string(),
  endDate: z.string(),
  description: z.array(z.string()),
  current: z.boolean().optional(),
  internship: z.boolean().optional(),
  technologies: z.array(z.string()).optional(),
});

const photoSchema = z.object({
  src: z.string(),
  alt: z.string(),
  caption: z.string(),
});

const projects = defineCollection({
  loader: file('src/content/projects.json'),
  schema: projectSchema,
});

const experiences = defineCollection({
  loader: file('src/content/experiences.json'),
  schema: experienceSchema,
});

const photos = defineCollection({
  loader: file('src/content/photos.json'),
  schema: photoSchema,
});

export const collections = { projects, experiences, photos };
