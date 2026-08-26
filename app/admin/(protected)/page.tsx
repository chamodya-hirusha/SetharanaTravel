import { getPackages } from "@/app/admin/actions/packages";
import { getGallery } from "@/app/admin/actions/gallery";
import { getTestimonials } from "@/app/admin/actions/testimonials";
import { getContacts } from "@/app/admin/actions/contacts";
import StatsCard from "@/components/admin/StatsCard";
import { Package, Image, MessageSquare, Mail } from "lucide-react";
import Link from "next/link";

export default async function AdminDashboard() {
  const [packages, gallery, testimonials, contacts] = await Promise.all([
    getPackages(),
    getGallery(),
    getTestimonials(),
    getContacts(),
  ]);

  const unreadContacts = contacts.filter((c) => !c.read).length;
  const popularPackages = packages.filter((p) => p.isPopular).length;

  return (
    <div>
      {/* Header */}
      <div className="mb-7">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-1.5">
          Dashboard
        </h1>
        <p className="text-gray-500 text-sm">
          Welcome back! Here&apos;s an overview of your Setharana Travels website.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-7">
        <StatsCard
          label="Travel Packages"
          value={packages.length}
          icon={Package}
          color="#0E4B3A"
          bgColor="#dcfce7"
          description={`${popularPackages} marked as popular`}
        />
        <StatsCard
          label="Gallery Photos"
          value={gallery.length}
          icon={Image}
          color="#7c3aed"
          bgColor="#ede9fe"
          description="Across all categories"
        />
        <StatsCard
          label="Testimonials"
          value={testimonials.length}
          icon={MessageSquare}
          color="#d97706"
          bgColor="#fef3c7"
          description="Customer reviews"
        />
        <StatsCard
          label="Contact Messages"
          value={contacts.length}
          icon={Mail}
          color="#dc2626"
          bgColor="#fee2e2"
          description={`${unreadContacts} unread`}
        />
      </div>

      {/* Bottom row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Recent Packages */}
        <div className="bg-white border border-gray-200 rounded-2xl p-5 sm:p-6 shadow-[0_1px_4px_rgba(0,0,0,0.05)]">
          <div className="flex justify-between items-center mb-5">
            <h2 className="text-gray-900 font-bold text-base">
              Travel Packages
            </h2>
            <Link
              href="/admin/packages"
              className="text-[#0E4B3A] text-sm font-semibold hover:underline"
            >
              View all →
            </Link>
          </div>

          <div className="flex flex-col gap-2.5">
            {packages.slice(0, 5).map((pkg) => (
              <div
                key={pkg.id}
                className="flex items-center justify-between p-3 sm:px-4 bg-gray-50 rounded-xl border border-gray-100"
              >
                <div>
                  <div className="text-gray-900 text-[13px] font-semibold mb-0.5">
                    {pkg.title}
                  </div>
                  <div className="text-gray-400 text-xs line-clamp-1">
                    {pkg.location} · {pkg.duration}
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0 ml-2">
                  <span className="text-[#0E4B3A] font-bold text-[13px]">
                    {pkg.price}
                  </span>
                  {pkg.isPopular && (
                    <span className="bg-amber-100 border border-amber-200 text-amber-600 text-[10px] font-bold px-2 py-0.5 rounded-full tracking-wider hidden sm:inline-block">
                      POPULAR
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Messages Column */}
        <div className="flex flex-col gap-5">
          {/* Recent Messages */}
          {contacts.length > 0 && (
            <div className="bg-white border border-gray-200 rounded-2xl p-5 sm:p-6 shadow-[0_1px_4px_rgba(0,0,0,0.05)]">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-gray-900 font-bold text-base flex items-center flex-wrap gap-2">
                  Recent Messages
                  {unreadContacts > 0 && (
                    <span className="bg-red-100 border border-red-200 text-red-600 text-[11px] font-bold px-2 py-0.5 rounded-full whitespace-nowrap">
                      {unreadContacts} new
                    </span>
                  )}
                </h2>
                <Link
                  href="/admin/contacts"
                  className="text-[#0E4B3A] text-sm font-semibold hover:underline shrink-0"
                >
                  View all →
                </Link>
              </div>
              <div className="flex flex-col gap-2.5">
                {contacts.slice(0, 3).map((msg) => (
                  <div
                    key={msg.id}
                    className={`p-3 sm:px-4 rounded-xl border ${
                      msg.read 
                        ? 'bg-gray-50 border-gray-100' 
                        : 'bg-green-50/50 border-green-200'
                    }`}
                  >
                    <div className="flex justify-between mb-0.5">
                      <span className="text-gray-900 text-[13px] font-semibold truncate mr-2">
                        {msg.name}
                      </span>
                      <span className="text-gray-400 text-[11px] shrink-0">
                        {new Date(msg.date).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                      </span>
                    </div>
                    <div className="text-gray-500 text-xs line-clamp-1">{msg.subject}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
