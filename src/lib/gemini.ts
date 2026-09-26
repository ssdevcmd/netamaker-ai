// import { GoogleGenAI } from "@google/genai";

// const ai = new GoogleGenAI({ apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY || "" });

// export interface AIThemeResponse {
//   themeGradient: string;
//   borderColor: string;
//   bannerColor: string;
//   refinedHeadline: string;
// }

// export async function generateAIPosterTheme(
//   occasion: string,
//   userHeadline: string
// ): Promise<AIThemeResponse | null> {
//   const prompt = `You are a professional graphic designer for Bangladeshi political posters.
//   Given the occasion: "${occasion}" and initial headline: "${userHeadline}".

//   Suggest design parameters matching typical Bangladeshi political poster aesthetics:
//   1. themeGradient: Tailwind gradient classes for background (e.g. "from-emerald-950 via-slate-900 to-red-950" for Victory Day, "from-slate-950 via-gray-900 to-zinc-900" for Condolence, "from-amber-950 via-slate-900 to-emerald-950" for Eid).
//   2. borderColor: Tailwind border color class (e.g. "border-amber-500/60", "border-emerald-500/60", "border-slate-500/60").
//   3. bannerColor: Tailwind background class for footer banner (e.g. "from-red-800 to-emerald-800", "from-slate-800 to-zinc-900").
//   4. refinedHeadline: Polish the given headline into high-impact, inspiring political Bangla text.

//   Respond ONLY with a valid JSON object with keys: "themeGradient", "borderColor", "bannerColor", "refinedHeadline". Do NOT use markdown codeblock wrappers.`;

//   try {
//     const response = await ai.models.generateContent({
//       model: "gemini-3.8-flash",
//       contents: prompt,
//     });

//     const rawText = response.text?.trim() || "";
//     const cleanJson = rawText.replace(/```json/g, "").replace(/```/g, "").trim();
//     return JSON.parse(cleanJson) as AIThemeResponse;
//   } catch (error) {
//     console.error("Gemini AI Dynamic Theme Error:", error);
//     return null;
//   }
// }


// src/lib/gemini.ts

export interface AIThemeResponse {
  themeGradient: string;
  borderColor: string;
  bannerColor: string;
  refinedHeadline: string;
}

export async function generateAIPosterTheme(
  occasion: string,
  userHeadline: string
): Promise<AIThemeResponse | null> {
  try {
    const response = await fetch("/api/generate-theme", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ occasion, headline: userHeadline }),
    });

    if (!response.ok) {
      throw new Error("Failed to fetch theme from API route");
    }

    const data: AIThemeResponse = await response.json();
    return data;
  } catch (error) {
    console.error("Gemini AI Dynamic Theme Error:", error);
    return null;
  }
}