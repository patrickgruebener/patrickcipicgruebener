'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Language, translate } from '@/lib/i18n';
import { TranslationKey } from '@/lib/translations/de';

interface ContactFormProps {
  language: Language;
}

const countryCodes = [
  { code: '+49', country: 'Germany', flag: '🇩🇪' },
  { code: '+43', country: 'Austria', flag: '🇦🇹' },
  { code: '+41', country: 'Switzerland', flag: '🇨🇭' },
  { code: '+385', country: 'Croatia', flag: '🇭🇷' },
  { code: '+44', country: 'UK', flag: '🇬🇧' },
  { code: '+1', country: 'USA/Canada', flag: '🇺🇸' },
  { code: '+33', country: 'France', flag: '🇫🇷' },
  { code: '+39', country: 'Italy', flag: '🇮🇹' },
  { code: '+34', country: 'Spain', flag: '🇪🇸' },
  { code: '+31', country: 'Netherlands', flag: '🇳🇱' },
];

export function ContactForm({ language }: ContactFormProps) {
  const t = (key: TranslationKey) => translate(language, key);

  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [countryCode, setCountryCode] = useState('+49');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    privacy: false,
    website: '', // Honeypot field - bots will fill this
  });

  const [errors, setErrors] = useState({
    firstName: '',
    lastName: '',
    phone: '',
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
      phone: '',
      email: '',
      privacy: '',
    };

    let hasErrors = false;

    // Validate all fields
    if (!formData.firstName.trim()) {
      newErrors.firstName = t('consultation.form.required');
      hasErrors = true;
    }
    if (!formData.lastName.trim()) {
      newErrors.lastName = t('consultation.form.required');
      hasErrors = true;
    }
    if (!formData.phone.trim()) {
      newErrors.phone = t('consultation.form.required');
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
            phone: `${countryCode} ${formData.phone}`,
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
      <div className="bg-gray-50 p-8 rounded-lg">
        <div className="bg-green-50 border-2 border-green-500 rounded-lg p-12 space-y-6 text-center">
          <div className="text-6xl">✓</div>
          <h2 className="text-3xl font-bold text-gray-900">
            {t('consultation.success.title')}
          </h2>
          <p className="text-lg text-gray-600">
            {t('consultation.success.message')}
          </p>
          <Button
            onClick={() => (window.location.href = '/')}
            className="mt-6"
          >
            {t('consultation.success.backToHome')}
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 p-8 rounded-lg">
      <form onSubmit={handleSubmit} className="space-y-6">
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

        {/* Phone */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t('consultation.form.phone')} *
          </label>
          <div className="flex gap-2">
            <select
              value={countryCode}
              onChange={(e) => setCountryCode(e.target.value)}
              className="w-[130px] px-3 py-3 rounded-lg border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {countryCodes.map((country) => (
                <option key={country.code} value={country.code}>
                  {country.flag} {country.code}
                </option>
              ))}
            </select>
            <Input
              type="tel"
              value={formData.phone}
              onChange={(e) => handleInputChange('phone', e.target.value)}
              placeholder="123456789"
              error={errors.phone}
              className="flex-1"
            />
          </div>
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
              className={`mt-1 w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 ${
                errors.privacy ? 'border-red-500' : ''
              }`}
            />
            <label
              htmlFor="privacy"
              className="text-sm text-gray-600 leading-tight cursor-pointer"
            >
              {t('consultation.form.privacy')}{' '}
              <a
                href="/impressum"
                className="text-blue-600 underline hover:text-blue-700"
              >
                {t('consultation.form.privacyLink')}
              </a>{' '}
              *
            </label>
          </div>
          {errors.privacy && (
            <p className="text-red-500 text-sm mt-1">{errors.privacy}</p>
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
          <div className="bg-red-50 border-2 border-red-500 rounded-lg p-4 text-red-700">
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
          {isSubmitting ? '...' : t('consultation.form.submit')}
        </Button>
      </form>
    </div>
  );
}
