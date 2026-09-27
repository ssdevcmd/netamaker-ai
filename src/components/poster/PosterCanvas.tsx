"use client";

import React, { forwardRef } from "react";
import { PosterData } from "@/types/poster";
import { LeaderPhoto } from "./LeaderPhoto";
import { Headline } from "./Headline";

interface PosterCanvasProps {
  data: PosterData;
  canvasRef?: React.RefObject<HTMLDivElement | null>;
}

export const PosterCanvas = forwardRef<HTMLDivElement, PosterCanvasProps>(
  ({ data }, ref) => {
    return (
      <div
        ref={ref}
        id="poster-canvas"
        className={`relative w-full max-w-[450px] aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl border-4 ${
          data.borderColor || "border-amber-400"
        } bg-gradient-to-b ${
          data.themeGradient || "from-emerald-950 via-slate-900 to-slate-950"
        } text-white flex flex-col justify-between p-6 select-none`}
      >
        {/* 1. Flag Overlay Decoration */}
        <div className="absolute top-0 left-0 w-full h-36 opacity-25 pointer-events-none z-0 overflow-hidden">
          <img
            src="/decorations/flag-overlay.png"
            alt="Flag Overlay"
            className="w-full h-full object-cover"
          />
        </div>

        {/* 2. Floral Border Decoration (Top Corners) */}
        <div className="absolute top-2 left-2 w-14 h-14 opacity-50 pointer-events-none z-0">
          <img
            src="/decorations/floral.png"
            alt="Floral"
            className="w-full h-full object-contain"
          />
        </div>
        <div className="absolute top-2 right-2 w-14 h-14 opacity-50 pointer-events-none z-0 -scale-x-100">
          <img
            src="/decorations/floral.png"
            alt="Floral"
            className="w-full h-full object-contain"
          />
        </div>

        {/* 3. Leaders Section (Top) */}
        <div className="relative z-10 flex justify-between items-center px-2 pt-2">
          <LeaderPhoto
            src={data.leaderPhoto1 || undefined}
            alt="Leader 1"
            size="sm"
          />

          {/* Dove Icon in center for Condolence / Peace */}
          {data.occasion?.includes("শোক") && (
            <div className="w-12 h-12 rounded-full overflow-hidden flex items-center justify-center opacity-85 border border-white/20 shadow">
              <img
                src="/decorations/dove.jpg"
                alt="Dove"
                className="w-full h-full object-cover"
              />
            </div>
          )}

          <LeaderPhoto
            src={data.leaderPhoto2 || undefined}
            alt="Leader 2"
            size="sm"
          />
        </div>

        {/* 4. Main Headline */}
        <div className="relative z-10 my-auto text-center">
          <Headline text={data.headline} occasion={data.occasion || ""} />
        </div>

        {/* 5. Main Candidate / User Photo & Footer Banner */}
        <div className="relative z-10 flex flex-col items-center space-y-3">
          <div className="relative">
            <LeaderPhoto
              src={data.userPhoto || undefined}
              alt={data.name}
              size="lg"
            />
          </div>

          {/* Name and Designation Banner */}
          <div
            className={`w-full text-center py-3 px-4 rounded-xl border border-amber-400/40 shadow-lg ${
              data.bannerColor || "bg-emerald-900/90"
            }`}
          >
            <h2 className="text-xl font-bold text-amber-300 drop-shadow">
              {data.name}
            </h2>
            <p className="text-xs text-slate-200 font-medium mt-0.5">
              {data.designation}
            </p>
            {(data.party || data.location) && (
              <p className="text-[11px] text-slate-300 mt-0.5">
                {data.party} {data.location && `• ${data.location}`}
              </p>
            )}
          </div>
        </div>
      </div>
    );
  }
);

PosterCanvas.displayName = "PosterCanvas";