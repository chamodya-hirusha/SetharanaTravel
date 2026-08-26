"use client";
import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";

interface LightboxProps {
  isOpen: boolean;
  onClose: () => void;
  images: { url: string; caption: string }[];
  currentIndex: number;
  setCurrentIndex: (index: number) => void;
}

export const Lightbox: React.FC<LightboxProps> = ({
  isOpen,
  onClose,
  images,
  currentIndex,
  setCurrentIndex,
}) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, currentIndex, images]);

  const handlePrev = () => {
    setCurrentIndex((currentIndex - 1 + images.length) % images.length);
  };

  const handleNext = () => {
    setCurrentIndex((currentIndex + 1) % images.length);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/95 p-4 md:p-8"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-white/80 hover:text-secondary p-2 transition-colors cursor-pointer rounded-full bg-white/10 hover:bg-white/20 z-50"
          aria-label="Close"
        >
          <X className="w-6 h-6 md:w-8 h-8" />
        </button>

        {/* Navigation Left */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            handlePrev();
          }}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-white/80 hover:text-secondary p-3 transition-colors cursor-pointer rounded-full bg-white/10 hover:bg-white/20 z-50"
          aria-label="Previous Image"
        >
          <ChevronLeft className="w-6 h-6 md:w-8 h-8" />
        </button>

        {/* Navigation Right */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleNext();
          }}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-white/80 hover:text-secondary p-3 transition-colors cursor-pointer rounded-full bg-white/10 hover:bg-white/20 z-50"
          aria-label="Next Image"
        >
          <ChevronRight className="w-6 h-6 md:w-8 h-8" />
        </button>

        {/* Content Container */}
        <div 
          className="relative max-w-5xl w-full h-[65vh] md:h-[75vh] flex flex-col items-center justify-center"
          onClick={(e) => e.stopPropagation()}
        >
          <motion.div
            key={currentIndex}
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="relative w-full h-full"
          >
            <Image
              src={images[currentIndex]?.url}
              alt={images[currentIndex]?.caption || "Gallery Image"}
              fill
              className="object-contain"
              sizes="(max-w-7xl) 100vw, 80vw"
              priority
            />
          </motion.div>
        </div>

        {/* Caption & Counter */}
        <motion.div
          key={`caption-${currentIndex}`}
          initial={{ y: 15, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="mt-6 text-center text-white/90 z-10 max-w-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          <p className="text-lg md:text-xl font-medium text-secondary tracking-wide">
            {images[currentIndex]?.caption}
          </p>
          <p className="text-xs md:text-sm text-white/50 mt-1">
            {currentIndex + 1} / {images.length}
          </p>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
export default Lightbox;
