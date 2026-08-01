/**
 * English dictionary. This file is the source of truth for the dictionary shape:
 * `Dictionary` is derived from it, so every other locale is checked against it.
 *
 * Text wrapped in <hl>…</hl> is rendered as a highlighted span, see `@i18n/rich`.
 */
export const en = {
  meta: {
    title: "Lukas Hedström — Designer & Developer",
    description:
      "Portfolio of Lukas Hedström, a software developer and designer based in Umeå, Sweden. Frontend work with Angular, React and Next.js.",
  },

  common: {
    /** Label on the language button: the language you switch *to*. */
    otherLocaleLabel: "SV",
    switchLanguage: "Byt till svenska — switch to Swedish",
    toggleTheme: "Toggle light and dark mode",
  },

  nav: {
    about: "About",
    projects: "Projects",
    contact: "Contact",
  },

  hero: {
    title: "Designer & Developer",
    roleScreenReader: "Angular",
    role: "SWE",
    /** Spoken connector between role and company; the arrow is decorative. */
    at: "at",
    company: "Biometria",
    portraitAlt: "Portrait of Lukas Hedström",
  },

  about: {
    heading: "Bridging Creativity & Technology",
    intro:
      "I have a background in Interaction Technology & Design and currently work as a software developer at Biometria, using Angular on the frontend. These are the three areas I have focused on across my studies, work, and personal projects.",
    cards: {
      ux: {
        title: "UX Designer",
        subtitle: "The Foundation",
        description:
          "UX is at the core of how I approach development. With a background in user-centered design, accessibility, and software like <hl>Figma</hl>, I focus on making digital experiences intuitive and functional. Understanding what makes design work helps me bridge the gap between users and technology.",
      },
      frontend: {
        title: "Front-End Developer",
        subtitle: "The Focus",
        description:
          "I enjoy working with modern web frameworks like <hl>React</hl>, <hl>Next.js</hl>, and <hl>React Native</hl>, building intuitive and scalable interfaces. Front-End development is where design and logic meet, and I'm particularly interested in performance optimization, accessibility, and creating seamless user experiences.",
      },
      fullstack: {
        title: "Full-Stack Journey",
        subtitle: "The Goal",
        description:
          "While Front-End is my main focus, I'm interested in expanding my Full-Stack knowledge, especially when it comes to <hl>APIs</hl>, <hl>databases</hl>, and performance-driven architectures. Learning more about the backend will help me build more holistic and efficient web applications.",
      },
    },
    cta: "More about me",
  },

  projects: {
    wipBadge: "Work in progress",
    viewDemo: "View Demo",
    viewProject: "View Project",
    close: "Close",
    /**
     * Copy for the reserved gallery slots. Deliberately says nothing about what
     * the project will be — there is nothing to show yet.
     */
    placeholder: {
      title: "New project",
      description: "In progress",
    },
    items: {
      pokedle: {
        title: "Pokedle.day",
        description: "Daily Pokémon guessing game",
        fullDescription:
          "A daily Pokémon guessing game inspired by Wordle, built with Next.js 15 and TypeScript. Features include a comprehensive comparison system for multiple Pokémon attributes, progressive hint system, autocomplete search, and streak tracking with game statistics.",
        features: [
          "Daily Pokémon guessing game with Wordle-inspired mechanics",
          "Comprehensive comparison system for multiple Pokémon attributes",
          "Progressive hint system unlocking at 10 and 15 guesses",
          "Autocomplete search with filtered suggestions",
          "Daily shiny Pokémon feature using seeded randomization",
          "Mobile-responsive design with accessibility features",
        ],
      },
      halls: {
        title: "Halls of Despair",
        description: "PS1-style horror game",
        fullDescription:
          "A PS1/PSX-style survival horror game developed from scratch using Godot 4. All textures, models, and rigging were created in Blender, Krita, and Laigter. The game features AI pathfinding, third-person character control, low-poly aesthetics, and atmospheric lighting in a dungeon environment.",
        features: [
          "AI pathfinding and enemy navigation system",
          "Custom 3D character model with rigging and animations",
          "Low-poly PS1/PSX-inspired visual aesthetic",
          "Dynamic lighting with custom torch effects",
          "Horror-focused gameplay inspired by Slender",
          "Fully custom dungeon environment creation",
        ],
      },
    },
  },

  contact: {
    heading: "Let's Connect!",
    intro:
      "Whether you have a project in mind or just want to chat about technology and design, I'm always excited to connect with like-minded individuals.",
    email: {
      title: "Email",
      subtitle: "Direct communication",
      copy: "Copy",
      copied: "Copied!",
      copyAria: "Copy email address",
      copiedAria: "Email address copied",
      open: "Open",
    },
    linkedin: {
      title: "LinkedIn",
      subtitle: "Let's connect",
      visit: "Visit Profile",
    },
    resume: {
      title: "Resume",
      year: "(2025)",
      subtitle: "Download or preview my CV",
      download: "Download",
      preview: "Preview",
    },
  },

  footer: {
    pronunciation: "[heːdˈstrøm] • Heath-Stream",
    location: "Umeå, Sweden",
    localTime: "Local time:",
    builtWith: "Built With",
    connect: "Connect",
    backToTop: "Back to Top",
    /** Colophon line: why this site exists. */
    colophon:
      "I built this site in 2025 while looking for a summer internship, a thesis project, and my first full-time role.",
  },

  aboutPage: {
    heading: "About Me",
    intro:
      "I am a software developer at Biometria and use Angular on the frontend. Outside work, I enjoy photography, game design, and personal web projects.",
    imageNote: "All images featured are from my personal photography collection",
    sections: {
      beginning: {
        title: "The Beginning",
        subtitle: "A bit about me",
        content:
          "I was born in Varberg on Sweden's west coast. As a kid, I spent a lot of time building with Lego and using computers. That interest later grew into photography, digital design, and development.",
        imageAlt: "Personal journey illustration",
      },
      background: {
        title: "The Background",
        subtitle: "Education & Experience",
        content:
          "My background is in Interaction Technology & Design at Umeå University, where I worked on both group and individual projects. I currently work as a software developer at Biometria and use Angular on the frontend. I am social by nature and usually quite talkative with the people I work with.",
        imageAlt: "Education background",
      },
      journey: {
        title: "The Journey",
        subtitle: "Where it all began",
        content:
          "I got into development through an interest in websites and games. I started with HTML and CSS while also spending time on game modding and development. Personal projects have been the main way I learned how design and implementation work together.",
        imageAlt: "Journey illustration",
      },
      approach: {
        title: "The Approach",
        subtitle: "How I work",
        content:
          "I usually start by understanding the problem and planning the first version. From there, I prototype, test, and refine. I care about maintainable code, good performance, and interfaces that work across devices. I sometimes end up in the deep end, but it usually works out.",
        imageAlt: "Work process illustration",
      },
      learning: {
        title: "The Learning",
        subtitle: "Never stop growing",
        content:
          "I learn best by trying things myself. I keep up with web development and AI, take part in tech communities, and still work on modding projects. Reading helps, but building something is usually what makes the knowledge stick.",
        imageAlt: "Learning journey",
      },
      stack: {
        title: "The Stack",
        subtitle: "Tools of choice",
        content:
          "At Biometria, I use Angular and TypeScript for frontend development. For personal projects, I also use React, Next.js, and Tailwind CSS. I use Git and Figma when needed and have worked with state management, responsive layouts, and accessibility.",
        imageAlt: "Technology stack illustration",
      },
      vision: {
        title: "The Vision",
        subtitle: "Looking forward",
        content:
          "I want to keep improving at frontend development, especially where design, accessibility, and implementation overlap. I am also interested in learning more about the systems around the frontend and trying new tools when they solve a real problem.",
        imageAlt: "Future vision illustration",
      },
    },
  },

  notFound: {
    title: "Page not found",
    description: "The page you were looking for does not exist.",
    cta: "Back to start",
  },
};

export type Dictionary = typeof en;
