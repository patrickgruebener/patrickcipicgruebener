'use client';

import { useState } from 'react';
import { useLanguage } from '@/hooks/useLanguage';

function FaqItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-gray-200">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between py-5 text-left"
      >
        <span className="text-lg font-medium text-gray-900 pr-4">{question}</span>
        <svg
          className={`w-5 h-5 text-gray-500 shrink-0 transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {isOpen && (
        <div className="pb-5">
          <p className="text-gray-600 leading-relaxed">{answer}</p>
        </div>
      )}
    </div>
  );
}

const faqKeys = ['1', '2', '3', '4', '5', '6'] as const;

export function WorkshopFaqSection() {
  const { t } = useLanguage();

  return (
    <section className="py-24 px-6 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-12">
          {t('workshop.faq.title' as any)}
        </h2>

        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 md:p-10">
          {faqKeys.map((key) => (
            <FaqItem
              key={key}
              question={t(`workshop.faq.${key}.question` as any)}
              answer={t(`workshop.faq.${key}.answer` as any)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
