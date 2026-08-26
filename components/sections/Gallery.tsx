"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Maximize2 } from "lucide-react";
import Image from "next/image";
import { galleryData } from "@/data/travelData";
import { Lightbox } from "@/components/ui/Lightbox";
import { GalleryItem } from "@/types";

export const Gallery: React.FC<{ initialData?: GalleryItem[] }> = ({ initialData }) => {
  const currentGalleryData = initialData && initialData.length > 0 ? initialData : galleryData;
  const [filter, setFilter] = useState<string>("all");
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAll, setShowAll] = useState(false);

  const categories = [
    { key: "all", name: "All" },
    { key: "pilgrimage", name: "Pilgrimage Sites" },
    { key: "heritage", name: "Historical Heritage" },
    { key: "nature", name: "Nature" },
    { key: "adventure", name: "Wildlife and Adventure" },
  ];

  const filteredImages =
    filter === "all"
      ? currentGalleryData
      : currentGalleryData.filter((item) => item.category === filter);

  const visibleImages = showAll ? filteredImages : filteredImages.slice(0, 4);

  const openLightbox = (index: number) => {
    // Find the index of the clicked item in the full galleryData list
    const actualIndex = currentGalleryData.findIndex((item) => item.id === visibleImages[index].id);
    setCurrentIndex(actualIndex);
    setLightboxOpen(true);
  };

  return (
    <section id="gallery" className="py-20 bg-section-bg overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <motion.span
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-sm font-bold text-secondary tracking-widest uppercase bg-secondary/10 px-4 py-1.5 rounded-full inline-block"
          >
            Photo Gallery
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-primary mt-4 leading-tight"
          >
            Beautiful Memories of Tours
          </motion.h2>
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="w-20 h-1 bg-secondary mx-auto mt-4 rounded-full"
          ></motion.div>
        </div>

        {/* Categories Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-2 md:gap-3 mb-12">
          {categories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => {
                setFilter(cat.key);
                setShowAll(false);
              }}
              className={`px-5 py-2 md:px-6 md:py-2.5 rounded-full text-sm font-semibold tracking-wide border transition-all duration-300 cursor-pointer ${
                filter === cat.key
                  ? "bg-primary border-primary text-white shadow-md"
                  : "bg-white border-gray-200 text-gray-600 hover:border-primary/30 hover:bg-gray-50"
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {visibleImages.map((image, idx) => (
              <motion.div
                layout
                key={image.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                onClick={() => openLightbox(idx)}
                className="relative h-[250px] sm:h-[280px] rounded-2xl overflow-hidden group shadow-sm hover:shadow-lg cursor-pointer border border-gray-150"
              >
                <Image
                  src={image.url}
                  alt={image.caption}
                  fill
                  sizes="(max-w-md) 100vw, (max-w-lg) 50vw, 25vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-primary/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="bg-white/90 p-3 rounded-full text-primary scale-75 group-hover:scale-100 transition-transform duration-300">
                    <Maximize2 className="w-5 h-5" />
                  </div>
                </div>

                {/* Caption bottom bar */}
                <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/80 to-transparent p-4">
                  <p className="text-white text-sm font-medium tracking-wide truncate">
                    {image.caption}
                  </p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* View More Button */}
        {!showAll && filteredImages.length > 4 && (
          <div className="mt-12 flex justify-center">
            <button
              onClick={() => setShowAll(true)}
              className="px-8 py-3 bg-white text-primary border-2 border-primary font-bold rounded-xl shadow-md hover:bg-primary hover:text-white transition-colors duration-300 cursor-pointer"
            >
              See More
            </button>
          </div>
        )}
      </div>

      {/* Lightbox Overlay */}
      <Lightbox
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        images={currentGalleryData}
        currentIndex={currentIndex}
        setCurrentIndex={setCurrentIndex}
      />
    </section>
  );
};
export default Gallery;
