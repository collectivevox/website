import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cookie, X, Shield } from 'lucide-react';

const CookieConsent = () => {
  const [showConsent, setShowConsent] = useState(false);

  useEffect(() => {
    // Check if user has already given consent
    const hasConsent = localStorage.getItem('cookie-consent');
    if (!hasConsent) {
      // Show consent bar after 2 seconds
      const timer = setTimeout(() => {
        setShowConsent(true);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookie-consent', 'accepted');
    localStorage.setItem('cookie-consent-date', new Date().toISOString());
    setShowConsent(false);
    
    // Initialize analytics or other tracking here
    console.log('Cookies accepted - Initialize tracking');
  };

  const handleDecline = () => {
    localStorage.setItem('cookie-consent', 'declined');
    localStorage.setItem('cookie-consent-date', new Date().toISOString());
    setShowConsent(false);
    
    // Clear any existing tracking
    console.log('Cookies declined - Clear tracking');
  };

  const handleDismiss = () => {
    setShowConsent(false);
    // Don't store consent decision, ask again next time
  };

  if (!showConsent) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="fixed bottom-0 left-0 right-0 z-50 bg-gray-900/95 backdrop-blur-md border-t border-gray-700 shadow-2xl"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            {/* Content */}
            <div className="flex items-start space-x-4 flex-1">
              <div className="flex-shrink-0 mt-1">
                <Cookie className="h-6 w-6 text-orange-400" />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-white font-semibold mb-1 flex items-center">
                  <Shield className="h-4 w-4 text-orange-400 mr-2" />
                  Cookie Consent
                </h4>
                <p className="text-gray-300 text-sm leading-relaxed">
                  We use essential cookies to ensure our website works properly and analytics cookies to understand how you interact with our site. 
                  Your privacy matters to us - you can choose which cookies to allow.
                  <a href="#privacy-policy" className="text-orange-400 hover:text-orange-300 underline ml-1 transition-colors">
                    Learn more
                  </a>
                </p>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex items-center space-x-3 flex-shrink-0">
              <button
                onClick={handleDecline}
                className="px-4 py-2 text-gray-300 hover:text-white border border-gray-600 hover:border-gray-500 rounded-lg text-sm font-medium transition-all hover:bg-gray-800/50"
              >
                Decline
              </button>
              <button
                onClick={handleAccept}
                className="px-6 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg text-sm font-medium transition-all transform hover:scale-105 shadow-lg hover:shadow-orange-500/25"
              >
                Accept All
              </button>
              <button
                onClick={handleDismiss}
                className="p-2 text-gray-400 hover:text-white transition-colors"
                aria-label="Dismiss"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Mobile Layout Adjustment */}
          <div className="md:hidden mt-3 flex justify-end space-x-3">
            <button
              onClick={handleDecline}
              className="px-4 py-2 text-gray-300 hover:text-white border border-gray-600 hover:border-gray-500 rounded-lg text-sm font-medium transition-all hover:bg-gray-800/50"
            >
              Decline
            </button>
            <button
              onClick={handleAccept}
              className="px-6 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg text-sm font-medium transition-all transform hover:scale-105"
            >
              Accept All
            </button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default CookieConsent;