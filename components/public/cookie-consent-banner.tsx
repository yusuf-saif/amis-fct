"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const STORAGE_KEY = "amis-fct-cookie-consent";

export function CookieConsentBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      setVisible(true);
    }
  }, []);

  if (!visible) {
    return null;
  }

  const handleChoice = (value: "accepted" | "declined") => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ value, savedAt: Date.now() }));
    setVisible(false);
  };

  return (
    <div aria-label="Cookie consent" aria-live="polite" className="fixed inset-x-4 bottom-4 z-[var(--z-toast)] rounded-2xl border border-surface-line bg-surface-page p-4 shadow-public4 md:left-auto md:max-w-md" role="dialog">
      <div className="space-y-3">
        <p className="text-sm leading-relaxed text-ink-secondary">
          We use essential cookies to support site functionality and optional analytics to improve the AMIS FCT experience. Read our <Link className="public-link" href="/privacy">Privacy Policy</Link>.
        </p>
        <div className="flex flex-wrap gap-3">
          <button className="btn-primary" onClick={() => handleChoice("accepted")} type="button">Accept</button>
          <button className="btn-secondary" onClick={() => handleChoice("declined")} type="button">Decline</button>
        </div>
      </div>
    </div>
  );
}
