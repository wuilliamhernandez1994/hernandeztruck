"use client";
import { Phone, MessageCircle } from "lucide-react";
import { useLang } from "@/context/LangContext";

const PHONE    = "+17862604143";
const WHATSAPP = "17862604143";

export default function FloatingButtons() {
  const { t } = useLang();
  const waMsg = encodeURIComponent(
    t("heroCta1") === "Request service"
      ? "Hello, I need urgent mechanical assistance."
      : "Hola, necesito asistencia mecánica urgente."
  );
  return (
    <>
      {/* WhatsApp */}
      <a
        href={`https://wa.me/${WHATSAPP}?text=${waMsg}`}
        target="_blank"
        rel="noreferrer"
        title="WhatsApp"
        style={{ position: "fixed", bottom: "2rem", right: "2rem", zIndex: 200, width: 56, height: 56, borderRadius: "50%", background: "#22c55e", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 6px 24px rgba(34,197,94,.5)", textDecoration: "none", transition: "transform .2s" }}
        onMouseEnter={e => { e.currentTarget.style.transform = "scale(1.1)"; }}
        onMouseLeave={e => { e.currentTarget.style.transform = "scale(1)"; }}
      >
        <MessageCircle size={26} />
      </a>

      {/* Emergency call */}
      <a
        href={`tel:${PHONE}`}
        title={t("floatEm")}
        style={{ position: "fixed", bottom: "5.5rem", right: "2rem", zIndex: 200, display: "flex", alignItems: "center", gap: 8, background: "#dc2626", color: "#fff", padding: "10px 18px", borderRadius: 99, fontWeight: 800, fontSize: 13, textDecoration: "none", animation: "epulse 2s infinite" }}
        onMouseEnter={e => { e.currentTarget.style.transform = "scale(1.05)"; }}
        onMouseLeave={e => { e.currentTarget.style.transform = "scale(1)"; }}
      >
        <Phone size={16} />{t("floatEm")}
      </a>
    </>
  );
}
