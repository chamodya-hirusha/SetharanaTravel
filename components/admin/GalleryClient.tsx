"use client";

import { useState, useTransition } from "react";
import { GalleryItem } from "@/types";
import { createGalleryItem, updateGalleryItem, deleteGalleryItem } from "@/app/admin/actions/gallery";
import { Plus, Pencil, Trash2, X, Image } from "lucide-react";

interface GalleryClientProps { initialItems: GalleryItem[]; }
type ModalMode = "create" | "edit" | null;

const emptyForm = { id: "", url: "", caption: "", category: "nature" as GalleryItem["category"] };
const categories: GalleryItem["category"][] = ["pilgrimage", "nature", "heritage", "adventure"];

const categoryStyles: Record<string, { color: string; bg: string; border: string }> = {
  pilgrimage: { color: "text-purple-600", bg: "bg-purple-50", border: "border-purple-200" },
  nature:     { color: "text-[#0E4B3A]", bg: "bg-green-50", border: "border-green-200" },
  heritage:   { color: "text-amber-600", bg: "bg-amber-50", border: "border-amber-200" },
  adventure:  { color: "text-red-600", bg: "bg-red-50", border: "border-red-200" },
};

export default function GalleryClient({ initialItems }: GalleryClientProps) {
  const [items, setItems] = useState(initialItems);
  const [modal, setModal] = useState<ModalMode>(null);
  const [form, setForm] = useState(emptyForm);
  const [isPending, startTransition] = useTransition();
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [filterCat, setFilterCat] = useState<string>("all");

  function openCreate() { setForm(emptyForm); setModal("create"); }
  function openEdit(item: GalleryItem) {
    setForm({ id: item.id, url: item.url, caption: item.caption, category: item.category });
    setModal("edit");
  }
  function closeModal() { setModal(null); setForm(emptyForm); }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    startTransition(async () => {
      if (modal === "create") { await createGalleryItem(fd); }
      else { fd.append("id", form.id); await updateGalleryItem(fd); }
      window.location.reload();
    });
  }

  async function handleDelete(id: string) {
    startTransition(async () => {
      await deleteGalleryItem(id);
      setItems((prev) => prev.filter((i) => i.id !== id));
      setDeleteId(null);
    });
  }

  const filtered = filterCat === "all" ? items : items.filter((i) => i.category === filterCat);

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-5">
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900 mb-1">Gallery</h1>
          <p className="text-gray-500 text-sm">{items.length} photos total</p>
        </div>
        <button 
          onClick={openCreate} 
          className="flex items-center justify-center gap-2 px-5 py-2.5 bg-[#0E4B3A] text-white text-sm font-semibold rounded-xl hover:bg-[#093025] transition-colors w-full sm:w-auto"
        >
          <Plus size={16} /> Add Photo
        </button>
      </div>

      {/* Filter pills */}
      <div className="flex gap-2 mb-6 flex-wrap overflow-x-auto pb-1 scrollbar-hide">
        {["all", ...categories].map((cat) => {
          const s = cat !== "all" ? categoryStyles[cat] : null;
          return (
            <button 
              key={cat} 
              onClick={() => setFilterCat(cat)} 
              className={`px-4 py-1.5 rounded-full text-[13px] font-medium transition-all capitalize whitespace-nowrap border ${
                filterCat === cat 
                  ? (s ? `${s.bg} ${s.border} ${s.color} font-bold` : "bg-[#0E4B3A] border-[#0E4B3A] text-white") 
                  : "bg-white border-gray-200 text-gray-500 hover:bg-gray-50"
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filtered.map((item) => {
          const s = categoryStyles[item.category];
          return (
            <div key={item.id} className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm flex flex-col">
              <div className="h-[170px] bg-gray-100 relative overflow-hidden shrink-0">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={item.url} alt={item.caption} className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = "none";
                    const sib = (e.target as HTMLImageElement).nextElementSibling as HTMLElement | null;
                    if (sib) sib.style.display = "flex";
                  }}
                />
                <div className="hidden flex-col items-center justify-center gap-1.5 text-gray-400 absolute inset-0 bg-gray-100">
                  <Image size={28} /><span className="text-xs">No preview</span>
                </div>
              </div>
              <div className="p-4 flex flex-col flex-1">
                <div>
                  <span className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-bold capitalize mb-2 tracking-wider border ${s.bg} ${s.border} ${s.color}`}>
                    {item.category}
                  </span>
                </div>
                <p className="text-gray-900 text-[13px] font-semibold leading-snug mb-1">{item.caption}</p>
                <p className="text-gray-400 text-[11px] mb-3 break-all line-clamp-1">{item.url}</p>
                
                <div className="flex gap-2 mt-auto pt-3 border-t border-gray-100">
                  <button onClick={() => openEdit(item)} className="flex-1 flex items-center justify-center gap-1.5 py-2 bg-green-50 border border-green-200 rounded-xl text-[#0E4B3A] text-[13px] font-medium hover:bg-green-100 transition-colors">
                    <Pencil size={13} /> Edit
                  </button>
                  <button onClick={() => setDeleteId(item.id)} className="flex-1 flex items-center justify-center gap-1.5 py-2 bg-red-50 border border-red-200 rounded-xl text-red-600 text-[13px] font-medium hover:bg-red-100 transition-colors">
                    <Trash2 size={13} /> Delete
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal */}
      {modal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[100] flex items-center justify-center p-4 sm:p-6" onClick={(e) => e.target === e.currentTarget && closeModal()}>
          <div className="w-full max-w-md bg-white border border-gray-200 rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
            <div className="px-5 py-4 sm:px-7 sm:py-5 border-b border-gray-100 flex justify-between items-center bg-white shrink-0">
              <h2 className="text-gray-900 text-lg font-bold">{modal === "create" ? "Add Gallery Photo" : "Edit Photo"}</h2>
              <button onClick={closeModal} className="p-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-gray-500 transition-colors"><X size={18} /></button>
            </div>
            <form onSubmit={handleSubmit} className="p-5 sm:p-7 overflow-y-auto">
              <div className="flex flex-col gap-4">
                <div>
                  <label className="block text-gray-700 text-xs font-bold mb-1.5 tracking-wide">Image Upload {modal === "create" ? "*" : ""}</label>
                  {modal === "edit" && form.url && (
                    <div className="mb-2 text-[13px] text-gray-500">
                      Current Image: <a href={form.url} target="_blank" rel="noreferrer" className="text-[#0E4B3A] hover:underline">View Image</a>
                    </div>
                  )}
                  <input type="file" name="imageFile" accept="image/*" required={modal === "create"} className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 text-sm focus:outline-none focus:border-[#0E4B3A]" />
                </div>
                <div>
                  <label className="block text-gray-700 text-xs font-bold mb-1.5 tracking-wide">Caption *</label>
                  <input name="caption" required value={form.caption} onChange={(e) => setForm({ ...form, caption: e.target.value })} className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 text-sm focus:outline-none focus:border-[#0E4B3A] focus:ring-1 focus:ring-[#0E4B3A]" placeholder="Describe the photo" />
                </div>
                <div>
                  <label className="block text-gray-700 text-xs font-bold mb-1.5 tracking-wide">Category *</label>
                  <select name="category" required value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value as GalleryItem["category"] })} className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 text-sm focus:outline-none focus:border-[#0E4B3A] focus:ring-1 focus:ring-[#0E4B3A] cursor-pointer">
                    {categories.map((c) => <option key={c} value={c}>{c.charAt(0).toUpperCase() + c.slice(1)}</option>)}
                  </select>
                </div>
              </div>
              <div className="flex gap-3 mt-6 pt-5 border-t border-gray-100">
                <button type="button" onClick={closeModal} className="flex-1 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-600 text-sm font-medium hover:bg-gray-100 transition-colors">Cancel</button>
                <button type="submit" disabled={isPending} className={`flex-[2] py-2.5 bg-[#0E4B3A] text-white rounded-xl text-sm font-semibold transition-all ${isPending ? "opacity-70 cursor-not-allowed" : "hover:bg-[#093025]"}`}>
                  {isPending ? "Saving..." : modal === "create" ? "Add Photo" : "Save Changes"}
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
            <div className="w-14 h-14 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-4"><Trash2 size={24} className="text-red-600" /></div>
            <h3 className="text-gray-900 text-lg font-bold mb-2">Delete Photo?</h3>
            <p className="text-gray-500 text-sm mb-6 leading-relaxed">This will remove the photo from the gallery permanently.</p>
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
