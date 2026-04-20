"use client";
import { Truck } from "lucide-react";
import { FiFacebook as Facebook, FiInstagram as Instagram, FiTwitter as Twitter } from "react-icons/fi";
import { useLang } from "@/context/LangContext";

const PHONE = "+17862604143";
const EMAIL = "hernandeztruckrepair1983@gmail.com";

export default function Footer() {
  const { t } = useLang();
  return (
    <footer style={{ background: "#060910", borderTop: "1px solid rgba(249,115,22,.12)", padding: "4rem 0 2rem" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 1.5rem" }}>
        <div className="footer-grid" style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: "3rem", marginBottom: "3rem" }}>

          {/* Brand */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: "1rem" }}>
              <div style={{ width: 36, height: 36, borderRadius: 8, background: "linear-gradient(135deg,#f97316,#dc2626)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Truck size={18} color="#fff" />
              </div>
              <span style={{ color: "#fff", fontWeight: 800, fontSize: 16 }}>MECA<span style={{ color: "#f97316" }}>TRUCK</span></span>
            </div>
            <p style={{ color: "#475569", fontSize: 13, lineHeight: 1.8, marginBottom: "1.5rem", maxWidth: 280 }}>{t("footerDesc")}</p>
            <div style={{ display: "flex", gap: 10 }}>
              {[Facebook, Instagram, Twitter].map((Icon, i) => (
                <button key={i} style={{ width: 34, height: 34, borderRadius: 8, background: "rgba(255,255,255,.05)", border: "1px solid rgba(255,255,255,.08)", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}
                  onMouseEnter={e => { e.currentTarget.style.background = "rgba(249,115,22,.2)"; }}
                  onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,.05)"; }}>
                  <Icon size={15} color="#94a3b8" />
                </button>
              ))}
            </div>
          </div>

          {/* Servicios */}
          <div>
            <h4 style={{ color: "#f1f5f9", fontSize: 11, fontWeight: 700, letterSpacing: 2, marginBottom: "1.25rem" }}>{t("ftCol1")}</h4>
            {["ft1","ft2","ft3","ft4","ft5"].map(k => (
              <div key={k} style={{ color: "#475569", fontSize: 13, marginBottom: 10 }}>{t(k)}</div>
            ))}
          </div>

          {/* Empresa */}
          <div>
            <h4 style={{ color: "#f1f5f9", fontSize: 11, fontWeight: 700, letterSpacing: 2, marginBottom: "1.25rem" }}>{t("ftCol2")}</h4>
            {["ft6","ft7","ft8","ft9"].map(k => (
              <div key={k} style={{ color: "#475569", fontSize: 13, marginBottom: 10 }}>{t(k)}</div>
            ))}
          </div>

          {/* Contacto */}
          <div>
            <h4 style={{ color: "#f1f5f9", fontSize: 11, fontWeight: 700, letterSpacing: 2, marginBottom: "1.25rem" }}>{t("ftCol3")}</h4>
            <div style={{ color: "#475569", fontSize: 13, marginBottom: 10 }}>{PHONE}</div>
            <div style={{ color: "#475569", fontSize: 13, marginBottom: 10 }}>{EMAIL}</div>
            <div style={{ color: "#f97316", fontWeight: 600, fontSize: 13, marginBottom: 10 }}>{t("ft10")}</div>
            <div style={{ color: "#475569", fontSize: 13 }}>{t("ft11")}</div>
          </div>
        </div>

        <div style={{ borderTop: "1px solid rgba(255,255,255,.05)", paddingTop: "1.5rem", display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
          <span style={{ color: "#334155", fontSize: 12 }}>{t("copyright")}</span>
          <span style={{ color: "#334155", fontSize: 12 }}>{t("footerTag")}</span>
        </div>
      </div>
    </footer>
  );
}
