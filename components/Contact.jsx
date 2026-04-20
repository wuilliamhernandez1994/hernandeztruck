"use client";
import { Phone, MessageCircle, Mail, MapPin } from "lucide-react";
import { useLang } from "@/context/LangContext";

const PHONE    = "+17862604143";
const WHATSAPP = "17862604143";
const EMAIL    = "hernandeztruckrepair1983@gmail.com";

export default function Contact() {
  const { t } = useLang();
  const waMsg = encodeURIComponent(
    t("heroCta1") === "Request service"
      ? "Hello, I need mechanical assistance."
      : "Hola, necesito asistencia mecánica."
  );

  const cards = [
    { lk: "waLabel",       val: PHONE,                       sub: "waSub",       href: `https://wa.me/${WHATSAPP}?text=${waMsg}`, Icon: MessageCircle, accent: "#22c55e", iconBg: "rgba(34,197,94,.12)",   borderC: "rgba(34,197,94,.2)" },
    { lk: "phoneLabel",    val: PHONE,                       sub: "phoneSub",    href: `tel:${PHONE}`,                            Icon: Phone,         accent: "#f97316", iconBg: "rgba(249,115,22,.1)",   borderC: "rgba(249,115,22,.15)" },
    { lk: "emailLabel",    val: EMAIL,                       sub: "emailSub",    href: `mailto:${EMAIL}`,                         Icon: Mail,          accent: "#f97316", iconBg: "rgba(249,115,22,.1)",   borderC: "rgba(249,115,22,.15)" },
    { lk: "coverageLabel", valKey: "coverageVal",            sub: "coverageSub", href: null,                                      Icon: MapPin,        accent: "#f97316", iconBg: "rgba(249,115,22,.1)",   borderC: "rgba(249,115,22,.15)" },
  ];

  return (
    <section id="contacto" style={{ background: "#080c1a", padding: "100px 0" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 1.5rem" }}>
        <div style={{ textAlign: "center", marginBottom: "1rem" }}>
          <span style={{ color: "#f97316", fontSize: 11, fontWeight: 700, letterSpacing: 3, display: "block", marginBottom: 12 }}>{t("ctaLabel")}</span>
          <h2 style={{ color: "#f1f5f9", fontSize: "clamp(2rem,5vw,3rem)", fontWeight: 900, letterSpacing: "-1px" }}>{t("ctaH2")}</h2>
          <p style={{ color: "#64748b", fontSize: 15, maxWidth: 500, margin: "1rem auto 0", lineHeight: 1.75 }}>{t("ctaP")}</p>
        </div>

        <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", gap: "1.5rem", marginTop: "3rem" }}>
          {cards.map(({ lk, val, valKey, sub, href, Icon, accent, iconBg, borderC }) => {
            const inner = (
              <>
                <div style={{ width: 46, height: 46, borderRadius: 12, flexShrink: 0, background: iconBg, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Icon size={22} color={accent} />
                </div>
                <div>
                  <div style={{ color: accent, fontSize: 11, fontWeight: 700, letterSpacing: 1.5, marginBottom: 6 }}>{t(lk)}</div>
                  <div style={{ color: "#f1f5f9", fontSize: 16, fontWeight: 800, marginBottom: 4 }}>{val || t(valKey)}</div>
                  <div style={{ color: "#64748b", fontSize: 12 }}>{t(sub)}</div>
                </div>
              </>
            );
            const base = { background: "rgba(255,255,255,.03)", border: `1px solid ${borderC}`, borderRadius: 16, padding: "1.5rem", display: "flex", gap: "1rem", alignItems: "flex-start", textDecoration: "none", width: "max-content" };
            return href
              ? <a key={lk} href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noreferrer" style={base}>{inner}</a>
              : <div key={lk} style={base}>{inner}</div>;
          })}
        </div>

        <div style={{ textAlign: "center", marginTop: "3rem" }}>
          <a href={`https://wa.me/${WHATSAPP}?text=${waMsg}`} target="_blank" rel="noreferrer"
            style={{ display: "inline-flex", alignItems: "center", gap: 12, background: "#22c55e", color: "#fff", padding: "16px 36px", borderRadius: 12, textDecoration: "none", fontWeight: 800, fontSize: 17, boxShadow: "0 8px 28px rgba(34,197,94,.4)" }}>
            <MessageCircle size={22} />{t("waBtnBig")}
          </a>
        </div>
      </div>
    </section>
  );
}
