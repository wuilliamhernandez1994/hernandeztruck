"use client";
import { Phone, MessageCircle, ChevronDown } from "lucide-react";
import { useLang } from "@/context/LangContext";

const PHONE    = "+17862604143";
const WHATSAPP = "17862604143";

export default function Hero() {
  const { t } = useLang();
  const waMsg = encodeURIComponent(
    t("heroCta1") === "Request service"
      ? "Hello, I need urgent mechanical assistance."
      : "Hola, necesito asistencia mecánica urgente."
  );

  return (
    <section id="inicio" style={{ minHeight: "100vh", position: "relative", overflow: "hidden", display: "flex", alignItems: "center", background: "#080c1a" }}>
      {/* Grid bg */}
      <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(249,115,22,.04) 1px,transparent 1px),linear-gradient(90deg,rgba(249,115,22,.04) 1px,transparent 1px)", backgroundSize: "60px 60px" }} />
      <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 80% 60% at 50% 0%,rgba(249,115,22,.12) 0%,transparent 70%)" }} />

      {/* Truck silhouette */}
      <div style={{ position: "absolute", right: "-2%", bottom: "4%", width: "52%", maxWidth: 680, opacity: .055 }}>
        <svg viewBox="0 0 800 380" fill="#f97316"><rect x="190" y="90" width="510" height="200" rx="14"/><rect x="80" y="130" width="165" height="165" rx="14"/><rect x="115" y="148" width="108" height="78" rx="6" fill="#080c1a"/><circle cx="245" cy="320" r="48"/><circle cx="590" cy="320" r="48"/><circle cx="700" cy="320" r="36"/></svg>
      </div>

      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "120px 1.5rem 4rem", position: "relative", zIndex: 1 }}>
        <div style={{ maxWidth: 680 }}>
          {/* Badge */}
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(249,115,22,.1)", border: "1px solid rgba(249,115,22,.28)", borderRadius: 99, padding: "6px 16px", marginBottom: "1.5rem" }}>
            <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#22c55e", boxShadow: "0 0 8px #22c55e" }} />
            <span style={{ color: "#f97316", fontSize: 11, fontWeight: 700, letterSpacing: 1.5 }}>{t("heroBadge")}</span>
          </div>

          <h1 style={{ fontWeight: 900, lineHeight: 1.05, marginBottom: "1.5rem", letterSpacing: "-1.5px" }}>
            <span style={{ display: "block", fontSize: "clamp(2.8rem,7vw,5.5rem)", color: "#fff" }}>{t("heroLine1")}</span>
            <span style={{ display: "block", fontSize: "clamp(2.8rem,7vw,5.5rem)", color: "#f97316" }}>{t("heroLine2")}</span>
            <span style={{ display: "block", fontSize: "clamp(1.5rem,4vw,2.8rem)", color: "#94a3b8", fontWeight: 600 }}>{t("heroLine3")}</span>
          </h1>

          <p style={{ color: "#94a3b8", fontSize: "clamp(1rem,2.5vw,1.15rem)", lineHeight: 1.75, marginBottom: "2.5rem", maxWidth: 520 }}>{t("heroP")}</p>

          <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
            <a href={`https://wa.me/${WHATSAPP}?text=${waMsg}`} target="_blank" rel="noreferrer"
              style={{ display: "flex", alignItems: "center", gap: 10, background: "#f97316", color: "#fff", padding: "14px 28px", borderRadius: 10, textDecoration: "none", fontWeight: 800, fontSize: 15, boxShadow: "0 6px 24px rgba(249,115,22,.45)" }}>
              <MessageCircle size={18} />{t("heroCta1")}
            </a>
            <a href={`tel:${PHONE}`}
              style={{ display: "flex", alignItems: "center", gap: 10, background: "rgba(255,255,255,.05)", border: "1px solid rgba(255,255,255,.15)", color: "#fff", padding: "14px 28px", borderRadius: 10, textDecoration: "none", fontWeight: 700, fontSize: 15 }}>
              <Phone size={18} />{t("heroCta2")}
            </a>
          </div>

          <div style={{ display: "flex", gap: "2.5rem", marginTop: "3.5rem", flexWrap: "wrap" }}>
            {[["500+", "stat1"], ["15+", "stat2"], ["24/7", "stat3"]].map(([n, k]) => (
              <div key={k}>
                <div style={{ color: "#f97316", fontSize: "1.9rem", fontWeight: 900, lineHeight: 1 }}>{n}</div>
                <div style={{ color: "#64748b", fontSize: 12, marginTop: 4, fontWeight: 500 }}>{t(k)}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{ position: "absolute", bottom: "2rem", left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: 6, opacity: .4 }}>
        <span style={{ color: "#94a3b8", fontSize: 10, letterSpacing: 2 }}>SCROLL</span>
        <ChevronDown size={18} color="#94a3b8" />
      </div>
    </section>
  );
}
