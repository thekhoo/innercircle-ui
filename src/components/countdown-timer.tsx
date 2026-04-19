"use client";

import { useEffect, useState } from "react";

// FIFA World Cup 2026 opening match: June 11, 2026
const WORLD_CUP_DATE = new Date("2026-06-11T21:00:00Z");

function getTimeRemaining() {
  const total = WORLD_CUP_DATE.getTime() - Date.now();
  if (total <= 0) return null;

  const seconds = Math.floor((total / 1000) % 60);
  const minutes = Math.floor((total / 1000 / 60) % 60);
  const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
  const days = Math.floor(total / (1000 * 60 * 60 * 24));

  return { days, hours, minutes, seconds };
}

function TimeUnit({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center gap-1">
      <span
        className="text-4xl md:text-5xl font-light tabular-nums"
        style={{ color: "var(--color-gold)" }}
      >
        {String(value).padStart(2, "0")}
      </span>
      <span className="text-xs tracking-widest uppercase text-stone-400">
        {label}
      </span>
    </div>
  );
}

export function CountdownTimer() {
  const [time, setTime] = useState(getTimeRemaining);

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(getTimeRemaining());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  if (!time) {
    return (
      <div className="text-center py-12">
        <p className="text-xs tracking-[0.4em] uppercase font-light text-stone-500">
          The World Cup has begun.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-6 py-12">
      <p className="text-xs tracking-[0.3em] uppercase text-stone-400">
        Until FIFA World Cup 2026
      </p>
      <div className="flex items-start gap-3 md:gap-8">
        <TimeUnit value={time.days} label="Days" />
        <span className="text-2xl md:text-3xl text-stone-300 mt-2 font-light">:</span>
        <TimeUnit value={time.hours} label="Hours" />
        <span className="text-2xl md:text-3xl text-stone-300 mt-2 font-light">:</span>
        <TimeUnit value={time.minutes} label="Mins" />
        <span className="text-2xl md:text-3xl text-stone-300 mt-2 font-light">:</span>
        <TimeUnit value={time.seconds} label="Secs" />
      </div>
    </div>
  );
}
