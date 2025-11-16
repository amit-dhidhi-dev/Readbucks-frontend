// import { useEffect, useState } from "react";

// export default function GoogleTranslate() {
//   const [isLoaded, setIsLoaded] = useState(false);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       const googleCombo = document.querySelector(".goog-te-combo");
//       if (googleCombo) {
//         setIsLoaded(true);
//         clearInterval(interval);
//       }
//     }, 300);

//     return () => clearInterval(interval);
//   }, []);

//   const changeLanguage = (lang) => {
//     const translateSelect = document.querySelector(".goog-te-combo");

//     if (!translateSelect) {
//       console.warn("Google Translate not ready yet.");
//       return;
//     }

//     translateSelect.value = lang;
//     translateSelect.dispatchEvent(new Event("change"));
//   };

//   if (!isLoaded) {
//     return (
//       <div className="text-gray-500 text-sm">
//         Loading translator...
//       </div>
//     );
//   }

//   return (
//     <div className="flex gap-3 items-center bg-white border rounded-xl px-3 py-2 shadow-sm w-fit">
//       <span className="font-medium text-gray-700">🌐 Language:</span>

//       <select
//         onChange={(e) => changeLanguage(e.target.value)}
//         className="border border-gray-300 px-3 py-1 rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
//       >
//         <option value="en">English</option>
//         <option value="hi">Hindi</option>
//         <option value="bn">Bengali</option>
//         <option value="ta">Tamil</option>
//         <option value="te">Telugu</option>
//         <option value="mr">Marathi</option>
//         <option value="gu">Gujarati</option>
//         <option value="kn">Kannada</option>
//         <option value="ml">Malayalam</option>
//         <option value="pa">Punjabi</option>
//       </select>
//     </div>
//   );
// }
//////////////////////////////////////////////////////////////////
// GoogleTranslate.jsx
// import { useEffect } from 'react';

// const GoogleTranslate = () => {
//   useEffect(() => {
//     // Check if script already loaded
//     if (window.googleTranslateElementInit) {
//       return;
//     }

//     // Initialize function
//     window.googleTranslateElementInit = () => {
//       new window.google.translate.TranslateElement(
//         {
//           pageLanguage: 'en',
//           includedLanguages: 'hi,en,es,fr,de,ja,zh-CN,ar',
//           layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
//           autoDisplay: false,
//         },
//         'google_translate_element'
//       );
//     };

//     // Load Google Translate script
//     const script = document.createElement('script');
//     script.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
//     script.async = true;
//     document.body.appendChild(script);

//     // Cleanup
//     return () => {
//       // Remove script on unmount (optional)
//       const googleScript = document.querySelector('script[src*="translate.google.com"]');
//       console.log('removing google translator', googleScript)
//       if (googleScript) {
//         googleScript.remove();
//       }
//     };
//   }, []);



//   const changeLanguage = (lang) => {
//     const translateSelect = document.querySelector(".goog-te-combo");

//     if (!translateSelect) {
//       console.warn("Google Translate not ready yet.");
//       return;
//     }

//     translateSelect.value = lang;
//     translateSelect.dispatchEvent(new Event("change"));
//   };

  





//   return (
//     <>
//     <div id="google_translate_element" style={{ display: 'inline-block' }}></div>

//        <div className="flex gap-3 items-center bg-white border rounded-xl px-3 py-2 shadow-sm w-fit">
//       <span className="font-medium text-gray-700">🌐 Language:</span>

//       <select
//         onChange={(e) => changeLanguage(e.target.value)}
//         className="border border-gray-300 px-3 py-1 rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
//       >
//         <option value="en">English</option>
//         <option value="hi">Hindi</option>
//         <option value="bn">Bengali</option>
//         <option value="ta">Tamil</option>
//         <option value="te">Telugu</option>
//         <option value="mr">Marathi</option>
//         <option value="gu">Gujarati</option>
//         <option value="kn">Kannada</option>
//         <option value="ml">Malayalam</option>
//         <option value="pa">Punjabi</option>
//       </select>
//     </div>
// </>
//   );
// };

// export default GoogleTranslate;


// GoogleTranslate.jsx - Proper cleanup with language reset
// import { useEffect, useRef } from 'react';
// import { useLocation } from 'react-router-dom';

// const GoogleTranslate = () => {
//   const containerRef = useRef(null);
//   const location = useLocation();

//   useEffect(() => {
//     const uniqueId = 'google_translate_element';
    
//     // Initialize Google Translate
//     const initTranslate = () => {
//       if (window.google && window.google.translate && containerRef.current) {
//         containerRef.current.id = uniqueId;
//         new window.google.translate.TranslateElement(
//           {
//             pageLanguage: 'en',
//             includedLanguages: 'hi,en,es,fr,de,ja,zh-CN,ar',
//             layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
//           },
//           uniqueId
//         );
//       }
//     };

//     // Load script
//     if (!window.google || !window.google.translate) {
//       window.googleTranslateElementInit = initTranslate;
      
//       if (!document.querySelector('script[src*="translate.google.com"]')) {
//         const script = document.createElement('script');
//         script.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
//         script.async = true;
//         document.body.appendChild(script);
//       }
//     } else {
//       initTranslate();
//     }

//     // CRITICAL: Cleanup function to reset translation
//     return () => {
//       // Reset to original language
//       restoreOriginalLanguage();
      
//       // Remove Google Translate elements
//       cleanupTranslateElements();
//     };
//   }, [location.pathname]); // Re-run when route changes

//   // Function to restore original language
//   const restoreOriginalLanguage = () => {
//     // Method 1: Delete Google Translate cookies
//     const cookies = document.cookie.split(';');
//     cookies.forEach(cookie => {
//       const cookieName = cookie.split('=')[0].trim();
//       if (cookieName.includes('googtrans') || cookieName.includes('googlelang')) {
//         document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
//         document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=${window.location.hostname}`;
//       }
//     });

//     // Method 2: Remove translation classes from body
//     document.body.className = document.body.className
//       .replace(/translated-\w+/g, '')
//       .replace(/\s+/g, ' ')
//       .trim();

//     // Method 3: Remove top frame
//     const topFrame = document.querySelector('.goog-te-banner-frame');
//     if (topFrame && topFrame.parentNode) {
//       topFrame.parentNode.removeChild(topFrame);
//     }

//     // Method 4: Reset inline styles
//     document.querySelectorAll('[style*="font"]').forEach(el => {
//       if (el.getAttribute('style')?.includes('font')) {
//         el.removeAttribute('style');
//       }
//     });

//     // Method 5: Remove skiptranslate class from elements
//     document.querySelectorAll('.skiptranslate').forEach(el => {
//       if (!el.closest('#google_translate_element')) {
//         el.classList.remove('skiptranslate');
//       }
//     });
//   };

//   // Function to cleanup translate elements
//   const cleanupTranslateElements = () => {
//     // Remove menu frames
//     const frames = document.querySelectorAll('.goog-te-menu-frame, .goog-te-balloon-frame');
//     frames.forEach(frame => frame.remove());

//     // Remove container content
//     if (containerRef.current) {
//       containerRef.current.innerHTML = '';
//     }

//     // Reset body top style
//     document.body.style.top = '';
//   };

//   return <div ref={containerRef} style={{ display: 'inline-block' }}></div>;
// };

// export default GoogleTranslate;



///////////////////////////////////////////////////////////////////
// GoogleTranslate.jsx
import { useEffect, useRef } from 'react';

const GoogleTranslate = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const uniqueId = 'google_translate_element';
    
    const initTranslate = () => {
      if (window.google && window.google.translate && containerRef.current) {
        containerRef.current.id = uniqueId;
        new window.google.translate.TranslateElement(
          {
            pageLanguage: 'en',
            includedLanguages: 'hi,en,es,fr,de,ja,zh-CN,ar',
            layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
          },
          uniqueId
        );
      }
    };

    if (!window.google || !window.google.translate) {
      window.googleTranslateElementInit = initTranslate;
      
      if (!document.querySelector('script[src*="translate.google.com"]')) {
        const script = document.createElement('script');
        script.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
        script.async = true;
        document.body.appendChild(script);
      }
    } else {
      initTranslate();
    }

    return () => {
      if (containerRef.current) {
        containerRef.current.innerHTML = '';
      }
    };
  }, []);

  return <div ref={containerRef} style={{ display: 'inline-block' }}></div>;
};

export default GoogleTranslate;





