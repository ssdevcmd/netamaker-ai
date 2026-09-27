import React from "react";
import { Upload } from "lucide-react";

interface PhotoUploaderProps {
  label: string;
  onUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  previewUrl?: string | null;
}

export const PhotoUploader: React.FC<PhotoUploaderProps> = ({ label, onUpload, previewUrl }) => {
  return (
    <div className="space-y-1">
      <span className="text-[10px] text-slate-400 block truncate">{label}</span>
      <label className="flex flex-col items-center justify-center p-2 border border-dashed border-slate-700 rounded-xl cursor-pointer hover:border-emerald-500 bg-slate-950/50 relative overflow-hidden transition h-20">
        {previewUrl ? (
          <img src={previewUrl} alt="Preview" className="w-full h-full object-cover rounded-lg" />
        ) : (
          <>
            <Upload className="w-4 h-4 text-slate-400 mb-1" />
            <span className="text-[9px] text-slate-300">আপলোড করুন</span>
          </>
        )}
        <input type="file" accept="image/*" onChange={onUpload} className="hidden" />
      </label>
    </div>
  );
};