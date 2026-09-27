// src/components/LeaderPhoto.tsx
import React from "react";

interface LeaderPhotoProps {
  src?: string;
  alt: string;
  size?: "sm" | "md" | "lg";
}

export const LeaderPhoto: React.FC<LeaderPhotoProps> = ({ src, alt, size = "md" }) => {
  // সাইজ নির্ধারণ
  const sizeClasses = {
    sm: "w-20 h-20 border-2", // টপ লিডারদের ফটো সাইজ
    md: "w-24 h-24 border-2",
    lg: "w-32 h-32 border-4", // মেইন ক্যান্ডিডেট ফটো সাইজ
  };

  return (
    <div
      className={`relative ${sizeClasses[size]} border-amber-400 rounded-full overflow-hidden shadow-md bg-slate-800 flex items-center justify-center shrink-0`}
    >
      {src ? (
        <img
          src={src}
          alt={alt}
          className="w-full h-full object-cover object-top" // object-cover দিয়ে পুরো সার্কেল কভার হবে
        />
      ) : (
        // ছবি না থাকলে ডিফল্ট প্লেসহোল্ডার আইকন
        <svg
          className="w-1/2 h-1/2 text-slate-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M16 7a4 4 4 0 11-8 0 4 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
          />
        </svg>
      )}
    </div>
  );
};