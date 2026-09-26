import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { occasion, headline } = await req.json();
    const apiKey = process.env.GEMINI_API_KEY || process.env.NEXT_PUBLIC_GEMINI_API_KEY;

    if (!apiKey) {
      throw new Error("API Key missing");
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    
    // gemini-1.5-flash মডেল ব্যবহার
    const model = genAI.getGenerativeModel({
      model: "gemini-3.8-flash",
    });

    const prompt = `You are an expert Bangladeshi political poster designer.
The user selected the Occasion: "${occasion}" and Headline: "${headline}".

Generate dynamic design attributes and a polished Bangla headline strictly matching the occasion "${occasion}".

Return ONLY a raw valid JSON object without markdown formatting or codeblocks:
{
  "themeGradient": "Tailwind background gradient string (e.g., for victory day 'from-emerald-950 via-slate-900 to-red-950', for condolence 'from-slate-950 via-slate-900 to-zinc-950', for election 'from-slate-900 via-emerald-950 to-slate-900')",
  "borderColor": "Tailwind border color string (e.g., 'border-amber-500/60' or 'border-slate-500/60')",
  "bannerColor": "Tailwind footer banner gradient string (e.g., 'from-red-800 to-emerald-800')",
  "refinedHeadline": "Write a high-impact political Bangla headline relevant to ${occasion}"
}`;

    const result = await model.generateContent(prompt);
    const text = result.response.text();

    // Clean markdown code blocks if present
    const cleanJson = text.replace(/```json/g, "").replace(/```/g, "").trim();
    const data = JSON.parse(cleanJson);

    return NextResponse.json(data);
  } catch (error: any) {
    console.error("Gemini API Error:", error?.message || error);

    // Dynamic Fallback based on selected Occasion if API fails
    const reqBody = await req.clone().json().catch(() => ({}));
    const selectedOccasion = reqBody.occasion || "সাধারণ";

    let fallbackHeadline = `${selectedOccasion} উপলক্ষে আন্তরিক শুভেচ্ছা ও মোবারকবাদ`;
    let fallbackGradient = "from-emerald-950 via-slate-900 to-red-950";

    if (selectedOccasion.includes("শোক") || selectedOccasion.includes("শ্রদ্ধাঞ্জলি")) {
      fallbackHeadline = "বিনম্র শ্রদ্ধা ও গভীর শোক প্রকাশ করছি";
      fallbackGradient = "from-slate-950 via-slate-900 to-zinc-950";
    } else if (selectedOccasion.includes("নির্বাচন")) {
      fallbackHeadline = "আসন্ন নির্বাচনে আপনার মূল্যবান ভোট ও দোয়া প্রার্থী";
      fallbackGradient = "from-slate-900 via-emerald-950 to-slate-900";
    }

    return NextResponse.json({
      themeGradient: fallbackGradient,
      borderColor: "border-amber-500/60",
      bannerColor: "from-red-800 to-emerald-800",
      refinedHeadline: fallbackHeadline,
    });
  }
}