'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Language, translate } from '@/lib/i18n';
import { TranslationKey } from '@/lib/translations/de';

interface ContactFormProps {
  language: Language;
  purchaseInquiry?: boolean;
}

const countryCodes = [
  { code: '+49', country: 'Germany', iso: 'DE' },
  { code: '+43', country: 'Austria', iso: 'AT' },
  { code: '+41', country: 'Switzerland', iso: 'CH' },
  { code: '+385', country: 'Croatia', iso: 'HR' },
  { code: '+44', country: 'UK', iso: 'GB' },
  { code: '+1', country: 'USA/Canada', iso: 'US' },
  { code: '+33', country: 'France', iso: 'FR' },
  { code: '+39', country: 'Italy', iso: 'IT' },
  { code: '+34', country: 'Spain', iso: 'ES' },
  { code: '+31', country: 'Netherlands', iso: 'NL' },
];

export function ContactForm({ language, purchaseInquiry = false }: ContactFormProps) {
  const t = (key: TranslationKey) => translate(language, key);

  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [countryCode, setCountryCode] = useState('+49');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    message: purchaseInquiry ? t('consultation.purchaseMessage') : '',
    email: '',
    privacy: false,
    website: '', // Honeypot field - bots will fill this
  });

  const [errors, setErrors] = useState({
    firstName: '',
    lastName: '',
    email: '',
    privacy: '',
  });

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Rate limiting: Prevent submissions within 60 seconds
    const lastSubmission = localStorage.getItem('lastContactSubmission');
    if (lastSubmission) {
      const timeSinceLastSubmit = Date.now() - parseInt(lastSubmission);
      const waitTime = 60000; // 60 seconds

      if (timeSinceLastSubmit < waitTime) {
        const remainingSeconds = Math.ceil((waitTime - timeSinceLastSubmit) / 1000);
        setSubmitError(`Bitte warten Sie noch ${remainingSeconds} Sekunden, bevor Sie erneut absenden.`);
        return;
      }
    }

    // Reset errors
    const newErrors = {
      firstName: '',
      lastName: '',
      email: '',
      privacy: '',
    };

    let hasErrors = false;

    // Validate required fields
    if (!formData.firstName.trim()) {
      newErrors.firstName = t('consultation.form.required');
      hasErrors = true;
    }
    if (!formData.lastName.trim()) {
      newErrors.lastName = t('consultation.form.required');
      hasErrors = true;
    }
    if (!formData.email.trim()) {
      newErrors.email = t('consultation.form.required');
      hasErrors = true;
    } else if (!validateEmail(formData.email)) {
      newErrors.email = t('consultation.form.emailInvalid');
      hasErrors = true;
    }
    if (!formData.privacy) {
      newErrors.privacy = t('consultation.form.required');
      hasErrors = true;
    }

    setErrors(newErrors);

    if (!hasErrors) {
      setIsSubmitting(true);

      try {
        const response = await fetch('/api/contact', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            firstName: formData.firstName,
            lastName: formData.lastName,
            phone: formData.phone ? `${countryCode} ${formData.phone}` : '',
            message: formData.message,
            email: formData.email,
            website: formData.website, // Honeypot field
          }),
        });

        if (response.ok) {
          localStorage.setItem('lastContactSubmission', Date.now().toString());
          setSubmitted(true);
        } else {
          const data = await response.json();
          setSubmitError(data.error || 'Es gab einen Fehler beim Senden des Formulars.');
        }
      } catch (error) {
        console.error('Error submitting form:', error);
        setSubmitError('Es gab einen Fehler beim Senden des Formulars. Bitte versuchen Sie es erneut.');
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
    // Clear errors when user starts typing
    if (errors[field as keyof typeof errors]) {
      setErrors(prev => ({
        ...prev,
        [field]: '',
      }));
    }
    if (submitError) {
      setSubmitError('');
    }
  };

  // Success message view
  if (submitted) {
    return (
      <div className="bg-sheet p-6 min-[721px]:p-8" role="status">
        <div className="grid gap-5 border-t-2 border-ink pt-5">
          <h2 className="m-0 font-display text-[44px] leading-[0.95] font-[820] text-ink">
            {t('consultation.success.title')}
          </h2>
          <p className="max-w-[40ch] text-[17px] text-ink-2">
            {t('consultation.success.message')}
          </p>
          <Button
            onClick={() => (window.location.href = '/')}
            className="justify-self-start"
          >
            {t('consultation.success.backToHome')}
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-sheet p-6 min-[721px]:p-8">
      <form onSubmit={handleSubmit} className="grid gap-5">
        {/* First Name */}
        <Input
          label={`${t('consultation.form.firstName')} *`}
          type="text"
          value={formData.firstName}
          onChange={(e) => handleInputChange('firstName', e.target.value)}
          error={errors.firstName}
        />

        {/* Last Name */}
        <Input
          label={`${t('consultation.form.lastName')} *`}
          type="text"
          value={formData.lastName}
          onChange={(e) => handleInputChange('lastName', e.target.value)}
          error={errors.lastName}
        />

        {/* Phone (optional) */}
        <div>
          <label htmlFor="phone" className="mb-1.5 block text-sm font-semibold text-ink">
            {t('consultation.form.phone')}
          </label>
          <div className="flex gap-2">
            <select
              aria-label={t('consultation.form.phone')}
              value={countryCode}
              onChange={(e) => setCountryCode(e.target.value)}
              className="w-[120px] rounded-[3px] border border-ink-2 bg-paper px-3 py-2.5 font-text text-base text-ink focus:border-brand-blue focus:outline-2 focus:outline-offset-0! focus:outline-brand-blue!"
            >
              {countryCodes.map((country) => (
                <option key={country.code} value={country.code}>
                  {country.iso} {country.code}
                </option>
              ))}
            </select>
            <Input
              id="phone"
              type="tel"
              value={formData.phone}
              onChange={(e) => handleInputChange('phone', e.target.value)}
              placeholder="123456789"
              className="flex-1"
            />
          </div>
        </div>

        {/* Message */}
        <div>
          <label htmlFor="message" className="mb-1.5 block text-sm font-semibold text-ink">
            {t('consultation.form.message')}
          </label>
          <textarea
            id="message"
            value={formData.message}
            onChange={(e) => handleInputChange('message', e.target.value)}
            placeholder={t('consultation.form.messagePlaceholder')}
            rows={4}
            className="w-full resize-none placeholder:text-ink-2 rounded-[3px] border border-ink-2 bg-paper px-3 py-2.5 font-text text-base text-ink focus:border-brand-blue focus:outline-2 focus:outline-offset-0! focus:outline-brand-blue!"
          />
        </div>

        {/* Email */}
        <Input
          label={`${t('consultation.form.email')} *`}
          type="email"
          value={formData.email}
          onChange={(e) => handleInputChange('email', e.target.value)}
          error={errors.email}
        />

        {/* Privacy Checkbox */}
        <div>
          <div className="flex items-start gap-3">
            <input
              type="checkbox"
              id="privacy"
              checked={formData.privacy}
              onChange={(e) => handleInputChange('privacy', e.target.checked)}
              aria-invalid={errors.privacy ? true : undefined}
              className="mt-1 h-4 w-4 accent-brand-blue"
            />
            <label
              htmlFor="privacy"
              className="cursor-pointer text-sm leading-snug text-ink-2"
            >
              {t('consultation.form.privacy')}{' '}
              <a
                href="/impressum"
                className="text-brand-blue underline underline-offset-[3px]"
              >
                {t('consultation.form.privacyLink')}
              </a>{' '}
              *
            </label>
          </div>
          {errors.privacy && (
            <p className="mt-1 text-sm text-warn">{errors.privacy}</p>
          )}
        </div>

        {/* Honeypot field - hidden from humans, visible to bots */}
        <div style={{ position: 'absolute', left: '-5000px' }} aria-hidden="true">
          <input
            type="text"
            name="website"
            tabIndex={-1}
            autoComplete="off"
            value={formData.website}
            onChange={(e) => handleInputChange('website', e.target.value)}
          />
        </div>

        {/* Error Message */}
        {submitError && (
          <div role="alert" className="rounded-[3px] border-2 border-warn bg-paper p-4 text-warn">
            {submitError}
          </div>
        )}

        {/* Submit Button */}
        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full"
          size="lg"
        >
          {isSubmitting ? '...' : t(purchaseInquiry ? 'consultation.form.purchaseSubmit' : 'consultation.form.submit')}
        </Button>
      </form>
    </div>
  );
}
