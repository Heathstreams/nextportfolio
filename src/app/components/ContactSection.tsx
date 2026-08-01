"use client";

import { 
  Mail, 
  Copy, 
  Download, 
  Eye, 
  ExternalLink
} from "lucide-react";
import { useState } from "react";
import LinkedInIcon from "@components/LinkedInIcon";
import { useI18n } from "@i18n/I18nProvider";

export default function ContactSection() {
  const [emailCopied, setEmailCopied] = useState(false);
  const { t } = useI18n();

  const handleEmailCopy = () => {
    navigator.clipboard.writeText('hello@lukashedstrom.com').then(() => {
      setEmailCopied(true);
      setTimeout(() => setEmailCopied(false), 2000);
    });
  };

  return (
    <section id="contact" className="w-full min-h-screen bg-background px-4 sm:px-6 py-12 sm:py-20">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-8 sm:mb-16">
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-display font-bold mb-4 sm:mb-6 relative">
            <span className="bg-gradient-to-r from-emerald-500 to-indigo-500 text-transparent bg-clip-text 
              relative z-10 drop-shadow-[0_2px_10px_rgba(99,102,241,0.2)]">
              {t.contact.heading}
            </span>
          </h2>
          <p className="text-base sm:text-lg text-foreground/60 max-w-2xl mx-auto px-4">
            {t.contact.intro}
          </p>
        </div>

        <div className="space-y-6 sm:space-y-8">
          <div className="group bg-gradient-to-b from-teal-500/10 to-blue-500/5 p-4 sm:p-8 backdrop-blur-sm">
            <div className="flex items-start gap-4 sm:gap-6 mb-4 sm:mb-6">
              <div className="flex-shrink-0 p-3 sm:p-4 bg-gradient-to-br from-teal-500 to-blue-500">
                <Mail className="w-4 sm:w-6 h-4 sm:h-6 text-white" style={{ filter: 'drop-shadow(0 0 4px rgba(255, 255, 255, 0.4))' }} />
              </div>
              <div>
                <h3 className="text-xl sm:text-2xl font-semibold mb-1 sm:mb-2">{t.contact.email.title}</h3>
                <p className="text-xs sm:text-sm text-teal-500 font-medium">{t.contact.email.subtitle}</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-2">
              <button
                onClick={handleEmailCopy}
                className="p-3 rounded-full  sm:p-4 bg-teal-500/10 hover:bg-teal-500/20 transition-colors flex-1 text-left"
              >
                <div className="flex items-center gap-2 sm:gap-3">
                  <Mail className="w-4 sm:w-5 h-4 sm:h-5 text-teal-600" style={{ filter: 'drop-shadow(0 0 3px rgba(255, 255, 255, 0.3))' }} />
                  <p className="text-base sm:text-xl font-medium text-teal-600 truncate">
                    hello@lukashedstrom.com
                  </p>
                </div>
              </button>
              <div className="flex gap-2 min-w-0 sm:flex-shrink-0">
                <button
                  onClick={handleEmailCopy}
                  className="p-3 rounded-full  sm:p-4 bg-teal-500/10 hover:bg-teal-500/20 transition-colors text-left flex-1 sm:flex-initial"
                  aria-label={emailCopied ? t.contact.email.copiedAria : t.contact.email.copyAria}
                >
                  <div className="flex items-center gap-2 sm:gap-3">
                    <Copy className={`w-4 sm:w-5 h-4 sm:h-5 ${emailCopied ? 'text-teal-600' : 'text-teal-500'}`} 
                          style={{ filter: 'drop-shadow(0 0 3px rgba(255, 255, 255, 0.3))' }} />
                    <p className={`text-base sm:text-xl font-medium ${emailCopied ? 'text-teal-600' : 'text-teal-500'}`}>
                      {emailCopied ? t.contact.email.copied : t.contact.email.copy}
                    </p>
                  </div>
                </button>
                <a
                  href="mailto:hello@lukashedstrom.com"
                  className="p-3 rounded-full  sm:p-4 bg-teal-500/10 hover:bg-teal-500/20 transition-colors text-left flex-1 sm:flex-initial"
                >
                  <div className="flex items-center gap-2 sm:gap-3">
                    <ExternalLink className="w-4 sm:w-5 h-4 sm:h-5 text-teal-500" style={{ filter: 'drop-shadow(0 0 3px rgba(255, 255, 255, 0.3))' }} />
                    <p className="text-base sm:text-xl font-medium text-teal-500">
                      {t.contact.email.open}
                    </p>
                  </div>
                </a>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            <div className="group bg-gradient-to-b from-blue-500/10 to-blue-500/5 p-4 sm:p-8 backdrop-blur-sm">
              <div className="flex flex-col h-full">
                <div className="flex items-start gap-4 sm:gap-6 mb-4 sm:mb-6">
                  <div className="flex-shrink-0 p-3 sm:p-4 bg-gradient-to-br from-blue-500 to-indigo-500">
                    <LinkedInIcon className="w-4 sm:w-6 h-4 sm:h-6 text-white" style={{ filter: 'drop-shadow(0 0 4px rgba(255, 255, 255, 0.4))' }} />
                  </div>
                  <div>
                    <h3 className="text-xl sm:text-2xl font-semibold mb-1 sm:mb-2">{t.contact.linkedin.title}</h3>
                    <p className="text-xs sm:text-sm text-blue-500 font-medium">{t.contact.linkedin.subtitle}</p>
                  </div>
                </div>
                <a
                  href="https://linkedin.com/in/lukashedstrom"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 sm:p-4 rounded-full  bg-blue-500/10 hover:bg-blue-500/20 transition-colors mb-2 w-full text-left"
                >
                  <div className="flex  items-center gap-2 sm:gap-3">
                    <LinkedInIcon className="w-4 sm:w-5 h-4 sm:h-5 text-blue-500" style={{ filter: 'drop-shadow(0 0 3px rgba(255, 255, 255, 0.3))' }} />
                    <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                      <p className="text-base  sm:text-xl font-medium text-blue-500 flex items-center gap-1 sm:gap-2">
                        {t.contact.linkedin.visit}
                        <ExternalLink className="w-3 sm:w-4 h-3 sm:h-4" style={{ filter: 'drop-shadow(0 0 3px rgba(255, 255, 255, 0.3))' }} />
                      </p>
                      <span className="text-xs sm:text-sm text-blue-400/70 font-light hidden sm:block">- Lukas Hedström</span>
                    </div>
                  </div>
                </a>
              </div>
            </div>

            <div className="group bg-gradient-to-b from-indigo-500/10 to-indigo-500/5 p-4 sm:p-8 backdrop-blur-sm">
              <div className="flex flex-col h-full">
                <div className="flex items-start gap-4 sm:gap-6 mb-4 sm:mb-6">
                  <div className="flex-shrink-0 p-3 sm:p-4 bg-gradient-to-br from-indigo-500 to-purple-500">
                    <Download className="w-4 sm:w-6 h-4 sm:h-6 text-white" style={{ filter: 'drop-shadow(0 0 4px rgba(255, 255, 255, 0.4))' }} />
                  </div>
                  <div>
                    <h3 className="text-xl sm:text-2xl font-semibold mb-1 sm:mb-2">
                      {t.contact.resume.title} <span className="text-xs text-indigo-400/80 font-medium align-middle">{t.contact.resume.year}</span>
                    </h3>
                    <p className="text-xs sm:text-sm text-indigo-500 font-medium">{t.contact.resume.subtitle}</p>
                  </div>
                </div>
                {/* Stacked until there is room for both labels side by side:
                    the card is narrow in the 2-column grid and "Förhandsgranska"
                    is far wider than "Preview". */}
                <div className="flex flex-col lg:flex-row gap-2">
                  <a
                    href="/cv.pdf" 
                    download
                    className="p-3 rounded-full sm:p-4 bg-indigo-500/10 hover:bg-indigo-500/20 transition-colors flex-1 min-w-0 text-left"
                  >
                    <div className="flex items-center gap-2 sm:gap-3 min-w-0">
                      <Download className="w-4 sm:w-5 h-4 sm:h-5 flex-shrink-0 text-indigo-500" style={{ filter: 'drop-shadow(0 0 3px rgba(255, 255, 255, 0.3))' }} />
                      <p className="text-base sm:text-xl font-medium text-indigo-500 truncate">
                        {t.contact.resume.download}
                      </p>
                    </div>
                  </a>
                  <a 
                    href="/cv.pdf" 
                    target="_blank"
                    className="p-3 rounded-full  sm:p-4 bg-indigo-500/10 hover:bg-indigo-500/20 transition-colors flex-1 min-w-0 text-left"
                  >
                    <div className="flex items-center justify-between gap-2 sm:gap-3 min-w-0">
                      <div className="flex items-center gap-2 sm:gap-3 min-w-0">
                        <Eye className="w-4 sm:w-5 h-4 sm:h-5 flex-shrink-0 text-indigo-500" style={{ filter: 'drop-shadow(0 0 3px rgba(255, 255, 255, 0.3))' }} />
                        <p className="text-base sm:text-xl font-medium text-indigo-500 truncate">
                          {t.contact.resume.preview}
                        </p>
                      </div>
                      <ExternalLink className="w-3 sm:w-4 h-3 sm:h-4 flex-shrink-0 text-indigo-500" style={{ filter: 'drop-shadow(0 0 3px rgba(255, 255, 255, 0.3))' }} />
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
