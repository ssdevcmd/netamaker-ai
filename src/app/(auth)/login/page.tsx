"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Mail, Lock, Loader2, ArrowLeft, LogIn } from "lucide-react";

export default function LoginPage() {
    const router = useRouter();
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/auth/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            const data = await res.json();

            if (!res.ok) {
                // 2. data.error এবং data.message দুটোই চেক করুন
                throw new Error(data.error || data.message || "লগইন সফল হয়নি");
            }

            // Save user session
            localStorage.setItem("token", data.token);
            localStorage.setItem("user", JSON.stringify(data.user));

            // Redirect to Dashboard Create Page
            router.push("/dashboard/create");
        } catch (err: any) {
            setError(err.message || "কোথাও ভুল হয়েছে, আবার চেষ্টা করুন।");
        } finally {
            setLoading(false);
        }
    };


    return (
        <main className="min-h-screen bg-slate-950 text-white flex items-center justify-center p-4">
            <div className="w-full max-w-md bg-slate-900 border border-slate-800 p-8 rounded-2xl shadow-2xl space-y-6">

                {/* Top Back Navigation */}
                <Link
                    href="/dashboard/create"
                    className="inline-flex items-center gap-2 text-xs text-slate-400 hover:text-emerald-400 transition"
                >
                    <ArrowLeft className="w-4 h-4" /> ব্যাক টু ড্যাশবোর্ড
                </Link>

                {/* Header */}
                <div>
                    <h1 className="text-2xl font-bold bg-gradient-to-r from-emerald-400 to-teal-500 bg-clip-text text-transparent">
                        স্বাগতম!
                    </h1>
                    <p className="text-sm text-slate-400 mt-1">
                        আপনার অ্যাকাউন্টে লগইন করতে ইমেইল ও পাসওয়ার্ড দিন।
                    </p>
                </div>

                {/* Error Alert */}
                {error && (
                    <div className="bg-red-500/10 border border-red-500/50 text-red-400 text-xs p-3 rounded-lg">
                        {error}
                    </div>
                )}

                {/* Login Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-xs text-slate-400 mb-1">ইমেইল ঠিকানা</label>
                        <div className="relative">
                            <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                            <input
                                type="email"
                                required
                                placeholder="example@mail.com"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                className="w-full bg-slate-800 border border-slate-700 rounded-xl pl-9 pr-4 py-2.5 text-sm focus:outline-none focus:border-emerald-500 text-white"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-xs text-slate-400 mb-1">পাসওয়ার্ড</label>
                        <div className="relative">
                            <Lock className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                            <input
                                type="password"
                                required
                                placeholder="••••••••"
                                value={formData.password}
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                className="w-full bg-slate-800 border border-slate-700 rounded-xl pl-9 pr-4 py-2.5 text-sm focus:outline-none focus:border-emerald-500 text-white"
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-medium py-2.5 rounded-xl transition shadow-lg flex items-center justify-center gap-2 text-sm disabled:opacity-50"
                    >
                        {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <LogIn className="w-4 h-4" />}
                        {loading ? "প্রসেসিং..." : "লগইন করুন"}
                    </button>
                </form>

                {/* Footer Navigation */}
                <p className="text-xs text-center text-slate-400">
                    অ্যাকাউন্ট নেই?{" "}
                    <Link href="/register" className="text-emerald-400 font-semibold hover:underline">
                        নতুন রেজিস্টার করুন
                    </Link>
                </p>
            </div>
        </main>
    );
}