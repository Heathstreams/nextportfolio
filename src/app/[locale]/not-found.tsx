"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useI18n } from "@i18n/I18nProvider";

export default function NotFound() {
  const { t, href } = useI18n();

  return (
    <section className="min-h-screen bg-background flex flex-col items-center justify-center px-6 text-center">
      <h1 className="text-4xl sm:text-5xl font-display font-bold mb-4">
        <span className="bg-gradient-to-r from-emerald-500 to-indigo-500 text-transparent bg-clip-text">
          {t.notFound.title}
        </span>
      </h1>
      <p className="text-lg text-foreground/60 mb-8">{t.notFound.description}</p>
      <Link
        href={href("/")}
        className="group inline-flex items-center gap-2 px-6 py-2.5 text-lg rounded-full bg-white/10 backdrop-blur-sm transition-transform duration-300 hover:scale-[1.02]"
      >
        <span className="bg-gradient-to-r from-emerald-500 via-blue-500 to-indigo-500 text-transparent bg-clip-text font-medium">
          {t.notFound.cta}
        </span>
        <ArrowRight className="w-5 h-5 text-indigo-500 group-hover:translate-x-1 transition-transform duration-300" />
      </Link>
    </section>
  );
}
