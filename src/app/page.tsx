'use client';

import { useState } from 'react';
import AboutForm from '@/components/AboutForm';
import GeneratedAbout from '@/components/GeneratedAbout';
import { LanguageProvider, useLanguage } from '@/lib/contexts/LanguageContext';

// Main content component that uses the language context
function MainContent() {
  const { t, language } = useLanguage();
  const [generatedText, setGeneratedText] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleGenerate = (text: string) => {
    setGeneratedText(text);
    setIsLoading(false); // Turn off loading when generation is complete
  };

  const handleSubmit = () => {
    setIsLoading(true); // Turn on loading when form is submitted
  };

  return (
    <div className="w-full max-w-5xl mx-auto px-2 sm:px-4 md:px-6 lg:px-8 main-container my-4 sm:my-6 md:my-8 p-3 sm:p-4 md:p-6">
      {/* LinkedIn-style header */}
      <header className="mt-3 mb-4 md:mt-6 md:mb-10">
        <div className="text-center">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2 md:mb-3 text-[var(--linkedin-blue-primary)]">
            {t.pageTitle}
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-[var(--linkedin-gray-medium)] max-w-2xl mx-auto">
            {t.pageDescription}
          </p>
        </div>
      </header>

      {/* Main content area */}
      <div className="mb-8 sm:mb-12 md:mb-16 max-w-4xl mx-auto">
        {/* LinkedIn-styled info banner */}
        <div className="mb-4 sm:mb-6 p-3 sm:p-4 border border-[var(--linkedin-blue-light)] bg-blue-50 text-[var(--linkedin-blue-primary)] rounded-[var(--linkedin-border-radius)]">
          <div className="flex">
            <div className="flex-shrink-0">
              {/* LinkedIn-style info icon */}
              <svg className="h-5 w-5 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-xs sm:text-sm font-medium">
                {language === 'en' 
                  ? 'Fill in the form below to generate a personalized LinkedIn About section.' 
                  : 'Complete el formulario a continuación para generar una sección Acerca de personalizada para LinkedIn.'}
              </p>
            </div>
          </div>
        </div>
        
        <AboutForm 
          onGenerate={handleGenerate}
          onSubmit={handleSubmit}
          isLoading={isLoading} 
        />
        
        {generatedText && (
          <GeneratedAbout text={generatedText} />
        )}
      </div>

      {/* LinkedIn-style footer */}
      <footer className="py-4 sm:py-6 border-t border-[var(--linkedin-gray-border)]">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-3 md:mb-0">
            {/* LinkedIn-style logo */}
            <svg className="h-5 sm:h-6 w-5 sm:w-6 text-[var(--linkedin-blue-primary)] mr-2" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"></path>
            </svg>
            <span className="text-xs sm:text-sm font-semibold text-[var(--linkedin-gray-dark)]">
              LinkedIn About Generator
            </span>
          </div>
          <p className="text-xs text-[var(--linkedin-gray-medium)]">
            © {new Date().getFullYear()} LinkedIn About Generator. {language === 'en' ? 'All rights reserved.' : 'Todos los derechos reservados.'}
          </p>
        </div>
      </footer>
    </div>
  );
}

// Page component with the LanguageProvider wrapper
export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center py-2 sm:py-4">
      <LanguageProvider>
        <MainContent />
      </LanguageProvider>
    </main>
  );
}
