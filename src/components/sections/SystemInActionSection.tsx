import { getTranslations } from '@/lib/i18n.server';
import { Card, CardContent } from '@/components/ui/Card';

function BrainIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
    </svg>
  );
}

function WorkflowIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
    </svg>
  );
}

function SparklesIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
    </svg>
  );
}

function LinkIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
    </svg>
  );
}

export async function SystemInActionSection() {
  const { t } = await getTranslations();

  const capabilities = [
    { key: '1', Icon: BrainIcon, iconBg: 'from-blue-100 to-teal-100', iconColor: 'text-blue-600' },
    { key: '2', Icon: WorkflowIcon, iconBg: 'from-teal-100 to-green-100', iconColor: 'text-teal-600' },
    { key: '3', Icon: SparklesIcon, iconBg: 'from-green-100 to-blue-100', iconColor: 'text-green-600' },
    { key: '4', Icon: LinkIcon, iconBg: 'from-blue-100 to-green-100', iconColor: 'text-blue-600' },
  ];

  return (
    <section className="py-20 px-6 bg-gradient-to-br from-blue-50 via-teal-50 to-green-50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-3xl md:text-4xl lg:text-5xl mb-6 bg-gradient-to-r from-blue-600 via-teal-500 to-green-500 bg-clip-text text-transparent font-bold leading-tight">
            {t('home.systemInAction.headline' as any)}
          </h2>
          <p className="text-gray-700 text-lg max-w-4xl mx-auto leading-relaxed">
            {t('home.systemInAction.intro' as any)}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {capabilities.map(({ key, Icon, iconBg, iconColor }, index) => (
            <div key={key} className={`animate-slide-up-delay-${index + 1}`}>
              <Card hover className="h-full border-0 bg-white/80 backdrop-blur">
                <CardContent className="p-8">
                  <div className={`flex items-center justify-center w-16 h-16 rounded-xl bg-gradient-to-br ${iconBg} mb-6`}>
                    <Icon className={`w-8 h-8 ${iconColor}`} />
                  </div>
                  <h3 className="text-2xl mb-4 font-bold text-gray-900">
                    {t(`home.systemInAction.${key}.title` as any)}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {t(`home.systemInAction.${key}.description` as any)}
                  </p>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>

        <div className="text-center mt-12 animate-fade-in">
          <p className="text-gray-700 text-lg max-w-3xl mx-auto leading-relaxed">
            {t('home.systemInAction.outro' as any)}
          </p>
        </div>
      </div>
    </section>
  );
}
