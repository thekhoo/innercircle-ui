"use client";

import { useEffect, useState } from "react";

type Stage = "black" | "fading" | "text" | "done";

interface WelcomeTransitionProps {
  onComplete: () => void;
}

export function WelcomeTransition({ onComplete }: WelcomeTransitionProps) {
  const [stage, setStage] = useState<Stage>("black");

  useEffect(() => {
    // Step 1: Start fading black → white immediately on mount
    const t1 = setTimeout(() => setStage("fading"), 50);

    // Step 2: Show text after the background has turned white (~1500ms)
    const t2 = setTimeout(() => setStage("text"), 1600);

    // Step 3: Begin fade-out after text has been held (~2000ms)
    const t3 = setTimeout(() => setStage("done"), 3800);

    // Step 4: Navigate away after fade-out completes (~1000ms)
    const t4 = setTimeout(() => onComplete(), 4800);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, [onComplete]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{
        backgroundColor: stage === "black" ? "#000000" : "#ffffff",
        transition: "background-color 1500ms ease-in-out",
      }}
    >
      <p
        className="text-xs md:text-sm tracking-[0.5em] font-light uppercase text-black/70"
        style={{
          opacity: stage === "text" ? 1 : 0,
          transition:
            stage === "done"
              ? "opacity 1000ms ease-in-out"
              : "opacity 800ms ease-in-out",
        }}
      >
        Welcome, to the inner circle.
      </p>
    </div>
  );
}
