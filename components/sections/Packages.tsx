"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Clock, CheckCircle2, ArrowRight, X, PhoneCall } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { packagesData } from "@/data/travelData";
import { TravelPackage } from "@/types";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { ContactSettings } from "@/utils/contact-settings";

export const Packages: React.FC<{ contactSettings?: ContactSettings | null; initialData?: TravelPackage[] }> = ({ contactSettings, initialData }) => {
  const currentPackagesData = initialData && initialData.length > 0 ? initialData : packagesData;
  const [showAll, setShowAll] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState<TravelPackage | null>(null);
  const [filter, setFilter] = useState("All");

  const categories = [
    { key: "All", name: "All Packages" },
    { key: "Local", name: "Local Packages" },
    { key: "Foreign", name: "Foreign Packages" },
    { key: "Both", name: "Both" },
  ];

  const filteredPackages = currentPackagesData.filter((pkg) => {
    if (filter === "All") return true;
    const cat = pkg.category || "Local";
    return cat === filter;
  });

  return (
    <section id="packages" className="py-20 bg-white overflow-hidden">
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
            Travel Packages
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-primary mt-4 leading-tight"
          >
            Popular Travel Packages
          </motion.h2>
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="w-20 h-1 bg-secondary mx-auto mt-4 rounded-full"
          ></motion.div>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-gray-500 text-sm md:text-base mt-4 max-w-xl mx-auto"
          >
            Pilgrimage and leisure tour packages specially designed to suit your whole family.
          </motion.p>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-2 md:gap-3 mb-12">
          {categories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => {
                setFilter(cat.key);
                setShowAll(false);
              }}
              className={`px-5 py-2.5 md:px-6 md:py-3 rounded-full text-xs md:text-sm font-extrabold tracking-wide border transition-all duration-300 cursor-pointer ${
                filter === cat.key
                  ? "bg-[#0E4B3A] border-[#0E4B3A] text-white shadow-md"
                  : "bg-white border-gray-200 text-gray-600 hover:border-[#0E4B3A]/30 hover:bg-gray-50"
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Packages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {(showAll ? filteredPackages : filteredPackages.slice(0, 6)).map((pkg, idx) => (
            <motion.div
              key={pkg.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="h-full"
            >
              <Card className="h-full flex flex-col justify-between border-gray-100 hover:shadow-2xl relative overflow-hidden">
                {/* Category badge */}
                <span className={`absolute top-4 left-4 z-10 text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-wider shadow-md ${
                  pkg.category === "Foreign" ? "bg-blue-600 text-white" :
                  pkg.category === "Both" ? "bg-gradient-to-r from-purple-600 to-amber-500 text-white" :
                  "bg-emerald-600 text-white"
                }`}>
                  {pkg.category || "Local"}
                </span>

                {/* Popular badge */}
                {pkg.isPopular && (
                  <span className="absolute top-4 right-4 z-10 bg-secondary text-primary font-extrabold text-xs px-3.5 py-1 rounded-full uppercase tracking-wider shadow-md">
                    Most Popular
                  </span>
                )}

                {/* Package Image */}
                <div className="relative w-full h-[220px] sm:h-[240px] overflow-hidden group">
                  <Image
                    src={pkg.image}
                    alt={pkg.title}
                    fill
                    className="object-cover transition-transform duration-750 group-hover:scale-105"
                    sizes="(max-w-md) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
                  {/* Location badge on image bottom */}
                  <div className="absolute bottom-4 left-4 flex items-center gap-1 bg-black/45 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-semibold">
                    <MapPin className="w-3.5 h-3.5 text-secondary" />
                    <span>{pkg.location}</span>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    {/* Header: Title & Duration */}
                    <div className="flex justify-between items-start gap-2 mb-3">
                      <h3 className="text-xl font-bold text-primary tracking-wide leading-snug hover:text-secondary transition-colors">
                        {pkg.title}
                      </h3>
                    </div>

                    <div className="flex items-center gap-2 text-sm text-gray-500 mb-6 font-semibold">
                      <Clock className="w-4 h-4 text-secondary" />
                      <span>{pkg.duration}</span>
                    </div>

                    {/* Features List */}
                    <div className="space-y-2.5 mb-6">
                      {pkg.features.map((feat, fidx) => (
                        <div key={fidx} className="flex items-start gap-2 text-sm text-gray-600">
                          <CheckCircle2 className="w-4.5 h-4.5 text-[#0E4B3A] mt-0.5 flex-shrink-0" />
                          <span className="leading-tight">{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Pricing and Action */}
                  <div className="pt-4 border-t border-gray-100 mt-auto">
                    <div className="flex justify-between items-end mb-4">
                      <div>
                        {pkg.originalPrice && (
                          <span className="text-xs text-gray-400 line-through block leading-none mb-1">
                            {pkg.originalPrice}
                          </span>
                        )}
                        <span className="text-2xl font-black text-[#0E4B3A]">
                          {pkg.price}
                        </span>
                      </div>
                      <span className="text-[10px] bg-primary/10 text-primary font-bold px-2.5 py-1 rounded-md">
                        All Inclusive
                      </span>
                    </div>

                    <Button
                      onClick={() => setSelectedPackage(pkg)}
                      className="w-full font-bold flex items-center justify-center gap-2 border-2 border-[#0e4a39] text-[#0e4a39] bg-transparent hover:bg-[#0e4a39] hover:text-white transition-colors"
                    >
                      <span>View Details</span>
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* See More Button */}
        {!showAll && filteredPackages.length > 6 && (
          <div className="mt-12 flex justify-center">
            <Button
              onClick={() => setShowAll(true)}
              className="px-8 py-3 text-lg font-bold shadow-lg hover:shadow-xl transition-all"
            >
              See More Packages
            </Button>
          </div>
        )}
      </div>

      {/* Package Details Modal */}
      <AnimatePresence>
        {selectedPackage && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-12">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setSelectedPackage(null)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-5xl bg-white rounded-3xl overflow-hidden shadow-2xl z-10 flex flex-col max-h-[90vh]"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedPackage(null)}
                className="absolute top-4 right-4 z-20 p-2 bg-black/20 hover:bg-black/40 text-white rounded-full backdrop-blur-md transition-colors"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="overflow-y-auto flex-1 custom-scrollbar">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 lg:gap-8">
                  {/* Left: Image */}
                  <div className="relative w-full h-[300px] sm:h-[400px] lg:h-full min-h-[300px]">
                    <Image
                      src={selectedPackage.image}
                      alt={selectedPackage.title}
                      fill
                      className="object-cover"
                      priority
                      sizes="(max-w-lg) 100vw, 50vw"
                    />
                    
                    {/* Category badge */}
                    <span className={`absolute top-6 left-6 z-10 text-xs font-extrabold px-4 py-2 rounded-full uppercase tracking-wider shadow-md ${
                      selectedPackage.category === "Foreign" ? "bg-blue-600 text-white" :
                      selectedPackage.category === "Both" ? "bg-gradient-to-r from-purple-600 to-amber-500 text-white" :
                      "bg-emerald-600 text-white"
                    }`}>
                      {selectedPackage.category || "Local"}
                    </span>

                    {selectedPackage.isPopular && (
                      <span className="absolute top-6 right-6 z-10 bg-secondary text-primary font-extrabold text-sm px-4 py-2 rounded-full uppercase tracking-wider shadow-md">
                        Most Popular
                      </span>
                    )}
                  </div>

                  {/* Right: Content */}
                  <div className="p-6 sm:p-8 flex flex-col justify-between">
                    <div>
                      <h2 className="text-3xl sm:text-4xl font-extrabold text-primary mb-4 leading-tight">
                        {selectedPackage.title}
                      </h2>
                      
                      <div className="flex flex-wrap items-center gap-4 mb-6 text-gray-600 font-semibold text-sm sm:text-base">
                        <div className="flex items-center gap-2 bg-gray-50 px-4 py-2 rounded-full border border-gray-100">
                          <MapPin className="w-4 h-4 text-secondary" />
                          <span>{selectedPackage.location}</span>
                        </div>
                        <div className="flex items-center gap-2 bg-gray-50 px-4 py-2 rounded-full border border-gray-100">
                          <Clock className="w-4 h-4 text-secondary" />
                          <span>{selectedPackage.duration}</span>
                        </div>
                        <div className={`flex items-center gap-2 px-4 py-2 rounded-full border text-xs font-bold tracking-wider uppercase ${
                          selectedPackage.category === "Foreign" ? "bg-blue-50 text-blue-700 border-blue-100" :
                          selectedPackage.category === "Both" ? "bg-purple-50 text-purple-700 border-purple-100" :
                          "bg-emerald-50 text-emerald-700 border-emerald-100"
                        }`}>
                          <span>{selectedPackage.category || "Local"} Tour</span>
                        </div>
                      </div>

                      <div className="mb-8">
                        <h3 className="text-xl font-bold text-primary mb-4">Package Highlights</h3>
                        <div className="space-y-3">
                          {selectedPackage.features.map((feat, idx) => (
                            <div key={idx} className="flex items-start gap-3 text-gray-700">
                              <CheckCircle2 className="w-5 h-5 text-[#0E4B3A] mt-0.5 flex-shrink-0" />
                              <span className="leading-snug">{feat}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="mt-8 p-6 bg-primary text-white rounded-2xl shadow-inner">
                      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-6 gap-4">
                        <div>
                          <span className="text-white/80 block font-semibold mb-1">Price per person</span>
                          {selectedPackage.originalPrice && (
                            <span className="text-sm text-white/50 line-through block leading-none mb-1">
                              {selectedPackage.originalPrice}
                            </span>
                          )}
                          <span className="text-3xl sm:text-4xl font-black text-secondary">
                            {selectedPackage.price}
                          </span>
                        </div>
                        <span className="bg-white/20 px-3 py-1 rounded-md font-semibold text-sm">
                          All Inclusive
                        </span>
                      </div>

                      <div className="flex flex-col sm:flex-row gap-3">
                        <a href={`https://wa.me/${contactSettings?.whatsapp?.replace(/[^0-9]/g, "") || "94774222970"}?text=${encodeURIComponent(`Hello, I would like to book the following package:\n\n*Title:* ${selectedPackage.title}\n*Location:* ${selectedPackage.location}\n*Duration:* ${selectedPackage.duration}\n*Price:* ${selectedPackage.price}\n\nPlease provide me with more details.`)}`} target="_blank" rel="noopener noreferrer" className="flex-1" onClick={() => setSelectedPackage(null)}>
                          <Button
                            variant="secondary"
                            size="lg"
                            className="w-full text-base font-bold shadow-lg py-6"
                          >
                            Book Now
                          </Button>
                        </a>
                        <a href={`tel:${contactSettings?.phone || "0774222970"}`} className="flex-1">
                          <Button
                            variant="outline"
                            size="lg"
                            className="w-full text-base font-bold bg-transparent text-white border-white/30 hover:bg-white hover:text-primary transition-all py-6"
                          >
                            <PhoneCall className="w-4 h-4 mr-2" />
                            Call Us
                          </Button>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
export default Packages;
