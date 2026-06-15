"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { getMessages, type Lang, type Messages } from "./messages";

type LocaleField<T = string> = { en?: T | null; vi?: T | null } | null | undefined;

interface LangContextValue {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: Messages;
  /** Resolve a Sanity-style localized field for the active language. */
  loc: <T = string>(field: LocaleField<T>, fallback?: T) => T | undefined;
}

const LangContext = createContext<LangContextValue | null>(null);

const STORAGE_KEY = "tp-lang";

export function LangProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>("EN");

  // Restore persisted preference on mount (client only — avoids hydration drift).
  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored === "EN" || stored === "VI") {
      // Syncing React state from a browser API (localStorage) on mount.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setLangState(stored);
    }
  }, []);

  // Keep <html lang> and storage in sync with the active language.
  useEffect(() => {
    document.documentElement.lang = lang === "VI" ? "vi" : "en";
    window.localStorage.setItem(STORAGE_KEY, lang);
  }, [lang]);

  const setLang = (next: Lang) => setLangState(next);

  const loc = useMemo(() => {
    return function resolve<T = string>(field: LocaleField<T>, fallback?: T) {
      if (!field) return fallback;
      const value = lang === "VI" ? field.vi ?? field.en : field.en ?? field.vi;
      return (value ?? fallback) as T | undefined;
    };
  }, [lang]);

  const value = useMemo<LangContextValue>(
    () => ({ lang, setLang, t: getMessages(lang), loc }),
    [lang, loc],
  );

  return <LangContext.Provider value={value}>{children}</LangContext.Provider>;
}

export function useLang(): LangContextValue {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error("useLang must be used within a LangProvider");
  return ctx;
}
