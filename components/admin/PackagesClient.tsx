"use client";

import { useState, useTransition } from "react";
import { TravelPackage } from "@/types";
import { createPackage, updatePackage, deletePackage } from "@/app/admin/actions/packages";
import { Plus, Pencil, Trash2, Star, X, MapPin, Clock, DollarSign } from "lucide-react";

interface PackagesClientProps {
  initialPackages: TravelPackage[];
}
type ModalMode = "create" | "edit" | null;

const emptyForm = {
  id: "", title: "", location: "", duration: "",
  price: "", originalPrice: "", image: "", features: "", isPopular: false,
  category: "Local",
};

export default function PackagesClient({ initialPackages }: PackagesClientProps) {
  const [packages, setPackages] = useState(initialPackages);
  const [filter, setFilter] = useState("All");
  const [modal, setModal] = useState<ModalMode>(null);
  const [form, setForm] = useState(emptyForm);

  const filteredPackages = packages.filter((pkg) => {
    if (filter === "All") return true;
    if (filter === "Local") return pkg.category === "Local" || pkg.category === "Both" || !pkg.category;
    if (filter === "Foreign") return pkg.category === "Foreign" || pkg.category === "Both";
    return true;
  });

  const [isPending, startTransition] = useTransition();
  const [deleteId, setDeleteId] = useState<string | null>(null);

  function openCreate() { setForm(emptyForm); setModal("create"); }
  function openEdit(pkg: TravelPackage) {
    setForm({
      id: pkg.id, title: pkg.title, location: pkg.location,
      duration: pkg.duration, price: pkg.price,
      originalPrice: pkg.originalPrice ?? "", image: pkg.image,
      features: pkg.features.join("\n"), isPopular: pkg.isPopular ?? false,
      category: pkg.category || "Local",
    });
    setModal("edit");
  }
  function closeModal() { setModal(null); setForm(emptyForm); }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    startTransition(async () => {
      if (modal === "create") { await createPackage(fd); }
      else { fd.append("id", form.id); await updatePackage(fd); }
      window.location.reload();
    });
  }

  async function handleDelete(id: string) {
    startTransition(async () => {
      await deletePackage(id);
      setPackages((prev) => prev.filter((p) => p.id !== id));
      setDeleteId(null);
    });
  }

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900 mb-1">Travel Packages</h1>
          <p className="text-gray-500 text-sm">{packages.length} packages total</p>
        </div>
        <button 
          onClick={openCreate} 
          className="flex items-center justify-center gap-2 px-5 py-2.5 bg-[#0E4B3A] text-white text-sm font-semibold rounded-xl hover:bg-[#093025] transition-colors w-full sm:w-auto"
        >
          <Plus size={16} /> Add Package
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2.5 mb-5 overflow-x-auto pb-2 scrollbar-hide">
        {["All", "Local", "Foreign"].map((tab) => (
          <button
            key={tab}
            onClick={() => setFilter(tab)}
            className={`px-4 py-2 rounded-full border text-sm font-semibold transition-all whitespace-nowrap ${
              filter === tab 
                ? "bg-[#0E4B3A] text-white border-[#0E4B3A]" 
                : "bg-white text-gray-700 border-gray-200 hover:bg-gray-50"
            }`}
          >
            {tab === "All" ? "All Packages" : `${tab} Packages`}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filteredPackages.map((pkg) => (
          <div key={pkg.id} className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm relative flex flex-col">
            {pkg.isPopular && (
              <span className="absolute top-4 right-4 bg-amber-100 border border-amber-200 text-amber-600 text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 z-10">
                <Star size={10} fill="#d97706" /> POPULAR
              </span>
            )}
            <div className="mb-2">
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full tracking-wider ${
                pkg.category === "Foreign" ? "bg-indigo-100 text-indigo-800" :
                pkg.category === "Both" ? "bg-purple-100 text-purple-800" :
                "bg-green-100 text-green-800"
              }`}>
                {pkg.category?.toUpperCase() || "LOCAL"}
              </span>
            </div>
            <h3 className="text-gray-900 text-[15px] font-bold mb-3 pr-16 leading-snug">{pkg.title}</h3>
            
            <div className="flex flex-col gap-1.5 mb-4 flex-1">
              <div className="flex items-center gap-2 text-gray-500 text-[13px]"><MapPin size={13} className="text-gray-400" />{pkg.location}</div>
              <div className="flex items-center gap-2 text-gray-500 text-[13px]"><Clock size={13} className="text-gray-400" />{pkg.duration}</div>
              <div className="flex items-center gap-2 text-[13px] mt-1">
                <DollarSign size={13} className="text-[#0E4B3A]" />
                <span className="text-[#0E4B3A] font-bold">{pkg.price}</span>
                {pkg.originalPrice && <span className="text-gray-400 line-through text-xs">{pkg.originalPrice}</span>}
              </div>
            </div>
            
            <div className="flex gap-2 pt-3.5 border-t border-gray-100 mt-auto">
              <button onClick={() => openEdit(pkg)} className="flex-1 flex items-center justify-center gap-1.5 py-2 bg-green-50 border border-green-200 rounded-xl text-[#0E4B3A] text-[13px] font-medium hover:bg-green-100 transition-colors">
                <Pencil size={13} /> Edit
              </button>
              <button onClick={() => setDeleteId(pkg.id)} className="flex-1 flex items-center justify-center gap-1.5 py-2 bg-red-50 border border-red-200 rounded-xl text-red-600 text-[13px] font-medium hover:bg-red-100 transition-colors">
                <Trash2 size={13} /> Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Create/Edit Modal */}
      {modal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[100] flex items-center justify-center p-4 sm:p-6" onClick={(e) => e.target === e.currentTarget && closeModal()}>
          <div className="w-full max-w-xl max-h-[90vh] overflow-y-auto bg-white border border-gray-200 rounded-2xl shadow-2xl">
            {/* Modal header */}
            <div className="px-5 py-4 sm:px-7 sm:py-5 border-b border-gray-100 flex justify-between items-center sticky top-0 bg-white z-10">
              <h2 className="text-gray-900 text-lg font-bold">
                {modal === "create" ? "Add New Package" : "Edit Package"}
              </h2>
              <button onClick={closeModal} className="p-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-gray-500 transition-colors">
                <X size={18} />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-5 sm:p-7">
              <div className="flex flex-col gap-4">
                <div>
                  <label className="block text-gray-700 text-xs font-bold mb-1.5 tracking-wide">Title *</label>
                  <input name="title" required value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 text-sm focus:outline-none focus:border-[#0E4B3A] focus:ring-1 focus:ring-[#0E4B3A]" placeholder="Package title" />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-700 text-xs font-bold mb-1.5 tracking-wide">Category *</label>
                    <select name="category" required value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 text-sm focus:outline-none focus:border-[#0E4B3A] focus:ring-1 focus:ring-[#0E4B3A]">
                      <option value="Local">Local</option>
                      <option value="Foreign">Foreign</option>
                      <option value="Both">Both</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-gray-700 text-xs font-bold mb-1.5 tracking-wide">Location *</label>
                    <input name="location" required value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 text-sm focus:outline-none focus:border-[#0E4B3A] focus:ring-1 focus:ring-[#0E4B3A]" placeholder="e.g. Anuradhapura" />
                  </div>
                </div>
                <div>
                  <label className="block text-gray-700 text-xs font-bold mb-1.5 tracking-wide">Duration *</label>
                  <input name="duration" required value={form.duration} onChange={(e) => setForm({ ...form, duration: e.target.value })} className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 text-sm focus:outline-none focus:border-[#0E4B3A] focus:ring-1 focus:ring-[#0E4B3A]" placeholder="e.g. 2 Days 1 Night" />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-700 text-xs font-bold mb-1.5 tracking-wide">Price *</label>
                    <input name="price" required value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 text-sm focus:outline-none focus:border-[#0E4B3A] focus:ring-1 focus:ring-[#0E4B3A]" placeholder="e.g. Rs. 8,500" />
                  </div>
                  <div>
                    <label className="block text-gray-700 text-xs font-bold mb-1.5 tracking-wide">Original Price</label>
                    <input name="originalPrice" value={form.originalPrice} onChange={(e) => setForm({ ...form, originalPrice: e.target.value })} className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 text-sm focus:outline-none focus:border-[#0E4B3A] focus:ring-1 focus:ring-[#0E4B3A]" placeholder="e.g. Rs. 9,500" />
                  </div>
                </div>
                <div>
                  <label className="block text-gray-700 text-xs font-bold mb-1.5 tracking-wide">Image Upload {modal === "create" ? "*" : ""}</label>
                  {modal === "edit" && form.image && (
                    <div className="mb-2 text-[13px] text-gray-500">
                      Current Image: <a href={form.image} target="_blank" rel="noreferrer" className="text-[#0E4B3A] hover:underline">View Image</a>
                    </div>
                  )}
                  <input type="file" name="imageFile" accept="image/*" required={modal === "create"} className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 text-sm focus:outline-none focus:border-[#0E4B3A]" />
                </div>
                <div>
                  <label className="block text-gray-700 text-xs font-bold mb-1.5 tracking-wide">Features (one per line) *</label>
                  <textarea name="features" required value={form.features} onChange={(e) => setForm({ ...form, features: e.target.value })} rows={5} className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 text-sm focus:outline-none focus:border-[#0E4B3A] focus:ring-1 focus:ring-[#0E4B3A] resize-y" placeholder={"Luxury AC bus transport\nClean hotel accommodations"} />
                </div>
                <div className="flex items-center gap-2.5 mt-1">
                  <input type="checkbox" id="isPopular" name="isPopular" value="true" checked={form.isPopular} onChange={(e) => setForm({ ...form, isPopular: e.target.checked })} className="w-4 h-4 accent-[#0E4B3A]" />
                  <label htmlFor="isPopular" className="text-gray-700 text-sm cursor-pointer font-medium">Mark as Popular</label>
                </div>
              </div>
              <div className="flex gap-3 mt-6 pt-5 border-t border-gray-100">
                <button type="button" onClick={closeModal} className="flex-1 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-600 text-sm font-medium hover:bg-gray-100 transition-colors">Cancel</button>
                <button type="submit" disabled={isPending} className={`flex-[2] py-2.5 bg-[#0E4B3A] text-white rounded-xl text-sm font-semibold transition-all ${isPending ? "opacity-70 cursor-not-allowed" : "hover:bg-[#093025]"}`}>
                  {isPending ? "Saving..." : modal === "create" ? "Create Package" : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirm */}
      {deleteId && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <div className="bg-white border border-red-200 rounded-2xl p-6 sm:p-8 max-w-sm w-full text-center shadow-2xl">
            <div className="w-14 h-14 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-4">
              <Trash2 size={24} className="text-red-600" />
            </div>
            <h3 className="text-gray-900 text-lg font-bold mb-2">Delete Package?</h3>
            <p className="text-gray-500 text-sm mb-6 leading-relaxed">This action cannot be undone. The package will be removed from the website.</p>
            <div className="flex gap-3">
              <button onClick={() => setDeleteId(null)} className="flex-1 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-600 text-sm font-medium hover:bg-gray-100 transition-colors">Cancel</button>
              <button onClick={() => handleDelete(deleteId)} disabled={isPending} className={`flex-1 py-2.5 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm font-semibold transition-colors ${isPending ? "opacity-70 cursor-not-allowed" : "hover:bg-red-100"}`}>
                {isPending ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
