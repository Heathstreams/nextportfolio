"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Palette, Code2, Database, ArrowRight, LucideIcon } from "lucide-react";
import Link from 'next/link';
import { useI18n } from "@i18n/I18nProvider";
import { highlight } from "@i18n/rich";

gsap.registerPlugin(ScrollTrigger);

type CardKey = "ux" | "frontend" | "fullstack";

type CardStyle = {
  key: CardKey;
  icon: LucideIcon;
  gradient: string;
  borderGradient: string;
  iconColor: string;
  borderColor: string;
  step: string;
  featured?: boolean;
};

/** Presentation only — all copy lives in the dictionaries. */
const cardStyles: CardStyle[] = [
  {
    key: "ux",
    icon: Palette,
    gradient: "from-emerald-500/20 to-emerald-500/5",
    borderGradient: "from-emerald-500 via-emerald-400 to-transparent",
    iconColor: "text-emerald-500",
    borderColor: "border-emerald-500/20",
    step: "01"
  },
  {
    key: "frontend",
    icon: Code2,
    gradient: "from-blue-500/20 to-blue-500/5",
    borderGradient: "from-blue-500 via-blue-400 to-transparent",
    iconColor: "text-blue-500",
    borderColor: "border-blue-500/20",
    featured: true,
    step: "02"
  },
  {
    key: "fullstack",
    icon: Database,
    gradient: "from-indigo-500/20 to-indigo-500/5",
    borderGradient: "from-indigo-500 via-indigo-400 to-transparent",
    iconColor: "text-indigo-500",
    borderColor: "border-indigo-500/20",
    step: "03"
  }
];

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const buttonRef = useRef<HTMLDivElement>(null);
  const { t, href } = useI18n();

  const cards = cardStyles.map((style) => ({
    ...style,
    ...t.about.cards[style.key],
  }));

  useEffect(() => {
    if (!sectionRef.current || !buttonRef.current) return;

    // Only apply animations on larger screens
    if (window.innerWidth >= 640) {
      cardsRef.current.forEach((card) => {
        if (!card) return;

        gsap.fromTo(
          card,
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
              trigger: card,
              start: "top bottom-=100",
              end: "bottom center",
              toggleActions: "play none none reverse",
            },
          }
        );
      });

      // Button animation
      gsap.fromTo(
        buttonRef.current,
        {
          opacity: 0,
          y: 20,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: {
            trigger: buttonRef.current,
            start: "top 90%",
            end: "bottom center",
            toggleActions: "play none none reverse",
          },
        }
      );
    }
  }, []);

  const setCardRef = (el: HTMLDivElement | null, index: number) => {
    cardsRef.current[index] = el;
  };

  return (
    <section
      ref={sectionRef}
      id="about"
      className="min-h-screen bg-gradient-to-b from-background to-background/95 flex items-center pt-32 relative"
    >
      <div className="w-full py-12 px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-7xl mx-auto mb-16 text-center">
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
            <span className="bg-gradient-to-r from-emerald-500 to-indigo-500 text-transparent bg-clip-text 
              relative z-10 py-1 drop-shadow-[0_2px_10px_rgba(99,102,241,0.2)]">
              {t.about.heading}
            </span>
          </h2>
          <p className="text-xl font-serif text-foreground/60 max-w-3xl mx-auto">
            {t.about.intro}
          </p>
        </div>

        {/* Cards Container */}
        <div className="max-w-7xl mx-auto grid gap-8 grid-cols-1 lg:grid-cols-3">
          {cards.map((card, i) => (
            <div
              key={card.key}
              ref={(el) => setCardRef(el, i)}
              className="relative group"
            >
              {/* Card */}
              <div
                className={`relative h-full p-8 backdrop-blur-sm 
                  border ${card.borderColor}
                  overflow-hidden
                  hover:border-opacity-50 hover:translate-y-[-1px] hover:scale-[1.00]
                  hover:shadow-lg hover:shadow-${card.iconColor}/5
                  transition-all duration-1000 ease-out
                  ${card.featured ? 'border-opacity-50' : 'border-opacity-30'}`}
              >
                {/* Background gradient with animation */}
                <div className={`absolute inset-0 opacity-20 mix-blend-overlay`}>
                  <div className={`absolute inset-0 bg-gradient-to-br ${card.gradient} opacity-50 
                    group-hover:scale-110 group-hover:opacity-100 transition-all duration-700 ease-out`} />
                  <div className={`absolute inset-0 bg-gradient-to-tl ${card.gradient} opacity-30 
                    group-hover:scale-110 group-hover:opacity-80 transition-all duration-700 ease-out delay-100`} />
                </div>
                
                {/* Content container */}
                <div className="relative z-10">
                  {/* Step indicator */}
                  <div className={`absolute top-[-16] right-[-14] text-sm font-mono ${card.iconColor}`}>
                    {card.step}
                  </div>

                  {/* Title with Icon */}
                  <div className="mb-6">
                    <div className="flex items-center gap-3 mb-2">
                      <div className={`relative rounded-full p-2 ${card.iconColor} group-hover:scale-110 transition-transform duration-500`}>
                        <div className="absolute inset-0 bg-white/5 rounded-full backdrop-blur-sm" />
                        <card.icon className="w-9 h-9 relative z-10" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-sans font-semibold">
                          {card.title}
                        </h3>
                        <p className={`text-sm ${card.iconColor} font-medium`}>
                          {card.subtitle}
                        </p>
                      </div>
                    </div>
                    {/* Enhanced gradient line with animation */}
                    <div className="relative h-px w-24 group-hover:w-64 transition-all duration-1000 mt-4">
                      <div className={`absolute inset-0 bg-gradient-to-r ${card.borderGradient} opacity-50`} />
                      <div className={`absolute inset-0 bg-gradient-to-r ${card.borderGradient} blur-sm`} />
                    </div>
                  </div>

                  {/* Description */}
                  <div className="text-lg font-serif leading-relaxed text-foreground/80">
                    <p className="relative">
                      {highlight(card.description, card.iconColor)}
                    </p>
                  </div>
                </div>
              </div>

              {/* Connector line for timeline (visible on mobile) */}
              {i < cards.length - 1 && (
                <div className="lg:hidden h-8 w-px mx-auto my-0 bg-gradient-to-b from-white/20 to-transparent" />
              )}
            </div>
          ))}
        </div>

        {/* Button Section */}
        <div className="mt-16 text-center" ref={buttonRef}>
          <div className="inline-block">
            <Link
              href={href("/about")}
              className="group relative inline-flex items-center gap-2 px-6 py-2.5 
                text-xl font-fixelDisplay rounded-full
                transition-all duration-300 overflow-hidden
                select-none touch-manipulation
                active:opacity-90
                [-webkit-tap-highlight-color:transparent]
                hover:scale-[1.02]"
            >
              {/* Background with frosted effect */}
              <div className="absolute inset-0 bg-white/10 backdrop-blur-sm" />
              
              {/* Animated border gradient */}
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 via-blue-500/20 to-indigo-500/20 opacity-0 
                group-hover:opacity-100 transition-all duration-700" />
              
              {/* Content */}
              <span className="relative z-10 bg-gradient-to-r from-emerald-500 via-blue-500 to-indigo-500 text-transparent bg-clip-text 
                font-medium">
                {t.about.cta}
              </span>
              <ArrowRight className="relative z-10 w-5 h-5 text-indigo-500 group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
