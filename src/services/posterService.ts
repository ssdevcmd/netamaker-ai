// src/services/posterService.ts
import { PosterData } from "@/types/poster";

// Ensure URL always points to /api endpoint correctly
const getBaseUrl = () => {
  let envUrl = process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:5000/api";
  
  // Remove trailing slash if present
  if (envUrl.endsWith("/")) {
    envUrl = envUrl.slice(0, -1);
  }

  // If /api is missing at the end, append it
  if (!envUrl.endsWith("/api")) {
    envUrl = `${envUrl}/api`;
  }

  return envUrl;
};

const LOCAL_STORAGE_KEY = "saved_posters_history";

const getAuthHeaders = () => {
  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
  return {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
};

export const posterService = {
  // 1. Fetch saved poster history
  async getHistory(): Promise<PosterData[]> {
    try {
      const response = await fetch(`${getBaseUrl()}/posters/my-posters`, {
        method: "GET",
        headers: getAuthHeaders(),
      });

      if (!response.ok) {
        throw new Error(`Status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.warn("Backend API request failed. Loading from LocalStorage fallback:", error);

      if (typeof window !== "undefined") {
        const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
        return saved ? JSON.parse(saved) : [];
      }
      return [];
    }
  },

  // 2. Save new poster
  async savePoster(posterData: PosterData): Promise<PosterData> {
    try {
      const response = await fetch(`${getBaseUrl()}/posters/save`, {
        method: "POST",
        headers: getAuthHeaders(),
        body: JSON.stringify(posterData),
      });

      if (response.ok) {
        return await response.json();
      }
    } catch (error) {
      console.warn("Backend API unavailable. Saving to LocalStorage fallback:", error);
    }

    if (typeof window !== "undefined") {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      const currentHistory: PosterData[] = saved ? JSON.parse(saved) : [];
      const newPoster = { ...posterData, _id: posterData._id || Date.now().toString() };
      const updated = [newPoster, ...currentHistory];
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated));
      return newPoster;
    }
    return posterData;
  },

  // 3. Update existing poster
  async updatePoster(id: string, posterData: PosterData): Promise<PosterData> {
    try {
      const response = await fetch(`${getBaseUrl()}/posters/${id}`, {
        method: "PUT",
        headers: getAuthHeaders(),
        body: JSON.stringify(posterData),
      });

      if (response.ok) {
        return await response.json();
      }
    } catch (error) {
      console.warn("Backend API unavailable. Updating in LocalStorage fallback:", error);
    }

    if (typeof window !== "undefined") {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      const currentHistory: PosterData[] = saved ? JSON.parse(saved) : [];
      const updated = currentHistory.map((item) =>
        ((item._id || item.id) === id ? { ...item, ...posterData } : item)
      );
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated));
    }
    return posterData;
  },

  // 4. Delete poster
  async deletePoster(id: string): Promise<boolean> {
    try {
      const response = await fetch(`${getBaseUrl()}/posters/${id}`, {
        method: "DELETE",
        headers: getAuthHeaders(),
      });

      if (response.ok) {
        return true;
      }
    } catch (error) {
      console.warn("Backend API unavailable. Deleting from LocalStorage fallback:", error);
    }

    if (typeof window !== "undefined") {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      const currentHistory: PosterData[] = saved ? JSON.parse(saved) : [];
      const updated = currentHistory.filter((item) => (item._id || item.id) !== id);
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated));
    }
    return true;
  },
};