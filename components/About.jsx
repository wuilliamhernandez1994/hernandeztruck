"use client";
// ── About ────────────────────────────────────────────────────────────────────
import { Award, Users, Clock, Truck, ArrowRight } from "lucide-react";
import { useLang } from "@/context/LangContext";

const PHONE = "+17862604143";

export default function About() {
  const { t } = useLang();
  const feats = [
    [Award, "f1t", "f1d"],
    [Users, "f2t", "f2d"],
    [Clock, "f3t", "f3d"],
    [Truck, "f4t", "f4d"],
  ];
  return (
    <section id="nosotros" style={{ background: "#080c1a", padding: "100px 0" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 1.5rem" }}>
        <div className="about-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "5rem", alignItems: "center" }}>
          <div>
            <span style={{ color: "#f97316", fontSize: 11, fontWeight: 700, letterSpacing: 3, display: "block", marginBottom: 12 }}>{t("aboutLabel")}</span>
            <h2 style={{ color: "#f1f5f9", fontSize: "clamp(2rem,4vw,2.8rem)", fontWeight: 900, letterSpacing: "-1px", marginBottom: "1.5rem", lineHeight: 1.1 }}>
              {t("aboutH2")}<span style={{ color: "#f97316" }}>{t("aboutH2b")}</span>
            </h2>
            <p style={{ color: "#94a3b8", lineHeight: 1.8, marginBottom: "1.5rem" }}>{t("aboutP1")}</p>
            <p style={{ color: "#94a3b8", lineHeight: 1.8, marginBottom: "2rem" }}>{t("aboutP2")}</p>
            <a href={`tel:${PHONE}`} style={{ display: "inline-flex", alignItems: "center", gap: 8, color: "#f97316", textDecoration: "none", fontWeight: 700, fontSize: 15, borderBottom: "2px solid rgba(249,115,22,.3)", paddingBottom: 4 }}>
              {t("aboutLink")} <ArrowRight size={16} />
            </a>
          </div>
          <div className="feat-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
            {feats.map(([Icon, tk, dk]) => (
              <div key={tk} style={{ background: "rgba(255,255,255,.03)", border: "1px solid rgba(255,255,255,.07)", borderRadius: 14, padding: "1.25rem" }}>
                <Icon size={26} color="#f97316" style={{ marginBottom: 10 }} />
                <h4 style={{ color: "#f1f5f9", fontSize: 14, fontWeight: 700, marginBottom: 6, lineHeight: 1.3 }}>{t(tk)}</h4>
                <p style={{ color: "#64748b", fontSize: 12, lineHeight: 1.65, margin: 0 }}>{t(dk)}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
