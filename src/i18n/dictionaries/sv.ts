import type { Dictionary } from "@i18n/dictionaries/en";

/** Swedish dictionary. Typed against `Dictionary`, so a missing key is a build error. */
export const sv: Dictionary = {
  meta: {
    title: "Lukas Hedström — Designer & Utvecklare",
    description:
      "Portfolio för Lukas Hedström, systemutvecklare och designer i Umeå. Frontend med Angular, React och Next.js.",
  },

  common: {
    otherLocaleLabel: "EN",
    switchLanguage: "Switch to English — byt till engelska",
    toggleTheme: "Växla mellan ljust och mörkt läge",
  },

  nav: {
    about: "Om mig",
    projects: "Projekt",
    contact: "Kontakt",
  },

  hero: {
    title: "Designer & Utvecklare",
    roleScreenReader: "Angular",
    role: "Utvecklare",
    company: "Biometria",
    portraitAlt: "Porträtt av Lukas Hedström",
  },

  about: {
    heading: "Där kreativitet möter teknik",
    intro:
      "Jag har en bakgrund inom interaktionsteknik och design och arbetar i dag som systemutvecklare på Biometria, där jag jobbar med Angular i frontend. Det här är de tre områden jag har fokuserat på genom studier, arbete och egna projekt.",
    cards: {
      ux: {
        title: "UX-designer",
        subtitle: "Grunden",
        description:
          "UX är kärnan i hur jag angriper utveckling. Med en bakgrund inom användarcentrerad design, tillgänglighet och verktyg som <hl>Figma</hl> fokuserar jag på att göra digitala upplevelser intuitiva och funktionella. Att förstå vad som gör design bra hjälper mig att överbrygga glappet mellan användare och teknik.",
      },
      frontend: {
        title: "Frontendutvecklare",
        subtitle: "Fokuset",
        description:
          "Jag trivs med moderna webbramverk som <hl>React</hl>, <hl>Next.js</hl> och <hl>React Native</hl>, och med att bygga intuitiva och skalbara gränssnitt. Frontend är där design och logik möts, och jag är särskilt intresserad av prestandaoptimering, tillgänglighet och sömlösa användarupplevelser.",
      },
      fullstack: {
        title: "Full stack-resan",
        subtitle: "Målet",
        description:
          "Frontend är mitt huvudfokus, men jag vill bredda mig mot full stack, särskilt när det gäller <hl>API:er</hl>, <hl>databaser</hl> och prestandadrivna arkitekturer. Mer kunskap om backend hjälper mig att bygga mer heltäckande och effektiva webbapplikationer.",
      },
    },
    cta: "Mer om mig",
  },

  projects: {
    wipBadge: "Pågående arbete",
    wipNotice:
      "Platshållare — projektet är inte klart än, så texten nedan beskriver vad det är tänkt att bli.",
    viewDemo: "Visa demo",
    viewProject: "Visa projekt",
    comingSoon: "Kommer snart",
    close: "Stäng",
    items: {
      pokedle: {
        title: "Pokedle.day",
        description: "Dagligt Pokémon-gissningsspel",
        fullDescription:
          "Ett dagligt Pokémon-gissningsspel inspirerat av Wordle, byggt med Next.js 15 och TypeScript. Spelet har ett heltäckande jämförelsesystem för flera Pokémon-egenskaper, stegvisa ledtrådar, autocomplete-sökning och statistik med streaks.",
        features: [
          "Dagligt Pokémon-gissningsspel med Wordle-inspirerad mekanik",
          "Heltäckande jämförelsesystem för flera Pokémon-egenskaper",
          "Stegvisa ledtrådar som låses upp vid 10 och 15 gissningar",
          "Autocomplete-sökning med filtrerade förslag",
          "Daglig shiny-Pokémon baserad på seedad slumpgenerering",
          "Mobilanpassad design med fokus på tillgänglighet",
        ],
      },
      placeholder2: {
        title: "Projekt 2",
        description: "Planerat — e-handelsplattform",
        fullDescription:
          "En planerad e-handelsplattform med produktkatalog, varukorg, säker kassa och användarkonton. Tanken är att integrera Stripe för betalningar och ett headless CMS för innehållet.",
        features: [
          "Produktkatalog med avancerad filtrering",
          "Varukorg med sparat innehåll mellan besök",
          "Säker kassa med Stripe-integration",
          "Användarkonton och orderhistorik",
          "Innehållshantering med Sanity CMS",
          "Responsiv design för alla enheter",
        ],
      },
      placeholder3: {
        title: "Projekt 3",
        description: "Planerat — mobile first-app",
        fullDescription:
          "En planerad mobile first-applikation med responsiv design som ska ge en bra upplevelse på alla enheter. Konceptet omfattar offlinestöd, push-notiser och appliknande interaktioner.",
        features: [
          "Fungerar på både iOS och Android",
          "Offlinestöd med lokal datalagring",
          "Push-notiser för att engagera användarna",
          "Mjuka, appliknande övergångar och animationer",
          "Responsiva layouter för alla skärmstorlekar",
          "Integration med Firebase i backend",
        ],
      },
      halls: {
        title: "Halls of Despair",
        description: "Skräckspel i PS1-stil",
        fullDescription:
          "Ett survival horror-spel i PS1/PSX-stil, byggt från grunden i Godot 4. Alla texturer, modeller och riggar är gjorda i Blender, Krita och Laigter. Spelet har AI-pathfinding, tredjepersonsstyrning, lowpoly-grafik och stämningsfull ljussättning i en fängelsehålemiljö.",
        features: [
          "AI-pathfinding och navigationssystem för fiender",
          "Egen 3D-karaktär med rigg och animationer",
          "Lowpoly-estetik inspirerad av PS1/PSX",
          "Dynamisk ljussättning med egna fackeleffekter",
          "Skräckfokuserat spelupplägg inspirerat av Slender",
          "Helt egenbyggd fängelsehålemiljö",
        ],
      },
    },
  },

  contact: {
    heading: "Hör av dig!",
    intro:
      "Oavsett om du har ett projekt på gång eller bara vill snacka teknik och design är jag alltid nyfiken på att träffa likasinnade.",
    note: "Jag byggde den här sidan 2025 när jag sökte sommarjobb, examensarbete och en första heltidsroll. I dag arbetar jag som systemutvecklare på Biometria och använder Angular i frontend.",
    email: {
      title: "E-post",
      subtitle: "Direktkontakt",
      copy: "Kopiera",
      copied: "Kopierad!",
      copyAria: "Kopiera e-postadressen",
      copiedAria: "E-postadressen är kopierad",
      open: "Öppna",
    },
    linkedin: {
      title: "LinkedIn",
      subtitle: "Anslut gärna",
      visit: "Besök profilen",
    },
    resume: {
      title: "CV",
      year: "(2025)",
      subtitle: "Ladda ner eller förhandsgranska mitt CV",
      download: "Ladda ner",
      preview: "Förhandsgranska",
    },
  },

  footer: {
    pronunciation: "[heːdˈstrøm]",
    location: "Umeå, Sverige",
    localTime: "Lokal tid:",
    builtWith: "Byggd med",
    connect: "Kontakt",
    backToTop: "Till toppen",
  },

  aboutPage: {
    heading: "Om mig",
    intro:
      "Jag är systemutvecklare på Biometria och arbetar med Angular i frontend. Utanför jobbet håller jag på med foto, speldesign och egna webbprojekt.",
    imageNote: "Alla bilder är tagna av mig",
    sections: {
      beginning: {
        title: "Början",
        subtitle: "Lite om mig",
        content:
          "Jag är född i Varberg på västkusten. Som barn lade jag mycket tid på att bygga med Lego och sitta vid datorn. Det intresset växte så småningom till foto, digital design och utveckling.",
        imageAlt: "Bild från min egen resa",
      },
      background: {
        title: "Bakgrunden",
        subtitle: "Utbildning & erfarenhet",
        content:
          "Min bakgrund är inom interaktionsteknik och design vid Umeå universitet, där jag arbetade med både grupprojekt och egna projekt. I dag arbetar jag som systemutvecklare på Biometria och använder Angular i frontend. Jag är social av mig och oftast ganska pratglad med dem jag jobbar med.",
        imageAlt: "Bild kopplad till utbildningen",
      },
      journey: {
        title: "Resan",
        subtitle: "Där allting började",
        content:
          "Jag kom in på utveckling genom ett intresse för webbsidor och spel. Jag började med HTML och CSS samtidigt som jag höll på med moddning och spelutveckling. Egna projekt har varit det som lärt mig mest om hur design och implementation hänger ihop.",
        imageAlt: "Bild som illustrerar resan",
      },
      approach: {
        title: "Arbetssättet",
        subtitle: "Så jobbar jag",
        content:
          "Jag brukar börja med att förstå problemet och planera en första version. Sedan prototypar, testar och förfinar jag. Jag bryr mig om underhållbar kod, bra prestanda och gränssnitt som fungerar på alla enheter. Ibland hamnar jag på djupt vatten, men det brukar lösa sig.",
        imageAlt: "Bild som illustrerar arbetssättet",
      },
      learning: {
        title: "Lärandet",
        subtitle: "Aldrig färdiglärd",
        content:
          "Jag lär mig bäst genom att testa själv. Jag håller mig uppdaterad inom webbutveckling och AI, är aktiv i techcommunities och håller fortfarande på med moddprojekt. Att läsa hjälper, men det är när jag bygger något som kunskapen fastnar.",
        imageAlt: "Bild som illustrerar lärande",
      },
      stack: {
        title: "Stacken",
        subtitle: "Verktygen jag väljer",
        content:
          "På Biometria arbetar jag med Angular och TypeScript i frontend. I egna projekt använder jag även React, Next.js och Tailwind CSS. Jag använder Git och Figma när det behövs och har jobbat med state management, responsiva layouter och tillgänglighet.",
        imageAlt: "Bild som illustrerar tekniken jag använder",
      },
      vision: {
        title: "Visionen",
        subtitle: "Blicken framåt",
        content:
          "Jag vill fortsätta bli bättre på frontend, särskilt där design, tillgänglighet och implementation möts. Jag är också nyfiken på systemen runt omkring frontend och på att testa nya verktyg när de löser ett riktigt problem.",
        imageAlt: "Bild som illustrerar blicken framåt",
      },
    },
  },

  notFound: {
    title: "Sidan hittades inte",
    description: "Sidan du letade efter finns inte.",
    cta: "Tillbaka till start",
  },
};
