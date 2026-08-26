"use client";
import React from "react";
import { Phone, Mail, MapPin, ChevronRight, Heart } from "lucide-react";
import Image from "next/image";
import { ContactSettings } from "@/utils/contact-settings";

export const Footer: React.FC<{ contactSettings?: ContactSettings | null }> = ({ contactSettings }) => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Services", href: "#services" },
    { name: "Travel Packages", href: "#packages" },
    { name: "Gallery", href: "#gallery" },
    { name: "FAQs", href: "#faq" },
    { name: "Contact Us", href: "#contact" },
  ];

  const services = [
    { name: "Buddhist Pilgrimage Tours", href: "#services" },
    { name: "Sri Pada Pilgrimage Tours", href: "#services" },
    { name: "One-Day Tours", href: "#services" },
    { name: "Multi-Day Tours", href: "#services" },
    { name: "Family Tours", href: "#services" },
    { name: "School Tours", href: "#services" },
    { name: "Corporate Tours", href: "#services" },
    { name: "Special Travel Packages", href: "#services" },
  ];

  return (
    <footer className="bg-[#0b3c2e] text-white border-t border-white/5 pt-16 pb-8 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-12 border-b border-white/10">
          {/* Column 1: Brand details (4 cols) */}
          <div className="lg:col-span-4 flex flex-col">
            <div className="relative w-20 h-20">
              <Image
                src="/images/logo/Setharana%20Travels%20logo.png"
                alt="Setharana Travels Logo"
                fill
                className="object-contain p-1"
                sizes="80px"
              />
            </div>
            <p className="mt-4 text-sm text-gray-300 leading-relaxed max-w-sm">
              Setharana Travels is the most responsible and safe travel service operating from the sacred city of Anuradhapura in Sri Lanka. Our main goal is to make your journey a comfortable and unforgettable experience.
            </p>
            {/* Social icons */}
            <div className="flex gap-4 mt-6">
              <a
                href={contactSettings?.facebook || "https://facebook.com/profile.php?id=100086577527000"}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-secondary hover:text-primary transition-all duration-300 shadow-sm"
                aria-label="Facebook Page"
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c4.56-.93 8-4.96 8-9.75z" />
                </svg>
              </a>
              <a
                href={contactSettings?.youtube || "https://youtube.com/@srysetharanatv4741"}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-[#FF0000] hover:text-white transition-all duration-300 shadow-sm"
                aria-label="YouTube Channel"
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M23.498 6.163a3.003 3.003 0 0 0-2.11-2.11C19.518 3.545 12 3.545 12 3.545s-7.519 0-9.388.508a3.003 3.003 0 0 0-2.11 2.11C0 8.033 0 12 0 12s0 3.967.502 5.837a3.003 3.003 0 0 0 2.11 2.11C4.482 20.455 12 20.455 12 20.455s7.519 0 9.388-.508a3.003 3.003 0 0 0 2.11-2.11C24 15.967 24 12 24 12s0-3.967-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links (2 cols) */}
          <div className="lg:col-span-2 flex flex-col">
            <h3 className="text-lg font-bold text-secondary tracking-wide border-b border-white/10 pb-2 mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-gray-300 hover:text-secondary text-sm flex items-center gap-1 group transition-colors"
                  >
                    <ChevronRight className="w-3.5 h-3.5 text-secondary/70 group-hover:translate-x-0.5 transition-transform" />
                    <span>{link.name}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Services (3 cols) */}
          <div className="lg:col-span-3 flex flex-col">
            <h3 className="text-lg font-bold text-secondary tracking-wide border-b border-white/10 pb-2 mb-4">
              Services
            </h3>
            <ul className="space-y-2">
              {services.map((svc, idx) => (
                <li key={idx}>
                  <a
                    href={svc.href}
                    className="text-gray-300 hover:text-secondary text-sm flex items-center gap-1 group transition-colors"
                  >
                    <ChevronRight className="w-3.5 h-3.5 text-secondary/70 group-hover:translate-x-0.5 transition-transform" />
                    <span>{svc.name}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact Info (3 cols) */}
          <div className="lg:col-span-3 flex flex-col">
            <h3 className="text-lg font-bold text-secondary tracking-wide border-b border-white/10 pb-2 mb-4">
              Contact
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
                <span className="text-sm text-gray-300">
                  {contactSettings?.address || "Anuradhapura, Sri Lanka"}
                </span>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
                <a href={`tel:${contactSettings?.phone || "0774222970"}`} className="text-sm text-gray-300 hover:text-secondary transition-colors">
                  {contactSettings?.phone || "077 422 2970"}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
                <a href={`mailto:${contactSettings?.email || "srysetharana@gmail.com"}`} className="text-sm text-gray-300 hover:text-secondary transition-colors">
                  {contactSettings?.email || "srysetharana@gmail.com"}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between pt-8 text-xs text-gray-400">
          <p className="text-center sm:text-left">
            © {currentYear} Setharana Travels. All rights reserved.
          </p>
          <div className="flex flex-col items-center sm:items-end gap-1.5 mt-4 sm:mt-0">
            <p className="font-medium tracking-wide">
              Development by Brain<span className="text-yellow-400 font-bold">t</span>isa
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
