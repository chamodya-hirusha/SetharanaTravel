"use client";
import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { ShieldCheck, Users, Bus, Coins, Target, Eye } from "lucide-react";

export const About: React.FC = () => {
  const benefits = [
    {
      icon: <ShieldCheck className="w-6 h-6 text-secondary" />,
      title: "100% Safety and Responsibility",
      desc: "We are committed to ensuring the maximum safety of you and your family members throughout all tours.",
    },
    {
      icon: <Users className="w-6 h-6 text-secondary" />,
      title: "Experienced Friendly Team",
      desc: "Friendly guides and drivers with years of experience who treat you with love.",
    },
    {
      icon: <Bus className="w-6 h-6 text-secondary" />,
      title: "Luxury Transport",
      desc: "Latest model AC vehicles (buses, vans, cars) with high comfort throughout the journey.",
    },
    {
      icon: <Coins className="w-6 h-6 text-secondary" />,
      title: "Reasonable Prices",
      desc: "Package prices with maximum value for money paid, without any hidden charges.",
    },
  ];

  return (
    <section id="about" className="py-20 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.span
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-sm font-bold text-secondary tracking-widest uppercase bg-secondary/10 px-4 py-1.5 rounded-full inline-block"
          >
            Company Information
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-primary mt-4 leading-tight"
          >
            About Setharana Travels
          </motion.h2>
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="w-20 h-1 bg-secondary mx-auto mt-4 rounded-full"
          ></motion.div>
        </div>

        {/* Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Column: Image with frame */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative w-full h-[350px] sm:h-[450px] rounded-3xl overflow-hidden shadow-2xl group border-4 border-secondary/20"
          >
            <Image
              src="/images/hero/anuradhapura-sunset.jpg"
              alt="Anuradhapura Sacred City"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              sizes="(max-w-lg) 100vw, 50vw"
            />
            {/* Soft decorative elements */}
            <div className="absolute inset-0 bg-gradient-to-t from-primary/50 to-transparent"></div>
            <div className="absolute bottom-6 left-6 text-white z-10 bg-primary/80 backdrop-blur-md p-4 rounded-2xl border border-white/10 max-w-xs">
              <p className="text-2xl font-bold text-secondary">Anuradhapura</p>
              <p className="text-xs text-gray-200 mt-1">The historical sacred city which is our main operational center.</p>
            </div>
          </motion.div>

          {/* Right Column: Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex flex-col"
          >
            <h3 className="text-2xl md:text-3xl font-extrabold text-primary mb-6">
              A reliable and unforgettable journey...
            </h3>
            
            <p className="text-gray-600 text-sm md:text-base leading-relaxed mb-8">
              Setharana Travels is a leading travel agency operating from the sacred city of Anuradhapura in Sri Lanka. We have been providing an excellent service to local tourists with responsibility and friendliness for many years.
            </p>

            {/* Mission & Vision */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
              <div className="bg-section-bg border border-gray-100 p-5 rounded-2xl">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <Target className="w-4 h-4 text-primary" />
                  </div>
                  <h4 className="text-lg font-bold text-primary">Our Mission</h4>
                </div>
                <p className="text-xs md:text-sm text-gray-600 leading-relaxed">
                  To provide a travel experience that adds valuable memories to every traveler's life by providing a safe and quality service.
                </p>
              </div>

              <div className="bg-section-bg border border-gray-100 p-5 rounded-2xl">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <Eye className="w-4 h-4 text-primary" />
                  </div>
                  <h4 className="text-lg font-bold text-primary">Our Vision</h4>
                </div>
                <p className="text-xs md:text-sm text-gray-600 leading-relaxed">
                  To become the mark of excellence in the industry by being the most trusted travel service provider in Sri Lanka.
                </p>
              </div>
            </div>

            {/* Why Choose Us */}
            <h4 className="text-lg font-extrabold text-primary mb-4 border-l-4 border-secondary pl-3">
              Why Choose Us?
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {benefits.map((b, idx) => (
                <div key={idx} className="flex gap-3">
                  <div className="mt-1 flex-shrink-0 w-8 h-8 rounded-lg bg-secondary/15 flex items-center justify-center">
                    {b.icon}
                  </div>
                  <div>
                    <h5 className="text-sm md:text-base font-bold text-primary">{b.title}</h5>
                    <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">{b.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
export default About;
