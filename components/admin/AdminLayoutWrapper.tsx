"use client";

import { useState } from "react";
import AdminSidebar from "./AdminSidebar";
import { Menu } from "lucide-react";

export default function AdminLayoutWrapper({ children }: { children: React.ReactNode }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-slate-100">
      <AdminSidebar 
        isOpen={isMobileMenuOpen} 
        onClose={() => setIsMobileMenuOpen(false)} 
      />

      <div className="flex-1 flex flex-col min-w-0 md:ml-[260px]">
        {/* Mobile Header */}
        <div className="md:hidden flex items-center justify-between bg-white border-b border-gray-200 px-4 py-3 sticky top-0 z-30">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#0E4B3A] to-[#1a6b52] flex items-center justify-center">
              <span className="text-[#D4AF37] font-bold text-sm">S</span>
            </div>
            <span className="text-[#0E4B3A] font-bold text-sm">Admin</span>
          </div>
          <button 
            onClick={() => setIsMobileMenuOpen(true)}
            className="p-2 rounded-md hover:bg-gray-100 text-gray-600"
          >
            <Menu size={24} />
          </button>
        </div>

        <main className="flex-1 p-4 sm:p-6 md:p-8 min-h-screen text-gray-900 w-full overflow-x-hidden">
          {children}
        </main>
      </div>
    </div>
  );
}
