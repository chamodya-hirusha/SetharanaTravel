"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { testimonialsData } from "@/data/travelData";

import { Testimonial } from "@/types";

export const Testimonials: React.FC<{ initialData?: Testimonial[] }> = ({ initialData }) => {
  const currentTestimonials = initialData && initialData.length > 0 ? initialData : testimonialsData;
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0); // -1: left, 1: right

  useEffect(() => {
    const timer = setInterval(() => {
      handleNext();
    }, 5500);
    return () => clearInterval(timer);
  }, [current]);

  const handlePrev = () => {
    setDirection(-1);
    setCurrent((prev) => (prev - 1 + currentTestimonials.length) % currentTestimonials.length);
  };

  const handleNext = () => {
    setDirection(1);
    setCurrent((prev) => (prev + 1) % currentTestimonials.length);
  };

  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 100 : -100,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (dir: number) => ({
      x: dir < 0 ? 100 : -100,
      opacity: 0,
    }),
  };

  return (
    <section id="testimonials" className="py-20 bg-white overflow-hidden relative">
      {/* Decorative quotes background */}
      <div className="absolute top-10 left-10 text-gray-100 hidden md:block select-none pointer-events-none">
        <Quote className="w-40 h-40 transform rotate-180 opacity-40" />
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.span
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-sm font-bold text-secondary tracking-widest uppercase bg-secondary/10 px-4 py-1.5 rounded-full inline-block"
          >
            Customer Reviews
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-primary mt-4 leading-tight"
          >
            What Tourists Said About Us
          </motion.h2>
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="w-20 h-1 bg-secondary mx-auto mt-4 rounded-full"
          ></motion.div>
        </div>

        {/* Carousel Container */}
        <div className="relative min-h-[380px] sm:min-h-[320px] md:min-h-[280px] flex items-center justify-center">
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={current}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="w-full max-w-4xl bg-section-bg border border-gray-100 rounded-3xl p-6 sm:p-10 md:p-12 shadow-md relative flex flex-col md:flex-row items-center gap-6 md:gap-10"
            >
              {/* Profile Image & Meta */}
              <div className="flex flex-col items-center flex-shrink-0 text-center">
                <div className="relative w-24 h-24 rounded-full overflow-hidden border-4 border-secondary/20 shadow-md bg-gradient-to-br from-primary to-emerald-800 flex items-center justify-center">
                  {currentTestimonials[current].image ? (
                    <Image
                      src={currentTestimonials[current].image}
                      alt={currentTestimonials[current].name}
                      fill
                      className="object-cover"
                      sizes="96px"
                    />
                  ) : (
                    <span className="text-3xl font-bold text-white select-none">
                      {currentTestimonials[current].name.charAt(0)}
                    </span>
                  )}
                </div>
                <h3 className="text-xl font-bold text-primary mt-4">
                  {currentTestimonials[current].name}
                </h3>
                <span className="text-xs text-gray-500 font-semibold mt-1">
                  {currentTestimonials[current].location}
                </span>
              </div>

              {/* Star Rating & Comment */}
              <div className="flex-1 flex flex-col items-center md:items-start text-center md:text-left">
                {/* Stars */}
                <div className="flex gap-1.5 mb-4 justify-center md:justify-start">
                  {Array.from({ length: currentTestimonials[current].rating }).map((_, sidx) => (
                    <Star key={sidx} className="w-5 h-5 fill-secondary text-secondary" />
                  ))}
                </div>
                {/* Quote Icon */}
                <Quote className="w-8 h-8 text-primary/10 mb-3 rotate-180 hidden md:block" />
                {/* Comment */}
                <p className="text-gray-600 text-sm sm:text-base md:text-lg leading-relaxed font-medium italic">
                  &ldquo;{currentTestimonials[current].comment}&rdquo;
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Carousel Indicators / Navigation */}
        <div className="flex items-center justify-center gap-6 mt-8">
          <button
            onClick={handlePrev}
            className="w-11 h-11 rounded-full border border-gray-250 bg-white text-primary hover:bg-secondary hover:border-secondary hover:text-primary transition-all flex items-center justify-center cursor-pointer shadow-sm"
            aria-label="Previous Review"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          
          <div className="flex gap-2">
            {currentTestimonials.map((_, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setDirection(idx > current ? 1 : -1);
                  setCurrent(idx);
                }}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                  current === idx ? "bg-secondary w-6" : "bg-gray-300 hover:bg-gray-400"
                }`}
                aria-label={`Slide ${idx + 1}`}
              ></button>
            ))}
          </div>

          <button
            onClick={handleNext}
            className="w-11 h-11 rounded-full border border-gray-250 bg-white text-primary hover:bg-secondary hover:border-secondary hover:text-primary transition-all flex items-center justify-center cursor-pointer shadow-sm"
            aria-label="Next Review"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
};
export default Testimonials;
