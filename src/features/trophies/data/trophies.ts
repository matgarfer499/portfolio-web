export type TrophyId = 'lurker' | 'switcher' | 'console-denizen' | 'wanderer';

export type Trophy = {
  readonly id: TrophyId;
  readonly name: string;
  readonly flavor: string;
};

export const TROPHIES = [
  {
    id: 'lurker' as const,
    name: 'Lurker',
    flavor: "You've seen it all.",
  },
  {
    id: 'switcher' as const,
    name: 'Switcher',
    flavor: 'Light or dark — you chose.',
  },
  {
    id: 'console-denizen' as const,
    name: 'Console denizen',
    flavor: 'You know where to look.',
  },
  {
    id: 'wanderer' as const,
    name: 'Wanderer',
    flavor: 'Off the beaten path.',
  },
] satisfies readonly Trophy[];
