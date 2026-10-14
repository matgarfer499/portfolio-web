import { Placeholder } from '../Placeholder/Placeholder';

type Part = { kind: 'text'; text: string } | { kind: 'pending'; note: string };

// A sentence made of resolved parts: text runs, with pending facts as inline dashed placeholders.
export function RichText({ parts }: { parts: readonly Part[] }) {
  return parts.map((part, i) =>
    part.kind === 'pending' ? (
      <Placeholder key={i} note={part.note} />
    ) : (
      <span key={i}>{part.text} </span>
    ),
  );
}
