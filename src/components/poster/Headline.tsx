import React from "react";

interface HeadlineProps {
  text: string;
  occasion: string;
}

export const Headline: React.FC<HeadlineProps> = ({ text, occasion }) => {
  return (
    <div className="text-center my-4 space-y-1">
      <span className="text-xs md:text-sm font-semibold tracking-wide text-amber-300 uppercase bg-amber-950/60 border border-amber-500/30 px-3 py-0.5 rounded-full inline-block">
        {occasion}
      </span>
      <h1 className="text-2xl md:text-4xl font-extrabold text-white leading-tight drop-shadow-md">
        {text}
      </h1>
    </div>
  );
};