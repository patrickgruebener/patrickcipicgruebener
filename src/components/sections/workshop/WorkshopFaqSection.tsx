'use client';

import { useState } from 'react';
import { useLanguage } from '@/hooks/useLanguage';
import { Section, SectionHead } from '@/components/sections/section-shell';

function FaqItem({ id, question, answer }: { id: string; question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const panelId = `workshop-faq-panel-${id}`;

  return (
    <div className="border-b border-line">
      <h3 className="m-0">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
          aria-controls={panelId}
          className="flex w-full items-baseline justify-between gap-6 py-4 text-left"
        >
          <span className="text-[17px] font-semibold text-ink">{question}</span>
          {/* Plain text marker instead of an icon */}
          <span aria-hidden="true" className="shrink-0 font-mono-brand text-ink-2">
            {isOpen ? '–' : '+'}
          </span>
        </button>
      </h3>
      {isOpen && (
        <div id={panelId} role="region" className="pb-5">
          <p className="max-w-[64ch] leading-[1.55] text-ink-2">{answer}</p>
        </div>
      )}
    </div>
  );
}

const FAQ_KEYS = ['1', '2', '3', '4', '5', '6'] as const;

/** Questions as ruled rows, operable by keyboard. */
export function WorkshopFaqSection() {
  const { t } = useLanguage();

  return (
    <Section id="faq">
      <SectionHead heavy={t('workshop.faq.title')} />
      <div className="max-w-[820px] border-t-2 border-ink">
        {FAQ_KEYS.map((key) => (
          <FaqItem
            key={key}
            id={key}
            question={t(`workshop.faq.${key}.question`)}
            answer={t(`workshop.faq.${key}.answer`)}
          />
        ))}
      </div>
    </Section>
  );
}
