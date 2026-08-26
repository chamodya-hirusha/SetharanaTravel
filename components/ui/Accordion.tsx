"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { cn } from "@/utils/cn";

interface AccordionItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
}

export const AccordionItem: React.FC<AccordionItemProps> = ({
  question,
  answer,
  isOpen,
  onToggle,
}) => {
  return (
    <div className="border-b border-gray-100 py-4 last:border-none">
      <button
        onClick={onToggle}
        className="flex justify-between items-center w-full text-left font-medium py-2 text-gray-900 hover:text-primary transition-colors cursor-pointer group"
      >
        <span className="text-lg md:text-xl font-medium leading-relaxed group-hover:text-primary transition-colors pr-2">
          {question}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="text-secondary flex-shrink-0"
        >
          <ChevronDown className="w-5 h-5 md:w-6 md:h-6" />
        </motion.div>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="pt-2 pb-4 text-gray-600 text-sm md:text-base leading-relaxed whitespace-pre-line">
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

interface AccordionProps {
  items: { id: string; question: string; answer: string }[];
}

export const Accordion: React.FC<AccordionProps> = ({ items }) => {
  const [openId, setOpenId] = useState<string | null>(items[0]?.id || null);

  const handleToggle = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-gray-100/80">
      {items.map((item) => (
        <AccordionItem
          key={item.id}
          question={item.question}
          answer={item.answer}
          isOpen={openId === item.id}
          onToggle={() => handleToggle(item.id)}
        />
      ))}
    </div>
  );
};
export default Accordion;
