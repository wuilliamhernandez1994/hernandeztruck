"use client";
import { useState } from "react";
import { AlertTriangle, RotateCcw, Gauge, Battery, Fuel, Settings, Wrench, Zap, Shield, Eye, Cog, GitFork, Wind, Truck } from "lucide-react";
import { useLang } from "@/context/LangContext";

function SvcCard({ icon: Icon, tk, dk, highlight }) {
  const { t } = useLang();
  const [hov, setHov] = useState(false);
  return (
    <div onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{ background: hov ? "rgba(249,115,22,.06)" : "rgba(255,255,255,.03)", border: `1px solid ${hov ? "rgba(249,115,22,.3)" : highlight ? "rgba(249,115,22,.2)" : "rgba(255,255,255,.07)"}`, borderRadius: 14, padding: "1.4rem", transition: "all .3s", transform: hov ? "translateY(-4px)" : "translateY(0)", cursor: "default" }}>
      <div style={{ width: 44, height: 44, borderRadius: 12, background: hov ? "rgba(249,115,22,.2)" : "rgba(249,115,22,.1)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: ".9rem", transition: "background .3s" }}>
        <Icon size={20} color="#f97316" />
      </div>
      <h3 style={{ color: "#f1f5f9", fontSize: 14.5, fontWeight: 700, marginBottom: 7, lineHeight: 1.3 }}>{t(tk)}</h3>
      <p style={{ color: "#64748b", fontSize: 12, lineHeight: 1.65, margin: 0 }}>{t(dk)}</p>
    </div>
  );
}

export default function Services() {
  const { t } = useLang();

  const roadSvcs = [
    [AlertTriangle, "s1t", "s1d"],
    [RotateCcw,     "s2t", "s2d"],
    [Gauge,         "s3t", "s3d"],
    [Battery,       "s4t", "s4d"],
    [Fuel,          "s5t", "s5d"],
  ];

  const homeSvcs = [
    [Settings, "s6t",  "s6d",  false],
    [Wrench,   "s7t",  "s7d",  false],
    [Zap,      "s8t",  "s8d",  false],
    [Shield,   "s9t",  "s9d",  false],
    [Eye,      "s10t", "s10d", false],
    [Cog,      "s11t", "s11d", true],
    [GitFork,  "s12t", "s12d", true],
    [Wind,     "s13t", "s13d", true],
  ];

  const grid = { display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(185px,1fr))", gap: "1rem" };

  return (
    <section id="servicios" style={{ background: "#080c1a", padding: "100px 0" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 1.5rem" }}>

        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "4rem" }}>
          <span style={{ color: "#f97316", fontSize: 11, fontWeight: 700, letterSpacing: 3, display: "block", marginBottom: 12 }}>{t("svcLabel")}</span>
          <h2 style={{ color: "#f1f5f9", fontSize: "clamp(2rem,5vw,3rem)", fontWeight: 900, letterSpacing: "-1px", margin: "0 0 1rem" }}>
            {t("svcH2")}<br /><span style={{ color: "#f97316" }}>{t("svcH2b")}</span>
          </h2>
          <p style={{ color: "#64748b", fontSize: 16, maxWidth: 460, margin: "0 auto", lineHeight: 1.7 }}>{t("svcSub")}</p>
        </div>

        {/* Carretera */}
        <div style={{ marginBottom: "4rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: "2rem", paddingBottom: "1rem", borderBottom: "1px solid rgba(249,115,22,.2)" }}>
            <div style={{ background: "#f97316", borderRadius: 10, padding: "8px 14px", display: "flex", alignItems: "center", gap: 8 }}>
              <Truck size={16} color="#fff" />
              <span style={{ color: "#fff", fontWeight: 800, fontSize: 12 }}>{t("cat1Badge")}</span>
            </div>
            <p style={{ color: "#64748b", fontSize: 13, margin: 0 }}>{t("cat1Desc")}</p>
          </div>
          <div style={grid}>
            {roadSvcs.map(([I, tk, dk]) => <SvcCard key={tk} icon={I} tk={tk} dk={dk} />)}
          </div>
        </div>

        {/* Domicilio */}
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: "2rem", paddingBottom: "1rem", borderBottom: "1px solid rgba(59,130,246,.2)" }}>
            <div style={{ background: "#1d4ed8", borderRadius: 10, padding: "8px 14px", display: "flex", alignItems: "center", gap: 8 }}>
              <Wrench size={16} color="#fff" />
              <span style={{ color: "#fff", fontWeight: 800, fontSize: 12 }}>{t("cat2Badge")}</span>
            </div>
            <p style={{ color: "#64748b", fontSize: 13, margin: 0 }}>{t("cat2Desc")}</p>
          </div>
          <div style={grid}>
            {homeSvcs.map(([I, tk, dk, hl]) => <SvcCard key={tk} icon={I} tk={tk} dk={dk} highlight={hl} />)}
          </div>
        </div>
      </div>
    </section>
  );
}
