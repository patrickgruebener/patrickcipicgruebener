import Image from 'next/image';
import { getTranslations } from '@/lib/i18n.server';
import { Card, CardContent } from '@/components/ui/Card';

function StarIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  );
}

const testimonials = [
  {
    key: '1',
    image: '/images/testimonials/sanela.avif',
  },
  {
    key: '2',
    image: '/images/testimonials/kristoph.avif',
  },
  {
    key: '3',
    image: '/images/testimonials/anna.avif',
  },
  {
    key: '4',
    image: '/images/testimonials/martin.avif',
  },
];

export async function TestimonialsSection() {
  const { t } = await getTranslations();

  return (
    <section id="testimonials" className="py-20 px-6 bg-gray-50">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-4xl mb-4 font-bold">{t('home.testimonials.title')}</h2>
        <p className="text-gray-600 text-lg mb-16 max-w-3xl mx-auto">
          {t('home.testimonials.subtitle')}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map(({ key, image }) => {
            const name = t(`home.testimonials.${key}.name` as any);
            const role = t(`home.testimonials.${key}.role` as any);
            const text = t(`home.testimonials.${key}.text` as any);
            const url = t(`home.testimonials.${key}.url` as any);
            const company = t(`home.testimonials.${key}.company` as any);

            // Parse role to separate position from company
            const roleParts = role.split(', ');
            const position = roleParts[0];
            const companyName = roleParts.slice(1).join(', ');

            return (
              <Card key={key} className="p-8 text-left">
                <CardContent className="p-0">
                  <div className="flex gap-1 mb-6">
                    {[...Array(5)].map((_, i) => (
                      <StarIcon key={i} className="w-5 h-5 text-green-400" />
                    ))}
                  </div>
                  <p className="text-gray-700 mb-6 italic whitespace-pre-line">
                    &ldquo;{text}&rdquo;
                  </p>
                  <div className="flex items-center gap-4">
                    <Image
                      src={image}
                      alt={name}
                      width={64}
                      height={64}
                      className="w-16 h-16 rounded-full object-cover flex-shrink-0"
                    />
                    <div>
                      <p className="text-gray-900 font-medium">{name}</p>
                      <p className="text-gray-600">
                        {position},{' '}
                        <a
                          href={url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-700 hover:underline"
                        >
                          {companyName}
                        </a>
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
