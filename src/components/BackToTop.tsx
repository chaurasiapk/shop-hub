import React, { useState, useEffect } from "react";

// BackToTop button component
export const BackToTop: React.FC = () => {
  // State to track visibility of the button
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Show the button when scrollY > 200
    const toggleVisibility = () => {
      setVisible(window.scrollY > 200);
    };

    // Add scroll event listener
    window.addEventListener("scroll", toggleVisibility);

    // Cleanup on unmount
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  // Scroll smoothly to the top of the page
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    visible && (
      <button
        onClick={scrollToTop}
        className="fixed bottom-8 right-8 w-12 h-12 rounded-full bg-[#223040] flex items-center justify-center shadow-lg transition-opacity duration-300 z-50"
        aria-label="Back to top"
      >
        {/* Up Arrow Icon */}
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
          <path
            d="M12 19V5M12 5L5 12M12 5l7 7"
            stroke="#fff"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    )
  );
};
