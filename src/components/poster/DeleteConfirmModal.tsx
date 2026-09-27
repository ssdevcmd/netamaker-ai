"use client";

import React, { useState } from "react";
import { AlertTriangle, Trash2, Loader2 } from "lucide-react";

interface DeleteConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => Promise<void>;
}

export const DeleteConfirmModal: React.FC<DeleteConfirmModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
}) => {
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleConfirm = async () => {
    setLoading(true);
    try {
      await onConfirm();
      onClose();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-sm p-6 text-center space-y-4 shadow-2xl">
        <div className="w-12 h-12 bg-red-950/80 border border-red-500/30 text-red-500 rounded-full flex items-center justify-center mx-auto">
          <AlertTriangle className="w-6 h-6" />
        </div>

        <div className="space-y-1">
          <h3 className="text-base font-bold text-white">মুছে ফেলার তাগিদ</h3>
          <p className="text-xs text-slate-400">
            আপনি কি নিশ্চিত যে এই পোস্টারটি মুছে ফেলতে চান? এটি পুনরায় উদ্ধার করা যাবে না।
          </p>
        </div>

        <div className="flex justify-center gap-3 pt-2">
          <button
            onClick={onClose}
            className="w-1/2 py-2 rounded-xl text-xs font-medium bg-slate-800 text-slate-300 hover:text-white transition"
          >
            বাতিল
          </button>
          <button
            onClick={handleConfirm}
            disabled={loading}
            className="w-1/2 py-2 rounded-xl text-xs font-medium bg-red-600 hover:bg-red-500 text-white transition flex items-center justify-center gap-1.5 disabled:opacity-50"
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
            {loading ? "ডিলিট হচ্ছে..." : "মুছে ফেলুন"}
          </button>
        </div>
      </div>
    </div>
  );
};