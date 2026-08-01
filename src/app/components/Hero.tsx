"use client";

import Image from "next/image";
import { 
  ArrowRight,
  Code2, 
  Palette
} from "lucide-react";
import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import { useMounted } from '@utils/useMounted';
import AngularIcon from '@components/AngularIcon';
import { useI18n } from '@i18n/I18nProvider';

export default function Hero() {
  const [scrollY, setScrollY] = useState(0);
  const mounted = useMounted();
  const { resolvedTheme } = useTheme();
  const { t } = useI18n();

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Ensure consistent initial render
  const isDark = mounted && resolvedTheme === 'dark';

  return (
    <section className="relative min-h-screen bg-background text-foreground overflow-hidden">
      {/* Background Video */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className={`w-full h-full object-cover ${isDark ? 'opacity-40' : 'opacity-50'}`}
        >
          <source src="/2xlow.mp4" type="video/mp4" />
        </video>
      </div>

      {/* Background Elements */}
      <div className="absolute inset-0 z-10">
        {/* Main gradient overlay */}
        <div className={`absolute inset-0 bg-gradient-to-b ${
          isDark 
            ? 'from-gray-950/70 via-gray-950/65 to-gray-950/60' 
            : 'from-background/70 via-background/60 to-background/50'
        }`} />
        {/* Extra bottom gradient */}
        <div className={`absolute bottom-0 left-0 right-0 h-96 bg-gradient-to-t ${
          isDark 
            ? 'from-background via-background/80 to-transparent' 
            : 'from-background/80 via-background/40 to-transparent'
        }`} />
        {/* Accent color gradients */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_25%,rgba(0,184,110,0.15),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_75%,rgba(99,102,241,0.15),transparent_50%)]" />
      </div>

      {/* Main Content Container with minimum top padding */}
      <div className="relative z-20 w-full min-h-screen flex flex-col justify-center pt-28 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-8xl mx-auto text-center flex-1 flex flex-col justify-center space-y-8 sm:space-y-12">
          {/* Title Section */}
          <div className="mb-4 sm:mb-6">
            <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-bold">
              <span className="bg-gradient-to-r from-emerald-500 via-blue-500 to-indigo-500 text-transparent bg-clip-text">
                {t.hero.title}
              </span>
            </h1>
          </div>

          {/* Current role */}
          <div className={`group relative -top-3 sm:-top-5 self-center inline-flex items-center gap-2.5 sm:gap-3 rounded-full py-2 px-2.5 sm:py-2.5 sm:px-3 text-foreground backdrop-blur-xl mb-4 transition-shadow duration-500 ${
            isDark
              ? 'border-0 bg-gray-950/45 shadow-[0_12px_32px_-24px_rgba(0,0,0,0.9)] ring-0 outline-none'
              : 'border border-black/[0.06] bg-white/60 shadow-[0_12px_32px_-24px_rgba(99,102,241,0.55)] hover:shadow-[0_16px_40px_-22px_rgba(99,102,241,0.7)]'
          }`}>
            <span className="grid size-8 sm:size-9 place-items-center">
              <AngularIcon className="size-6 sm:size-7 transition-transform duration-500 ease-out group-hover:scale-110" />
            </span>
            <span className="inline-flex items-center gap-1.5 sm:gap-2 text-sm sm:text-base md:text-lg font-semibold tracking-tight">
              <span className="sr-only">{t.hero.roleScreenReader} </span>
              {/* opacity-*, not text-foreground/70: alpha modifiers are a no-op
                  against the var(--foreground) colour. */}
              <span className="opacity-70">{t.hero.role}</span>
              <ArrowRight
                className="size-4 sm:size-5 text-indigo-500/80 transition-transform duration-500 ease-out group-hover:translate-x-1"
                aria-hidden="true"
              />
              <span className="sr-only">{` ${t.hero.at} `}</span>
              {/* Lands on Biometria's own green, so the word resolves into the logo beside it. */}
              <span className={`bg-gradient-to-r from-blue-500 bg-clip-text text-transparent ${
                isDark ? 'to-[#4CAE4F]' : 'to-[#359637]'
              }`}>
                {t.hero.company}
              </span>
            </span>
            <span className="grid size-8 sm:size-9 place-items-center">
              <Image
                src="/biometria_se_logo-transparent.png"
                alt=""
                aria-hidden="true"
                width={36}
                height={36}
                className="size-6 sm:size-7 object-contain transition-transform duration-500 ease-out group-hover:scale-110"
              />
            </span>
          </div>

          {/* Image Section */}
          <div className="relative w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 lg:w-64 lg:h-64 mx-auto mb-6 sm:mb-8">
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-emerald-500/20 via-blue-500/20 to-indigo-500/20 
              backdrop-blur-sm animate-pulse"
              style={{
                transform: `scale(${1 + scrollY * 0.0005})`,
              }} 
            />
            <Image
              src="/Profilbild-corrected.png"
              alt={t.hero.portraitAlt}
              width={256}
              height={256}
              className="rounded-full object-cover w-full h-full relative z-10"
              priority
            />
            
            {/* Orbital Rings */}
            <div className={`absolute inset-0 -m-6 sm:-m-8 rounded-full border ${
              isDark ? 'border-emerald-500/30' : 'border-emerald-500/20'
            } animate-[spin_8s_linear_infinite]`} 
              style={{
                transform: `rotate(${scrollY * 0.2}deg)`,
              }}
            />
            <div className={`absolute inset-0 -m-12 sm:-m-16 rounded-full border ${
              isDark ? 'border-indigo-500/30' : 'border-indigo-500/20'
            } animate-[spin_12s_linear_infinite_reverse]`}
              style={{
                transform: `rotate(${-scrollY * 0.1}deg)`,
              }}
            />
          </div>
        </div>
      </div>

      {/* Floating Icons - Hidden on very small screens */}
      <div 
        className="hidden sm:block absolute left-1/4 top-1/4"
        style={{ 
          transform: `translate(-50%, ${scrollY * -0.2}px) rotate(-5deg)`,
        }}
      >
        <Palette className={`w-16 sm:w-24 h-16 sm:h-24 ${
          isDark ? 'text-emerald-500/30' : 'text-emerald-500/20'
        }`} />
      </div>
      <div 
        className="hidden sm:block absolute right-1/4 bottom-1/4"
        style={{ 
          transform: `translate(50%, ${scrollY * 0.2}px) rotate(5deg)`,
        }}
      >
        <Code2 className={`w-16 sm:w-24 h-16 sm:h-24 ${
          isDark ? 'text-indigo-500/30' : 'text-indigo-500/20'
        }`} />
      </div>
      
      {/* Decorative Wave Separator */}
      <div className="absolute -bottom-1 left-0 right-0 z-30">
        <svg 
          viewBox="0 0 1440 140" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          className="w-full drop-shadow-2xl filter"
          preserveAspectRatio="none"
        >
          <path 
            d="M0 40C240 120 480 120 720 80C960 40 1200 40 1440 80V140H0V40Z" 
            fill="var(--background)"
            style={{
              filter: 'drop-shadow(0 25px 25px rgb(0 0 0 / 0.15))'
            }}
          />
        </svg>
      </div>
    </section>
  );
}
