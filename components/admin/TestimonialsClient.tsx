"use client";

import { useState, useTransition } from "react";
import { Testimonial } from "@/types";
import { createTestimonial, updateTestimonial, deleteTestimonial } from "@/app/admin/actions/testimonials";
import { Plus, Pencil, Trash2, Star, X, MapPin } from "lucide-react";

interface TestimonialsClientProps { initialItems: Testimonial[]; }
type ModalMode = "create" | "edit" | null;
const emptyForm = { id: "", name: "", location: "", image: "", rating: 5, comment: "" };

export default function TestimonialsClient({ initialItems }: TestimonialsClientProps) {
  const [items, setItems] = useState(initialItems);
  const [modal, setModal] = useState<ModalMode>(null);
  const [form, setForm] = useState(emptyForm);
  const [isPending, startTransition] = useTransition();
  const [deleteId, setDeleteId] = useState<string | null>(null);

  function openCreate() { setForm(emptyForm); setModal("create"); }
  function openEdit(item: Testimonial) {
    setForm({ id: item.id, name: item.name, location: item.location, image: item.image || "", rating: item.rating, comment: item.comment });
    setModal("edit");
  }
  function closeModal() { setModal(null); setForm(emptyForm); }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    startTransition(async () => {
      if (modal === "create") { await createTestimonial(fd); }
      else { fd.append("id", form.id); await updateTestimonial(fd); }
      window.location.reload();
    });
  }

  async function handleDelete(id: string) {
    startTransition(async () => {
      await deleteTestimonial(id);
      setItems((prev) => prev.filter((i) => i.id !== id));
      setDeleteId(null);
    });
  }

  function renderStars(rating: number, interactive = false, onChange?: (r: number) => void) {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        size={interactive ? 24 : 14}
        fill={i < rating ? "#d97706" : "transparent"}
        color={i < rating ? "#d97706" : "#d1d5db"}
        className={interactive ? "cursor-pointer" : ""}
        onClick={() => interactive && onChange && onChange(i + 1)}
      />
    ));
  }

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900 mb-1">Testimonials</h1>
          <p className="text-gray-500 text-sm">{items.length} reviews</p>
        </div>
        <button 
          onClick={openCreate} 
          className="flex items-center justify-center gap-2 px-5 py-2.5 bg-[#0E4B3A] text-white text-sm font-semibold rounded-xl hover:bg-[#093025] transition-colors w-full sm:w-auto"
        >
          <Plus size={16} /> Add Review
        </button>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map((item) => (
          <div key={item.id} className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm flex flex-col">
            {/* Stars */}
            <div className="flex gap-1 mb-3">{renderStars(item.rating)}</div>
            {/* Comment */}
            <p className="text-gray-700 text-sm leading-relaxed mb-4 italic flex-1">
              &ldquo;{item.comment}&rdquo;
            </p>
            {/* Author */}
            <div className="flex items-center gap-3 mb-4 pt-3 border-t border-gray-100">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#0E4B3A] to-[#1a6b52] flex items-center justify-center text-[#D4AF37] font-bold text-[15px] shrink-0">
                {item.name.charAt(0)}
              </div>
              <div>
                <div className="text-gray-900 font-bold text-sm">{item.name}</div>
                <div className="flex items-center gap-1 text-gray-400 text-xs mt-0.5"><MapPin size={11} />{item.location}</div>
              </div>
            </div>
            <div className="flex gap-2">
              <button onClick={() => openEdit(item)} className="flex-1 flex items-center justify-center gap-1.5 py-2 bg-green-50 border border-green-200 rounded-xl text-[#0E4B3A] text-[13px] font-medium hover:bg-green-100 transition-colors"><Pencil size={13} /> Edit</button>
              <button onClick={() => setDeleteId(item.id)} className="flex-1 flex items-center justify-center gap-1.5 py-2 bg-red-50 border border-red-200 rounded-xl text-red-600 text-[13px] font-medium hover:bg-red-100 transition-colors"><Trash2 size={13} /> Delete</button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {modal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[100] flex items-center justify-center p-4 sm:p-6" onClick={(e) => e.target === e.currentTarget && closeModal()}>
          <div className="w-full max-w-lg max-h-[90vh] bg-white border border-gray-200 rounded-2xl shadow-2xl flex flex-col overflow-hidden">
            <div className="px-5 py-4 sm:px-7 sm:py-5 border-b border-gray-100 flex justify-between items-center bg-white shrink-0">
              <h2 className="text-gray-900 text-lg font-bold">{modal === "create" ? "Add Testimonial" : "Edit Testimonial"}</h2>
              <button onClick={closeModal} className="p-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-gray-500 transition-colors"><X size={18} /></button>
            </div>
            <div className="overflow-y-auto">
              <form onSubmit={handleSubmit} className="p-5 sm:p-7">
                <div className="flex flex-col gap-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-gray-700 text-xs font-bold mb-1.5 tracking-wide">Name *</label>
                      <input name="name" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 text-sm focus:outline-none focus:border-[#0E4B3A] focus:ring-1 focus:ring-[#0E4B3A]" placeholder="Customer name" />
                    </div>
                    <div>
                      <label className="block text-gray-700 text-xs font-bold mb-1.5 tracking-wide">Location *</label>
                      <input name="location" required value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 text-sm focus:outline-none focus:border-[#0E4B3A] focus:ring-1 focus:ring-[#0E4B3A]" placeholder="City" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-gray-700 text-xs font-bold mb-1.5 tracking-wide">Rating *</label>
                    <div className="flex gap-1.5 items-center">
                      {renderStars(form.rating, true, (r) => setForm({ ...form, rating: r }))}
                      <input type="hidden" name="rating" value={form.rating} />
                    </div>
                  </div>
                  <div>
                    <label className="block text-gray-700 text-xs font-bold mb-1.5 tracking-wide">Review *</label>
                    <textarea name="comment" required value={form.comment} onChange={(e) => setForm({ ...form, comment: e.target.value })} rows={5} className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 text-sm focus:outline-none focus:border-[#0E4B3A] focus:ring-1 focus:ring-[#0E4B3A] resize-y" placeholder="Customer review text..." />
                  </div>
                  <div>
                    <label className="block text-gray-700 text-xs font-bold mb-1.5 tracking-wide">Photo Upload (optional)</label>
                    {modal === "edit" && form.image && (
                      <div className="mb-2 text-[13px] text-gray-500">
                        Current Photo: <a href={form.image} target="_blank" rel="noreferrer" className="text-[#0E4B3A] hover:underline">View Photo</a>
                      </div>
                    )}
                    <input type="file" name="imageFile" accept="image/*" className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 text-sm focus:outline-none focus:border-[#0E4B3A]" />
                  </div>
                </div>
                <div className="flex gap-3 mt-6 pt-5 border-t border-gray-100">
                  <button type="button" onClick={closeModal} className="flex-1 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-600 text-sm font-medium hover:bg-gray-100 transition-colors">Cancel</button>
                  <button type="submit" disabled={isPending} className={`flex-[2] py-2.5 bg-[#0E4B3A] text-white rounded-xl text-sm font-semibold transition-all ${isPending ? "opacity-70 cursor-not-allowed" : "hover:bg-[#093025]"}`}>
                    {isPending ? "Saving..." : modal === "create" ? "Add Review" : "Save Changes"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirm */}
      {deleteId && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <div className="bg-white border border-red-200 rounded-2xl p-6 sm:p-8 max-w-sm w-full text-center shadow-2xl">
            <div className="w-14 h-14 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-4"><Trash2 size={24} className="text-red-600" /></div>
            <h3 className="text-gray-900 text-lg font-bold mb-2">Delete Review?</h3>
            <p className="text-gray-500 text-sm mb-6 leading-relaxed">This testimonial will be removed from the website.</p>
            <div className="flex gap-3">
              <button onClick={() => setDeleteId(null)} className="flex-1 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-600 text-sm font-medium hover:bg-gray-100 transition-colors">Cancel</button>
              <button onClick={() => handleDelete(deleteId)} disabled={isPending} className={`flex-1 py-2.5 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm font-semibold transition-colors ${isPending ? "opacity-70 cursor-not-allowed" : "hover:bg-red-100"}`}>{isPending ? "..." : "Delete"}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
