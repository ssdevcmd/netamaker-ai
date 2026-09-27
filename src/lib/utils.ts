import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(dateString?: string) {
  if (!dateString) return "";
  return new Date(dateString).toLocaleDateString("bn-BD", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function generateFileName(userName: string, occasion: string) {
  const sanitized = userName.trim().replace(/\s+/g, "_");
  return `${sanitized}_${occasion}_poster.png`;
}