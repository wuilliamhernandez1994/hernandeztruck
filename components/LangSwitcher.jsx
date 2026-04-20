"use client";
import { useLang } from "@/context/LangContext";
import Flag from "react-world-flags";

export default function LangSwitcher() {
  const { lang, setLang } = useLang();
  return (
    <div style={{ display: "flex", background: "rgba(255,255,255,.06)", border: "1px solid rgba(255,255,255,.1)", borderRadius: 99, padding: 3, gap: 2 }}>
      {[{ c: "es", l: "ES", b: "es" }, { c: "en", l: "EN", b: "us" }].map(({ c, l, b }) => (
        <button
          key={c}
          onClick={() => setLang(c)}
          style={{
            border: "none", borderRadius: 99, padding: "5px 13px",
            fontWeight: 700, fontSize: 12, cursor: "pointer", fontFamily: "inherit",
            background: lang === c ? "#f97316" : "transparent",
            color: lang === c ? "#fff" : "#94a3b8",
            transition: "all .2s", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", gap: "5px"
          }}
        >
          
          {l}
          <Flag code={b} style={{ width: 20 }} />
        </button>
      ))}
    </div>
  );
}
