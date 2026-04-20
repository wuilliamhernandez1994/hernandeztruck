"use client";
import { createContext, useContext, useState } from "react";
import translations from "@/lib/translations";

const LangCtx = createContext(null);

export function LangProvider({ children }) {
  const [lang, setLang] = useState("es");
  const t = (key) => translations[lang][key] ?? key;
  return (
    <LangCtx.Provider value={{ lang, setLang, t }}>
      {children}
    </LangCtx.Provider>
  );
}

export const useLang = () => useContext(LangCtx);
