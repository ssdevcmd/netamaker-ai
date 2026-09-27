"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { 
  Sparkles, 
  Trash2, 
  Edit3, 
  PlusCircle, 
  User as UserIcon, 
  LogOut, 
  Clock, 
  Maximize2 
} from "lucide-react";

import { posterService } from "@/services/posterService";
import { PosterData } from "@/types/poster";
import { EditPosterModal } from "@/components/poster/EditPosterModal";
import { DeleteConfirmModal } from "@/components/poster/DeleteConfirmModal";

export default function HistoryPage() {
  const router = useRouter();
  const [posters, setPosters] = useState<PosterData[]>([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);

  // Modal States
  const [selectedPoster, setSelectedPoster] = useState<PosterData | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  // Fetch Posters & Auth User
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (e) {
        console.error("Auth parsing error:", e);
      }
    }

    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    setLoading(true);
    try {
      const data = await posterService.getHistory();
      setPosters(data || []);
    } catch (err) {
      console.error("Failed to fetch history:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    router.push("/login");
  };

  // Open Edit Modal
  const handleOpenEditModal = (poster: PosterData) => {
    setSelectedPoster(poster);
    setIsEditModalOpen(true);
  };

  // Quick Save from Modal
  const handleSaveModal = async (updatedPoster: PosterData) => {
    const posterId = (updatedPoster._id || updatedPoster.id) as string;
    if (!posterId) return;

    try {
      await posterService.updatePoster(posterId, updatedPoster);
      setPosters((prev) =>
        prev.map((item) => ((item._id || item.id) === posterId ? updatedPoster : item))
      );
      setIsEditModalOpen(false);
      setSelectedPoster(null);
    } catch (error) {
      console.error("Failed to update poster:", error);
      alert("পোস্টার আপডেট করতে ব্যর্থ হয়েছে");
    }
  };

  // Full Editor Redirect
  const handleFullEdit = (poster: PosterData) => {
    localStorage.setItem("edit_poster", JSON.stringify(poster));
    router.push("/dashboard/create");
  };

  // Open Delete Confirm Modal
  const handleOpenDeleteModal = (id: string) => {
    setDeletingId(id);
    setIsDeleteModalOpen(true);
  };

  // Confirm Delete
  const handleConfirmDelete = async () => {
    if (!deletingId) return;

    try {
      await posterService.deletePoster(deletingId);
      setPosters((prev) => prev.filter((item) => (item._id || item.id) !== deletingId));
      setIsDeleteModalOpen(false);
      setDeletingId(null);
    } catch (error) {
      console.error("Failed to delete poster:", error);
      alert("পোস্টার মুছে ফেলতে ব্যর্থ হয়েছে");
    }
  };

  return (
    <main className="min-h-screen bg-slate-950 text-white p-4 md:p-8">
      {/* Header */}
      <header className="border-b border-slate-800 pb-4 mb-8 flex justify-between items-center max-w-7xl mx-auto">
        <Link href="/" className="text-xl font-bold bg-gradient-to-r from-emerald-400 to-teal-500 bg-clip-text text-transparent">
          AI Political Poster Maker
        </Link>

        <div className="flex items-center gap-4">
          <Link
            href="/dashboard/create"
            className="bg-emerald-600 hover:bg-emerald-500 text-white px-3.5 py-1.5 rounded-lg text-sm font-medium transition flex items-center gap-1.5 shadow-md"
          >
            <PlusCircle className="w-4 h-4" /> নতুন পোস্টার
          </Link>

          {user && (
            <div className="flex items-center gap-3 border-l border-slate-800 pl-4">
              <span className="text-sm text-slate-300 flex items-center gap-1.5">
                <UserIcon className="w-4 h-4 text-emerald-400" /> {user.name}
              </span>
              <button
                onClick={handleLogout}
                className="bg-slate-800 hover:bg-slate-700 text-slate-300 p-2 rounded-lg transition"
                title="Logout"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </header>

      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <Clock className="w-6 h-6 text-emerald-400" /> আপনার সেভ করা পোস্টারসমূহ
          </h1>
          <span className="text-sm text-slate-400">মোট: {posters.length} টি</span>
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-64 bg-slate-900 border border-slate-800 rounded-2xl animate-pulse" />
            ))}
          </div>
        ) : posters.length === 0 ? (
          /* Empty State */
          <div className="text-center py-16 bg-slate-900/50 border border-slate-800 rounded-2xl space-y-4">
            <Sparkles className="w-12 h-12 text-slate-600 mx-auto" />
            <p className="text-slate-400">এখনো কোনো পোস্টার সেভ করা হয়নি</p>
            <Link
              href="/dashboard/create"
              className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-2 rounded-xl text-sm font-medium transition"
            >
              <PlusCircle className="w-4 h-4" /> প্রথম পোস্টার তৈরি করুন
            </Link>
          </div>
        ) : (
          /* Posters Grid */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posters.map((poster) => {
              const posterId = (poster._id || poster.id) as string;

              return (
                <div
                  key={posterId}
                  className="bg-slate-900 border border-slate-800 rounded-2xl p-5 hover:border-slate-700 transition space-y-4 flex flex-col justify-between shadow-lg"
                >
                  <div className="space-y-2">
                    <div className="flex justify-between items-start">
                      <span className="bg-emerald-950 text-emerald-400 text-[11px] font-semibold px-2.5 py-1 rounded-full border border-emerald-800/50">
                        {poster.occasion}
                      </span>
                    </div>

                    <h3 className="font-bold text-lg text-white line-clamp-1">{poster.headline}</h3>
                    <p className="text-sm text-slate-300">{poster.name}</p>
                    <p className="text-xs text-slate-400">{poster.designation} • {poster.party}</p>
                    <p className="text-xs text-slate-500">{poster.location}</p>
                  </div>

                  {/* Actions Bar */}
                  <div className="pt-3 border-t border-slate-800 flex items-center justify-between gap-2">
                    <div className="flex items-center gap-1.5">
                      {/* Quick Edit Modal */}
                      <button
                        onClick={() => handleOpenEditModal(poster)}
                        className="bg-slate-800 hover:bg-slate-700 text-slate-200 px-3 py-1.5 rounded-lg text-xs font-medium transition flex items-center gap-1 border border-slate-700"
                        title="Quick Edit Text"
                      >
                        <Edit3 className="w-3.5 h-3.5 text-emerald-400" /> কুইক এডিট
                      </button>

                      {/* Full Canvas Editor */}
                      <button
                        onClick={() => handleFullEdit(poster)}
                        className="bg-slate-800 hover:bg-slate-700 text-slate-200 p-1.5 rounded-lg text-xs font-medium transition border border-slate-700"
                        title="Full Canvas Editor"
                      >
                        <Maximize2 className="w-3.5 h-3.5 text-amber-400" />
                      </button>
                    </div>

                    {/* Delete Button */}
                    <button
                      onClick={() => handleOpenDeleteModal(posterId)}
                      className="bg-red-950/40 hover:bg-red-900/60 text-red-400 p-1.5 rounded-lg text-xs transition border border-red-900/40"
                      title="Delete Poster"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Quick Edit Modal */}
      {selectedPoster && (
        <EditPosterModal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          poster={selectedPoster}
          onSave={handleSaveModal}
          onFullEdit={() => handleFullEdit(selectedPoster)}
        />
      )}

      {/* Delete Confirmation Modal */}
      <DeleteConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
      />
    </main>
  );
}