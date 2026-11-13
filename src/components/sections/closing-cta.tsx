import Image from 'next/image';
import Link from 'next/link';
import { buttonStyles } from '@/components/ui/Button';

interface ClosingCtaProps {
  /** First headline part, set light. */
  headlineLight: string;
  /** Second headline part, set heavy in blue on its own line. */
  headlineHeavy: string;
  text: string;
  buttonLabel: string;
  href: string;
  portrait?: {
    src: string;
    alt: string;
    name: string;
    role: string;
  };
  /** Gradient line on top. Off when the page already shows its one guide line elsewhere. */
  guideLine?: boolean;
  className?: string;
}

/**
 * The single closing call to action for all pages (moodboard .cta):
 * plan surface, gradient guide line on top, light/heavy headline, portrait.
 */
export function ClosingCta({
  headlineLight,
  headlineHeavy,
  text,
  buttonLabel,
  href,
  portrait,
  guideLine = true,
  className = '',
}: ClosingCtaProps) {
  const line = guideLine
    ? "before:absolute before:inset-x-0 before:top-0 before:h-1 before:bg-brand-gradient before:content-['']"
    : '';

  return (
    <div
      className={`relative grid grid-cols-1 items-end gap-x-10 gap-y-7 bg-sheet px-[22px] py-7 ${line} min-[721px]:grid-cols-[minmax(0,1fr)_auto] min-[721px]:p-10 ${className}`}
    >
      <div>
        <h2 className="mb-3.5 font-display text-[61px] leading-[0.9] tracking-[-0.005em] text-balance text-ink">
          <span className="font-light">{headlineLight}</span>{' '}
          <span className="block font-[820] text-brand-blue">{headlineHeavy}</span>
        </h2>
        <p className="mb-6 max-w-[64ch] text-[17px] leading-[1.55] text-ink">{text}</p>
        <Link href={href} className={buttonStyles()}>
          {buttonLabel}
        </Link>
      </div>
      {portrait && (
        <div className="grid grid-cols-[72px_auto] items-center gap-3.5 text-sm text-ink-2">
          <Image
            src={portrait.src}
            alt={portrait.alt}
            width={72}
            height={72}
            className="h-[72px] w-[72px] object-cover grayscale-[.15]"
          />
          <span>
            <b className="block text-[15px] text-ink">{portrait.name}</b>
            {portrait.role}
          </span>
        </div>
      )}
    </div>
  );
}
