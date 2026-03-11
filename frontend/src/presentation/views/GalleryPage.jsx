import { useState, useEffect, useCallback } from "react";

// ─── STATIC DATA (matching Prisma schema) ────────────────────────────────────
const KATEGORI = [
  { id: 1, nama: "Digital", warna: "#00c8c8" },
  { id: 2, nama: "Infrastruktur", warna: "#a78bfa" },
  { id: 3, nama: "Jaringan", warna: "#60a5fa" },
  { id: 4, nama: "Tim", warna: "#f472b6" },
  { id: 5, nama: "Event", warna: "#fb923c" },
];

const GALERI = [
  {
    id: 1,
    judul: "Server Room Utama",
    gambar:
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1200&q=80",
    kategoriId: 2,
    deskripsi: "Data center tier-3 milik Veloxity di Jakarta Selatan",
    createdAt: "2026-02-20",
  },
  {
    id: 2,
    judul: "Code & Create",
    gambar:
      "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=1200&q=80",
    kategoriId: 1,
    deskripsi: "Ruang kerja tim engineering Veloxity yang produktif",
    createdAt: "2026-02-18",
  },
  {
    id: 3,
    judul: "Network Operations Center",
    gambar:
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&q=80",
    kategoriId: 3,
    deskripsi: "Monitoring jaringan 24/7 dari pusat kendali kami",
    createdAt: "2026-02-15",
  },
  {
    id: 4,
    judul: "Fiber Installation",
    gambar:
      "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=1200&q=80",
    kategoriId: 3,
    deskripsi: "Proses pemasangan kabel fiber optik di lapangan",
    createdAt: "2026-02-12",
  },
  {
    id: 5,
    judul: "Tech Summit 2026",
    gambar:
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200&q=80",
    kategoriId: 5,
    deskripsi: "Veloxity hadir sebagai platinum sponsor",
    createdAt: "2026-02-10",
  },
  {
    id: 6,
    judul: "Purple Server Racks",
    gambar:
      "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?w=1200&q=80",
    kategoriId: 2,
    deskripsi: "Rak server baru dengan sistem pendingin aktif generasi terkini",
    createdAt: "2026-02-08",
  },
  {
    id: 7,
    judul: "Tim Engineering",
    gambar:
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&q=80",
    kategoriId: 4,
    deskripsi: "Tim inti yang membangun infrastruktur Veloxity",
    createdAt: "2026-02-05",
  },
  {
    id: 8,
    judul: "Digital Workspace",
    gambar:
      "https://images.unsplash.com/photo-1511578314322-379afb476865?w=1200&q=80",
    kategoriId: 1,
    deskripsi: "Setup workstation premium untuk tim remote Veloxity",
    createdAt: "2026-02-03",
  },
  {
    id: 9,
    judul: "Kabel Jaringan",
    gambar:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=80",
    kategoriId: 3,
    deskripsi: "Patch panel terorganisir di ruang distribusi utama",
    createdAt: "2026-02-01",
  },
  {
    id: 10,
    judul: "Annual Gathering 2026",
    gambar:
      "https://images.unsplash.com/photo-1511578314322-379afb476865?w=1200&q=80",
    kategoriId: 5,
    deskripsi: "Perayaan ulang tahun ke-5 Veloxity bersama seluruh tim",
    createdAt: "2026-01-28",
  },
  {
    id: 11,
    judul: "Cloud Infrastructure",
    gambar:
      "https://images.unsplash.com/photo-1511578314322-379afb476865?w=1200&q=80",
    kategoriId: 2,
    deskripsi: "Migrasi infrastruktur ke hybrid cloud selesai",
    createdAt: "2026-01-25",
  },
  {
    id: 12,
    judul: "Onboarding Day Q1",
    gambar:
      "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=1200&q=80",
    kategoriId: 4,
    deskripsi: "Hari pertama batch karyawan baru Q1 2026",
    createdAt: "2026-01-22",
  },
  {
    id: 13,
    judul: "Monitoring Dashboard",
    gambar:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&q=80",
    kategoriId: 1,
    deskripsi: "Real-time network monitoring dashboard versi terbaru",
    createdAt: "2026-01-20",
  },
  {
    id: 14,
    judul: "Outdoor Installation",
    gambar:
      "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=1200&q=80",
    kategoriId: 3,
    deskripsi: "Pemasangan antena point-to-point di rooftop gedung",
    createdAt: "2026-01-18",
  },
  {
    id: 15,
    judul: "Workshop Cyber Security",
    gambar:
      "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=1200&q=80",
    kategoriId: 5,
    deskripsi: "Internal workshop cybersecurity bersama tim IT Veloxity",
    createdAt: "2026-01-15",
  },
  {
    id: 16,
    judul: "Veloxity HQ Lobby",
    gambar:
      "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&q=80",
    kategoriId: 4,
    deskripsi: "Lobby kantor pusat Veloxity setelah renovasi total",
    createdAt: "2026-01-12",
  },
];

const KAT_MAP = Object.fromEntries(KATEGORI.map((k) => [k.id, k]));
const PER_PAGE_GRID = 9;
const PER_PAGE_LIST = 8;

// ─── HELPERS ─────────────────────────────────────────────────────────────────
function fmtShort(d) {
  const dt = new Date(d);
  return `${String(dt.getDate()).padStart(2, "0")}.${String(dt.getMonth() + 1).padStart(2, "0")}`;
}
function fmtLong(d) {
  return new Date(d).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

// ─── CSS ─────────────────────────────────────────────────────────────────────
const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Mono:wght@300;400;500&display=swap');
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  :root {
    --bg: #060606; --line: rgba(255,255,255,0.07); --line-h: rgba(255,255,255,0.14);
    --text: #ececec; --text-2: rgba(236,236,236,0.38); --text-3: rgba(236,236,236,0.16);
    --surf: rgba(255,255,255,0.028); --surf-h: rgba(255,255,255,0.056);
  }
  body { background: var(--bg); color: var(--text); font-family: 'Syne', sans-serif; min-height: 100vh; overflow-x: hidden; }

  /* ── HERO ── */
  .hero { position: relative; overflow: hidden; border-bottom: 1px solid var(--line); }
  .hero-bg { position: absolute; inset: 0; background: url('https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1800&q=50') center/cover; filter: brightness(0.07) saturate(0.2); }
  .hero-word {
    position: relative; z-index: 1;
    font-size: clamp(80px, 16vw, 220px); font-weight: 800;
    letter-spacing: -0.02em; text-transform: uppercase;
    color: var(--text); line-height: 0.88;
    padding: 36px 0 0 48px; user-select: none;
  }
  .hero-featured {
    position: relative; z-index: 2;
    margin: -44px 48px 0; border-radius: 2px; overflow: hidden;
    cursor: pointer; aspect-ratio: 16/6.5;
  }
  .hero-featured img { width: 100%; height: 100%; object-fit: cover; filter: brightness(0.8); display: block; transition: filter 0.4s, transform 0.5s; }
  .hero-featured:hover img { filter: brightness(1); transform: scale(1.02); }
  .hero-feat-overlay {
    position: absolute; bottom: 0; left: 0; right: 0;
    padding: 56px 32px 24px;
    background: linear-gradient(to top, rgba(0,0,0,0.88) 0%, transparent 100%);
    display: flex; align-items: flex-end; justify-content: space-between; gap: 16px;
  }
  .hero-feat-title { font-size: clamp(18px, 2.5vw, 28px); font-weight: 700; color: #fff; letter-spacing: -0.01em; margin-bottom: 5px; }
  .hero-feat-desc { font-family: 'DM Mono', monospace; font-size: 10px; letter-spacing: 0.1em; color: rgba(255,255,255,0.5); text-transform: uppercase; }
  .hero-feat-chip {
    display: flex; align-items: center; gap: 7px;
    padding: 6px 14px 6px 10px; border-radius: 20px;
    border: 1px solid rgba(255,255,255,0.2);
    background: rgba(0,0,0,0.55); backdrop-filter: blur(8px);
    font-family: 'DM Mono', monospace; font-size: 8.5px; letter-spacing: 0.18em; text-transform: uppercase;
    color: #fff; white-space: nowrap; flex-shrink: 0;
  }
  .chip-dot { width: 7px; height: 7px; border-radius: 50%; flex-shrink: 0; }
  .hero-bottom { position: relative; z-index: 1; display: flex; align-items: center; justify-content: space-between; padding: 18px 48px 24px; flex-wrap: wrap; gap: 12px; }
  .hero-sub { font-family: 'DM Mono', monospace; font-size: 9px; letter-spacing: 0.32em; color: var(--text-3); text-transform: uppercase; }
  .see-more-btn { font-family: 'DM Mono', monospace; font-size: 9px; letter-spacing: 0.22em; color: var(--text-3); text-transform: uppercase; cursor: pointer; display: flex; align-items: center; gap: 7px; border: 1px solid var(--line); border-radius: 20px; padding: 6px 14px; background: none; transition: border-color 0.18s, color 0.18s; }
  .see-more-btn:hover { border-color: var(--line-h); color: var(--text-2); }

  /* ── NAVBAR ── */
  .navbar { position: sticky; top: 0; z-index: 100; background: rgba(6,6,6,0.94); backdrop-filter: blur(18px); border-bottom: 1px solid var(--line); display: flex; align-items: stretch; justify-content: space-between; height: 52px; }
  .nav-cats { display: flex; align-items: stretch; }
  .nav-cat { font-family: 'DM Mono', monospace; font-size: 8.5px; letter-spacing: 0.2em; text-transform: uppercase; color: var(--text-3); padding: 0 18px; display: flex; align-items: center; gap: 7px; cursor: pointer; border: none; background: none; border-right: 1px solid var(--line); transition: color 0.18s, background 0.18s; position: relative; }
  .nav-cat:first-child { border-left: 1px solid var(--line); }
  .nav-cat::after { content: ''; position: absolute; bottom: 0; left: 0; right: 0; height: 1px; transform: scaleX(0); transition: transform 0.22s; }
  .nav-cat:hover { color: var(--text-2); background: var(--surf); }
  .nav-cat.active { color: var(--text); }
  .nav-cat.active::after { transform: scaleX(1); }
  .n-dot { width: 6px; height: 6px; border-radius: 50%; flex-shrink: 0; opacity: 0.5; transition: opacity 0.2s; }
  .nav-cat.active .n-dot { opacity: 1; }
  .n-count { font-size: 7px; color: var(--text-3); background: rgba(255,255,255,0.05); border-radius: 2px; padding: 1px 5px; }
  .nav-right { display: flex; align-items: stretch; border-left: 1px solid var(--line); }
  .v-btn { font-size: 14px; color: var(--text-3); background: none; border: none; border-right: 1px solid var(--line); width: 52px; cursor: pointer; display: flex; align-items: center; justify-content: center; transition: color 0.18s, background 0.18s; }
  .v-btn:hover { color: var(--text-2); background: var(--surf); }
  .v-btn.on { color: var(--text-2); background: var(--surf); }
  .n-sort { font-family: 'DM Mono', monospace; font-size: 8.5px; letter-spacing: 0.15em; text-transform: uppercase; color: var(--text-3); background: none; border: none; padding: 0 18px; cursor: pointer; appearance: none; outline: none; transition: color 0.18s, background 0.18s; }
  .n-sort:hover { color: var(--text-2); background: var(--surf); }
  .n-sort option { background: #111; color: #eee; }

  /* ── SECTION HEADER ── */
  .sec-head { display: flex; align-items: center; gap: 20px; padding: 32px 48px 14px; border-bottom: 1px solid var(--line); }
  .sec-lbl { font-family: 'DM Mono', monospace; font-size: 8px; letter-spacing: 0.32em; color: var(--text-3); text-transform: uppercase; }
  .sec-line { flex: 1; height: 1px; background: var(--line); }
  .sec-cnt { font-family: 'DM Mono', monospace; font-size: 8px; letter-spacing: 0.15em; color: var(--text-3); }

  /* ── GRID ── */
  .g-container { display: grid; grid-template-columns: repeat(3, 1fr); border-bottom: 1px solid var(--line); }
  .g-cell { border-right: 1px solid var(--line); border-bottom: 1px solid var(--line); display: flex; flex-direction: column; cursor: pointer; position: relative; overflow: hidden; background: var(--bg); transition: background 0.2s; animation: fu 0.38s ease both; }
  .g-cell:nth-child(3n) { border-right: none; }
  .g-cell:hover { background: var(--surf-h); }
  .g-cell.span2 { grid-column: span 2; }
  .g-cell.txt-only { background: rgba(0,18,22,0.7); }
  @keyframes fu { from { opacity:0; transform: translateY(10px); } to { opacity:1; transform:translateY(0); } }

  .g-upper { padding: 22px 24px 16px; border-bottom: 1px solid var(--line); display: flex; flex-direction: column; gap: 11px; }
  .g-meta { display: flex; align-items: center; justify-content: space-between; gap: 8px; }
  .g-chip { display: flex; align-items: center; gap: 6px; padding: 4px 12px 4px 9px; border-radius: 20px; border: 1px solid rgba(255,255,255,0.1); background: rgba(255,255,255,0.04); font-family: 'DM Mono', monospace; font-size: 8px; letter-spacing: 0.15em; text-transform: uppercase; color: var(--text-2); transition: border-color 0.2s; }
  .g-cell:hover .g-chip { border-color: rgba(255,255,255,0.18); }
  .g-chip-dot { width: 6px; height: 6px; border-radius: 50%; flex-shrink: 0; }
  .g-date { font-family: 'DM Mono', monospace; font-size: 9px; letter-spacing: 0.1em; color: var(--text-3); }
  .g-title { font-size: clamp(13px, 1.4vw, 18px); font-weight: 700; color: var(--text); letter-spacing: -0.01em; line-height: 1.2; }
  .g-cell.txt-only .g-title { text-decoration: underline; text-decoration-color: rgba(0,200,200,0.35); text-underline-offset: 4px; }
  .g-divider { height: 1px; background: var(--line); }
  .g-cell.txt-only .g-divider { background: rgba(0,200,200,0.28); }
  .g-num { font-size: clamp(26px, 4vw, 50px); font-weight: 800; color: var(--text-3); line-height: 1; letter-spacing: -0.02em; }
  .g-cell.txt-only .g-num { color: rgba(0,200,200,0.55); }
  .g-img { overflow: hidden; position: relative; }
  .g-img img { width: 100%; display: block; object-fit: cover; filter: grayscale(15%) brightness(0.82); transition: filter 0.4s, transform 0.5s; }
  .g-cell:hover .g-img img { filter: grayscale(0%) brightness(1); transform: scale(1.04); }
  .g-img.ratio-std img { aspect-ratio: 4/3; height: auto; }
  .g-img.ratio-wide img { aspect-ratio: 16/7; height: auto; }
  .g-desc { padding: 20px 24px; flex: 1; font-family: 'DM Mono', monospace; font-size: 10px; letter-spacing: 0.06em; color: var(--text-3); line-height: 1.7; }

  /* ── LIST ── */
  .l-row { display: grid; grid-template-columns: 52px 10px 1fr auto 200px 48px; align-items: center; border-bottom: 1px solid var(--line); cursor: pointer; position: relative; overflow: hidden; transition: background 0.18s; animation: ri 0.3s ease both; }
  @keyframes ri { from { opacity:0; transform: translateX(-6px); } to { opacity:1; transform:translateX(0); } }
  .l-row:hover { background: var(--surf-h); }
  .l-row::before { content: ''; position: absolute; left: 0; top: 0; bottom: 0; width: 2px; transform: scaleY(0); transform-origin: bottom; transition: transform 0.2s; }
  .l-row:hover::before { transform: scaleY(1); }
  .l-idx { padding: 22px 0 22px 24px; font-family: 'DM Mono', monospace; font-size: 9px; color: var(--text-3); letter-spacing: 0.1em; align-self: stretch; display: flex; align-items: center; }
  .l-dot { width: 8px; height: 8px; border-radius: 50%; flex-shrink: 0; }
  .l-content { padding: 22px 24px; }
  .l-tag { font-family: 'DM Mono', monospace; font-size: 7.5px; letter-spacing: 0.2em; text-transform: uppercase; color: var(--text-3); border: 1px solid var(--line); border-radius: 3px; padding: 1px 7px; display: inline-block; margin-bottom: 7px; }
  .l-title { font-size: clamp(14px, 1.6vw, 20px); font-weight: 700; color: var(--text); letter-spacing: -0.01em; line-height: 1.2; }
  .l-date { font-size: clamp(22px, 3vw, 38px); font-weight: 800; color: var(--text-3); line-height: 1; padding: 22px 24px; white-space: nowrap; }
  .l-thumb { width: 200px; height: 120px; overflow: hidden; }
  .l-thumb img { width: 100%; height: 100%; object-fit: cover; filter: grayscale(20%) brightness(0.8); transition: filter 0.3s, transform 0.4s; }
  .l-row:hover .l-thumb img { filter: grayscale(0%) brightness(1); transform: scale(1.04); }
  .l-arrow { width: 48px; display: flex; align-items: center; justify-content: center; color: var(--text-3); font-size: 14px; transition: color 0.2s, transform 0.2s; padding-right: 8px; }
  .l-row:hover .l-arrow { color: var(--text-2); transform: translateX(3px); }

  /* ── LIGHTBOX ── */
  .lb { position: fixed; inset: 0; z-index: 999; background: rgba(0,0,0,0.94); display: flex; align-items: center; justify-content: center; padding: 24px; animation: lbf 0.2s ease; }
  @keyframes lbf { from { opacity:0; } to { opacity:1; } }
  .lb-inner { position: relative; max-width: 1100px; width: 100%; animation: lbs 0.25s ease; }
  @keyframes lbs { from { transform: scale(0.96); opacity:0; } to { transform:scale(1); opacity:1; } }
  .lb-img { position: relative; overflow: hidden; border-radius: 2px; max-height: 72vh; }
  .lb-img img { width: 100%; max-height: 72vh; object-fit: contain; display: block; }
  .lb-x { position: absolute; top: -14px; right: -14px; width: 44px; height: 44px; border-radius: 50%; background: rgba(255,255,255,0.08); border: 1px solid rgba(255,255,255,0.15); color: var(--text); font-size: 16px; display: flex; align-items: center; justify-content: center; cursor: pointer; z-index: 10; transition: background 0.18s; }
  .lb-x:hover { background: rgba(255,255,255,0.14); }
  .lb-nav { position: absolute; top: 50%; transform: translateY(-50%); width: 44px; height: 44px; border-radius: 50%; background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.12); color: var(--text-2); font-size: 16px; display: flex; align-items: center; justify-content: center; cursor: pointer; transition: background 0.18s, color 0.18s; z-index: 10; }
  .lb-nav:hover { background: rgba(255,255,255,0.12); color: var(--text); }
  .lb-nav.prev { left: -58px; }
  .lb-nav.next { right: -58px; }
  .lb-nav:disabled { opacity: 0.2; cursor: default; }
  .lb-meta { padding: 20px 0 0; display: flex; align-items: flex-start; justify-content: space-between; gap: 24px; }
  .lb-title { font-size: clamp(18px, 2.5vw, 26px); font-weight: 700; color: var(--text); letter-spacing: -0.01em; margin-bottom: 6px; }
  .lb-desc { font-family: 'DM Mono', monospace; font-size: 10px; letter-spacing: 0.06em; color: var(--text-3); line-height: 1.65; }
  .lb-right { text-align: right; flex-shrink: 0; display: flex; flex-direction: column; align-items: flex-end; gap: 8px; }
  .lb-chip { display: flex; align-items: center; gap: 6px; padding: 5px 12px 5px 10px; border-radius: 20px; border: 1px solid rgba(255,255,255,0.12); font-family: 'DM Mono', monospace; font-size: 8px; letter-spacing: 0.15em; text-transform: uppercase; color: var(--text-2); }
  .lb-date-lbl { font-family: 'DM Mono', monospace; font-size: 8.5px; letter-spacing: 0.2em; color: var(--text-3); text-transform: uppercase; }
  .lb-counter { font-family: 'DM Mono', monospace; font-size: 8px; letter-spacing: 0.1em; color: rgba(236,236,236,0.12); }

  /* ── PAGINATION ── */
  .pages { display: flex; align-items: center; justify-content: center; gap: 6px; padding: 40px 0 64px; border-top: 1px solid var(--line); }
  .p-btn { font-family: 'DM Mono', monospace; font-size: 10px; width: 40px; height: 40px; border-radius: 5px; border: 1px solid var(--line); background: none; color: var(--text-3); cursor: pointer; display: flex; align-items: center; justify-content: center; transition: all 0.18s; }
  .p-btn:hover { border-color: var(--line-h); color: var(--text-2); background: var(--surf); }
  .p-btn.on { background: rgba(255,255,255,0.08); border-color: rgba(255,255,255,0.2); color: var(--text); }
  .p-btn:disabled { opacity: 0.22; cursor: default; }

  .empty { text-align: center; padding: 80px; font-family: 'DM Mono', monospace; font-size: 10px; letter-spacing: 0.25em; color: var(--text-3); text-transform: uppercase; grid-column: 1/-1; }
`;

// ─── LIGHTBOX ────────────────────────────────────────────────────────────────
function Lightbox({ items, idx, onClose, onNav }) {
  const item = items[idx];
  const kat = KAT_MAP[item.kategoriId];

  useEffect(() => {
    const h = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft" && idx > 0) onNav(idx - 1);
      if (e.key === "ArrowRight" && idx < items.length - 1) onNav(idx + 1);
    };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [idx]);

  return (
    <div className="lb" onClick={onClose}>
      <div className="lb-inner" onClick={(e) => e.stopPropagation()}>
        <div className="lb-img">
          <button className="lb-x" onClick={onClose}>
            ✕
          </button>
          <button
            className="lb-nav prev"
            disabled={idx === 0}
            onClick={() => onNav(idx - 1)}
          >
            ←
          </button>
          <button
            className="lb-nav next"
            disabled={idx === items.length - 1}
            onClick={() => onNav(idx + 1)}
          >
            →
          </button>
          <img src={item.gambar} alt={item.judul} />
        </div>
        <div className="lb-meta">
          <div>
            <div className="lb-title">{item.judul || "Untitled"}</div>
            {item.deskripsi && <div className="lb-desc">{item.deskripsi}</div>}
          </div>
          <div className="lb-right">
            <div
              className="lb-chip"
              style={{ borderColor: kat?.warna ? kat.warna + "33" : undefined }}
            >
              <div
                className="chip-dot"
                style={{ background: kat?.warna ?? "#fff" }}
              />
              {kat?.nama ?? "Umum"}
            </div>
            <div className="lb-date-lbl">{fmtLong(item.createdAt)}</div>
            <div className="lb-counter">
              {idx + 1} / {items.length}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── GRID ────────────────────────────────────────────────────────────────────
function GridView({ items, offset, onOpen }) {
  const rows = [];
  for (let i = 0; i < items.length; i += 6) rows.push(items.slice(i, i + 6));
  let gi = 0;

  return (
    <>
      {rows.map((row, ri) => (
        <div key={ri} className="g-container">
          {row.map((item, ci) => {
            const absIdx = offset + ri * 6 + ci;
            const kat = KAT_MAP[item.kategoriId];
            const isLarge = ci === 0;
            const isTxt = ci === 5;
            return (
              <div
                key={item.id}
                className={`g-cell ${isLarge ? "span2" : ""} ${isTxt ? "txt-only" : ""}`}
                style={{ animationDelay: `${ci * 55}ms` }}
                onClick={() => onOpen(absIdx)}
              >
                <div className="g-upper">
                  <div className="g-meta">
                    <div
                      className="g-chip"
                      style={{
                        borderColor: kat?.warna ? kat.warna + "28" : undefined,
                      }}
                    >
                      <div
                        className="g-chip-dot"
                        style={{ background: kat?.warna ?? "#fff" }}
                      />
                      {kat?.nama ?? "Umum"}
                    </div>
                    <span className="g-date">{fmtShort(item.createdAt)}</span>
                  </div>
                  <div className="g-title">{item.judul || "Untitled"}</div>
                  <div className="g-divider" />
                  <div className="g-num">
                    {String(absIdx + 1).padStart(2, "0")}
                  </div>
                </div>
                {isTxt ? (
                  <div className="g-desc">{item.deskripsi || "—"}</div>
                ) : (
                  <div
                    className={`g-img ${isLarge ? "ratio-wide" : "ratio-std"}`}
                  >
                    <img src={item.gambar} alt={item.judul} loading="lazy" />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      ))}
    </>
  );
}

// ─── LIST ────────────────────────────────────────────────────────────────────
function ListView({ items, offset, onOpen }) {
  return (
    <>
      {items.map((item, i) => {
        const kat = KAT_MAP[item.kategoriId];
        return (
          <div
            key={item.id}
            className="l-row"
            style={{
              animationDelay: `${i * 40}ms`,
              "--lc": kat?.warna ?? "rgba(255,255,255,0.4)",
            }}
            onClick={() => onOpen(offset + i)}
          >
            <style>{`.l-row:hover::before { background: var(--lc, rgba(255,255,255,0.4)); }`}</style>
            <div className="l-idx">
              {String(offset + i + 1).padStart(2, "0")}
            </div>
            <div
              className="l-dot"
              style={{ background: kat?.warna ?? "rgba(255,255,255,0.2)" }}
            />
            <div className="l-content">
              <div className="l-tag">{kat?.nama ?? "Umum"}</div>
              <div className="l-title">{item.judul || "Untitled"}</div>
            </div>
            <div className="l-date">{fmtShort(item.createdAt)}</div>
            <div className="l-thumb">
              <img src={item.gambar} alt={item.judul} loading="lazy" />
            </div>
            <div className="l-arrow">→</div>
          </div>
        );
      })}
    </>
  );
}

// ─── PAGINATION ───────────────────────────────────────────────────────────────
function Pagination({ total, perPage, current, onChange }) {
  const pages = Math.ceil(total / perPage);
  if (pages <= 1) return null;
  return (
    <div className="pages">
      <button
        className="p-btn"
        disabled={current === 1}
        onClick={() => onChange(current - 1)}
      >
        ←
      </button>
      {Array.from({ length: pages }, (_, i) => i + 1).map((p) => (
        <button
          key={p}
          className={`p-btn ${current === p ? "on" : ""}`}
          onClick={() => onChange(p)}
        >
          {p}
        </button>
      ))}
      <button
        className="p-btn"
        disabled={current === pages}
        onClick={() => onChange(current + 1)}
      >
        →
      </button>
    </div>
  );
}

// ─── MAIN ─────────────────────────────────────────────────────────────────────
export default function GalleryPage() {
  const [cat, setCat] = useState(0);
  const [view, setView] = useState("grid");
  const [sort, setSort] = useState("latest");
  const [page, setPage] = useState(1);
  const [lbIdx, setLbIdx] = useState(null);

  const filtered = GALERI.filter((g) => cat === 0 || g.kategoriId === cat);
  const sorted = [...filtered].sort((a, b) =>
    sort === "latest" ? b.id - a.id : a.id - b.id,
  );
  const perPage = view === "grid" ? PER_PAGE_GRID : PER_PAGE_LIST;
  const paged = sorted.slice((page - 1) * perPage, page * perPage);
  const featured = sorted[0];
  const featKat = featured ? KAT_MAP[featured.kategoriId] : null;
  const offset = (page - 1) * perPage;

  const handleCat = (id) => {
    setCat(id);
    setPage(1);
    setLbIdx(null);
  };

  const handleNav = useCallback((i) => {
    setLbIdx(i);
  }, []);

  return (
    <>
      <style>{CSS}</style>

      {/* HERO */}
      <header className="hero">
        <div className="hero-bg" />
        <div className="hero-word">GALERI</div>
        {featured && (
          <div className="hero-featured" onClick={() => setLbIdx(0)}>
            <img src={featured.gambar} alt={featured.judul} />
            <div className="hero-feat-overlay">
              <div>
                <div className="hero-feat-title">{featured.judul}</div>
                {featured.deskripsi && (
                  <div className="hero-feat-desc">{featured.deskripsi}</div>
                )}
              </div>
              {featKat && (
                <div className="hero-feat-chip">
                  <div
                    className="chip-dot"
                    style={{ background: featKat.warna ?? "#fff" }}
                  />
                  {featKat.nama}
                </div>
              )}
            </div>
          </div>
        )}
        <div className="hero-bottom">
          <span className="hero-sub">Veloxity · Galeri Foto · Indonesia</span>
          <button className="see-more-btn">Lihat Semua &nbsp;›</button>
        </div>
      </header>

      {/* NAVBAR */}
      <nav className="navbar">
        <div className="nav-cats">
          <button
            className={`nav-cat ${cat === 0 ? "active" : ""}`}
            onClick={() => handleCat(0)}
          >
            <div
              className="n-dot"
              style={{ background: "rgba(255,255,255,0.35)" }}
            />
            ALL <span className="n-count">{GALERI.length}</span>
          </button>
          {KATEGORI.map((k) => (
            <button
              key={k.id}
              className={`nav-cat ${cat === k.id ? "active" : ""}`}
              style={{ "--uc": k.warna }}
              onClick={() => handleCat(k.id)}
            >
              <div className="n-dot" style={{ background: k.warna }} />
              {k.nama.toUpperCase()}{" "}
              <span className="n-count">
                {GALERI.filter((g) => g.kategoriId === k.id).length}
              </span>
            </button>
          ))}
        </div>
        <div className="nav-right">
          <button
            className={`v-btn ${view === "grid" ? "on" : ""}`}
            title="Grid"
            onClick={() => {
              setView("grid");
              setPage(1);
            }}
          >
            ⊞
          </button>
          <button
            className={`v-btn ${view === "list" ? "on" : ""}`}
            title="List"
            onClick={() => {
              setView("list");
              setPage(1);
            }}
          >
            ☰
          </button>
          <select
            className="n-sort"
            value={sort}
            onChange={(e) => {
              setSort(e.target.value);
              setPage(1);
            }}
          >
            <option value="latest">Terbaru</option>
            <option value="oldest">Terlama</option>
          </select>
        </div>
      </nav>

      {/* CONTENT */}
      <section>
        <div className="sec-head">
          <span className="sec-lbl">
            {cat === 0
              ? "Semua Foto"
              : KATEGORI.find((k) => k.id === cat)?.nama}
          </span>
          <div className="sec-line" />
          <span className="sec-cnt">{sorted.length} foto</span>
        </div>

        {paged.length === 0 ? (
          <div className="empty">Tidak ada foto ditemukan</div>
        ) : view === "grid" ? (
          <GridView items={paged} offset={offset} onOpen={(i) => setLbIdx(i)} />
        ) : (
          <ListView items={paged} offset={offset} onOpen={(i) => setLbIdx(i)} />
        )}
      </section>

      <Pagination
        total={sorted.length}
        perPage={perPage}
        current={page}
        onChange={(p) => {
          setPage(p);
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
      />

      {lbIdx !== null && (
        <Lightbox
          items={sorted}
          idx={lbIdx}
          onClose={() => setLbIdx(null)}
          onNav={handleNav}
        />
      )}
    </>
  );
}
