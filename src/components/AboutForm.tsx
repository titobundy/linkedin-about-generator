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
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6 max-w-2xl mx-auto">
      {/* Language Selector */}
      <div className="flex justify-end mb-4">
        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text text-sm font-medium">{t.languageLabel}</span>
          </label>
          <Controller
            name="language"
            control={control}
            render={({ field }) => (
              <select
                {...field}
                className="select select-bordered w-full max-w-xs"
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

      {/* Name */}
      <div className="form-control w-full">
        <label className="label">
          <span className="label-text text-sm font-medium">{t.nameLabel}</span>
        </label>
        <input
          type="text"
          {...register('name')}
          placeholder={t.namePlaceholder}
          className={`input input-bordered w-full ${errors.name ? 'input-error' : ''}`}
          disabled={isLoading}
        />
        {errors.name && (
          <span className="text-red-500 text-xs mt-1">{errors.name.message}</span>
        )}
      </div>

      {/* Professional Role */}
      <div className="form-control w-full">
        <label className="label">
          <span className="label-text text-sm font-medium">{t.roleLabel}</span>
        </label>
        <input
          type="text"
          {...register('role')}
          placeholder={t.rolePlaceholder}
          className={`input input-bordered w-full ${errors.role ? 'input-error' : ''}`}
          disabled={isLoading}
        />
        {errors.role && (
          <span className="text-red-500 text-xs mt-1">{errors.role.message}</span>
        )}
      </div>

      {/* Experience Details */}
      <div className="form-control w-full">
        <label className="label">
          <span className="label-text text-sm font-medium">{t.experienceLabel}</span>
        </label>
        <textarea
          {...register('experience')}
          placeholder={t.experiencePlaceholder}
          className={`textarea textarea-bordered h-24 w-full ${errors.experience ? 'textarea-error' : ''}`}
          disabled={isLoading}
        />
        {errors.experience && (
          <span className="text-red-500 text-xs mt-1">{errors.experience.message}</span>
        )}
      </div>

      {/* Technologies & Skills */}
      <div className="form-control w-full">
        <label className="label">
          <span className="label-text text-sm font-medium">{t.technologiesLabel}</span>
        </label>
        <textarea
          {...register('technologies')}
          placeholder={t.technologiesPlaceholder}
          className={`textarea textarea-bordered h-20 w-full ${errors.technologies ? 'textarea-error' : ''}`}
          disabled={isLoading}
        />
        {errors.technologies && (
          <span className="text-red-500 text-xs mt-1">{errors.technologies.message}</span>
        )}
      </div>

      {/* Tone Selection */}
      <div className="form-control w-full">
        <label className="label">
          <span className="label-text text-sm font-medium">{t.toneLabel}</span>
        </label>
        <Controller
          name="tone"
          control={control}
          render={({ field }) => (
            <select
              {...field}
              className="select select-bordered w-full"
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

      {/* Submit Button */}
      <div className="form-control mt-8">
        <button
          type="submit"
          className="btn btn-primary w-full"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <span className="loading loading-spinner loading-sm mr-2"></span>
              {t.generatingMessage}
            </>
          ) : (
            t.generateButton
          )}
        </button>
      </div>
    </form>
  );
};

export default AboutForm;

