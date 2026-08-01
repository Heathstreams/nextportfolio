"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { useTheme } from 'next-themes';
import { useMounted } from '@utils/useMounted';
import { useI18n } from '@i18n/I18nProvider';

export default function Logo() {
  const logoRef = useRef<HTMLDivElement>(null);
  const brandingRef = useRef<HTMLDivElement>(null);
  const [shadowOpacity, setShadowOpacity] = useState(0);
  const mounted = useMounted();
  const { resolvedTheme } = useTheme();
  const { href } = useI18n();

  useEffect(() => {
    const heroSection = document.querySelector("section");
    const aboutSection = document.querySelector("#about");

    if (!heroSection || !aboutSection) return;

    const handleScroll = () => {
      const heroRect = heroSection.getBoundingClientRect();
      const isHeroOutOfView = heroRect.bottom <= 0;
      const scrollY = window.scrollY;
      const maxScroll = 100;
      const newOpacity = Math.min(scrollY / maxScroll, 1);
      setShadowOpacity(newOpacity);

      if (isHeroOutOfView) {
        gsap.to(logoRef.current, {
          autoAlpha: 1,
          x: 0,
          duration: 1,
          ease: "power2.out",
        });
        gsap.to(brandingRef.current, {
          autoAlpha: 0,
          x: -50,
          duration: 1,
          ease: "power2.out",
        });
      } else {
        gsap.to(logoRef.current, {
          autoAlpha: 0,
          x: 50,
          duration: 1,
          ease: "power2.out",
        });
        gsap.to(brandingRef.current, {
          autoAlpha: 1,
          x: 0,
          duration: 1,
          ease: "power2.out",
        });
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const isDark = mounted && resolvedTheme === 'dark';

  return (
    <>
      {/* Hero Page Branding */}
      <div
        ref={brandingRef}
        className="fixed top-4 left-4 max-sm:top-0 max-sm:left-0 max-sm:right-0 max-sm:w-screen z-50 opacity-1"
        style={{ visibility: "visible", transform: "translateX(0)" }}
      >
        <div className="relative flex items-center justify-center max-sm:w-full">
          <div className="absolute inset-0 z-[-1]">
            <Image
              src="/LHLT.png"
              alt="Background Image"
              fill
              className="object-cover opacity-0"
              priority
            />
          </div>
          {/* Outer container matching navbar */}
          <div 
            className={`relative z-10 px-2 py-1.5 rounded-full max-sm:rounded-none max-sm:w-full backdrop-blur-sm transition-all duration-300 ${
              isDark 
                ? 'bg-white/10 hover:bg-white/15' 
                : 'bg-white/20 hover:bg-white/25'
            }`}
            style={{
              boxShadow: isDark
                ? `0 4px 8px rgba(0, 0, 0, ${shadowOpacity * 0.15}), inset 0 0 10px rgba(255, 255, 255, ${shadowOpacity * 0.05})`
                : `0 4px 8px rgba(0, 0, 0, ${shadowOpacity * 0.05}), inset 0 0 10px rgba(255, 255, 255, ${shadowOpacity * 0.1})`,
            }}
          >
            {/* Inner container matching navbar items */}
            <div className="inline-flex items-center px-6 py-1.5 rounded-full max-sm:w-full max-sm:justify-center">
              <span className={`text-xl font-display font-medium transition-colors duration-300 ${
                isDark
                  ? shadowOpacity === 0 ? 'text-emerald-400' : 'text-white'
                  : shadowOpacity === 0 ? 'text-emerald-700' : 'text-black'
              }`}>Lukas</span>
              <span className={`text-xl font-display font-normal whitespace-pre transition-colors duration-300 ${
                isDark
                  ? shadowOpacity === 0 ? 'text-emerald-400' : 'text-white'
                  : shadowOpacity === 0 ? 'text-emerald-700' : 'text-black'
              }`}> Hedström</span>
            </div>
          </div>
        </div>
      </div>

      {/* Inverse Logo (Appears after Hero) */}
      <div
        ref={logoRef}
        className="fixed top-5 left-5 z-50 opacity-0 mix-blend-difference"
        style={{ visibility: "hidden", transform: "translateX(-50px)" }}
      >
        <Link href={href("/")} aria-label="Lukas Hedström">
          <svg
            className="w-20 h-auto"
            viewBox="0 0 650 390"
            fill="white"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0 0H130V130H0V0ZM0 130H130V260H0V130ZM130 130H260V260H130V130ZM260 130H390V260H260V130ZM260 0H390V130H260V0ZM390 130H520V260H390V130ZM520 130H650V260H520V130ZM520 0H650V130H520V0ZM520 260H650V390H520V260ZM260 260H390V390H260V260Z"
            />
          </svg>
        </Link>
      </div>
    </>
  );
}
