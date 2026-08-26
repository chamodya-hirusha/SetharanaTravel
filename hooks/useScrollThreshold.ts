import { useState, useEffect } from "react";

export function useScrollThreshold(threshold = 50) {
  const [isPassed, setIsPassed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > threshold) {
        setIsPassed(true);
      } else {
        setIsPassed(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    // Check initial scroll position
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [threshold]);

  return isPassed;
}
