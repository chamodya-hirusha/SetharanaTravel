"use client";
import React from "react";
import { motion } from "framer-motion";
import * as Icons from "lucide-react";
import { servicesData } from "@/data/travelData";
import { Card } from "@/components/ui/Card";

export const Services: React.FC = () => {
  // Helper to render Lucide icon dynamically
  const renderIcon = (iconName: string) => {
    const IconComponent = (Icons as any)[iconName];
    if (!IconComponent) return <Icons.Compass className="w-8 h-8 text-secondary" />;
    return <IconComponent className="w-8 h-8 text-secondary transition-transform duration-300 group-hover:scale-110" />;
  };

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
  };

  return (
    <section id="services" className="py-20 bg-section-bg overflow-hidden">
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
            Our Services
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-primary mt-4 leading-tight"
          >
            Travel Service Categories
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
            The Setharana team is ready to provide safe travel services of the highest quality for any destination that suits your needs.
          </motion.p>
        </div>

        {/* Services Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8"
        >
          {servicesData.map((service) => (
            <motion.div key={service.id} variants={cardVariants} className="group h-full">
              <Card className="h-full p-6 md:p-8 flex flex-col justify-between items-start text-left border-gray-100 hover:border-secondary/20 hover:shadow-xl transition-all duration-300">
                <div className="flex flex-col gap-4">
                  {/* Icon Wrapper */}
                  <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center transition-colors duration-300 group-hover:bg-primary">
                    <span className="group-hover:text-white text-secondary transition-colors duration-300">
                      {renderIcon(service.iconName)}
                    </span>
                  </div>
                  {/* Title */}
                  <h3 className="text-xl font-bold text-primary tracking-wide pt-2 group-hover:text-secondary transition-colors">
                    {service.title}
                  </h3>
                  {/* Description */}
                  <p className="text-gray-500 text-sm leading-relaxed">
                    {service.description}
                  </p>
                </div>
                {/* Learn More link mock */}
                <div className="mt-6 flex items-center gap-1.5 text-xs font-semibold text-secondary group-hover:text-primary transition-colors">
                  <span>View Details</span>
                  <Icons.ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
export default Services;
