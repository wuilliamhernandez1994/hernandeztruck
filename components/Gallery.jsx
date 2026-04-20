"use client";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import {
  ChevronLeft, ChevronRight, Upload, Lock, Unlock,
  Image as ImageIcon, Trash2, Loader,
} from "lucide-react";
import { useLang } from "@/context/LangContext";

// ── Constante local — se usa solo para el estado inicial del localStorage ────
const STORAGE_KEY = "mecatruck_upload_auth";

// ── Slides de demo (se muestran mientras carga / si no hay archivos) ──────────
const DEMO_SLIDES = [
  { type: "photo", bg: "linear-gradient(135deg,#0f1f3d,#1a3a5c)", icon: "🔧", tk: "slide1t", dk: "slide1d" },
  { type: "video", bg: "linear-gradient(135deg,#1a0a00,#3d1a00)", icon: "📹", tk: "slide2t", dk: "slide2d" },
  { type: "photo", bg: "linear-gradient(135deg,#0a1f0a,#1a3d1a)", icon: "⚙️", tk: "slide3t", dk: "slide3d" },
  { type: "photo", bg: "linear-gradient(135deg,#001a1f,#00323d)", icon: "⚡", tk: "slide6t", dk: "slide6d" },
];

// ── Lock panel ────────────────────────────────────────────────────────────────
function UploadLock({ onUnlock }) {
  const { t } = useLang();
  const [code,  setCode]  = useState("");
  const [error, setError] = useState(false);
  const [shake, setShake] = useState(false);

  const attempt = async () => {
    const normalizedCode = code.trim();
    const res  = await fetch("/api/upload", {
      method:  "POST",
      body:    (() => { const fd = new FormData(); fd.append("code", normalizedCode); fd.append("checkOnly", "1"); return fd; })(),
    });
    // Si el servidor devuelve 400 (sin archivo) en vez de 401 → código correcto
    if (res.ok) {
      localStorage.setItem(STORAGE_KEY, "1");
      onUnlock(normalizedCode);
    } else {
      setError(true);
      setShake(true);
      setCode("");
      setTimeout(() => setShake(false), 500);
    }
  };

  return (
    <div style={{ border: "2px dashed rgba(249,115,22,.2)", borderRadius: 16, padding: "2.5rem", textAlign: "center", marginTop: "1.5rem" }}>
      <div style={{ width: 52, height: 52, borderRadius: "50%", background: "rgba(249,115,22,.1)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1.25rem" }}>
        <Lock size={24} color="#f97316" />
      </div>
      <div style={{ color: "#f1f5f9", fontWeight: 700, fontSize: 16, marginBottom: 6 }}>{t("lockTitle")}</div>
      <div style={{ color: "#64748b", fontSize: 13, marginBottom: "1.5rem" }}>{t("lockSub")}</div>
      <div style={{ display: "flex", gap: 10, maxWidth: 360, margin: "0 auto", animation: shake ? "shake .4s ease" : "none" }}>
        <input
          type="password" value={code}
          onChange={e => { setCode(e.target.value); setError(false); }}
          onKeyDown={e => { if (e.key === "Enter") attempt(); }}
          placeholder={t("lockPlaceholder")}
          style={{ flex: 1, background: "rgba(255,255,255,.05)", border: `1px solid ${error ? "#ef4444" : "rgba(255,255,255,.12)"}`, borderRadius: 10, padding: "11px 16px", color: "#f1f5f9", fontSize: 14, outline: "none" }}
        />
        <button onClick={attempt} style={{ background: "#f97316", color: "#fff", border: "none", borderRadius: 10, padding: "11px 20px", fontWeight: 700, fontSize: 14, cursor: "pointer", whiteSpace: "nowrap" }}>
          {t("lockBtn")}
        </button>
      </div>
      {error && <div style={{ color: "#ef4444", fontSize: 12, marginTop: 10 }}>{t("lockError")}</div>}
      <div style={{ color: "#334155", fontSize: 11, marginTop: 14, display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}>
        <Lock size={11} color="#334155" />{t("lockNote")}
      </div>
    </div>
  );
}

// ── Main Gallery ──────────────────────────────────────────────────────────────
export default function Gallery() {
  const { t } = useLang();

  const [slides,    setSlides]    = useState([]);
  const [loading,   setLoading]   = useState(true);
  const [fetchError, setFetchErr] = useState(false);
  const [cur,       setCur]       = useState(0);
  const [unlocked,  setUnlocked]  = useState(false);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  // Upload state
  const [pendingFiles, setPendingFiles] = useState([]);  // File[] seleccionados
  const [uploadCode,   setUploadCode]   = useState("");
  const [titleInput,   setTitleInput]   = useState("");
  const [descInput,    setDescInput]    = useState("");
  const [uploading,    setUploading]    = useState(false);
  const [uploadMsg,    setUploadMsg]    = useState(null); // { type: "ok"|"err", text }

  const timerRef  = useRef(null);
  const fileRef   = useRef(null);
  const videoRef  = useRef(null);

  // ── Leer sesión guardada ──────────────────────────────────────────────────
  useEffect(() => {
    if (localStorage.getItem(STORAGE_KEY) === "1") {
      localStorage.removeItem(STORAGE_KEY);
    }
    setUnlocked(false);
  }, []);

  // ── Cargar media desde la API ─────────────────────────────────────────────
  const fetchMedia = async () => {
    try {
      setLoading(true);
      setFetchErr(false);
      const res  = await fetch("/api/media");
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setSlides(data.length > 0 ? data : DEMO_SLIDES);
      setCur(0);
    } catch {
      setFetchErr(true);
      setSlides(DEMO_SLIDES);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchMedia(); }, []);

  // ── Auto-advance ──────────────────────────────────────────────────────────
  const startTimer = (len) => {
    clearInterval(timerRef.current);
    if (len > 1) timerRef.current = setInterval(() => setCur(c => (c + 1) % len), 5500);
  };

  useEffect(() => {
    if (!isVideoPlaying) {
      startTimer(slides.length);
    }
    return () => clearInterval(timerRef.current);
  }, [slides, isVideoPlaying]);

  useEffect(() => {
    setIsVideoPlaying(false);
  }, [cur]);

  const goTo = (n) => {
    const idx = ((n % slides.length) + slides.length) % slides.length;
    setCur(idx);
    if (!isVideoPlaying) {
      startTimer(slides.length);
    }
  };

  const handleVideoPlay = () => {
    setIsVideoPlaying(true);
    clearInterval(timerRef.current);
  };

  const handleVideoEnd = () => {
    setIsVideoPlaying(false);
    startTimer(slides.length);
  };

  const handleVideoPause = () => {
    const video = videoRef.current;
    if (!video || video.ended) return;
    setIsVideoPlaying(false);
    startTimer(slides.length);
  };

  // ── Upload ────────────────────────────────────────────────────────────────
  const handleFiles = (files) => {
    const arr = Array.from(files).filter(f =>
      f.type.startsWith("image/") || f.type.startsWith("video/")
    );
    setPendingFiles(arr);
    setUploadMsg(null);
  };

  const submitUpload = async () => {
    if (!pendingFiles.length) return;
    const normalizedCode = uploadCode.trim();
    setUploading(true);
    setUploadMsg(null);
    try {
      for (const file of pendingFiles) {
        const fd = new FormData();
        fd.append("file",  file);
        fd.append("code",  normalizedCode);
        fd.append("title", titleInput);
        fd.append("desc",  descInput);
        const res  = await fetch("/api/upload", { method: "POST", body: fd });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || t("uploadError"));
      }
      setUploadMsg({ type: "ok", text: t("uploadSuccess") });
      setPendingFiles([]);
      setTitleInput("");
      setDescInput("");
      if (fileRef.current) fileRef.current.value = "";
      // Recargar galería
      await fetchMedia();
    } catch (err) {
      setUploadMsg({ type: "err", text: err.message });
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (slide) => {
    if (!confirm(t("deleteConfirm"))) return;
    const normalizedCode = uploadCode.trim();
    await fetch("/api/media", {
      method:  "DELETE",
      headers: { "Content-Type": "application/json" },
      body:    JSON.stringify({ publicId: slide.id, code: normalizedCode, resourceType: slide.type === "video" ? "video" : "image" }),
    });
    fetchMedia();
  };

  const revoke = () => {
    localStorage.removeItem(STORAGE_KEY);
    setUploadCode("");
    setUnlocked(false);
  };

  // ── Render helpers ────────────────────────────────────────────────────────
  const slide = slides[Math.min(cur, slides.length - 1)] || DEMO_SLIDES[0];
  const isCloudinary = Boolean(slide.url);

  return (
    <section id="galeria" style={{ background: "#0d1220", padding: "100px 0" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 1.5rem" }}>

        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "3rem" }}>
          <span style={{ color: "#f97316", fontSize: 11, fontWeight: 700, letterSpacing: 3, display: "block", marginBottom: 12 }}>{t("galLabel")}</span>
          <h2 style={{ color: "#f1f5f9", fontSize: "clamp(2rem,5vw,3rem)", fontWeight: 900, letterSpacing: "-1px", margin: "0 0 1rem" }}>
            {t("galH2")} <span style={{ color: "#f97316" }}>{t("galH2b")}</span>
          </h2>
          <p style={{ color: "#64748b", fontSize: 15, maxWidth: 480, margin: "0 auto", lineHeight: 1.7 }}>{t("galSub")}</p>
        </div>

        {/* Loading state */}
        {loading && (
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: 300, gap: 12, color: "#64748b" }}>
            <Loader size={24} style={{ animation: "spin .8s linear infinite" }} />
            <span>{t("galLoading")}</span>
          </div>
        )}

        {!loading && (
          <>
            {/* ── Main viewer ── */}
            <div style={{ position: "relative", borderRadius: 20, overflow: "hidden", background: "#000", height: 480, width: "100%" }}>

              {/* Slide */}
              {isCloudinary ? (
                slide.type === "video" ? (
                  <>
                    <video
                      key={slide.url}
                      ref={videoRef}
                      src={slide.url}
                      controls
                      onPlay={handleVideoPlay}
                      onEnded={handleVideoEnd}
                      onPause={handleVideoPause}
                      style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
                    />
                    {!isVideoPlaying && (
                      <button
                        type="button"
                        onClick={() => videoRef.current?.play()}
                        aria-label="Reproducir video"
                        style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(0,0,0,.22)", border: "none", cursor: "pointer", zIndex: 4 }}
                      >
                        <span style={{ width: 84, height: 84, borderRadius: "50%", background: "rgba(249,115,22,.92)", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 12px 32px rgba(0,0,0,.32)" }}>
                          <svg fill="#fff" width="34" height="34" viewBox="0 0 24 24" style={{ marginLeft: 4 }}>
                            <polygon points="5 3 19 12 5 21 5 3" />
                          </svg>
                        </span>
                      </button>
                    )}
                  </>
                ) : (
                  <Image
                    key={slide.url}
                    src={slide.url}
                    alt={slide.title || "Servicio MecaTruck"}
                    fill
                    sizes="(max-width:768px) 100vw, 1200px"
                    style={{ objectFit: "cover" }}
                    priority={cur === 0}
                  />
                )
              ) : (
                // Demo placeholder
                <div style={{ position: "absolute", inset: 0, background: slide.bg, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 12 }}>
                  <span style={{ fontSize: 56, opacity: .2 }}>{slide.icon}</span>
                  <span style={{ color: "rgba(255,255,255,.2)", fontSize: 12, letterSpacing: 2 }}>{slide.type === "video" ? "VIDEO" : "FOTO"} DE SERVICIO</span>
                </div>
              )}

              {/* Demo video play */}
              {slide.type === "video" && !isCloudinary && (
                <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(0,0,0,.35)" }}>
                  <div style={{ width: 68, height: 68, borderRadius: "50%", background: "rgba(249,115,22,.9)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <svg fill="#fff" width="28" height="28" viewBox="0 0 24 24"><polygon points="5 3 19 12 5 21 5 3"/></svg>
                  </div>
                </div>
              )}

              {/* Type badge */}
              <div style={{ position: "absolute", top: 16, left: 16, background: "rgba(0,0,0,.7)", backdropFilter: "blur(8px)", border: "1px solid rgba(255,255,255,.12)", borderRadius: 99, padding: "5px 14px", fontSize: 11, fontWeight: 700, letterSpacing: 1, display: "flex", alignItems: "center", gap: 6, zIndex: 5 }}>
                {slide.type === "video"
                  ? <><svg fill="none" width="12" height="12" viewBox="0 0 24 24" stroke="#f97316" strokeWidth="2"><polygon points="5 3 19 12 5 21 5 3"/></svg><span style={{ color: "#f97316" }}>VIDEO</span></>
                  : <><ImageIcon size={12} color="#fff" /><span style={{ color: "#fff" }}>FOTO</span></>
                }
              </div>

              {/* Delete btn (only when unlocked + real slide) */}
              {unlocked && isCloudinary && (
                <button onClick={() => handleDelete(slide)} style={{ position: "absolute", top: 16, right: 16, zIndex: 6, background: "rgba(239,68,68,.8)", border: "none", borderRadius: 8, padding: "6px 12px", color: "#fff", fontSize: 12, fontWeight: 600, display: "flex", alignItems: "center", gap: 6, cursor: "pointer" }}>
                  <Trash2 size={13} />{t("deleteBtn")}
                </button>
              )}

              {/* Caption */}
              <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, background: "linear-gradient(transparent,rgba(0,0,0,.88))", padding: "2.5rem 1.5rem 1.25rem", zIndex: 5 }}>
                <h4 style={{ fontSize: 18, fontWeight: 800, color: "#fff", lineHeight: 1.2, marginBottom: 4 }}>
                  {slide.title || (slide.tk ? t(slide.tk) : "")}
                </h4>
                <p style={{ fontSize: 13, color: "rgba(255,255,255,.6)" }}>
                  {slide.desc || (slide.dk ? t(slide.dk) : "")}
                </p>
              </div>

              {/* Arrows */}
              {[[-1, "left"], [1, "right"]].map(([dir, side]) => (
                <button key={side} onClick={() => goTo(cur + dir)}
                  style={{ position: "absolute", top: "50%", transform: "translateY(-50%)", [side]: 14, zIndex: 10, width: 44, height: 44, borderRadius: "50%", background: "rgba(0,0,0,.6)", border: "1px solid rgba(255,255,255,.15)", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
                  {dir === -1 ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
                </button>
              ))}
            </div>

            {/* Dots */}
            <div style={{ display: "flex", gap: 6, justifyContent: "center", marginTop: 14 }}>
              {slides.map((_, i) => (
                <div key={i} onClick={() => goTo(i)} style={{ width: i === cur ? 22 : 7, height: 7, borderRadius: 99, background: i === cur ? "#f97316" : "rgba(255,255,255,.2)", cursor: "pointer", transition: "all .25s" }} />
              ))}
            </div>

            {/* Thumbnails */}
            <div className="thumb-row" style={{ display: "flex", gap: 8, marginTop: 12, overflowX: "auto", paddingBottom: 4 }}>
              {slides.map((s, i) => (
                <div key={i} onClick={() => goTo(i)} style={{ flex: "0 0 80px", height: 52, borderRadius: 8, cursor: "pointer", border: `2px solid ${i === cur ? "#f97316" : "transparent"}`, overflow: "hidden", position: "relative", background: s.url ? "#111" : (s.bg || "rgba(255,255,255,.06)"), transition: "border-color .2s", flexShrink: 0 }}>
                  {s.url ? (
                    s.type === "video"
                      ? <video src={s.url} muted style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                      : <Image src={s.url} alt="" fill sizes="80px" style={{ objectFit: "cover" }} />
                  ) : (
                    <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>{s.icon}</div>
                  )}
                  {s.type === "video" && (
                    <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(0,0,0,.4)" }}>
                      <svg fill="none" width="14" height="14" viewBox="0 0 24 24" stroke="#f97316" strokeWidth="2.5"><polygon points="5 3 19 12 5 21 5 3"/></svg>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* ── Upload zone or lock ── */}
            {unlocked ? (
              <div style={{ marginTop: "1.5rem" }}>
                {/* Header bar */}
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: ".75rem" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <Unlock size={15} color="#22c55e" />
                    <span style={{ color: "#22c55e", fontSize: 13, fontWeight: 600 }}>{t("unlockLabel")}</span>
                  </div>
                  <button onClick={revoke} style={{ background: "rgba(239,68,68,.12)", color: "#ef4444", border: "1px solid rgba(239,68,68,.25)", borderRadius: 8, padding: "6px 14px", fontSize: 12, fontWeight: 600, cursor: "pointer" }}>
                    {t("revokeBtn")}
                  </button>
                </div>

                {/* File drop zone */}
                <label htmlFor="mediaUpload"
                  style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 8, border: "2px dashed rgba(249,115,22,.35)", borderRadius: 16, padding: "2rem", cursor: "pointer", background: "rgba(249,115,22,.02)", transition: "all .2s" }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(249,115,22,.65)"; e.currentTarget.style.background = "rgba(249,115,22,.06)"; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(249,115,22,.35)"; e.currentTarget.style.background = "rgba(249,115,22,.02)"; }}
                  onDragOver={e => e.preventDefault()}
                  onDrop={e => { e.preventDefault(); handleFiles(e.dataTransfer.files); }}
                >
                  <input id="mediaUpload" ref={fileRef} type="file" accept="image/*,video/*" multiple style={{ display: "none" }} onChange={e => handleFiles(e.target.files)} />
                  <Upload size={32} color="rgba(249,115,22,.7)" />
                  <div style={{ color: "#f97316", fontWeight: 700, fontSize: 15 }}>{t("uploadTitle")}</div>
                  <div style={{ color: "#64748b", fontSize: 13 }}>{t("uploadSub")}</div>
                  {pendingFiles.length > 0 && (
                    <div style={{ marginTop: 8, color: "#22c55e", fontSize: 13, fontWeight: 600 }}>
                      {pendingFiles.length} archivo{pendingFiles.length > 1 ? "s" : ""} seleccionado{pendingFiles.length > 1 ? "s" : ""}
                    </div>
                  )}
                </label>

                {/* Metadata + submit */}
                {pendingFiles.length > 0 && (
                  <div style={{ marginTop: "1rem", display: "flex", flexDirection: "column", gap: "1rem" }}>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }} className="upload-meta-grid">
                      <div>
                        <label style={{ display: "block", color: "#94a3b8", fontSize: 12, fontWeight: 600, marginBottom: 6 }}>{t("uploadTitleLabel")}</label>
                        <input value={titleInput} onChange={e => setTitleInput(e.target.value)} placeholder={t("uploadTitlePh")} style={{ width: "100%", background: "rgba(255,255,255,.05)", border: "1px solid rgba(255,255,255,.1)", borderRadius: 10, padding: "10px 14px", color: "#f1f5f9", fontSize: 13, outline: "none" }} />
                      </div>
                      <div>
                        <label style={{ display: "block", color: "#94a3b8", fontSize: 12, fontWeight: 600, marginBottom: 6 }}>{t("uploadDescLabel")}</label>
                        <input value={descInput} onChange={e => setDescInput(e.target.value)} placeholder={t("uploadDescPh")} style={{ width: "100%", background: "rgba(255,255,255,.05)", border: "1px solid rgba(255,255,255,.1)", borderRadius: 10, padding: "10px 14px", color: "#f1f5f9", fontSize: 13, outline: "none" }} />
                      </div>
                    </div>
                    <button onClick={submitUpload} disabled={uploading} style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10, background: uploading ? "rgba(249,115,22,.5)" : "#f97316", color: "#fff", border: "none", borderRadius: 10, padding: "13px 28px", fontWeight: 700, fontSize: 15, cursor: uploading ? "not-allowed" : "pointer", boxShadow: "0 6px 20px rgba(249,115,22,.35)" }}>
                      {uploading
                        ? <><Loader size={18} style={{ animation: "spin .8s linear infinite" }} />{t("uploadingFile")}</>
                        : <><Upload size={18} />{t("uploadBtn")}</>
                      }
                    </button>
                  </div>
                )}

                {/* Status message */}
                {uploadMsg && (
                  <div style={{ marginTop: "1rem", textAlign: "center", color: uploadMsg.type === "ok" ? "#22c55e" : "#ef4444", fontWeight: 600, fontSize: 14 }}>
                    {uploadMsg.text}
                  </div>
                )}
              </div>
            ) : (
              <UploadLock onUnlock={(code) => { setUploadCode(code); setUnlocked(true); }} />
            )}
          </>
        )}
      </div>
      <style>{`@media(max-width:600px){.upload-meta-grid{grid-template-columns:1fr!important}}`}</style>
    </section>
  );
}
