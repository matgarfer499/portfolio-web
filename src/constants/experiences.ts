import type { Experience } from '@models/experience';

export const EXPERIENCES: Experience[] = [
  {
    company: "Bettergy",
    logo: "/logos/bettergy.png",
    position: "Full Stack Developer",
    startDate: "Jan 2024",
    endDate: "Present",
    description: [
      "Working on full-stack web applications for the energy sector using Django, Flask, and SvelteKit.",
      "Led the migration of a core product to SvelteKit, boosting SEO and performance (Lighthouse 60 → 100).",
      "Optimized backend performance by refactoring queries (from 90 s to 1 s) and improving data reliability with Celery tasks.",
      "Contributed to better team workflows through improved deployment and code review practices."
    ],
    current: true,
    technologies: ["Django", "Flask", "SvelteKit", "TailwindCSS", "PostgreSQL", "MongoDB"]
  },
  {
    company: "Uniklinik Koln",
    logo: "/logos/uniklinik.webp",
    position: "Full Stack Web Developer (Internship)",
    startDate: "Mar 2023",
    endDate: "Jun 2023",
    description: [
      "Collaborated on the development of an internal web platform for hospital staff to publish and access scientific articles.",
      "Delivered the project ahead of schedule, allowing time for extra testing and performance improvements.",
      "Helped design an accessible interface suitable for users with different technical backgrounds while working in a fully English-speaking environment."
    ],
    technologies: ["Flask", "Jinja2", 'JavaScript', "Bulma CSS", "Budibase"]
  },
];
