"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { LogIn, LogOut, User as UserIcon } from "lucide-react";
import { useRouter } from "next/navigation";

interface User {
  name: string;
  email: string;
}

export default function Navbar() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const savedUser = localStorage.getItem("user");

    if (token && savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setUser(null);

    router.push("/");
    router.refresh();
  };

  return (
    <nav className="border-b border-slate-800 bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link
          href="/"
          className="text-xl font-bold text-emerald-400"
        >
          NetaMaker AI
        </Link>

        <div className="flex items-center gap-3">
          {user ? (
            <>
              <span className="flex items-center gap-2 text-sm text-slate-300">
                <UserIcon className="w-4 h-4 text-emerald-400" />
                {user.name}
              </span>

              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-red-600 hover:bg-red-500 text-white text-sm font-medium transition"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-white text-sm font-medium transition"
              >
                <LogIn className="w-4 h-4" />
                Sign In
              </Link>

              <Link
                href="/register"
                className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-medium transition"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}