// useGoogleTranslate.js
import { useEffect, useState } from 'react';

 const useGoogleTranslate = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (window.google?.translate) {
      setIsLoaded(true);
      return;
    }

    window.googleTranslateElementInit = () => {
      new window.google.translate.TranslateElement(
        {
          pageLanguage: 'en',
          includedLanguages: 'hi,en,es,fr,de,ja,zh-CN,ar',
          layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
        },
        'google_translate_element'
      );
      setIsLoaded(true);
    };

    const script = document.createElement('script');
    script.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
    script.async = true;
    script.onload = () => setIsLoaded(true);
    document.body.appendChild(script);

    return () => {
      const script = document.querySelector('script[src*="translate.google.com"]');
      if (script) script.remove();
    };
  }, []);

  return isLoaded;
};
export default useGoogleTranslate;