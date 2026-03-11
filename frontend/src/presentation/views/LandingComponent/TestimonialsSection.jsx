import { useState } from "react";

const ALL_TESTIMONIALS = [
  {
    id: 1,
    initials: "RF",
    color: "#60a5fa",
    name: "Rizky Firmansyah",
    role: "CTO",
    company: "Tokobuku Digital",
    category: "Bisnis",
    plan: "Biz Pro · 500 Mbps",
    rating: 5,
    quote:
      "Sejak beralih ke Veloxity, operasional tim kami berubah drastis. Video call tanpa lag, deploy ke server lebih cepat, dan tidak ada lagi keluhan dari tim remote kami di seluruh Indonesia. Uptime 99.9% bukan sekadar angka — kami merasakannya langsung setiap hari.",
  },
  {
    id: 2,
    initials: "SM",
    color: "#f472b6",
    name: "Sinta Maharani",
    role: "Founder",
    company: "Studio Kreasi Co.",
    category: "Rumahan",
    plan: "Home Pro · 300 Mbps",
    rating: 5,
    quote:
      "Sebagai desainer yang kerja dari rumah, kecepatan upload adalah segalanya. File 2GB ke client selesai dalam hitungan menit, bukan jam. Veloxity benar-benar mengubah cara saya bekerja — tanpa kompromi kualitas.",
  },
  {
    id: 3,
    initials: "BH",
    color: "#a78bfa",
    name: "Budi Hartono",
    role: "IT Infrastructure Manager",
    company: "PT Nusantara Logistik",
    category: "Enterprise",
    plan: "Corp Advanced · 2 Gbps",
    rating: 5,
    quote:
      "Kami mengelola 12 cabang di Jawa Timur. Dengan Veloxity, semua cabang terhubung ke server pusat dengan latensi di bawah 5ms. Ini bukan sekadar internet — ini infrastruktur bisnis yang sesungguhnya.",
  },
  {
    id: 4,
    initials: "DK",
    color: "#fb923c",
    name: "Dewi Kusuma",
    role: "Content Creator",
    company: "Independent",
    category: "Rumahan",
    plan: "Home Plus · 100 Mbps",
    rating: 5,
    quote:
      "Upload video 4K langsung dari rumah tanpa buffering. Livestream gaming tanpa drop frame. Saya sudah coba 3 ISP berbeda di Yogyakarta — Veloxity adalah yang paling konsisten, terutama di jam sibuk malam hari.",
  },
  {
    id: 5,
    initials: "AZ",
    color: "#00c8c8",
    name: "Ahmad Zulkifli",
    role: "Head of Engineering",
    company: "Fintech Nusantara",
    category: "Enterprise",
    plan: "Dedicated 1G · Simetris",
    rating: 5,
    quote:
      "Jalur dedicated Veloxity memberikan bandwidth penuh 1 Gbps simetris 24 jam — kritis untuk sistem pembayaran real-time kami. Dalam 18 bulan berlangganan, total downtime kurang dari 4 menit. Luar biasa.",
  },
  {
    id: 6,
    initials: "LS",
    color: "#4ade80",
    name: "Lina Santoso",
    role: "Operations Director",
    company: "Sekolah Coding Masa Depan",
    category: "Bisnis",
    plan: "Biz Max · 1 Gbps",
    rating: 5,
    quote:
      "200 siswa belajar coding secara bersamaan, semuanya butuh koneksi stabil untuk cloud IDE dan video conference. Veloxity menangani semua itu tanpa pernah sekali pun membuat kelas kami terhenti.",
  },
  {
    id: 7,
    initials: "TP",
    color: "#fbbf24",
    name: "Teguh Prayoga",
    role: "Game Developer",
    company: "PixelForge Studio",
    category: "Bisnis",
    plan: "Biz Starter · 200 Mbps",
    rating: 5,
    quote:
      "Build pipeline kami yang berjalan di cloud butuh koneksi upload yang sangat stabil. Veloxity menghilangkan bottleneck itu sepenuhnya. Tim kami sekarang bisa push update game dalam hitungan menit.",
  },
  {
    id: 8,
    initials: "NA",
    color: "#e879f9",
    name: "Nadia Aulia",
    role: "Remote Work Consultant",
    company: "NomadWork ID",
    category: "Rumahan",
    plan: "Home Lite · 50 Mbps",
    rating: 5,
    quote:
      "Saya bekerja dari berbagai kota di Indonesia dan selalu mengandalkan Veloxity di setiap lokasi. Coverage-nya luas dan kualitasnya konsisten — tidak pernah membuat saya kecewa di tengah meeting penting.",
  },
  {
    id: 9,
    initials: "DR",
    color: "#34d399",
    name: "Dimas Raharjo",
    role: "DevOps Lead",
    company: "CloudBridge Indonesia",
    category: "Enterprise",
    plan: "Corp Essential · 1 Gbps",
    rating: 5,
    quote:
      "Infrastruktur CI/CD kami membutuhkan koneksi yang tidak pernah putus. Dengan SLA 99.9% Veloxity dan tim NOC yang proaktif, kami bisa fokus membangun produk tanpa khawatir soal konektivitas.",
  },
];

const PER_PAGE = 3;
const TOTAL_PAGES = Math.ceil(ALL_TESTIMONIALS.length / PER_PAGE);

const MARQUEE_ITEMS = [
  "Kecepatan Konsisten",
  "Instalasi Gratis",
  "Support 24/7",
  "No Contract",
  "Uptime 99.9%",
  "SLA Tertulis",
  "Tim NOC Profesional",
  "Coverage 5 Kota",
  "Dedicated Line",
];

const CAT_COLOR = {
  Bisnis: "#60a5fa",
  Rumahan: "#4ade80",
  Enterprise: "#a78bfa",
};

const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Mono:wght@300;400;500&family=DM+Serif+Display:ital@0;1&display=swap');

  *, *::before, *::after { box-sizing:border-box; margin:0; padding:0; }
  :root {
    --bg: #060606;
    --line: rgba(255,255,255,0.08);
    --line-h: rgba(255,255,255,0.15);
    --text: #ececec;
    --text-2: rgba(236,236,236,0.42);
    --text-3: rgba(236,236,236,0.2);
    --text-4: rgba(236,236,236,0.08);
    --surf: rgba(255,255,255,0.025);
    --surf-h: rgba(255,255,255,0.048);
  }
  body { background:var(--bg); color:var(--text); font-family:'Syne',sans-serif; min-height:100vh; overflow-x:hidden; }

  /* ── SECTION ── */
  .ts { border-top: 1px solid var(--line); }

  /* ── TOP LABEL ── */
  .ts-top {
    padding: 20px 60px;
    border-bottom: 1px solid var(--line);
  }
  .ts-top-label {
    font-family: 'DM Mono', monospace;
    font-size: 9px; letter-spacing: 0.38em; color: var(--text-3);
    text-transform: uppercase;
  }

  /* ── HERO HEADER ── */
  .ts-header {
    padding: 52px 60px 48px;
    border-bottom: 1px solid var(--line);
    display: grid; grid-template-columns: 1fr auto;
    align-items: end; gap: 40px;
  }

  .ts-title {
    font-size: clamp(44px, 7vw, 96px);
    font-weight: 800; letter-spacing: -0.025em;
    line-height: 0.88; text-transform: uppercase;
    color: var(--text);
  }
  .ts-title span { color: var(--text-3); }

  .ts-header-right { text-align: right; }
  .ts-sub {
    font-family: 'DM Mono', monospace;
    font-size: 11px; letter-spacing: 0.05em; color: var(--text-3);
    line-height: 1.75; max-width: 320px; margin-left: auto;
    margin-bottom: 24px;
  }
  .ts-join-btn {
    display: inline-flex; align-items: center; gap: 10px;
    font-family: 'DM Mono', monospace;
    font-size: 9px; letter-spacing: 0.22em; text-transform: uppercase;
    color: var(--text-2); background: none;
    border: 1px solid var(--line-h); border-radius: 3px;
    padding: 12px 20px; cursor: pointer; transition: all 0.18s;
  }
  .ts-join-btn:hover { border-color: rgba(255,255,255,0.28); color: var(--text); background: var(--surf); }

  /* ── MARQUEE ── */
  .ts-marquee {
    border-bottom: 1px solid var(--line);
    overflow: hidden; padding: 16px 0; position: relative;
  }
  .ts-marquee::before, .ts-marquee::after {
    content:''; position:absolute; top:0; bottom:0; width:80px; z-index:2; pointer-events:none;
  }
  .ts-marquee::before { left:0; background: linear-gradient(to right, var(--bg), transparent); }
  .ts-marquee::after  { right:0; background: linear-gradient(to left, var(--bg), transparent); }
  .ts-track { display:flex; animation: mq 28s linear infinite; width:max-content; }
  @keyframes mq { from{transform:translateX(0)} to{transform:translateX(-50%)} }
  .ts-mitem {
    display:flex; align-items:center; gap:14px; padding:0 28px;
    border-right:1px solid var(--line);
    font-family:'DM Mono',monospace; font-size:8.5px; letter-spacing:0.22em;
    text-transform:uppercase; color:var(--text-3); white-space:nowrap;
  }
  .ts-mdot { width:4px; height:4px; border-radius:50%; background:var(--text-3); flex-shrink:0; }

  /* ── CARD GRID ── */
  .ts-grid {
    display: grid; grid-template-columns: repeat(3, 1fr);
    gap: 0;
    padding: 40px 60px;
    border-bottom: 1px solid var(--line);
  }

  /* Cards separated by inner borders */
  .ts-card {
    padding: 32px 32px 28px;
    border: 1px solid var(--line);
    border-radius: 2px;
    display: flex; flex-direction: column;
    cursor: default;
    transition: background 0.22s, border-color 0.22s;
    animation: cardUp 0.38s ease both;
    position: relative; overflow: hidden;
    background: var(--surf);
    margin: 8px;
  }
  .ts-card:hover { background: var(--surf-h); border-color: var(--line-h); }

  /* Subtle top accent line */
  .ts-card::before {
    content: '';
    position: absolute; top: 0; left: 0; right: 0; height: 1px;
    transition: opacity 0.3s;
    opacity: 0;
  }
  .ts-card:hover::before { opacity: 1; }

  @keyframes cardUp {
    from { opacity:0; transform:translateY(12px); }
    to   { opacity:1; transform:translateY(0); }
  }

  /* Quote mark */
  .ts-qmark {
    font-family: 'DM Serif Display', serif;
    font-size: 48px; color: var(--text-4); line-height: 1;
    margin-bottom: 12px; display: block;
    user-select: none;
  }

  /* Quote text */
  .ts-quote {
    font-family: 'DM Mono', monospace;
    font-size: clamp(11px, 1.05vw, 13px);
    letter-spacing: 0.03em; color: var(--text-2);
    line-height: 1.85; flex: 1;
    display: -webkit-box; -webkit-line-clamp: 6;
    -webkit-box-orient: vertical; overflow: hidden;
    margin-bottom: 8px;
  }

  .ts-read-more {
    font-family: 'DM Mono', monospace;
    font-size: 8.5px; letter-spacing: 0.15em; color: var(--text-3);
    text-transform: uppercase; cursor: pointer;
    background: none; border: none; padding: 0; text-align: left;
    transition: color 0.18s; margin-bottom: 24px;
    display: flex; align-items: center; gap: 6px;
  }
  .ts-read-more:hover { color: var(--text-2); }

  /* Divider */
  .ts-card-div { height: 1px; background: var(--line); margin-bottom: 20px; }

  /* Person */
  .ts-person { display: flex; align-items: center; gap: 14px; }

  .ts-avatar {
    width: 42px; height: 42px; border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    font-size: 12px; font-weight: 700; letter-spacing: 0.05em;
    flex-shrink: 0; border: 1px solid rgba(255,255,255,0.06);
  }

  .ts-person-info { flex: 1; min-width: 0; }
  .ts-pname {
    font-size: 13px; font-weight: 700; color: var(--text);
    letter-spacing: -0.01em; line-height: 1.1;
  }
  .ts-prole {
    font-family: 'DM Mono', monospace;
    font-size: 8.5px; letter-spacing: 0.08em; color: var(--text-3);
    text-transform: uppercase; margin-top: 2px;
    white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
  }

  .ts-stars { display:flex; gap:2px; flex-shrink:0; }
  .ts-star { font-size:10px; color:rgba(255,255,255,0.15); }
  .ts-star.on { color:rgba(255,255,255,0.6); }

  /* Plan badge */
  .ts-plan {
    margin-top: 14px;
    font-family: 'DM Mono', monospace;
    font-size: 7.5px; letter-spacing: 0.18em; text-transform: uppercase;
    color: var(--text-3);
    border: 1px solid var(--line); border-radius: 3px;
    padding: 4px 9px; display: inline-block; width: fit-content;
    transition: border-color 0.2s;
  }
  .ts-card:hover .ts-plan { border-color: rgba(255,255,255,0.12); color: var(--text-2); }

  /* Category chip */
  .ts-cat-chip {
    position: absolute; top: 20px; right: 20px;
    display: flex; align-items: center; gap: 5px;
    padding: 3px 10px 3px 8px; border-radius: 20px;
    border: 1px solid rgba(255,255,255,0.07);
    background: rgba(0,0,0,0.3);
    font-family: 'DM Mono', monospace;
    font-size: 7.5px; letter-spacing: 0.15em; text-transform: uppercase;
    color: var(--text-3);
  }
  .cat-dot { width: 5px; height: 5px; border-radius: 50%; flex-shrink: 0; }

  /* ── PAGINATION ── */
  .ts-pagination {
    display: flex; align-items: center; justify-content: space-between;
    padding: 24px 60px;
  }

  .ts-page-label {
    font-family: 'DM Mono', monospace;
    font-size: 9px; letter-spacing: 0.22em; color: var(--text-3);
    text-transform: uppercase;
  }

  .ts-page-controls { display: flex; align-items: center; gap: 8px; }

  .ts-pg-dots { display: flex; gap: 8px; margin: 0 16px; }
  .ts-pg-dot {
    width: 6px; height: 6px; border-radius: 50%;
    background: var(--text-4); cursor: pointer;
    transition: background 0.2s, transform 0.2s;
    border: none; padding: 0;
  }
  .ts-pg-dot.on { background: var(--text-3); transform: scale(1.3); }

  .ts-pg-btn {
    width: 40px; height: 40px; border-radius: 50%;
    border: 1px solid var(--line-h);
    background: none; color: var(--text-3); font-size: 15px;
    display: flex; align-items: center; justify-content: center;
    cursor: pointer; transition: all 0.18s;
  }
  .ts-pg-btn:hover { border-color: rgba(255,255,255,0.28); color: var(--text-2); background: var(--surf); }
  .ts-pg-btn:disabled { opacity: 0.2; cursor: default; }

  /* ── MODAL overlay ── */
  .ts-modal-overlay {
    position: fixed; inset: 0; z-index: 999;
    background: rgba(0,0,0,0.88);
    display: flex; align-items: center; justify-content: center;
    padding: 24px; animation: mo 0.2s ease;
  }
  @keyframes mo { from{opacity:0} to{opacity:1} }

  .ts-modal {
    background: #0d0d0d; border: 1px solid var(--line-h);
    border-radius: 3px; padding: 40px;
    max-width: 600px; width: 100%;
    animation: ms 0.25s ease;
    position: relative;
  }
  @keyframes ms { from{transform:scale(0.96);opacity:0} to{transform:scale(1);opacity:1} }

  .ts-modal-close {
    position: absolute; top: 16px; right: 16px;
    width: 36px; height: 36px; border-radius: 50%;
    background: var(--surf); border: 1px solid var(--line);
    color: var(--text-3); font-size: 14px;
    display: flex; align-items: center; justify-content: center;
    cursor: pointer; transition: all 0.18s;
  }
  .ts-modal-close:hover { background: var(--surf-h); color: var(--text-2); }

  .ts-modal-qmark {
    font-family: 'DM Serif Display', serif;
    font-size: 56px; color: var(--text-4); line-height: 1; margin-bottom: 10px;
  }
  .ts-modal-quote {
    font-family: 'DM Mono', monospace;
    font-size: 13px; letter-spacing: 0.04em; color: var(--text-2);
    line-height: 1.85; margin-bottom: 28px;
  }
  .ts-modal-div { height: 1px; background: var(--line); margin-bottom: 24px; }
  .ts-modal-person { display: flex; align-items: center; gap: 14px; }
  .ts-modal-info { flex: 1; }
  .ts-modal-name { font-size: 15px; font-weight: 700; color: var(--text); letter-spacing: -0.01em; }
  .ts-modal-role {
    font-family: 'DM Mono', monospace;
    font-size: 9px; letter-spacing: 0.1em; color: var(--text-3);
    text-transform: uppercase; margin-top: 3px;
  }
  .ts-modal-plan {
    font-family: 'DM Mono', monospace;
    font-size: 8px; letter-spacing: 0.18em; text-transform: uppercase;
    color: var(--text-3); border: 1px solid var(--line);
    border-radius: 3px; padding: 4px 9px; margin-top: 16px;
    display: inline-block;
  }
`;

export function TestimonialsSection() {
  const [page, setPage] = useState(0);
  const [modal, setModal] = useState(null);

  const paged = ALL_TESTIMONIALS.slice(
    page * PER_PAGE,
    page * PER_PAGE + PER_PAGE,
  );
  const marquee = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS];

  return (
    <>
      <style>{CSS}</style>
      <section className="ts">
        {/* Top label */}
        <div className="ts-top">
          <div className="ts-top-label">Testimonials</div>
        </div>

        {/* Hero header */}
        <div className="ts-header">
          <h2 className="ts-title">
            What People
            <br />
            <span>Say About</span>
            <br />
            Us
          </h2>
          <div className="ts-header-right">
            <p className="ts-sub">
              Bergabung bersama ribuan pelanggan yang telah merasakan internet
              yang sesungguhnya — cepat, stabil, dan dapat diandalkan.
            </p>
            <button className="ts-join-btn">Bergabung Sekarang &nbsp;→</button>
          </div>
        </div>

        {/* Marquee */}
        <div className="ts-marquee">
          <div className="ts-track">
            {marquee.map((item, i) => (
              <div key={i} className="ts-mitem">
                <div className="ts-mdot" />
                {item}
              </div>
            ))}
          </div>
        </div>

        {/* Card grid */}
        <div className="ts-grid">
          {paged.map((t, i) => {
            const catColor = CAT_COLOR[t.category] ?? "#fff";
            return (
              <div
                key={t.id}
                className="ts-card"
                style={{
                  animationDelay: `${i * 70}ms`,
                  "--ac": catColor,
                }}
              >
                {/* Top accent line per card */}
                <style>{`.ts-card:hover::before { background: linear-gradient(to right, var(--ac, rgba(255,255,255,0.2)), transparent); }`}</style>

                {/* Category chip */}
                <div className="ts-cat-chip">
                  <div className="cat-dot" style={{ background: catColor }} />
                  {t.category}
                </div>

                {/* Quote */}
                <span className="ts-qmark">"</span>
                <p className="ts-quote">{t.quote}</p>
                <button className="ts-read-more" onClick={() => setModal(t)}>
                  Baca selengkapnya &nbsp;→
                </button>

                <div className="ts-card-div" />

                {/* Person */}
                <div className="ts-person">
                  <div
                    className="ts-avatar"
                    style={{
                      background: t.color + "1a",
                      borderColor: t.color + "30",
                      color: t.color,
                    }}
                  >
                    {t.initials}
                  </div>
                  <div className="ts-person-info">
                    <div className="ts-pname">{t.name}</div>
                    <div className="ts-prole">
                      {t.role}, {t.company}
                    </div>
                  </div>
                  <div className="ts-stars">
                    {Array.from({ length: 5 }, (_, si) => (
                      <span
                        key={si}
                        className={`ts-star ${si < t.rating ? "on" : ""}`}
                      >
                        ★
                      </span>
                    ))}
                  </div>
                </div>

                {/* Plan */}
                <div className="ts-plan">{t.plan}</div>
              </div>
            );
          })}
        </div>

        {/* Pagination */}
        <div className="ts-pagination">
          <div className="ts-page-label">
            Page {page + 1} of {TOTAL_PAGES}
          </div>
          <div className="ts-page-controls">
            <button
              className="ts-pg-btn"
              disabled={page === 0}
              onClick={() => setPage((p) => p - 1)}
            >
              ←
            </button>
            <div className="ts-pg-dots">
              {Array.from({ length: TOTAL_PAGES }, (_, i) => (
                <button
                  key={i}
                  className={`ts-pg-dot ${i === page ? "on" : ""}`}
                  onClick={() => setPage(i)}
                />
              ))}
            </div>
            <button
              className="ts-pg-btn"
              disabled={page === TOTAL_PAGES - 1}
              onClick={() => setPage((p) => p + 1)}
            >
              →
            </button>
          </div>
        </div>
      </section>

      {/* Modal */}
      {modal && (
        <div className="ts-modal-overlay" onClick={() => setModal(null)}>
          <div className="ts-modal" onClick={(e) => e.stopPropagation()}>
            <button className="ts-modal-close" onClick={() => setModal(null)}>
              ✕
            </button>
            <div className="ts-modal-qmark">"</div>
            <p className="ts-modal-quote">{modal.quote}</p>
            <div className="ts-modal-div" />
            <div className="ts-modal-person">
              <div
                className="ts-avatar"
                style={{
                  width: 48,
                  height: 48,
                  background: modal.color + "1a",
                  borderColor: modal.color + "30",
                  color: modal.color,
                  fontSize: 13,
                }}
              >
                {modal.initials}
              </div>
              <div className="ts-modal-info">
                <div className="ts-modal-name">{modal.name}</div>
                <div className="ts-modal-role">
                  {modal.role} · {modal.company}
                </div>
              </div>
              <div className="ts-stars">
                {Array.from({ length: 5 }, (_, si) => (
                  <span
                    key={si}
                    className={`ts-star ${si < modal.rating ? "on" : ""}`}
                  >
                    ★
                  </span>
                ))}
              </div>
            </div>
            <div className="ts-modal-plan">{modal.plan}</div>
          </div>
        </div>
      )}
    </>
  );
}

export default TestimonialsSection;
