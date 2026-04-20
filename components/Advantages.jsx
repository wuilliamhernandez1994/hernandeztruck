"use client";
import { Zap, Shield, MapPin, Star, Gauge, Clock } from "lucide-react";
import { useLang } from "@/context/LangContext";

export default function Advantages() {
  const { t } = useLang();
  const items = [
    [Zap,    "a1t", "a1d"],
    [Shield, "a2t", "a2d"],
    [MapPin, "a3t", "a3d"],
    [Star,   "a4t", "a4d"],
    [Gauge,  "a5t", "a5d"],
    [Clock,  "a6t", "a6d"],
  ];
  return (
    <section style={{ background: "#0d1220", padding: "100px 0" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 1.5rem" }}>
        <div style={{ textAlign: "center", marginBottom: "4rem" }}>
          <span style={{ color: "#f97316", fontSize: 11, fontWeight: 700, letterSpacing: 3, display: "block", marginBottom: 12 }}>{t("advLabel")}</span>
          <h2 style={{ color: "#f1f5f9", fontSize: "clamp(2rem,5vw,3rem)", fontWeight: 900, letterSpacing: "-1px", margin: 0 }}>{t("advH2")}</h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: "1.5rem" }}>
          {items.map(([Icon, tk, dk]) => (
            <div key={tk} style={{ display: "flex", gap: "1rem", alignItems: "flex-start" }}>
              <div style={{ width: 46, height: 46, borderRadius: 12, flexShrink: 0, background: "rgba(249,115,22,.1)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Icon size={22} color="#f97316" />
              </div>
              <div>
                <h3 style={{ color: "#f1f5f9", fontSize: 15, fontWeight: 700, marginBottom: 6 }}>{t(tk)}</h3>
                <p style={{ color: "#64748b", fontSize: 13, lineHeight: 1.65, margin: 0 }}>{t(dk)}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
