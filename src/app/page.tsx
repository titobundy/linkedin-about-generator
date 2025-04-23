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
    setIsLoading(false);
  };
  return (
    <div className="w-full max-w-4xl mx-auto px-4">
      <header className="mt-8 mb-12 text-center">
        <h1 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-700">
          {t.pageTitle}
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          {t.pageDescription}
        </p>
      </header>

      <div className="mb-16">
        <AboutForm 
          onGenerate={handleGenerate} 
          isLoading={isLoading} 
        />
        
        {generatedText && (
          <GeneratedAbout text={generatedText} />
        )}
      </div>

      <footer className="py-8 text-center text-sm text-gray-500 dark:text-gray-400 border-t border-gray-200 dark:border-gray-800">
        <p>© {new Date().getFullYear()} LinkedIn About Generator. {language === 'en' ? 'All rights reserved.' : 'Todos los derechos reservados.'}</p>
      </footer>
    </div>
  );
}

// Page component with the LanguageProvider wrapper
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between py-8">
      <LanguageProvider>
        <MainContent />
      </LanguageProvider>
    </main>
  );
}
