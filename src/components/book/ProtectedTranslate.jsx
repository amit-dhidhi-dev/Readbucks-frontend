// ProtectedTranslate.jsx - Extra safety layer
import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const ProtectedTranslatePage = ({ children, allowTranslation = false }) => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!allowTranslation) {
      // Force reset translation
      const resetTranslation = () => {
        // Clear all Google Translate cookies
        document.cookie.split(";").forEach(c => {
          if (c.trim().startsWith('googtrans')) {
            document.cookie = c.replace(/^ +/, "").replace(/=.*/, `=;expires=${new Date(0).toUTCString()};path=/`);
          }
        });

        // Remove classes
        document.body.classList.remove('translated-ltr', 'translated-rtl');
        
        // Force reload if translated
        if (document.body.classList.contains('translated-ltr') || 
            document.body.classList.contains('translated-rtl')) {
          window.location.reload();
        }
      };

      resetTranslation();
    }
  }, [location.pathname, allowTranslation]);

  return <>{children}</>;
};

export default ProtectedTranslatePage;