import type { ImageAsset, Localized } from './types';

export interface GalleryPhoto extends ImageAsset {
  readonly id: string;
  readonly caption: Localized;
  readonly tall?: boolean;
  /** Crop focus (CSS object-position) when the frame cuts the photo. */
  readonly focus?: string;
  /** Show the whole photo (a wide code snippet would be cropped unreadable). */
  readonly fit?: 'contain';
}

export const about = {
  paragraphs: [
    {
      en: 'What drives me is getting out of my comfort zone: new problems, new tools, new places. Going from the basics of Kubernetes to running our company cluster in about three months is the kind of challenge I go looking for.',
    },
    {
      en: "Off the clock: the gym, mountain routes, good food, music, videogames, and time with my friends and family. I travel whenever I can, alone or with friends, and I'm ready for the next move abroad.",
    },
    {
      en: "At the end of the day I'm just me: curious, grounded, and always looking for the next thing to learn or build.",
    },
  ],
  // Grid order: the photo with his mother opens the grid, apart from the two friends photos,
  // which share the last row; the wide code shot closes it.
  photos: [
    {
      id: 'me',
      src: '/photos/me.webp',
      width: 1200,
      height: 1600,
      tall: true,
      focus: '58% 78%',
      alt: {
        en: 'Matías standing in a lilac inflatable art installation',
      },
      caption: { en: 'Just me chilling' },
    },
    {
      id: 'mama',
      src: '/photos/lamama.webp',
      width: 1600,
      height: 1200,
      alt: {
        en: 'Selfie of Matías and his mother with backpacks, in front of a reservoir on the Camino de Santiago',
      },
      caption: {
        en: 'With my mom on the Camino de Santiago',
      },
    },
    {
      id: 'cheesecake',
      src: '/photos/cheesecake.webp',
      width: 1200,
      height: 1600,
      focus: '50% 72%',
      alt: {
        en: 'Matías smiling as he holds up a plate with a slice of cheesecake topped with pistachio',
      },
      caption: {
        en: "I can't choose between sweet or savory",
      },
    },
    {
      id: 'videogames',
      src: '/photos/videogames-collage.webp',
      width: 3264,
      height: 3264,
      alt: {
        en: 'Collage of favourite games: Zelda Twilight Princess, Super Mario Galaxy, Spider-Man 2, Red Dead Redemption 2, Metal Gear Solid, God of War Ragnarök, Battlefield Bad Company 2, Bloodborne, Ghost of Tsushima',
      },
      caption: { en: 'A collection of my favorite games' },
    },
    {
      id: 'plane',
      src: '/photos/plane.webp',
      width: 1200,
      height: 1600,
      alt: { en: 'View from an airplane window' },
      caption: { en: 'Love to explore new places' },
    },
    {
      id: 'friends-cafe',
      src: '/photos/mygang.webp',
      width: 1600,
      height: 1200,
      alt: {
        en: 'Selfie of Matías with three friends at a café terrace on a sunny day',
      },
      caption: { en: 'Friends who make life better' },
    },
    {
      id: 'friends-beach',
      src: '/photos/furunserland.webp',
      width: 2048,
      height: 1536,
      alt: {
        en: 'Four friends around a table at a beach bar, under a straw umbrella by the sea',
      },
      caption: {
        en: 'Friends who inspire me to be better',
      },
    },
    {
      id: 'code',
      src: '/photos/code.webp',
      width: 1128,
      height: 582,
      fit: 'contain',
      alt: {
        en: 'A code snippet describing Matías as a JavaScript object: loves gym, travel, programming and gaming, lives in Málaga',
      },
      caption: { en: 'Always creating something new' },
    },
  ],
} as const satisfies {
  readonly paragraphs: readonly Localized[];
  readonly photos: readonly GalleryPhoto[];
};
