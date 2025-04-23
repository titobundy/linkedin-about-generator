import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { formSchema, FormValues, toneOptions, languageOptions } from '../lib/schemas/formSchema';
import { useLanguage } from '../lib/contexts/LanguageContext';

interface AboutFormProps {
  onGenerate: (text: string) => void;
  onSubmit: () => void;
  isLoading: boolean;
}

const AboutForm: React.FC<AboutFormProps> = ({ onGenerate, onSubmit, isLoading }) => {
  const { t, language, setLanguage } = useLanguage();
  
  const { 
    register, 
    handleSubmit, 
    control,
    formState: { errors },
    watch
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      role: '',
      experience: '',
      technologies: '',
      tone: 'professional',
      language: language
    }
  });

  // Watch the language field to update the context language when it changes
  const watchedLanguage = watch('language');
  
  React.useEffect(() => {
    setLanguage(watchedLanguage as 'en' | 'es');
  }, [watchedLanguage, setLanguage]);

  const handleFormSubmit = async (data: FormValues) => {
    // Signal to parent component that submission has started
    onSubmit();
    
    try {
      const response = await fetch('/api/generate-about', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Failed to generate content');
      }

      const result = await response.json();
      onGenerate(result.text);
    } catch (error) {
      console.error('Error generating content:', error);
      // You could add error handling here, like showing a toast notification
    }
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="linkedin-card p-3 sm:p-4 md:p-6 rounded-[var(--linkedin-border-radius)] space-y-4 sm:space-y-5 max-w-2xl mx-auto">
      {/* Language Selector */}
      <div className="flex justify-end mb-1 sm:mb-2">
        <div className="w-full max-w-xs">
          <label className="block text-[var(--linkedin-gray-dark)] text-sm font-semibold mb-1">
            {t.languageLabel}
          </label>
          <Controller
            name="language"
            control={control}
            render={({ field }) => (
              <select
                {...field}
                className="border border-[var(--linkedin-gray-border)] rounded-[var(--linkedin-border-radius)] py-1.5 sm:py-2 px-2 sm:px-3 w-full focus:border-[var(--linkedin-blue-primary)] focus:ring-1 focus:ring-[var(--linkedin-blue-primary)] focus:outline-none text-sm"
                disabled={isLoading}
              >
                {languageOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            )}
          />
        </div>
      </div>

      <div className="border-t border-[var(--linkedin-gray-border)] pt-4 sm:pt-5">
        {/* Name */}
        <div className="mb-3 sm:mb-4">
          <label className="block text-[var(--linkedin-gray-dark)] text-xs sm:text-sm font-semibold mb-1">
            {t.nameLabel}
          </label>
          <input
            type="text"
            {...register('name')}
            placeholder={t.namePlaceholder}
            className={`border text-sm ${errors.name ? 'border-[var(--linkedin-error)]' : 'border-[var(--linkedin-gray-border)]'} rounded-[var(--linkedin-border-radius)] py-1.5 sm:py-2 px-2 sm:px-3 w-full focus:border-[var(--linkedin-blue-primary)] focus:ring-1 focus:ring-[var(--linkedin-blue-primary)] focus:outline-none`}
            disabled={isLoading}
          />
          {errors.name && (
            <span className="text-[var(--linkedin-error)] text-xs mt-1 block">{errors.name.message}</span>
          )}
        </div>

        {/* Professional Role */}
        <div className="mb-3 sm:mb-4">
          <label className="block text-[var(--linkedin-gray-dark)] text-xs sm:text-sm font-semibold mb-1">
            {t.roleLabel}
          </label>
          <input
            type="text"
            {...register('role')}
            placeholder={t.rolePlaceholder}
            className={`border text-sm ${errors.role ? 'border-[var(--linkedin-error)]' : 'border-[var(--linkedin-gray-border)]'} rounded-[var(--linkedin-border-radius)] py-1.5 sm:py-2 px-2 sm:px-3 w-full focus:border-[var(--linkedin-blue-primary)] focus:ring-1 focus:ring-[var(--linkedin-blue-primary)] focus:outline-none`}
            disabled={isLoading}
          />
          {errors.role && (
            <span className="text-[var(--linkedin-error)] text-xs mt-1 block">{errors.role.message}</span>
          )}
        </div>

        {/* Experience Details */}
        <div className="mb-3 sm:mb-4">
          <label className="block text-[var(--linkedin-gray-dark)] text-xs sm:text-sm font-semibold mb-1">
            {t.experienceLabel}
          </label>
          <textarea
            {...register('experience')}
            placeholder={t.experiencePlaceholder}
            className={`border text-sm ${errors.experience ? 'border-[var(--linkedin-error)]' : 'border-[var(--linkedin-gray-border)]'} rounded-[var(--linkedin-border-radius)] py-1.5 sm:py-2 px-2 sm:px-3 w-full h-20 sm:h-24 focus:border-[var(--linkedin-blue-primary)] focus:ring-1 focus:ring-[var(--linkedin-blue-primary)] focus:outline-none resize-none`}
            disabled={isLoading}
          />
          {errors.experience && (
            <span className="text-[var(--linkedin-error)] text-xs mt-1 block">{errors.experience.message}</span>
          )}
        </div>

        {/* Technologies & Skills */}
        <div className="mb-3 sm:mb-4">
          <label className="block text-[var(--linkedin-gray-dark)] text-xs sm:text-sm font-semibold mb-1">
            {t.technologiesLabel}
          </label>
          <textarea
            {...register('technologies')}
            placeholder={t.technologiesPlaceholder}
            className={`border text-sm ${errors.technologies ? 'border-[var(--linkedin-error)]' : 'border-[var(--linkedin-gray-border)]'} rounded-[var(--linkedin-border-radius)] py-1.5 sm:py-2 px-2 sm:px-3 w-full h-16 sm:h-20 focus:border-[var(--linkedin-blue-primary)] focus:ring-1 focus:ring-[var(--linkedin-blue-primary)] focus:outline-none resize-none`}
            disabled={isLoading}
          />
          {errors.technologies && (
            <span className="text-[var(--linkedin-error)] text-xs mt-1 block">{errors.technologies.message}</span>
          )}
        </div>

        {/* Tone Selection */}
        <div className="mb-3 sm:mb-4">
          <label className="block text-[var(--linkedin-gray-dark)] text-xs sm:text-sm font-semibold mb-1">
            {t.toneLabel}
          </label>
          <Controller
            name="tone"
            control={control}
            render={({ field }) => (
              <select
                {...field}
                className="border text-sm border-[var(--linkedin-gray-border)] rounded-[var(--linkedin-border-radius)] py-1.5 sm:py-2 px-2 sm:px-3 w-full focus:border-[var(--linkedin-blue-primary)] focus:ring-1 focus:ring-[var(--linkedin-blue-primary)] focus:outline-none"
                disabled={isLoading}
              >
                {toneOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label[language]}
                  </option>
                ))}
              </select>
            )}
          />
        </div>
      </div>

      {/* Submit Button */}
      <div className="mt-6 sm:mt-8">
        <button
          type="submit"
          className="w-full bg-[var(--linkedin-blue-primary)] text-white font-semibold py-2 sm:py-3 px-3 sm:px-4 rounded-[var(--linkedin-border-radius)] hover:bg-[var(--linkedin-blue-hover)] transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[var(--linkedin-blue-focus)] focus:ring-opacity-50 disabled:opacity-70 disabled:cursor-not-allowed text-sm sm:text-base"
          disabled={isLoading}
        >
          {isLoading ? (
            <div className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-2 sm:mr-3 h-4 sm:h-5 w-4 sm:w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              {t.generatingMessage}
            </div>
          ) : (
            t.generateButton
          )}
        </button>
      </div>
    </form>
  );
};

export default AboutForm;
