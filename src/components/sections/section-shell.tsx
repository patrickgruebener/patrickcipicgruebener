import { ReactNode } from 'react';

interface SectionProps {
  id?: string;
  /** Accessible name when the section has no visible heading. */
  label?: string;
  children: ReactNode;
  className?: string;
}

/** Werkstatt section frame: hairline on top, 72px vertical rhythm, left aligned 1180px grid. */
export function Section({ id, label, children, className = '' }: SectionProps) {
  return (
    <section id={id} aria-label={label} className={`border-t border-line bg-paper py-[72px] ${className}`}>
      <div className="mx-auto max-w-[1180px] px-4">{children}</div>
    </section>
  );
}

interface SectionHeadProps {
  /** Optional first part, set light in ink. */
  light?: string;
  /** Second part, set heavy. Blue when it follows a light part, ink when it stands alone. */
  heavy: string;
  /** Intro next to the headline, plain text or several paragraphs. */
  intro?: ReactNode;
}

/** Headline left (light against heavy), intro right; one column below 821px (moodboard .sec-head). */
export function SectionHead({ light, heavy, intro }: SectionHeadProps) {
  return (
    <div className="mb-10 grid grid-cols-1 gap-x-12 gap-y-6 min-[821px]:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
      <h2 className="font-display text-[clamp(40px,9.4vw,57px)] leading-[0.9] tracking-[-0.005em] text-balance text-ink">
        {light && (
          <>
            <span className="font-light">{light}</span>{' '}
          </>
        )}
        <span className={`font-[820] ${light ? 'block text-brand-blue' : ''}`}>{heavy}</span>
      </h2>
      {intro && <div className="grid max-w-[64ch] content-start gap-3 text-ink-2">{intro}</div>}
    </div>
  );
}
