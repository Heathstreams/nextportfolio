"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTheme } from "next-themes";
import { useMounted } from "@utils/useMounted";
import { useI18n } from "@i18n/I18nProvider";

gsap.registerPlugin(ScrollTrigger);

export default function Spinner() {
  const spinnerRef = useRef<HTMLButtonElement>(null);
  const { theme, setTheme } = useTheme();
  const mounted = useMounted();
  const { t } = useI18n();

  useEffect(() => {
    // Ensure GSAP and ScrollTrigger are loaded
    if (typeof window !== 'undefined') {
      const spinnerElement = spinnerRef.current;

      if (spinnerElement) {
        gsap.to(spinnerElement, {
          rotation: -360,
          ease: "none",
          duration: 1,
          scrollTrigger: {
            trigger: document.documentElement, // Use entire document
            start: "top top",
            end: "bottom bottom",
            scrub: 1, // Smooth scrubbing
          }
        });
      }
    }
  }, []);

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  if (!mounted) return null;

  return (
    <button
      type="button"
      ref={spinnerRef}
      onClick={toggleTheme}
      aria-label={t.common.toggleTheme}
      title={t.common.toggleTheme}
      className="fixed bottom-7 left-5 sm:top-auto sm:bottom-5 z-50 mix-blend-difference cursor-pointer
        [-webkit-tap-highlight-color:transparent]"
    >
      <svg
        className="w-10 h-10 text-white"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        aria-hidden="true"
      >
        {theme !== 'light' ? (
          <>
            <circle cx="12" cy="12" r="4"/>
            <path d="M12 2v2"/>
            <path d="M12 20v2"/>
            <path d="m4.93 4.93 1.41 1.41"/>
            <path d="m17.66 17.66 1.41 1.41"/>
            <path d="M2 12h2"/>
            <path d="M20 12h2"/>
            <path d="m6.34 17.66-1.41 1.41"/>
            <path d="m19.07 4.93-1.41 1.41"/>
          </>
        ) : (
          <path transform="translate(2.4,2.4) scale(0.8)" d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/>
        )}
      </svg>
    </button>
  );
}
