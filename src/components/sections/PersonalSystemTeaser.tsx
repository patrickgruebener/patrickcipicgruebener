import Link from 'next/link';
import { getLanguage } from '@/lib/i18n.server';
import { kiSystemContent } from '@/lib/ki-system-content';
import { buttonStyles } from '@/components/ui/Button';
import { Card, CardFlag } from '@/components/ui/Card';
import { Section } from '@/components/sections/section-shell';

/** Pointer to the personal AI system for solo makers, framed by a hairline card. */
export async function PersonalSystemTeaser() {
  const copy = kiSystemContent[await getLanguage()];

  return (
    <Section label={copy.eyebrow}>
      <Card className="grid grid-cols-1 items-end gap-x-10 gap-y-6 p-6 min-[821px]:grid-cols-[minmax(0,1fr)_auto] min-[821px]:p-8">
        <div className="grid max-w-[64ch] gap-3">
          <CardFlag>{copy.eyebrow}</CardFlag>
          <h2 className="font-display text-[clamp(32px,7vw,44px)] leading-[0.95] font-[820] tracking-[-0.005em] text-balance text-ink">
            {copy.teaserTitle}
          </h2>
          <p className="text-ink-2">{copy.teaserText}</p>
        </div>
        <Link href="/ki-system" className={buttonStyles({ variant: 'secondary', className: 'justify-start' })}>
          {copy.teaserLink}
        </Link>
      </Card>
    </Section>
  );
}
