"use client";
import React from "react";
import { motion } from "framer-motion";
import { Accordion } from "@/components/ui/Accordion";
import { faqsData } from "@/data/travelData";
import { FAQItem } from "@/types";

export const FAQ: React.FC<{ initialData?: FAQItem[] }> = ({ initialData }) => {
  const currentFaqsData = initialData && initialData.length > 0 ? initialData : faqsData;

  return (
    <section id="faq" className="py-20 bg-section-bg overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.span
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-sm font-bold text-secondary tracking-widest uppercase bg-secondary/10 px-4 py-1.5 rounded-full inline-block"
          >
            Questions and Answers
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-primary mt-4 leading-tight"
          >
            Frequently Asked Questions
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
            Get answers to frequently asked questions by our customers about Setharana travel services and packages here.
          </motion.p>
        </div>

        {/* Accordion Component */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Accordion items={currentFaqsData} />
        </motion.div>
      </div>
    </section>
  );
};
export default FAQ;
