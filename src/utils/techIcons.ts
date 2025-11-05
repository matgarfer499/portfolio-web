/**
 * Technology Icon Mapping
 * Maps technology names to their corresponding icon components
 */

// Import all technology icons
import Django from '@components/Icons/Technologies/Django.astro';
import Javascript from '@components/Icons/Technologies/Javascript.astro';
import Jinja from '@components/Icons/Technologies/Jinja.astro';
import MongoDB from '@components/Icons/Technologies/MongoDB.astro';
import Nextjs from '@components/Icons/Technologies/Nextjs.astro';
import Supabase from '@components/Icons/Technologies/Supabase.astro';
import Svelte from '@components/Icons/Technologies/Svelte.astro';
import Tailwind from '@components/Icons/Technologies/Tailwind.astro';
import TypeScript from '@components/Icons/Technologies/TypeScript.astro';
import LinkedIn from '@components/Icons/LinkedIn.astro';
import Database from '@components/Icons/Technologies/Database.astro';
import Python from '@components/Icons/Technologies/Python.astro';
import Palette from '@components/Icons/Technologies/Palette.astro';
import Wall from '@components/Icons/Technologies/Wall.astro';

// Technology name to icon component mapping (case-insensitive)
export const TECH_ICONS: Record<string, any> = {
  // Frameworks & Libraries
  'django': Django,
  'nextjs': Nextjs,
  'sveltekit': Svelte,
  
  // Languages
  'javascript': Javascript,
  'typescript': TypeScript,
  'flask': Python,
  
  // Databases
  'mongodb': MongoDB,
  'postgresql': Database,
  
  // Tools & Others
  'supabase': Supabase,
  'tailwindcss': Tailwind,
  'jinja2': Jinja,
  'bulma css': Palette,
  'budibase': Wall,
};

/**
 * Get the icon component for a technology
 * Returns LinkedIn icon as fallback if no match found
 */
export function getTechIcon(techName: string): any {
  const normalizedName = techName.toLowerCase().trim();
  return TECH_ICONS[normalizedName] || LinkedIn;
}
