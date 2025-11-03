/**
 * Navigation utility functions
 * Handles section tracking, smooth scrolling, and active link management
 */

export interface NavLink {
  href: string;
  label: string;
  section: string;
}

export const NAV_LINKS: NavLink[] = [
  { href: '#hero', label: 'Home', section: 'hero' },
  { href: '#experience', label: 'Experience', section: 'experience' },
  { href: '#projects', label: 'Projects', section: 'projects' },
  { href: '#about', label: 'About', section: 'about' },
];

/**
 * Initialize smooth scrolling for navigation links
 */
export function initSmoothScroll() {
  document.querySelectorAll<HTMLAnchorElement>('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e: Event) {
      e.preventDefault();
      const href = (e.currentTarget as HTMLAnchorElement).getAttribute('href');
      const target = document.querySelector(href || '');
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
}

/**
 * Initialize section tracking and active link updates
 * Returns cleanup function
 */
export function initSectionTracking(onAllSectionsVisited?: () => void): () => void {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');
  const visitedSections = new Set<string>();

  function updateActiveLink() {
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
      const sectionHeight = (section as HTMLElement).offsetHeight;
      const sectionTop = (section as HTMLElement).offsetTop - 100;
      const sectionId = section.getAttribute('id');

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        // Mark section as visited
        if (sectionId) {
          visitedSections.add(sectionId);
          
          // Check if all sections have been visited
          const totalSections = sections.length;
          if (visitedSections.size === totalSections && onAllSectionsVisited) {
            onAllSectionsVisited();
          }
        }

        // Update active link
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', updateActiveLink);
  // Run once on load to check initial section
  updateActiveLink();

  // Return cleanup function
  return () => {
    window.removeEventListener('scroll', updateActiveLink);
  };
}
