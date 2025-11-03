export interface Trophy {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export const TROPHIES: Record<string, Trophy> = {
  PHOTO_COLLECTOR: {
    id: 'PHOTO_COLLECTOR',
    title: 'Memory Keeper',
    description: 'Revealed all photos in About Me',
    icon: '📸',
  },
  CONSOLE_EXPLORER: {
    id: 'CONSOLE_EXPLORER',
    title: 'Developer Detective',
    description: 'Opened the browser console',
    icon: '🔍',
  },
  PROJECT_TESTER: {
    id: 'PROJECT_TESTER',
    title: 'Curious Clicker',
    description: 'Tried out a project demo',
    icon: '🚀',
  },
  RESUME_READER: {
    id: 'RESUME_READER',
    title: 'Career Investigator',
    description: 'Viewed the full résumé',
    icon: '📄',
  },
  LOCATION_FINDER: {
    id: 'LOCATION_FINDER',
    title: 'Geography Enthusiast',
    description: 'Discovered the location badge',
    icon: '📍',
  },
  THEME_SWITCHER: {
    id: 'THEME_SWITCHER',
    title: 'Style Chameleon',
    description: 'Toggled between themes',
    icon: '🌓',
  },
  SECTION_EXPLORER: {
    id: 'SECTION_EXPLORER',
    title: 'Portfolio Navigator',
    description: 'Visited all sections',
    icon: '🗺️',
  },
  PLATINUM_COLLECTOR: {
    id: 'PLATINUM_COLLECTOR',
    title: 'Master Explorer',
    description: 'Collected all trophies',
    icon: '💎',
  },
};

// Base trophies (excluding platinum)
export const BASE_TROPHY_IDS = [
  'PHOTO_COLLECTOR',
  'CONSOLE_EXPLORER',
  'PROJECT_TESTER',
  'RESUME_READER',
  'LOCATION_FINDER',
  'THEME_SWITCHER',
  'SECTION_EXPLORER',
];

export class EasterEggManager {
  private static STORAGE_KEY = 'portfolio_trophies';
  
  static getUnlockedTrophies(): Set<string> {
    const stored = localStorage.getItem(this.STORAGE_KEY);
    return stored ? new Set(JSON.parse(stored)) : new Set();
  }
  
  static unlockTrophy(trophyId: string): boolean {
    const unlocked = this.getUnlockedTrophies();
    
    if (unlocked.has(trophyId)) {
      return false; // Already unlocked
    }
    
    unlocked.add(trophyId);
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify([...unlocked]));
    
    // Check if all base trophies are collected (excluding platinum)
    if (trophyId !== 'PLATINUM_COLLECTOR') {
      const baseTrophiesCollected = BASE_TROPHY_IDS.every(id => unlocked.has(id));
      if (baseTrophiesCollected) {
        // Check again if platinum is unlocked (to avoid race condition)
        const currentUnlocked = this.getUnlockedTrophies();
        if (!currentUnlocked.has('PLATINUM_COLLECTOR')) {
          // Mark platinum as unlocked in storage first
          currentUnlocked.add('PLATINUM_COLLECTOR');
          localStorage.setItem(this.STORAGE_KEY, JSON.stringify([...currentUnlocked]));
          
          // Then trigger notification with delay for dramatic effect
          setTimeout(() => {
            (window as any).showTrophyNotification?.('PLATINUM_COLLECTOR');
            (window as any).refreshTrophyDropdown?.();
          }, 3500);
        }
      }
    }
    
    return true; // Newly unlocked
  }
  
  static getProgress(): { unlocked: number; total: number; percentage: number } {
    const unlocked = this.getUnlockedTrophies().size;
    const total = Object.keys(TROPHIES).length;
    const percentage = Math.round((unlocked / total) * 100);
    
    return { unlocked, total, percentage };
  }
  
  static resetProgress(): void {
    localStorage.removeItem(this.STORAGE_KEY);
  }
}
