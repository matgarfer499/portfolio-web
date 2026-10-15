import { ImageResponse } from 'next/og';
import { BRAND, ogFonts } from './brand';

export const OG_SIZE = { width: 1200, height: 630 } as const;

// The header mark: MG in volt Anton on a night square.
export async function markImage(size: number): Promise<ImageResponse> {
  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: BRAND.ink,
        color: BRAND.volt,
        fontFamily: 'Anton',
        fontSize: size * 0.56,
        lineHeight: 1,
      }}
    >
      MG
    </div>,
    { width: size, height: size, fonts: await ogFonts() },
  );
}

// Share card: a giant Anton title on paper, a volt band with the kicker, the domain at the foot.
export async function posterImage({
  kicker,
  title,
  foot,
}: {
  kicker: string;
  title: string;
  foot: string;
}): Promise<ImageResponse> {
  const long = title.length > 18;
  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        background: BRAND.paper,
        color: BRAND.ink,
        padding: '56px 64px',
        borderBottom: `24px solid ${BRAND.volt}`,
      }}
    >
      <div
        style={{
          display: 'flex',
          alignSelf: 'flex-start',
          background: BRAND.volt,
          border: `4px solid ${BRAND.ink}`,
          padding: '10px 18px',
          fontFamily: 'Inter Tight',
          fontSize: 30,
          letterSpacing: 2,
          textTransform: 'uppercase',
        }}
      >
        {kicker}
      </div>
      <div
        style={{
          display: 'flex',
          fontFamily: 'Anton',
          fontSize: long ? 104 : 176,
          lineHeight: 0.95,
          textTransform: 'uppercase',
        }}
      >
        {title}
      </div>
      <div style={{ display: 'flex', fontFamily: 'Inter Tight', fontSize: 30, color: BRAND.steel }}>
        {foot}
      </div>
    </div>,
    { ...OG_SIZE, fonts: await ogFonts() },
  );
}
