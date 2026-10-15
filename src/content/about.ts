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
      es: 'Lo que me mueve es salir de mi zona de confort: problemas nuevos, herramientas nuevas, sitios nuevos. Pasar de lo básico de Kubernetes a llevar el clúster de la empresa en unos tres meses es el tipo de reto que busco.',
    },
    {
      en: "Off the clock: the gym, mountain routes, good food, music, videogames, and time with my friends and family. I travel whenever I can, alone or with friends, and I'm ready for the next move abroad.",
      es: 'Fuera del trabajo: el gimnasio, las rutas por la montaña, la buena comida, la música, los videojuegos y el tiempo con mis amigos y mi familia. Viajo siempre que puedo, solo o con amigos, y estoy listo para dar el salto fuera.',
    },
    {
      en: "At the end of the day I'm just me: curious, grounded, and always looking for the next thing to learn or build.",
      es: 'Al final, soy solo yo: curioso, con los pies en la tierra y siempre buscando lo siguiente que aprender o construir.',
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
        es: 'Matías de pie en una instalación artística hinchable de color lila',
      },
      caption: { en: 'Just me chilling', es: 'Aquí, de chill' },
    },
    {
      id: 'mama',
      src: '/photos/lamama.webp',
      width: 1600,
      height: 1200,
      alt: {
        en: 'Selfie of Matías and his mother with backpacks, in front of a reservoir on the Camino de Santiago',
        es: 'Selfie de Matías y su madre con mochilas, delante de un embalse en el Camino de Santiago',
      },
      caption: {
        en: 'With my mom on the Camino de Santiago',
        es: 'Con mi madre en el Camino de Santiago',
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
        es: 'Matías sonriendo mientras enseña un plato con una porción de tarta de queso con pistacho',
      },
      caption: {
        en: "I can't choose between sweet or savory",
        es: 'No sé elegir entre dulce y salado',
      },
    },
    {
      id: 'videogames',
      src: '/photos/videogames-collage.webp',
      width: 3264,
      height: 3264,
      alt: {
        en: 'Collage of favourite games: Zelda Twilight Princess, Super Mario Galaxy, Spider-Man 2, Red Dead Redemption 2, Metal Gear Solid, God of War Ragnarök, Battlefield Bad Company 2, Bloodborne, Ghost of Tsushima',
        es: 'Collage de juegos favoritos: Zelda Twilight Princess, Super Mario Galaxy, Spider-Man 2, Red Dead Redemption 2, Metal Gear Solid, God of War Ragnarök, Battlefield Bad Company 2, Bloodborne, Ghost of Tsushima',
      },
      caption: { en: 'A collection of my favorite games', es: 'Mis juegos favoritos' },
    },
    {
      id: 'plane',
      src: '/photos/plane.webp',
      width: 1200,
      height: 1600,
      alt: { en: 'View from an airplane window', es: 'Vista desde la ventanilla de un avión' },
      caption: { en: 'Love to explore new places', es: 'Me encanta descubrir sitios nuevos' },
    },
    {
      id: 'friends-cafe',
      src: '/photos/mygang.webp',
      width: 1600,
      height: 1200,
      alt: {
        en: 'Selfie of Matías with three friends at a café terrace on a sunny day',
        es: 'Selfie de Matías con tres amigos en una terraza un día de sol',
      },
      caption: { en: 'Friends who make life better', es: 'Amigos que me alegran la vida' },
    },
    {
      id: 'friends-beach',
      src: '/photos/furunserland.webp',
      width: 2048,
      height: 1536,
      alt: {
        en: 'Four friends around a table at a beach bar, under a straw umbrella by the sea',
        es: 'Cuatro amigos alrededor de una mesa en un chiringuito, bajo una sombrilla de paja junto al mar',
      },
      caption: {
        en: 'Friends who inspire me to be better',
        es: 'Amigos que me inspiran a ser mejor',
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
        es: 'Un fragmento de código que describe a Matías como un objeto JavaScript: le gustan el gimnasio, viajar, programar y los videojuegos, vive en Málaga',
      },
      caption: { en: 'Always creating something new', es: 'Siempre creando algo nuevo' },
    },
  ],
} as const satisfies {
  readonly paragraphs: readonly Localized[];
  readonly photos: readonly GalleryPhoto[];
};
