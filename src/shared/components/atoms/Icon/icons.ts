// 24×24 stroke paths, drawn in currentColor. Brand marks are simple glyphs, not logos.
export const ICONS = {
  'arrow-right': 'M5 12h14M13 6l6 6-6 6',
  'arrow-up-right': 'M7 17 17 7M8 7h9v9',
  'arrow-left': 'M19 12H5M11 18l-6-6 6-6',
  copy: 'M9 9h11v11H9zM5 15H4V4h11v1',
  check: 'M4 12.5 9.5 18 20 6',
  sun: 'M12 4V2M12 22v-2M4 12H2M22 12h-2M5.6 5.6 4.2 4.2M19.8 19.8l-1.4-1.4M5.6 18.4l-1.4 1.4M19.8 4.2l-1.4 1.4M12 7a5 5 0 1 0 0 10 5 5 0 0 0 0-10Z',
  moon: 'M20 14.5A8 8 0 0 1 9.5 4 8 8 0 1 0 20 14.5Z',
  trophy: 'M6.5 6.5v11M17.5 6.5v11M3 9v6M21 9v6M6.5 12h11',
  menu: 'M3 6h18M3 12h18M3 18h18',
  close: 'M5 5l14 14M19 5 5 19',
  'volume-on': 'M4 9v6h4l5 4V5L8 9H4ZM16.5 8.5a5 5 0 0 1 0 7M19 6a8.5 8.5 0 0 1 0 12',
  'volume-off': 'M4 9v6h4l5 4V5L8 9H4ZM16 9l6 6M22 9l-6 6',
  'chevron-down': 'M6 9l6 6 6-6',
  mail: 'M3 5h18v14H3zM3 6l9 7 9-7',
  download: 'M12 3v12M6 10l6 6 6-6M4 21h16',
} as const;

export type IconName = keyof typeof ICONS;
