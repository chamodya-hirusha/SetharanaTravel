"use client";
import React from "react";
import { Phone, Mail, MapPin, ChevronRight } from "lucide-react";
import Image from "next/image";
import { QRCodeSVG } from "qrcode.react";
import { ContactSettings } from "@/utils/contact-settings";

// SVG icon for WhatsApp
const WhatsAppIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.888-.788-1.487-1.761-1.663-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
  </svg>
);

export const Footer: React.FC<{ contactSettings?: ContactSettings | null }> = ({ contactSettings }) => {
  const currentYear = new Date().getFullYear();

  // WhatsApp formatting logic
  const rawWhatsapp = contactSettings?.whatsapp || contactSettings?.phone || "077 422 2970";
  const displayWhatsapp = contactSettings?.whatsapp || "+94 77 422 2970";
  
  const extractDigits = (val: string) => {
    const d = val.replace(/[^0-9]/g, "");
    if (!d) return "94774222970";
    if (d.startsWith("0")) return `94${d.slice(1)}`;
    if (!d.startsWith("94") && d.length === 9) return `94${d}`;
    return d;
  };

  const whatsappDigits = extractDigits(rawWhatsapp);
  const whatsappUrl = `https://wa.me/${whatsappDigits}`;

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
          {/* Column 1: Brand details (3 cols) */}
          <div className="lg:col-span-3 flex flex-col">
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
            <div className="flex gap-3 mt-6">
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
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-[#25D366] hover:text-white transition-all duration-300 shadow-sm"
                aria-label="WhatsApp"
                title="Chat on WhatsApp"
              >
                <WhatsAppIcon className="w-5 h-5" />
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

          {/* Column 4: Contact & WhatsApp QR (4 cols) */}
          <div className="lg:col-span-4 flex flex-col">
            <h3 className="text-lg font-bold text-secondary tracking-wide border-b border-white/10 pb-2 mb-4">
              Contact & WhatsApp
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
                <span className="text-sm text-gray-300">
                  {contactSettings?.address || "Anuradhapura, Sri Lanka"}
                </span>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
                <a
                  href={`tel:${contactSettings?.phone || "0774222970"}`}
                  className="text-sm text-gray-300 hover:text-secondary transition-colors"
                >
                  {contactSettings?.phone || "077 422 2970"}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#25D366] flex-shrink-0 mt-0.5">
                  <WhatsAppIcon className="w-5 h-5" />
                </span>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-gray-300 hover:text-[#25D366] transition-colors font-medium flex items-center gap-2"
                >
                  <span>{displayWhatsapp}</span>
                  <span className="text-[11px] bg-[#25D366]/20 text-[#25D366] px-1.5 py-0.5 rounded font-normal">
                    WhatsApp
                  </span>
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
                <a
                  href={`mailto:${contactSettings?.email || "srysetharana@gmail.com"}`}
                  className="text-sm text-gray-300 hover:text-secondary transition-colors truncate"
                >
                  {contactSettings?.email || "srysetharana@gmail.com"}
                </a>
              </li>
            </ul>

            {/* WhatsApp QR Code Card */}
            <div className="mt-5 p-3.5 rounded-xl bg-white/[0.07] border border-white/10 hover:border-[#25D366]/50 transition-all duration-300 backdrop-blur-xs">
              <div className="flex items-center justify-between mb-2.5">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-[#25D366]/20 flex items-center justify-center text-[#25D366]">
                    <WhatsAppIcon className="w-3.5 h-3.5" />
                  </span>
                  <div>
                    <h4 className="text-xs font-semibold text-white">
                      Scan WhatsApp QR
                    </h4>
                    <p className="text-[10px] text-gray-300">
                      Connect instantly with our team
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3.5">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-1.5 bg-white rounded-lg shadow-md hover:scale-105 transition-transform inline-block group flex-shrink-0"
                  title="Click or scan to chat on WhatsApp"
                >
                  <QRCodeSVG
                    value={whatsappUrl}
                    size={84}
                    level="M"
                    bgColor="#ffffff"
                    fgColor="#0b3c2e"
                  />
                </a>

                <div className="flex flex-col gap-2">
                  <p className="text-xs text-gray-300 leading-snug">
                    Scan with your phone camera or click below to message us directly.
                  </p>
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-[#25D366] hover:bg-[#20ba59] text-white text-xs font-medium transition-colors shadow-sm w-fit group"
                  >
                    <WhatsAppIcon className="w-3.5 h-3.5 group-hover:scale-110 transition-transform" />
                    <span>Chat on WhatsApp</span>
                  </a>
                </div>
              </div>
            </div>
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
