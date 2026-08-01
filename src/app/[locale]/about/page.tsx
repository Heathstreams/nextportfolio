'use client';

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Code2, Rocket, Coffee, GraduationCap, HeartHandshake, BookOpen, Globe, LucideIcon } from 'lucide-react';
import Image from 'next/image';
import { useI18n } from '@i18n/I18nProvider';
import type { Dictionary } from '@i18n/dictionaries/en';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

type SectionKey = keyof Dictionary['aboutPage']['sections'];

/** Presentation only — all copy lives in the dictionaries. */
interface SectionStyle {
  key: SectionKey;
  icon: LucideIcon;
  imageSrc: string;
  gradient: string;
  iconColor: string;
  align: 'left' | 'right';
}

const sectionStyles: SectionStyle[] = [
  {
    key: "beginning",
    icon: HeartHandshake,
    imageSrc: "/images/1.jpg",
    gradient: "from-rose-500 to-orange-500",
    iconColor: "text-rose-500",
    align: "left"
  },
  {
    key: "background",
    icon: GraduationCap,
    imageSrc: "/images/2.jpg",
    gradient: "from-orange-500 to-amber-500",
    iconColor: "text-orange-500",
    align: "right"
  },
  {
    key: "journey",
    icon: Rocket,
    imageSrc: "/images/3.jpg",
    gradient: "from-emerald-500 to-teal-500",
    iconColor: "text-emerald-500",
    align: "left"
  },
  {
    key: "approach",
    icon: Coffee,
    imageSrc: "/images/7.jpg",
    gradient: "from-teal-500 to-cyan-500",
    iconColor: "text-teal-500",
    align: "right"
  },
  {
    key: "learning",
    icon: BookOpen,
    imageSrc: "/images/4.jpg",
    gradient: "from-cyan-500 to-blue-500",
    iconColor: "text-cyan-500",
    align: "left"
  },
  {
    key: "stack",
    icon: Code2,
    imageSrc: "/images/6.jpg",
    gradient: "from-blue-500 to-indigo-500",
    iconColor: "text-blue-500",
    align: "right"
  },
  {
    key: "vision",
    icon: Globe,
    imageSrc: "/images/5.jpg",
    gradient: "from-indigo-500 to-violet-500",
    iconColor: "text-indigo-500",
    align: "left"
  }
];

export default function Page() {
  const sectionsRef = useRef<(HTMLDivElement | null)[]>([]);
  const { t } = useI18n();

  const sections = sectionStyles.map((style) => ({
    ...style,
    ...t.aboutPage.sections[style.key],
  }));

  useEffect(() => {
    if (window.innerWidth >= 640) {
      sectionsRef.current.forEach((section) => {
        if (!section) return;

        gsap.fromTo(
          section,
          {
            opacity: 0,
            y: 50,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: section,
              start: "top bottom-=100",
              end: "bottom center",
              toggleActions: "play none none reverse",
            },
          }
        );
      });
    }

    return () => {
      if (typeof window !== 'undefined') {
        ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      }
    };
  }, []);

  const setSectionRef = (el: HTMLDivElement | null, index: number) => {
    sectionsRef.current[index] = el;
  };

  return (
    <main className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="pt-32 pb-16 px-4 sm:px-6">
        <div className="max-w-4xl py-20 mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-bold mb-6">
            <span className="bg-gradient-to-r from-emerald-500 to-indigo-500 text-transparent bg-clip-text relative z-10 drop-shadow-[0_2px_10px_rgba(99,102,241,0.2)]">
              {t.aboutPage.heading}
            </span>
          </h1>
          <p className="text-lg sm:text-xl text-foreground/60 max-w-2xl mx-auto mb-4">
            {t.aboutPage.intro}
          </p>
          <p className="text-sm text-foreground/40 max-w-2xl mx-auto italic">
            {t.aboutPage.imageNote}
          </p>
        </div>
      </div>

      {/* Content Sections */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-32">
        {sections.map((section, index) => (
          <div
            key={section.key}
            ref={(el) => setSectionRef(el, index)}
            className="mb-32 last:mb-0"
          >
            <div className={`flex flex-col ${section.align === 'left' ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-12 lg:gap-24`}>
              {/* Text Content */}
              <div className="flex-1 space-y-6">
                <div className="flex items-start gap-4">
                  <div 
                    className={`p-3 aspect-square bg-gradient-to-br ${section.gradient} flex items-center justify-center relative`}
                    style={{
                      boxShadow: `0 0 20px rgba(${section.gradient.includes('emerald') ? '16, 185, 129' : 
                                                section.gradient.includes('rose') ? '244, 63, 94' : 
                                                section.gradient.includes('orange') ? '249, 115, 22' :
                                                section.gradient.includes('teal') ? '20, 184, 166' :
                                                section.gradient.includes('cyan') ? '6, 182, 212' :
                                                section.gradient.includes('blue') ? '59, 130, 246' :
                                                '99, 102, 241'}, 0.2)`
                    }}
                  >
                    <section.icon className="w-6 h-6 text-white" style={{ filter: 'drop-shadow(0 0 8px rgba(255, 255, 255, 0.3))' }} />
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold mb-2">{section.title}</h2>
                    <p className={`text-sm ${section.iconColor} font-medium`}>
                      {section.subtitle}
                    </p>
                  </div>
                </div>
                <div className="relative">
                  <div className={`h-px w-24 bg-gradient-to-r ${section.gradient} opacity-50`} />
                </div>
                <p className="text-lg text-foreground/80 leading-relaxed">
                  {section.content}
                </p>
              </div>

              {/* Image */}
              <div className="flex-1">
                <div className="relative group overflow-hidden">
                  <div className="relative aspect-w-4 aspect-h-3">
                    <Image
                      src={section.imageSrc}
                      alt={section.imageAlt}
                      width={800}
                      height={600}
                      className="object-cover w-full h-full transform group-hover:scale-[1.02] transition-transform duration-700 ease-out"
                      priority={index === 0}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
