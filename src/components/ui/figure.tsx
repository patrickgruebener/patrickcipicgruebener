import { CSSProperties, ReactNode } from 'react';

interface FigureProps {
  /** Figure number shown as "Abb. n". */
  number: number;
  caption: ReactNode;
  children: ReactNode;
  className?: string;
}

const TICK = '12px';
const INK = 'var(--color-ink)';
const CORNERS = [
  'left top', 'right top', 'left bottom', 'right bottom',
] as const;

// Crop marks at all four corners, drawn as 1px background strokes (moodboard .fig)
const CROP_MARKS: CSSProperties = {
  backgroundImage: CORNERS.flatMap(() => [
    `linear-gradient(${INK}, ${INK})`,
    `linear-gradient(${INK}, ${INK})`,
  ]).join(', '),
  backgroundPosition: CORNERS.flatMap((corner) => [corner, corner]).join(', '),
  backgroundSize: CORNERS.flatMap(() => [`${TICK} 1px`, `1px ${TICK}`]).join(', '),
  backgroundRepeat: 'no-repeat',
};

/** Framed drawing sheet with crop marks and a numbered caption. No radius, no shadow. */
export function Figure({ number, caption, children, className = '' }: FigureProps) {
  return (
    <figure className={`relative m-0 bg-sheet px-7 pt-7 pb-5 ${className}`} style={CROP_MARKS}>
      {children}
      <figcaption className="mt-[18px] border-t border-line pt-2.5 text-sm text-ink-2">
        <b className="mr-2 font-bold text-ink">Abb. {number}</b>
        {caption}
      </figcaption>
    </figure>
  );
}
