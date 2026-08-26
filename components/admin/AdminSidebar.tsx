"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Package,
  Image as ImageIcon,
  MessageSquare,
  LogOut,
  Map,
  Shield,
  HelpCircle,
  X
} from "lucide-react";
import { logoutAction } from "@/app/admin/actions/auth";

const navLinks = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/packages", label: "Travel Packages", icon: Package },
  { href: "/admin/gallery", label: "Gallery", icon: ImageIcon },
  { href: "/admin/testimonials", label: "Testimonials", icon: MessageSquare },
  { href: "/admin/faqs", label: "FAQs", icon: HelpCircle },
  { href: "/admin/security", label: "Security", icon: Shield },
];

interface AdminSidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export default function AdminSidebar({ isOpen = false, onClose }: AdminSidebarProps) {
  const pathname = usePathname();

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 bottom-0 z-50 w-[260px] bg-white border-r border-gray-200 flex flex-col shadow-sm transition-transform duration-300 ease-in-out md:translate-x-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        {/* Logo */}
        <div className="px-5 py-6 border-b border-gray-100 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-[42px] h-[42px] rounded-xl bg-gradient-to-br from-[#0E4B3A] to-[#1a6b52] flex items-center justify-center shadow-md">
              <Map size={20} color="#D4AF37" />
            </div>
            <div>
              <div className="text-[#0E4B3A] font-extrabold text-[15px] tracking-wide">
                Setharana
              </div>
              <div className="text-gray-400 text-[11px] font-medium">
                Admin Panel
              </div>
            </div>
          </div>
          {/* Close button on mobile */}
          <button 
            className="md:hidden p-1 text-gray-400 hover:text-gray-600 rounded-md"
            onClick={onClose}
          >
            <X size={20} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-4 overflow-y-auto">
          <div className="text-gray-400 text-[10px] font-bold tracking-widest uppercase px-2.5 mb-2">
            Management
          </div>
          {navLinks.map(({ href, label, icon: Icon }) => {
            const isActive =
              href === "/admin"
                ? pathname === "/admin"
                : pathname.startsWith(href);
            return (
              <Link
                key={href}
                href={href}
                onClick={() => {
                  if (window.innerWidth < 768 && onClose) {
                    onClose();
                  }
                }}
                className={`flex items-center gap-[11px] px-3 py-2.5 rounded-lg mb-1 no-underline font-medium text-sm transition-all duration-150 ${
                  isActive 
                    ? "bg-[#0E4B3A]/[0.08] border border-[#0E4B3A]/[0.15] text-[#0E4B3A] font-bold" 
                    : "bg-transparent border border-transparent text-gray-500 hover:bg-gray-50"
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                    isActive ? "bg-[#0E4B3A]/10" : "bg-gray-100"
                  }`}
                >
                  <Icon size={16} color={isActive ? "#0E4B3A" : "#9ca3af"} />
                </div>
                {label}
              </Link>
            );
          })}
        </nav>

        {/* Logout */}
        <div className="px-3 py-4 border-t border-gray-100">
          <form action={logoutAction}>
            <button
              type="submit"
              className="flex items-center gap-[11px] px-3 py-2.5 rounded-lg w-full bg-red-50 border border-red-100 text-red-500 text-sm cursor-pointer font-medium transition-all duration-150 hover:bg-red-100"
            >
              <div className="w-8 h-8 rounded-lg bg-red-100 flex items-center justify-center shrink-0">
                <LogOut size={15} color="#ef4444" />
              </div>
              Sign Out
            </button>
          </form>
        </div>
      </aside>
    </>
  );
}
