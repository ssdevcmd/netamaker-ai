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