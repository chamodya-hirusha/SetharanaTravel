"use client";

import { useState, useTransition } from "react";
import { FAQItem } from "@/types";
import { createFaq, updateFaq, deleteFaq } from "@/app/admin/actions/faqs";
import { Plus, Pencil, Trash2, X, HelpCircle } from "lucide-react";

interface FaqsClientProps {
  initialFaqs: FAQItem[];
}

type ModalMode = "create" | "edit" | null;

const emptyForm = {
  id: "",
  question: "",
  answer: "",
};

export default function FaqsClient({ initialFaqs }: FaqsClientProps) {
  const [faqs, setFaqs] = useState(initialFaqs);
  const [modal, setModal] = useState<ModalMode>(null);
  const [form, setForm] = useState(emptyForm);
  const [isPending, startTransition] = useTransition();
  const [deleteId, setDeleteId] = useState<string | null>(null);

  function openCreate() { setForm(emptyForm); setModal("create"); }
  function openEdit(faq: FAQItem) {
    setForm({
      id: faq.id,
      question: faq.question,
      answer: faq.answer,
    });
    setModal("edit");
  }
  function closeModal() { setModal(null); setForm(emptyForm); }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    startTransition(async () => {
      if (modal === "create") { await createFaq(fd); }
      else { fd.append("id", form.id); await updateFaq(fd); }
      window.location.reload();
    });
  }

  async function handleDelete(id: string) {
    startTransition(async () => {
      await deleteFaq(id);
      setFaqs((prev) => prev.filter((f) => f.id !== id));
      setDeleteId(null);
    });
  }

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900 mb-1">Manage FAQs</h1>
          <p className="text-gray-500 text-sm">{faqs.length} questions total</p>
        </div>
        <button 
          onClick={openCreate} 
          className="flex items-center justify-center gap-2 px-5 py-2.5 bg-[#0E4B3A] text-white text-sm font-semibold rounded-xl hover:bg-[#093025] transition-colors w-full sm:w-auto"
        >
          <Plus size={16} /> Add FAQ
        </button>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 gap-4">
        {faqs.map((faq) => (
          <div key={faq.id} className="bg-white border border-gray-200 rounded-2xl p-5 sm:p-6 shadow-sm">
            <h3 className="text-gray-900 text-base font-bold mb-2 flex items-start sm:items-center gap-2.5 leading-snug">
              <HelpCircle size={18} className="text-[#0E4B3A] shrink-0 mt-0.5 sm:mt-0" /> 
              <span>{faq.question}</span>
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed mb-4 pl-[28px]">
              {faq.answer}
            </p>
            <div className="flex flex-col sm:flex-row gap-2 pt-4 border-t border-gray-100 sm:pl-[28px]">
              <button onClick={() => openEdit(faq)} className="flex items-center justify-center sm:justify-start gap-1.5 px-4 py-2 bg-green-50 border border-green-200 rounded-xl text-[#0E4B3A] text-[13px] font-medium hover:bg-green-100 transition-colors w-full sm:w-auto">
                <Pencil size={13} /> Edit
              </button>
              <button onClick={() => setDeleteId(faq.id)} className="flex items-center justify-center sm:justify-start gap-1.5 px-4 py-2 bg-red-50 border border-red-200 rounded-xl text-red-600 text-[13px] font-medium hover:bg-red-100 transition-colors w-full sm:w-auto">
                <Trash2 size={13} /> Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Create/Edit Modal */}
      {modal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[100] flex items-center justify-center p-4 sm:p-6" onClick={(e) => e.target === e.currentTarget && closeModal()}>
          <div className="w-full max-w-lg bg-white border border-gray-200 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
            <div className="px-5 py-4 sm:px-7 sm:py-5 border-b border-gray-100 flex justify-between items-center bg-white shrink-0">
              <h2 className="text-gray-900 text-lg font-bold">
                {modal === "create" ? "Add New FAQ" : "Edit FAQ"}
              </h2>
              <button onClick={closeModal} className="p-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-gray-500 transition-colors">
                <X size={18} />
              </button>
            </div>
            <div className="overflow-y-auto">
              <form onSubmit={handleSubmit} className="p-5 sm:p-7">
                <div className="flex flex-col gap-4">
                  <div>
                    <label className="block text-gray-700 text-xs font-bold mb-1.5 tracking-wide">Question *</label>
                    <input name="question" required value={form.question} onChange={(e) => setForm({ ...form, question: e.target.value })} className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 text-sm focus:outline-none focus:border-[#0E4B3A] focus:ring-1 focus:ring-[#0E4B3A]" placeholder="e.g. How to book a tour?" />
                  </div>
                  <div>
                    <label className="block text-gray-700 text-xs font-bold mb-1.5 tracking-wide">Answer *</label>
                    <textarea name="answer" required value={form.answer} onChange={(e) => setForm({ ...form, answer: e.target.value })} rows={5} className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 text-sm focus:outline-none focus:border-[#0E4B3A] focus:ring-1 focus:ring-[#0E4B3A] resize-y" placeholder="Type the answer here..." />
                  </div>
                </div>
                <div className="flex gap-3 mt-6 pt-5 border-t border-gray-100">
                  <button type="button" onClick={closeModal} className="flex-1 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-600 text-sm font-medium hover:bg-gray-100 transition-colors">Cancel</button>
                  <button type="submit" disabled={isPending} className={`flex-[2] py-2.5 bg-[#0E4B3A] text-white rounded-xl text-sm font-semibold transition-all ${isPending ? "opacity-70 cursor-not-allowed" : "hover:bg-[#093025]"}`}>
                    {isPending ? "Saving..." : modal === "create" ? "Create FAQ" : "Save Changes"}
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
            <div className="w-14 h-14 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-4">
              <Trash2 size={24} className="text-red-600" />
            </div>
            <h3 className="text-gray-900 text-lg font-bold mb-2">Delete FAQ?</h3>
            <p className="text-gray-500 text-sm mb-6 leading-relaxed">This action cannot be undone. The question will be removed.</p>
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
