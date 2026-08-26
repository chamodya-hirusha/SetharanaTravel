"use client";
import React, { useState } from "react";
import { Menu, X, PhoneCall } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useScrollThreshold } from "@/hooks/useScrollThreshold";
import { Button } from "@/components/ui/Button";
import Image from "next/image";
import Link from "next/link";
import { ContactSettings } from "@/utils/contact-settings";

export const Navbar: React.FC<{ contactSettings?: ContactSettings | null }> = ({ contactSettings }) => {
  const [isOpen, setIsOpen] = useState(false);
  const isScrolled = useScrollThreshold(50);

  const menuItems = [
    { name: "Home", href: "/#home" },
    { name: "About", href: "/#about" },
    { name: "Services", href: "/#services" },
    { name: "Travel Packages", href: "/#packages" },
    { name: "Gallery", href: "/#gallery" },
    { name: "Testimonials", href: "/#testimonials" },
    { name: "FAQs", href: "/#faq" },
    { name: "Contact Us", href: "/#contact" },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled || isOpen
            ? "bg-primary backdrop-blur-md border-b border-white/10 shadow-lg py-3"
            : "bg-gradient-to-b from-black/60 to-transparent py-5"
          }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Link href="/#home" className="flex items-center gap-2 group">
                <div className="relative w-16 h-16 md:w-20 md:h-20  group-hover:scale-105">
                  <Image
                    src="/images/logo/Setharana%20Travels%20logo.png"
                    alt="Setharana Travels Logo"
                    fill
                    className="object-contain p-1"
                    sizes="80px"
                    priority
                  />
                </div>
              </Link>
            </div>

            {/* Desktop Menu */}
            <div className="hidden lg:flex items-center justify-center space-x-6 xl:space-x-8">
              {menuItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-white/95 hover:text-secondary text-sm xl:text-base font-medium tracking-wide transition-colors duration-200 relative group py-2"
                >
                  {item.name}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-secondary group-hover:w-full transition-all duration-300"></span>
                </Link>
              ))}
            </div>

            {/* Desktop CTA */}
            <div className="hidden lg:block">
              <a href={`tel:${contactSettings?.phone || "0774222970"}`}>
                <Button
                  variant="secondary"
                  size="sm"
                  className="flex items-center gap-2 text-primary font-bold shadow-md hover:bg-white hover:text-primary transition-all duration-300"
                >
                  <PhoneCall className="w-4 h-4 animate-bounce" />
                  {contactSettings?.phone || "077 422 2970"}
                </Button>
              </a>
            </div>

            {/* Mobile Menu Button */}
            <div className="lg:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-white hover:text-secondary p-2 transition-colors focus:outline-none cursor-pointer"
                aria-label="Open Menu"
              >
                {isOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 top-[72px] bg-primary z-50 lg:hidden flex flex-col justify-between p-6 border-t border-white/10"
          >
            <div className="flex flex-col gap-5 pt-8">
              {menuItems.map((item, idx) => (
                <Link key={item.name} href={item.href} passHref legacyBehavior>
                  <motion.a
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    onClick={() => setIsOpen(false)}
                    className="text-white text-lg font-semibold hover:text-secondary tracking-wide border-b border-white/5 pb-2 transition-colors"
                  >
                    {item.name}
                  </motion.a>
                </Link>
              ))}
            </div>

            <div className="mb-12 flex flex-col gap-4">
              <a href={`tel:${contactSettings?.phone || "0774222970"}`} className="w-full">
                <Button
                  variant="secondary"
                  size="lg"
                  className="w-full flex items-center justify-center gap-3 font-bold"
                >
                  <PhoneCall className="w-5 h-5" />
                  Call Now
                </Button>
              </a>
              <div className="text-center text-white/50 text-sm">
                {contactSettings?.email || "srysetharana@gmail.com"} | {contactSettings?.city || "Anuradhapura"}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
export default Navbar;
