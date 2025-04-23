import React, { createContext, useContext, useState, ReactNode } from 'react';

// Define the available languages
export type Language = 'en' | 'es';

// Define the structure for translations
interface Translations {
  // Page information
  pageTitle: string;
  pageDescription: string;
  
  // Form labels
  roleLabel: string;
  rolePlaceholder: string;
  experienceLabel: string;
  experiencePlaceholder: string;
  technologiesLabel: string;
  technologiesPlaceholder: string;
  toneLabel: string;
  languageLabel: string;
  
  // Action buttons
  generateButton: string;
  copyButton: string;
  copiedMessage: string;
  
  // Messages
  generatingMessage: string;
  errorMessage: string;
  successMessage: string;
  resultTitle: string;
}

// Define translations for each language
const translations: Record<Language, Translations> = {
  en: {
    // Page information
    pageTitle: 'LinkedIn About Generator',
    pageDescription: 'Create a personalized LinkedIn About section with AI',
    
    // Form labels
    roleLabel: 'Professional Role',
    rolePlaceholder: 'E.g., Full Stack Developer, Marketing Manager, Project Manager',
    experienceLabel: 'Experience Details',
    experiencePlaceholder: 'Describe your experience, years in the field, key achievements, etc.',
    technologiesLabel: 'Technologies & Skills',
    technologiesPlaceholder: 'List technologies, tools, or skills you want to highlight',
    toneLabel: 'Preferred Tone',
    languageLabel: 'Language',
    
    // Action buttons
    generateButton: 'Generate About Section',
    copyButton: 'Copy to Clipboard',
    copiedMessage: 'Copied!',
    
    // Messages
    generatingMessage: 'Generating your LinkedIn About section...',
    errorMessage: 'An error occurred. Please try again.',
    successMessage: 'Your LinkedIn About section has been generated!',
    resultTitle: 'Your LinkedIn About Section'
  },
  es: {
    // Page information
    pageTitle: 'Generador de Sección Acerca de LinkedIn',
    pageDescription: 'Crea una sección Acerca de personalizada para LinkedIn con IA',
    
    // Form labels
    roleLabel: 'Rol Profesional',
    rolePlaceholder: 'Ej., Desarrollador Full Stack, Gerente de Marketing, Director de Proyectos',
    experienceLabel: 'Detalles de Experiencia',
    experiencePlaceholder: 'Describe tu experiencia, años en el campo, logros clave, etc.',
    technologiesLabel: 'Tecnologías y Habilidades',
    technologiesPlaceholder: 'Lista las tecnologías, herramientas o habilidades que quieres destacar',
    toneLabel: 'Tono Preferido',
    languageLabel: 'Idioma',
    
    // Action buttons
    generateButton: 'Generar Sección Acerca de',
    copyButton: 'Copiar al Portapapeles',
    copiedMessage: '¡Copiado!',
    
    // Messages
    generatingMessage: 'Generando tu sección Acerca de LinkedIn...',
    errorMessage: 'Ocurrió un error. Por favor, intenta de nuevo.',
    successMessage: '¡Tu sección Acerca de LinkedIn ha sido generada!',
    resultTitle: 'Tu Sección Acerca de LinkedIn'
  }
};

// Define the context type
interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: Translations; // t for translations
}

// Create the context with a default value
const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Props for the provider component
interface LanguageProviderProps {
  children: ReactNode;
}

// Provider component that will wrap the app
export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');
  
  // Get the translations for the current language
  const t = translations[language];
  
  // Create the context value
  const value = {
    language,
    setLanguage,
    t
  };
  
  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

// Custom hook to use the language context
export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  
  return context;
};

