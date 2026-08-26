"use client";

import { useState, useTransition } from "react";
import { Lock, Shield, Loader2, Save } from "lucide-react";
import { changePasswordAction } from "@/app/admin/actions/security";

export default function SecuritySettingsClient() {
  const [isPending, startTransition] = useTransition();
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const newPassword = fd.get("newPassword") as string;
    const confirmPassword = fd.get("confirmPassword") as string;

    if (newPassword !== confirmPassword) {
      setToast({ message: "New passwords do not match.", type: "error" });
      setTimeout(() => setToast(null), 3000);
      return;
    }

    startTransition(async () => {
      setToast(null);
      const res = await changePasswordAction(fd);
      if (res?.error) {
        setToast({ message: res.error, type: "error" });
      } else {
        setToast({ message: "Password successfully changed!", type: "success" });
        (e.target as HTMLFormElement).reset();
      }
      setTimeout(() => setToast(null), 3000);
    });
  };

  const inputClasses = "w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 text-sm outline-none focus:border-green-600 focus:ring-1 focus:ring-green-600 transition-all placeholder:text-gray-400";
  const labelClasses = "block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2";
  const cardClasses = "bg-white border border-gray-100 rounded-2xl p-5 sm:p-6 md:p-8 shadow-sm hover:shadow-md transition-shadow duration-300";

  return (
    <div className="max-w-3xl mx-auto pb-8 sm:pb-12 mt-4 sm:mt-6">
      <div className="mb-6 sm:mb-8 text-center sm:text-left">
        <h1 className="text-2xl font-extrabold mb-1 sm:mb-2">
          <span className="text-[#0E4B3A]">Security</span> <span className="text-[#D4AF37]">Settings</span>
        </h1>
        <p className="text-gray-500 text-sm">Update your admin password and secure your account.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className={cardClasses}>
          <div className="flex items-center justify-center sm:justify-start gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-gray-800 text-yellow-500 flex items-center justify-center">
              <Shield size={20} />
            </div>
            <h2 className="text-lg font-bold">
              <span className="text-[#0E4B3A]">Change</span> <span className="text-[#D4AF37]">Password</span>
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
            <div className="md:col-span-2">
              <label className={labelClasses}>Current Password *</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input name="currentPassword" type="password" required className={`${inputClasses} pl-10`} placeholder="Enter current password" />
              </div>
            </div>
            <div>
              <label className={labelClasses}>New Password *</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input name="newPassword" type="password" required className={`${inputClasses} pl-10`} placeholder="Enter new password" minLength={6} />
              </div>
            </div>
            <div>
              <label className={labelClasses}>Confirm New Password *</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input name="confirmPassword" type="password" required className={`${inputClasses} pl-10`} placeholder="Confirm new password" minLength={6} />
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col-reverse sm:flex-row items-center sm:justify-end gap-4 pt-2">
          {toast && (
            <div className={`w-full sm:w-auto px-4 py-2.5 rounded-xl text-sm font-medium text-center ${toast.type === "success" ? "bg-green-100 text-green-800 border border-green-200" : "bg-red-100 text-red-800 border border-red-200"}`}>
              {toast.message}
            </div>
          )}
          
          <button 
            type="submit" 
            disabled={isPending}
            className="flex items-center justify-center gap-2 w-full sm:w-auto px-8 py-3.5 bg-gray-900 hover:bg-black text-white font-bold rounded-xl shadow-md hover:shadow-lg transition-all disabled:opacity-70 disabled:cursor-not-allowed disabled:shadow-none"
          >
            {isPending ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
            {isPending ? "Updating..." : "Update Password"}
          </button>
        </div>
      </form>
    </div>
  );
}
