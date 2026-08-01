"use client";

import Image from "next/image";
import { useTheme } from 'next-themes';
import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollToPlugin from 'gsap/ScrollToPlugin';
import { Construction, ExternalLink, X } from 'lucide-react';
import { useMounted } from '@utils/useMounted';
import { useViewportWidth } from '@utils/useViewportWidth';
import { useI18n } from '@i18n/I18nProvider';
import type { Dictionary } from '@i18n/dictionaries/en';

type ProjectKey = keyof Dictionary['projects']['items'];

/** A finished project that opens a detail view. Copy comes from the dictionaries. */
interface ProjectEntry {
  kind: 'project';
  id: number;
  key: ProjectKey;
  src: string;
  technologies: string[];
  demo: string;
}

/**
 * A reserved slot in the gallery. Carries no copy, tech list or detail view —
 * there is nothing built yet, so there is nothing to describe.
 */
interface PlaceholderEntry {
  kind: 'placeholder';
  id: number;
  src: string;
}

type Entry = ProjectEntry | PlaceholderEntry;

const entries: Entry[] = [
  {
    kind: 'project',
    id: 1,
    key: 'pokedle',
    src: '/images/project1v3.png',
    technologies: ['Next.js', 'TypeScript', 'PostgreSQL', 'CSS', 'Neon DB'],
    demo: 'https://pokedle.day',
  },
  { kind: 'placeholder', id: 2, src: '/2.jpg' },
  { kind: 'placeholder', id: 3, src: '/3.jpg' },
  {
    kind: 'project',
    id: 4,
    key: 'halls',
    src: '/images/project4.png',
    technologies: ['Godot 4', 'Blender', 'Krita', 'Laigter', 'GDScript'],
    demo: 'https://rezyn.itch.io/halls-of-despair',
  },
];

// For ScrollToPlugin support
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollToPlugin);
}

export default function CaseStudies() {
  const mounted = useMounted();
  const { resolvedTheme } = useTheme();
  const [selectedProject, setSelectedProject] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const windowWidth = useViewportWidth();
  const isDesktop = windowWidth >= 1024;
  const { t } = useI18n();
  
  const projectElements = useRef<(HTMLDivElement | null)[]>([]);
  const setProjectRef = (index: number, element: HTMLDivElement | null) => {
    projectElements.current[index] = element;
  };

  // Define handleCloseExpanded at the top level
  const handleCloseExpanded = () => {
    if (selectedProject === null || !overlayRef.current || !gridRef.current) return;

    const index = [1, 2, 3, 4].indexOf(selectedProject);
    if (index === -1) return;

    const card = projectElements.current[index];
    if (!card) return;

    if (isDesktop) {
      // For desktop, use a quick but still visible transition
      // First reduce opacity slightly to signal closing
      gsap.to(overlayRef.current, {
        opacity: 0.95,
        duration: 0.1,
        ease: "power2.out",
        onComplete: () => {
          // Then quickly shrink width and fade out
          gsap.to(overlayRef.current, {
            width: "98%",
            opacity: 0,
            duration: 0.25,
            ease: "power3.inOut",
            onComplete: () => {
              setSelectedProject(null);
              if (overlayRef.current) {
                overlayRef.current.style.display = 'none';
              }
            }
          });
        }
      });
    } else {
      // For mobile and tablet, use a quick fade out
      gsap.to(overlayRef.current, {
        opacity: 0,
        duration: 0.2,
        ease: "power3.out",
        onComplete: () => {
          setSelectedProject(null);
          if (overlayRef.current) {
            overlayRef.current.style.display = 'none';
          }
        }
      });
    }

    // Restore opacity of ALL cards
    projectElements.current.forEach(element => {
      if (element) {
        gsap.to(element, { opacity: 1, duration: 0.3 });
      }
    });
  };

  useEffect(() => {
    // Add global click handler
    const handleGlobalClick = (e: MouseEvent) => {
      if (selectedProject !== null && overlayRef.current && !overlayRef.current.contains(e.target as Node)) {
        handleCloseExpanded();
      }
    };

    document.addEventListener('click', handleGlobalClick);

    return () => {
      document.removeEventListener('click', handleGlobalClick);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedProject]);

  const isDark = mounted && resolvedTheme === 'dark';

  const handleProjectClick = (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    
    // If there's already a selected project (expanded card), just close it and don't open a new one
    if (selectedProject !== null) {
      handleCloseExpanded();
      return;
    }

    // Set the selected project
    setSelectedProject(id);

    const index = entries.findIndex(e => e.id === id);
    if (index === -1) return;

    const card = projectElements.current[index];
    if (!card || !gridRef.current) return;

    // Get card position for overlay positioning
    const cardRect = card.getBoundingClientRect();
    const gridRect = gridRef.current.getBoundingClientRect();

    // Position and show the overlay
    if (overlayRef.current) {
      const overlay = overlayRef.current;

      // Set initial position to match the clicked card
      gsap.set(overlay, {
        x: cardRect.left - gridRect.left,
        y: cardRect.top - gridRect.top,
        width: cardRect.width,
        height: cardRect.height,
        opacity: 0,
        display: 'block',
        zIndex: 50,
        overflow: 'hidden',
        borderRadius: '0.375rem',
        filter: 'none',
        boxShadow: 'none'
      });

      if (isDesktop) {
        // DESKTOP: Full expansion animation
        gsap.to(overlay, {
          x: 0, // No margin
          y: cardRect.top - gridRect.top,
          width: '100%', // Full width
          opacity: 1,
          duration: 1.0,
          ease: "power3.inOut",
          onComplete: () => {
            // After width animation completes, set a fixed height instead of auto
            // to prevent scrolling
            gsap.to(overlay, {
              height: '85vh', // Match the fixed height of the grid
              duration: 0.5,
              ease: "power3.inOut",
              onComplete: () => {
                // Set overflow to hidden to prevent scrolling
                gsap.set(overlay, { overflow: 'hidden' });
                
                // No scrollTo animation to keep the page in place
              }
            });
          }
        });

        // Animate the image saturation inside the overlay
        const overlayImage = overlay.querySelector('.overlay-image') as HTMLElement;
        if (overlayImage) {
          gsap.to(overlayImage, {
            filter: 'saturate(1)',
            duration: 1.4,
            delay: 0.2,
            ease: "power2.out"
          });
        }
      } else {
        // MOBILE & TABLET: Simple direct animation approach
        // Step 1: Fade in
        gsap.to(overlay, {
          opacity: 1,
          duration: 0.3,
          ease: "power3.inOut"
        });

        // Step 2: Get height measurements
        let overlayHeight = 0;
        const extraSpace = 40;
        
        // Function to animate height and container
        const animateHeightAndContainer = () => {
          // Measure the real content height. Written straight to the element:
          // GSAP normalises "auto" on height into the *current* pixel value, so
          // going through gsap.set here would just measure the collapsed card.
          overlay.style.overflow = 'hidden';
          overlay.style.height = 'auto';
          overlayHeight = overlay.getBoundingClientRect().height;

          // Animate from the card's size up to the measured height
          gsap.fromTo(overlay,
            { height: cardRect.height },
            {
              height: overlayHeight,
              duration: 0.5,
              ease: "power3.out",
              onComplete: () => {
                // Hand height back to the content, so a stale measurement can
                // never clip the action buttons at the bottom of the card.
                overlay.style.height = 'auto';
                overlay.style.overflow = 'visible';

                // Check if container needs to expand
                if (containerRef.current) {
                  const expandedHeight = overlay.getBoundingClientRect().height;
                  const totalExpandedHeight = cardRect.top + expandedHeight + extraSpace;
                  const containerBottom = containerRef.current.getBoundingClientRect().bottom;

                  if (totalExpandedHeight > containerBottom) {
                    gsap.to(containerRef.current, {
                      paddingBottom: `${totalExpandedHeight - containerBottom + 60}px`,
                      duration: 0.5,
                      ease: "power3.out"
                    });
                  }
                }
              }
            }
          );
        };
        
        // Execute with a slight delay to ensure DOM is ready
        setTimeout(animateHeightAndContainer, 50);
      }

      // Dim ALL cards to make the overlay stand out
      projectElements.current.forEach(element => {
        if (element) {
          gsap.to(element, { opacity: 0.2, duration: 0.15 });
        }
      });
    }
  };

  // Function to determine project color scheme
  const getProjectColor = (projectId: number) => {
    switch(projectId) {
      case 1: return {
        primary: 'emerald-500',
        light: 'emerald-400',
        dark: 'emerald-600',
        bg: 'emerald-500/5',
        border: 'emerald-500/20',
        bgLight: 'emerald-500/10'
      };
      case 2: return {
        primary: 'blue-500',
        light: 'blue-400',
        dark: 'blue-600',
        bg: 'blue-500/5',
        border: 'blue-500/20',
        bgLight: 'blue-500/10'
      };
      case 3: return {
        primary: 'indigo-500',
        light: 'indigo-400',
        dark: 'indigo-600',
        bg: 'indigo-500/5',
        border: 'indigo-500/20',
        bgLight: 'indigo-500/10'
      };
      default: return {
        primary: 'purple-500',
        light: 'purple-400',
        dark: 'purple-600',
        bg: 'purple-500/5',
        border: 'purple-500/20',
        bgLight: 'purple-500/10'
      };
    }
  };

  return (
    <section id="projects" ref={containerRef} className="relative bg-background py-12 lg:py-24 overflow-x-hidden">
      {/* Responsive Grid Container */}
      <div ref={gridRef} className="relative w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 lg:px-2 gap-y-6 lg:gap-y-0">
        {entries.map((entry, index) => {
          const isPlaceholder = entry.kind === 'placeholder';
          const copy = isPlaceholder
            ? t.projects.placeholder
            : t.projects.items[entry.key];

          return (
          <div
            key={entry.id}
            ref={(el) => setProjectRef(index, el)}
            className={`relative w-full group overflow-hidden
              h-[60vh] sm:h-[50vh] lg:h-[85vh] transition-opacity duration-700
              ${isPlaceholder ? 'cursor-default' : 'cursor-pointer'}`}
            onClick={isPlaceholder ? undefined : (e) => handleProjectClick(entry.id, e)}
            aria-disabled={isPlaceholder || undefined}
          >
            {/* Frame with padding */}
            <div className={`h-full w-full py-3 px-1.5 lg:py-8 lg:px-1.5 bg-background box-border
              ${index === 0 ? 'lg:pl-0' : ''} 
              ${index === entries.length - 1 ? 'lg:pr-0' : ''}`}
            >
              {/* Image Container with overflow-hidden */}
              <div className="relative h-full w-full overflow-hidden">
                <Image
                  src={entry.src}
                  alt={isPlaceholder ? '' : copy.title}
                  aria-hidden={isPlaceholder || undefined}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className={`object-cover 
                    transition-all duration-1000 ease-in-out filter ${
                      isPlaceholder
                        ? 'grayscale opacity-40'
                        : `saturate-60 group-hover:saturate-100 lg:group-hover:-translate-y-8 lg:group-hover:brightness-100 ${
                            isDark ? 'brightness-75 hover:brightness-90' : ''
                          }`
                    }`}
                  priority={index < 2}
                />

                {/* Reserved slot marker — nothing is claimed about the project itself */}
                {isPlaceholder && (
                  <>
                    <div className="absolute inset-0 border-2 border-dashed border-amber-500/50 pointer-events-none" />
                    <span
                      className="absolute top-3 left-3 inline-flex items-center gap-1.5 px-2.5 py-1
                        bg-amber-500/90 text-black text-[0.7rem] sm:text-xs font-semibold uppercase tracking-wide
                        backdrop-blur-sm"
                    >
                      <Construction className="w-3.5 h-3.5" aria-hidden="true" />
                      {t.projects.wipBadge}
                    </span>
                  </>
                )}
              </div>
            </div>

            {/* Title Overlay - Always visible on mobile/tablet, hover on desktop */}
            <div
              className={`absolute bottom-0 left-0 w-full bg-background
                transition-all duration-1000 z-3 sm:translate-y-0 ${
                  isPlaceholder ? '' : 'lg:transform lg:translate-y-full lg:group-hover:translate-y-0'
                } ${
                  isDark ? 'backdrop-blur-md bg-background/90' : ''
                }`}
            >
              <div className="px-3 py-3 sm:px-4 sm:py-4 lg:px-8 lg:py-6">
                {/* opacity-* rather than text-foreground/50: Tailwind cannot apply an
                    alpha modifier to the var(--foreground) colour, so it is a no-op. */}
                <h3 className={`text-xl sm:text-2xl lg:text-4xl font-black font-fixelDisplay mb-1 lg:mb-2
                  ${isDark ? 'text-foreground' : 'text-black'} ${isPlaceholder ? 'opacity-60' : ''}`}>
                  {copy.title}
                </h3>
                <p className={`text-sm sm:text-base lg:text-lg font-fixelDisplay 
                  transition-opacity duration-500 delay-300 opacity-100 ${
                    isPlaceholder
                      ? isDark ? 'text-amber-400' : 'text-amber-600'
                      : `lg:opacity-0 lg:group-hover:opacity-100 ${isDark ? 'text-foreground/70' : 'text-gray-600'}`
                  }`}>
                  {copy.description}
                </p>
              </div>
            </div>
          </div>
          );
        })}

        {/* Expanded Project Overlay - Inside the grid container */}
        <div 
          ref={overlayRef}
          className="absolute overflow-hidden z-3 bg-background"
          style={{ display: 'none', left: 0, right: 0, boxShadow: 'none', filter: 'none' }}
          onClick={(e) => e.stopPropagation()}
        >
          {selectedProject !== null ? (
            (() => {
              const entry = entries.find(e => e.id === selectedProject);
              if (!entry || entry.kind !== 'project') return null;
              const project = { ...entry, ...t.projects.items[entry.key] };
              
              const colors = getProjectColor(project.id);

              // Different content based on device type
              if (isDesktop) {
                // DESKTOP: New minimalist design without labels
                return (
                  <div className="flex flex-col w-full">
                    {/* Simple two-column layout with controlled height */}
                    <div className="grid grid-cols-12 gap-0 w-full h-[85vh]">
                      {/* Left column - Project image */}
                      <div className="col-span-5 bg-black relative h-full">
                        <div className="absolute inset-0">
                          <div className="relative w-full h-full">
                            <Image
                              src={project.src}
                              alt={project.title}
                              fill
                              priority
                              className="object-cover object-center overlay-image"
                            />
                            <div className="absolute bottom-0 left-0 w-full p-8 bg-gradient-to-t from-black/80 to-transparent">
                              <h1 className="text-4xl font-bold text-white mb-2">
                                {project.title}
                              </h1>
                              <p className="text-white/80 text-xl">{project.description}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      {/* Right column - Project details.
                          Flex column so the actions stay pinned and reachable: the body
                          scrolls instead of the panel clipping it on short screens. */}
                      <div className="col-span-7 p-8 py-12 h-full min-h-0 flex flex-col">
                        <div className="flex-1 min-h-0 overflow-y-auto pr-3">
                        {/* Description */}
                        <div className="mb-12">
                          <p className="text-lg leading-relaxed">
                            {project.fullDescription}
                          </p>
                        </div>
                        
                        {/* Features list - clean and simple */}
                        <div className="mb-12">
                          <div className={`w-full h-0.5 bg-${colors.primary} mb-6`}></div>
                          <div className="space-y-4">
                            {project.features.map((feature, i) => (
                              <div key={i} className="flex items-start gap-3">
                                <div className={`w-6 h-6 flex-shrink-0 bg-${colors.primary} flex items-center justify-center text-white`}>
                                  {i + 1}
                                </div>
                                <p className="text-lg pt-0.5">{feature}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                        
                        {/* Technologies - simple horizontal layout */}
                        <div className="mb-12">
                          <div className={`w-full h-0.5 bg-${colors.primary} mb-6`}></div>
                          <div className="flex flex-wrap gap-2">
                            {project.technologies.map((tech, i) => (
                              <span
                                key={i}
                                className={`px-3 py-2 text-sm bg-${colors.bgLight} text-${colors.primary}`}
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>
                        </div>

                        {/* Action buttons - pinned below the scrolling body */}
                        <div className="flex gap-4 flex-shrink-0 pt-6">
                          <a 
                            href={project.demo}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`px-6 py-4 flex-1 text-center bg-${colors.primary} text-white`}
                            onClick={(e) => e.stopPropagation()}
                          >
                            <span className="flex items-center justify-center gap-2">
                              <ExternalLink className="w-4 h-4" />
                              {t.projects.viewDemo}
                            </span>
                          </a>
                          <button 
                            className="px-6 py-4 flex-1 text-center border border-white/20 bg-white/5"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleCloseExpanded();
                            }}
                          >
                            <span className="flex items-center justify-center gap-2">
                              <X className="w-4 h-4" />
                              {t.projects.close}
                            </span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              } else {
                // MOBILE & TABLET: Card View that expands to full content height
                return (
                  <div 
                    className="flex flex-col w-full bg-background"
                    style={{ boxShadow: 'none', filter: 'none', maxHeight: 'none' }}
                  >
                    <div className="px-4 py-6">
                      <h2 className="text-2xl font-semibold mb-3">
                        <span className={`bg-gradient-to-r 
                          ${
                            selectedProject === 1 ? 'from-emerald-500 to-emerald-400' :
                            selectedProject === 2 ? 'from-blue-500 to-blue-400' :
                            selectedProject === 3 ? 'from-indigo-500 to-indigo-400' :
                            'from-purple-500 to-purple-400'
                          } text-transparent bg-clip-text`}>
                          {project.title}
                        </span>
                      </h2>
                      <p className="text-sm text-foreground/60 mb-6">
                        {project.fullDescription}
                      </p>

                      {/* Technologies */}
                      <div className="mb-6">
                        <div className="flex flex-wrap gap-2 justify-center">
                          {project.technologies.map((tech, i) => (
                            <span
                              key={i}
                              className={`px-3 py-1 text-xs sm:text-sm 
                                ${
                                  selectedProject === 1 ? 'bg-emerald-500/20 text-emerald-500' :
                                  selectedProject === 2 ? 'bg-blue-500/20 text-blue-500' :
                                  selectedProject === 3 ? 'bg-indigo-500/20 text-indigo-500' :
                                  'bg-purple-500/20 text-purple-500'
                                }`}
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Features list - now showing all features */}
                      <div className="mb-8">
                        <ul className="inline-block text-left">
                          {project.features.map((feature, i) => (
                            <li key={i} className="flex items-start mb-3">
                              <span className={`${
                                selectedProject === 1 ? 'text-emerald-500' :
                                selectedProject === 2 ? 'text-blue-500' :
                                selectedProject === 3 ? 'text-indigo-500' :
                                'text-purple-500'
                              } mt-1 mr-2`}>•</span>
                              <span className="text-sm text-foreground/70">
                                {feature}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Links */}
                      <div className="flex flex-wrap gap-3 justify-center">
                        <a 
                          href={project.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`px-4 py-3  text-base font-medium flex items-center justify-center gap-2 flex-1
                            ${
                              selectedProject === 1 
                                ? 'bg-emerald-500 text-white' :
                              'bg-purple-500 text-white'
                            }`}
                          onClick={(e) => e.stopPropagation()}
                        >
                          <ExternalLink className="w-4 h-4" />
                          {t.projects.viewProject}
                        </a>
                        <button 
                          className="px-4 py-3 text-base font-medium flex items-center justify-center gap-2 flex-1 border border-white/20 bg-white/5"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleCloseExpanded();
                          }}
                        >
                          <X className="w-4 h-4" />
                          {t.projects.close}
                        </button>
                      </div>
                    </div>
                  </div>
                );
              }
            })()
          ) : null}
        </div>
      </div>
    </section>
  );
}
