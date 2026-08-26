"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { useCountUp } from "@/hooks/useCountUp";

const heroImages = [
  {
    url: "/images/hero/anuradhapura.png",
    title: "Anuradhapura Sacred City",
  },
  {
    url: "/images/hero/adams-peak.png",
    title: "Sri Pada Mountain Peak",
  },
  {
    url: "/images/hero/sigiriya.png",
    title: "Historical Sigiriya",
  },
  {
    url: "/images/hero/kandy-temple.png",
    title: "Senkadagala Temple of the Tooth",
  },
  {
    url: "/images/hero/ella-train.png",
    title: "Hill Country Railway and Nature",
  },
];

interface StatCounterProps {
  end: number;
  label: string;
  suffix?: string;
}

const StatCounter: React.FC<StatCounterProps> = ({ end, label, suffix = "" }) => {
  const [startCount, setStartCount] = useState(false);
  const count = useCountUp(end, 2000, startCount);

  return (
    <motion.div
      onViewportEnter={() => setTimeout(() => setStartCount(true), 0)}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center justify-center bg-white/10 backdrop-blur-md border border-white/20 rounded-xl sm:rounded-2xl p-2 sm:p-4 md:p-6 text-center text-white"
    >
      <span className="text-2xl sm:text-3xl md:text-5xl font-black text-secondary tracking-tight mb-1 sm:mb-2">
        {count}
        {suffix}
      </span>
      <span className="text-[11px] sm:text-sm md:text-base font-semibold text-white/90 leading-tight">
        {label}
      </span>
    </motion.div>
  );
};

import { ContactSettings } from "@/utils/contact-settings";

export const Hero: React.FC<{ contactSettings?: ContactSettings | null }> = ({ contactSettings }) => {
  const [currentIdx, setCurrentIdx] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIdx((prev) => (prev + 1) % heroImages.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const handlePrev = () => {
    setCurrentIdx((prev) => (prev - 1 + heroImages.length) % heroImages.length);
  };

  const handleNext = () => {
    setCurrentIdx((prev) => (prev + 1) % heroImages.length);
  };

  return (
    <section id="home" className="relative w-full h-screen overflow-hidden flex items-center justify-center">
      {/* Slider Images */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="popLayout">
          <motion.div
            key={currentIdx}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            <Image
              src={heroImages[currentIdx].url}
              alt={heroImages[currentIdx].title}
              fill
              priority={currentIdx === 0}
              className="object-cover"
              sizes="100vw"
            />
            {/* Background Overlay */}
            <div className="absolute inset-0 bg-gradient-to-tr from-black/80 via-black/40 to-black/25"></div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Manual Slider Controls */}
      <button
        onClick={handlePrev}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 text-white/60 hover:text-secondary p-2 bg-black/20 hover:bg-black/40 rounded-full transition-colors hidden md:block cursor-pointer"
        aria-label="Previous Image"
      >
        <ChevronLeft className="w-8 h-8" />
      </button>
      <button
        onClick={handleNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 text-white/60 hover:text-secondary p-2 bg-black/20 hover:bg-black/40 rounded-full transition-colors hidden md:block cursor-pointer"
        aria-label="Next Image"
      >
        <ChevronRight className="w-8 h-8" />
      </button>

      {/* Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center justify-center h-full pt-20 pb-32 md:pb-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-4xl"
        >
          {/* Tagline */}
          <span className="inline-block text-xs md:text-sm font-bold text-secondary uppercase tracking-widest bg-secondary/15 backdrop-blur-md px-4 py-1.5 rounded-full border border-secondary/35 mb-6">
            Sri Lanka's Leading Travel Service
          </span>

          {/* Heading */}
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold text-white leading-[1.25] sm:leading-[1.15] md:leading-[1.15] tracking-tight text-shadow">
            Your Dream Journey <br />
            <span className="text-secondary text-gold-glow">Start Today</span>
          </h1>

          {/* Subheading */}
          <p className="mt-6 text-base sm:text-xl md:text-2xl text-gray-200/90 leading-relaxed max-w-2xl mx-auto">
            A safe and unforgettable journey with Sri Lanka's trusted travel service.
          </p>

          {/* Buttons */}
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a href={`https://wa.me/${contactSettings?.whatsapp?.replace(/[^0-9]/g, "") || "94774222970"}`} target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto">
              <Button
                variant="primary"
                size="lg"
                className="w-full sm:w-auto font-bold border border-primary hover:border-secondary transition-all"
              >
                Book Now
                <ArrowRight className="w-5 h-5 ml-2 inline animate-pulse" />
              </Button>
            </a>
            <a href="#packages" className="w-full sm:w-auto">
              <Button
                variant="outline"
                size="lg"
                className="w-full sm:w-auto font-bold border-2"
              >
                View Packages
              </Button>
            </a>
          </div>
        </motion.div>

        {/* Statistics Grid */}
        <div className="absolute bottom-12 sm:bottom-10 md:bottom-10 left-0 w-full px-2 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto grid grid-cols-3 gap-2 sm:gap-3 md:gap-6">
            <StatCounter end={1000} label="Happy Customers" suffix="+" />
            <StatCounter end={250} label="Successful Tours" suffix="+" />
            <StatCounter end={100} label="Reliable Service" suffix="%" />
          </div>
        </div>
      </div>

      {/* Indicator dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20">
        {heroImages.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIdx(idx)}
            className={`w-2.5 h-2.5 rounded-full transition-all duration-300 cursor-pointer ${currentIdx === idx ? "bg-secondary w-6" : "bg-white/40 hover:bg-white/60"
              }`}
            aria-label={`Slide ${idx + 1}`}
          ></button>
        ))}
      </div>
    </section>
  );
};
export default Hero;
