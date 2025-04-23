import { z } from 'zod';

/**
 * Validation schema for the LinkedIn About generator form
 */
export const formSchema = z.object({
  // Name of the person (required, min 2 characters)
  name: z.string()
    .min(2, { message: 'Name must be at least 2 characters long' })
    .trim(),

  // Professional role/title (required, min 2 characters)
  role: z.string()
    .min(2, { message: 'Role must be at least 2 characters long' })
    .trim(),
  
  // Experience details (required, min 10 characters)
  experience: z.string()
    .min(10, { message: 'Experience must be at least 10 characters long' })
    .trim(),
  
  // Technologies/skills (required, min 5 characters)
  technologies: z.string()
    .min(5, { message: 'Technologies must be at least 5 characters long' })
    .trim(),
  
  // Tone of voice (one of predefined options)
  tone: z.enum(['professional', 'formal', 'inspirational', 'friendly', 'conversational', 'creative']),
  
  // Language selection (English or Spanish)
  language: z.enum(['en', 'es']),
});

// TypeScript type derived from the Zod schema
export type FormValues = z.infer<typeof formSchema>;

// Predefined tone options with labels for display
export const toneOptions = [
  { value: 'professional', label: { en: 'Professional', es: 'Profesional' } },
  { value: 'formal', label: { en: 'Formal', es: 'Formal' } },
  { value: 'inspirational', label: { en: 'Inspirational', es: 'Inspirador' } },
  { value: 'friendly', label: { en: 'Friendly', es: 'Amigable' } },
  { value: 'conversational', label: { en: 'Conversational', es: 'Conversacional' } },
  { value: 'creative', label: { en: 'Creative', es: 'Creativo' } }
];

// Language options
export const languageOptions = [
  { value: 'en', label: 'English' },
  { value: 'es', label: 'Español' }
];

