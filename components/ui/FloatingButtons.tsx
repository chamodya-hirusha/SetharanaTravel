"use client";
import React, { useState, useEffect } from "react";
import { Phone, MessageSquare, ArrowUp } from "lucide-react";
import { motion as fm, AnimatePresence as Ap } from "framer-motion";
import { ContactSettings } from "@/utils/contact-settings";

export const FloatingButtons: React.FC<{ contactSettings?: ContactSettings | null }> = ({ contactSettings }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility, { passive: true });
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col gap-4">
      {/* WhatsApp Button */}
      <fm.a
        href={`https://wa.me/${contactSettings?.whatsapp?.replace(/[^0-9]/g, "") || "94774222970"}`}
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="w-12 h-12 md:w-14 md:h-14 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-lg hover:shadow-2xl cursor-pointer group relative"
        aria-label="Contact via WhatsApp"
      >
        <svg
          className="w-6 h-6 md:w-7 md:h-7 fill-current"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.888-.788-1.487-1.761-1.663-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
        </svg>
        <span className="absolute right-14 scale-0 group-hover:scale-100 transition-all duration-200 origin-right bg-[#25D366] text-white text-xs font-semibold px-3 py-1.5 rounded-md whitespace-nowrap shadow-md">
          Send a WhatsApp message
        </span>
      </fm.a>

      {/* Call Button */}
      <fm.a
        href={`tel:${contactSettings?.phone || "0774222970"}`}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="w-12 h-12 md:w-14 md:h-14 bg-[#0E4B3A] text-white rounded-full flex items-center justify-center shadow-lg hover:shadow-2xl cursor-pointer group relative"
        aria-label="Contact by phone"
      >
        <Phone className="w-6 h-6 md:w-7 md:h-7" />
        <span className="absolute right-14 scale-0 group-hover:scale-100 transition-all duration-200 origin-right bg-[#0E4B3A] text-white text-xs font-semibold px-3 py-1.5 rounded-md whitespace-nowrap shadow-md">
          Call Now ({contactSettings?.phone || "0774222970"})
        </span>
      </fm.a>

      {/* Facebook Messenger Button */}
      <fm.a
        href={contactSettings?.facebook || "https://facebook.com/profile.php?id=100086577527000"}
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="w-12 h-12 md:w-14 md:h-14 bg-[#0084FF] text-white rounded-full flex items-center justify-center shadow-lg hover:shadow-2xl cursor-pointer group relative"
        aria-label="Contact via Messenger"
      >
        <MessageSquare className="w-6 h-6 md:w-7 md:h-7" />
        <span className="absolute right-14 scale-0 group-hover:scale-100 transition-all duration-200 origin-right bg-[#0084FF] text-white text-xs font-semibold px-3 py-1.5 rounded-md whitespace-nowrap shadow-md">
          Contact via Messenger
        </span>
      </fm.a>

      {/* Scroll to Top */}
      <Ap>
        {isVisible && (
          <fm.button
            initial={{ opacity: 0, scale: 0.5, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.5, y: 20 }}
            onClick={scrollToTop}
            className="w-12 h-12 md:w-14 md:h-14 bg-secondary text-primary rounded-full flex items-center justify-center shadow-lg hover:shadow-2xl cursor-pointer group relative border border-secondary"
            aria-label="Go to Top"
          >
            <ArrowUp className="w-6 h-6 md:w-7 md:h-7" />
            <span className="absolute right-14 scale-0 group-hover:scale-100 transition-all duration-200 origin-right bg-secondary text-primary text-xs font-semibold px-3 py-1.5 rounded-md whitespace-nowrap shadow-md">
              Go to Top
            </span>
          </fm.button>
        )}
      </Ap>
    </div>
  );
};
export default FloatingButtons;
