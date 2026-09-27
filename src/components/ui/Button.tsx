import React from "react";
import { Loader2 } from "lucide-react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
  variant?: "primary" | "secondary" | "outline" | "danger";
}

export const Button: React.FC<ButtonProps> = ({
  children,
  loading = false,
  variant = "primary",
  className = "",
  disabled,
  ...props
}) => {
  const baseStyle = "px-4 py-2.5 rounded-xl font-medium transition duration-200 flex items-center justify-center gap-2 text-sm disabled:opacity-50";
  
  const variants = {
    primary: "bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-950/20",
    secondary: "bg-amber-500 hover:bg-amber-400 text-slate-950 font-semibold",
    outline: "border border-slate-700 bg-slate-800/50 hover:bg-slate-800 text-slate-200",
    danger: "bg-red-600 hover:bg-red-500 text-white",
  };

  return (
    <button
      disabled={disabled || loading}
      className={`${baseStyle} ${variants[variant]} ${className}`}
      {...props}
    >
      {loading && <Loader2 className="w-4 h-4 animate-spin" />}
      {children}
    </button>
  );
};