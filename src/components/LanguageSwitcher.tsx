import { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Globe, Check } from "lucide-react";

const languages = [
  { code: "en", label: "English", native: "English" },
  { code: "hi", label: "Hindi", native: "हिन्दी" },
  { code: "gu", label: "Gujarati", native: "ગુજરાતી" },
];

export const LanguageSwitcher = () => {
  const { i18n, t } = useTranslation();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const currentLang = languages.find((l) => l.code === i18n.language) || languages[0];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const changeLang = (code: string) => {
    i18n.changeLanguage(code);
    setOpen(false);
  };

  return (
    <div ref={ref} className="fixed bottom-4 left-4 z-50">
      {/* Toggle button */}
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-2 rounded-full border border-border/70 bg-surface-card/90 px-3.5 py-2.5 text-sm font-medium text-foreground/80 shadow-lg backdrop-blur-xl transition-all duration-200 hover:border-primary/40 hover:text-primary hover:shadow-xl"
        aria-label={t("languageSwitcher.label")}
        aria-expanded={open}
      >
        <Globe className="h-4 w-4 text-primary" />
        <span className="hidden sm:inline">{currentLang.native}</span>
        <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground sm:hidden">
          {currentLang.code}
        </span>
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute bottom-full left-0 mb-2 w-44 rounded-2xl border border-border/60 bg-surface-card/95 p-1.5 shadow-2xl backdrop-blur-xl animate-in fade-in slide-in-from-bottom-2 duration-200">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => changeLang(lang.code)}
              className={`flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-150 ${
                i18n.language === lang.code
                  ? "bg-primary/10 text-primary"
                  : "text-foreground/70 hover:bg-primary/5 hover:text-foreground"
              }`}
            >
              <span className="flex items-center gap-2.5">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/8 text-xs font-bold text-primary">
                  {lang.code.toUpperCase()}
                </span>
                <span>{lang.native}</span>
              </span>
              {i18n.language === lang.code && <Check className="h-4 w-4 text-primary" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
