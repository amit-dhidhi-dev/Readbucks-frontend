// useTranslateControl.js
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export const useTranslateControl = (allowTranslation = false) => {
  const location = useLocation();

  useEffect(() => {
    const forceOriginalLanguage = () => {
      // Method 1: Clear ALL Google Translate cookies
      const clearGoogleCookies = () => {
        const cookies = ['googtrans', 'googlelang'];
        cookies.forEach(name => {
          // Clear for current path
          document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
          // Clear for domain
          document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=${window.location.hostname}`;
          // Clear for all subdomains
          document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=.${window.location.hostname}`;
        });
      };

      // Method 2: Click on original language if widget exists
      const clickOriginalLanguage = () => {
        setTimeout(() => {
          // Find and click the select element
          const selectElement = document.querySelector('.goog-te-combo');
          if (selectElement) {
            selectElement.value = ''; // Empty value = original language
            selectElement.dispatchEvent(new Event('change', { bubbles: true }));
          }

          // Alternative: Click on iframe option
          const iframe = document.querySelector('.goog-te-menu-frame');
          if (iframe && iframe.contentDocument) {
            const originalOption = iframe.contentDocument.querySelector('[value=""]');
            if (originalOption) {
              originalOption.click();
            }
          }
        }, 100);
      };

      // Method 3: Remove translation attributes from DOM
      const removeTranslationAttributes = () => {
        // Remove lang attributes
        document.querySelectorAll('[lang]').forEach(el => {
          if (el.getAttribute('lang') !== 'en') {
            el.setAttribute('lang', 'en');
          }
        });

        // Remove font attributes added by Google Translate
        document.querySelectorAll('font').forEach(font => {
          const parent = font.parentNode;
          while (font.firstChild) {
            parent.insertBefore(font.firstChild, font);
          }
          parent.removeChild(font);
        });
      };

      // Method 4: Force page reload if still translated
      const forceReloadIfTranslated = () => {
        const isTranslated = document.body.classList.contains('translated-ltr') || 
                            document.body.classList.contains('translated-rtl') ||
                            document.querySelector('.goog-te-banner-frame');
        
        if (isTranslated && !allowTranslation) {
          // Remove classes first
          document.body.classList.remove('translated-ltr', 'translated-rtl');
          
          // Store flag to prevent loop
          if (!sessionStorage.getItem('translation_reset_done')) {
            sessionStorage.setItem('translation_reset_done', 'true');
            window.location.reload();
          }
        } else {
          sessionStorage.removeItem('translation_reset_done');
        }
      };

      // Execute all methods
      clearGoogleCookies();
      clickOriginalLanguage();
      removeTranslationAttributes();
      forceReloadIfTranslated();
    };

    if (!allowTranslation) {
      forceOriginalLanguage();
      
      // Also run after a small delay to catch async translations
      const timeoutId = setTimeout(forceOriginalLanguage, 500);
      
      return () => clearTimeout(timeoutId);
    }
  }, [location.pathname, allowTranslation]);
};

