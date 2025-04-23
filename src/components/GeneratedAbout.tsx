import React, { useState } from 'react';
import { useLanguage } from '../lib/contexts/LanguageContext';

interface GeneratedAboutProps {
  text: string;
}

const GeneratedAbout: React.FC<GeneratedAboutProps> = ({ text }) => {
  const { t } = useLanguage();
  const [copied, setCopied] = useState(false);

  // If no text is provided, don't render anything
  if (!text) {
    return null;
  }

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      
      // Reset the copied state after 2 seconds
      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <div className="mt-8 linkedin-card border border-[var(--linkedin-gray-border)] rounded-[var(--linkedin-border-radius)] shadow-[var(--linkedin-shadow)] p-6">
      <div className="flex justify-between items-center mb-4 border-b border-[var(--linkedin-gray-border)] pb-3">
        <h3 className="text-lg font-semibold text-[var(--linkedin-gray-dark)]">{t.resultTitle}</h3>
        <button
          onClick={copyToClipboard}
          className={`flex items-center px-3 py-1.5 text-sm rounded-[var(--linkedin-border-radius)] ${
            copied 
              ? 'bg-[var(--linkedin-success)] text-white'
              : 'border border-[var(--linkedin-gray-border)] text-[var(--linkedin-gray-dark)] hover:bg-[var(--linkedin-gray-light)]'
          } transition-colors duration-200`}
          aria-label="Copy to clipboard"
        >
          {copied ? (
            <>
              {/* LinkedIn-style checkmark icon */}
              <svg className="h-4 w-4 mr-1.5" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M6.5 12.5L3 9l1-1 2.5 2.5 5.5-5.5 1 1-6.5 6.5z"></path>
              </svg>
              {t.copiedMessage}
            </>
          ) : (
            <>
              {/* LinkedIn-style copy icon */}
              <svg className="h-4 w-4 mr-1.5" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor">
                <path d="M5.75 3.5H4.25C3.55964 3.5 3 4.05964 3 4.75V11.25C3 11.9404 3.55964 12.5 4.25 12.5H10.75C11.4404 12.5 12 11.9404 12 11.25V9.75" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M7.25 8.5L12.25 3.5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M9.75 3.5H12.25V6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              {t.copyButton}
            </>
          )}
        </button>
      </div>
      
      <div className="p-4 rounded-[var(--linkedin-border-radius)] text-[var(--linkedin-gray-dark)] border border-[var(--linkedin-gray-border)]">
        <div className="whitespace-pre-wrap font-linkedin text-sm leading-relaxed">
          {text.split('\n').map((paragraph, index) => (
            paragraph ? <p key={index} className="mb-3">{paragraph}</p> : <br key={index} />
          ))}
        </div>
      </div>
      
      <div className="mt-4 pt-2 border-t border-[var(--linkedin-gray-border)] text-xs text-[var(--linkedin-gray-medium)]">
        <div className="flex items-center">
          {/* LinkedIn-style info icon */}
          <svg className="h-4 w-4 mr-1.5 text-[var(--linkedin-blue-primary)]" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path d="M8 1.75C4.55375 1.75 1.75 4.55375 1.75 8C1.75 11.4462 4.55375 14.25 8 14.25C11.4462 14.25 14.25 11.4462 14.25 8C14.25 4.55375 11.4462 1.75 8 1.75ZM8.75 11.25H7.25V7.25H8.75V11.25ZM8 6C7.58579 6 7.25 5.66421 7.25 5.25C7.25 4.83579 7.58579 4.5 8 4.5C8.41421 4.5 8.75 4.83579 8.75 5.25C8.75 5.66421 8.41421 6 8 6Z"></path>
          </svg>
          <p>{t.successMessage}</p>
        </div>
      </div>
    </div>
  );
};

export default GeneratedAbout;

