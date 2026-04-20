"use client";
import { useState, useEffect } from "react";
import { Phone, Menu, X, Truck } from "lucide-react";
import { useLang } from "@/context/LangContext";
import LangSwitcher from "./LangSwitcher";

const PHONE = "+17862604143";

export default function Navbar() {
  const { t } = useLang();
  const [open,    setOpen]    = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const goTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setOpen(false);
  };

  const links = [
    ["navHome",     "inicio"],
    ["navServices", "servicios"],
    ["navGallery",  "galeria"],
    ["navAbout",    "nosotros"],
    ["navContact",  "contacto"],
  ];

  return (
    <header
      style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        background:    scrolled ? "rgba(8,12,26,.97)" : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        borderBottom:  scrolled ? "1px solid rgba(249,115,22,.15)" : "none",
        transition: "all 0s",
      }}
    >
      <nav style={{ maxWidth: 1200, margin: "0 auto", padding: "0 1.5rem", display: "flex", alignItems: "center", justifyContent: "space-between", height: 70, gap: 12 }}>

        {/* Logo */}
        <div onClick={() => goTo("inicio")} style={{ display: "flex", alignItems: "center", gap: 5, cursor: "pointer", flexShrink: 0 }}>
          <div style={{ width: 50, height: "auto", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <img src="/logo.png" alt="" />
          </div>
          <div>
            <div style={{ color: "#fff", fontWeight: 800, fontSize: 18 }}>HERNANDEZ<span style={{ color: "#f97316" }}>TRUCK</span></div>
            <div style={{ color: "#94a3b8", fontSize: 9, letterSpacing: 2, fontWeight: 600 }}>{t("logoSub")}</div>
          </div>
        </div>

        {/* Desktop links */}
        <ul className="desk-nav" style={{ display: "flex", gap: "1.5rem", listStyle: "none" }}>
          {links.map(([k, id]) => (
            <li key={k}>
              <button onClick={() => goTo(id)} style={{ background: "none", border: "none", cursor: "pointer", color: "#94a3b8", fontSize: 14, fontWeight: 600, fontFamily: "inherit", transition: "color .2s" }}
                onMouseEnter={e => { e.target.style.color = "#f97316"; }}
                onMouseLeave={e => { e.target.style.color = "#94a3b8"; }}>
                {t(k)}
              </button>
            </li>
          ))}
        </ul>

        {/* Right */}
        <div style={{ display: "flex", alignItems: "center", gap: 10, flexShrink: 0 }}>
          <div className="desk-lang"><LangSwitcher /></div>
          <a href={`tel:${PHONE}`} style={{ display: "flex", alignItems: "center", gap: 8, background: "#f97316", color: "#fff", padding: "9px 18px", borderRadius: 8, textDecoration: "none", fontWeight: 700, fontSize: 13, boxShadow: "0 4px 14px rgba(249,115,22,.4)" }}>
            <Phone size={14} />{t("navCta")}
          </a>
          <button onClick={() => setOpen(!open)} className="burger" style={{ background: "rgba(255,255,255,.05)", border: "1px solid rgba(255,255,255,.1)", borderRadius: 8, padding: "8px 10px", cursor: "pointer", color: "#fff", display: "none" }}>
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div style={{ background: "rgba(8,12,26,.99)", borderTop: "1px solid rgba(249,115,22,.12)", padding: "1rem 1.5rem 1.5rem" }}>
          <div style={{ paddingBottom: "1rem", borderBottom: "1px solid rgba(255,255,255,.05)", marginBottom: ".5rem" }}>
            <LangSwitcher />
          </div>
          {links.map(([k, id]) => (
            <button key={k} onClick={() => goTo(id)} style={{ display: "block", width: "100%", textAlign: "left", background: "none", border: "none", color: "#94a3b8", fontSize: 16, padding: "12px 0", cursor: "pointer", borderBottom: "1px solid rgba(255,255,255,.05)", fontFamily: "inherit", fontWeight: 500 }}>
              {t(k)}
            </button>
          ))}
        </div>
      )}
    </header>
  );
}
