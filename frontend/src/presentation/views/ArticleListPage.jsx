import { useEffect, useRef, useState } from "react";
import { useArtikelApi } from "../logics/app/useArtikelApi";
import { useNavigate } from "react-router";

// ─── DATA ────────────────────────────────────────────────────────────────────
const CATEGORIES = [
  { id: "all", label: "Semua", short: "ALL" },
  { id: "teknologi", label: "Teknologi", short: "TECH" },
  { id: "jaringan", label: "Jaringan", short: "NET" },
  { id: "bisnis", label: "Bisnis", short: "BIZ" },
  { id: "tips", label: "Tips", short: "TIPS" },
];

// const ARTICLES = [
//   {
//     id: 1,
//     category: "teknologi",
//     title:
//       "Fiber Optik vs Kabel Tembaga: Mana yang Lebih Unggul untuk Rumahan?",
//     excerpt:
//       "Perbandingan mendalam antara dua teknologi transmisi data yang paling umum digunakan, dari sisi kecepatan, stabilitas, hingga biaya instalasi.",
//     date: "24.02",
//     month: "FEB",
//     year: "2026",
//     readTime: "6 min",
//     tag: "Teknologi",
//     img: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=900&q=75",
//     featured: true,
//   },
//   {
//     id: 2,
//     category: "jaringan",
//     title: "Cara Mengoptimalkan Kecepatan WiFi di Rumah dengan Benar",
//     excerpt:
//       "Panduan lengkap mulai dari penempatan router, pemilihan channel, hingga konfigurasi QoS agar koneksi stabil di seluruh sudut rumah.",
//     date: "21.02",
//     month: "FEB",
//     year: "2026",
//     readTime: "5 min",
//     tag: "Jaringan",
//     img: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=900&q=75",
//     featured: false,
//   },
//   {
//     id: 3,
//     category: "bisnis",
//     title:
//       "Mengapa Bisnis Modern Butuh Koneksi Simetris, Bukan Hanya Cepat Download",
//     excerpt:
//       "Upload speed yang sama pentingnya dengan download — inilah alasan enterprise global beralih ke dedicated symmetric connection.",
//     date: "18.02",
//     month: "FEB",
//     year: "2026",
//     readTime: "8 min",
//     tag: "Bisnis",
//     img: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=900&q=75",
//     featured: false,
//   },
//   {
//     id: 4,
//     category: "teknologi",
//     title: "IPv6: Apa Artinya bagi Pengguna Internet Biasa di Indonesia?",
//     excerpt:
//       "Transisi dari IPv4 ke IPv6 bukan sekadar angka. Begini dampak nyatanya terhadap performa, keamanan, dan aksesibilitas jaringan kamu.",
//     date: "15.02",
//     month: "FEB",
//     year: "2026",
//     readTime: "7 min",
//     tag: "Teknologi",
//     img: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=900&q=75",
//     featured: false,
//   },
//   {
//     id: 5,
//     category: "tips",
//     title: "5 Tanda Kamu Sudah Waktunya Upgrade Paket Internet",
//     excerpt:
//       "Buffer saat meeting? Game lag terus? Ini sinyal yang tidak boleh diabaikan — dan solusi yang tepat untuk setiap kebutuhan.",
//     date: "12.02",
//     month: "FEB",
//     year: "2026",
//     readTime: "4 min",
//     tag: "Tips",
//     img: "https://images.unsplash.com/photo-1593640408182-31c228e68af4?w=900&q=75",
//     featured: false,
//   },
//   {
//     id: 6,
//     category: "jaringan",
//     title:
//       "Mengenal SD-WAN: Teknologi Jaringan yang Dipakai Enterprise Kelas Dunia",
//     excerpt:
//       "Software-defined WAN memungkinkan perusahaan mengelola koneksi lintas lokasi dengan efisiensi dan visibilitas penuh dari satu dashboard.",
//     date: "09.02",
//     month: "FEB",
//     year: "2026",
//     readTime: "9 min",
//     tag: "Jaringan",
//     img: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?w=900&q=75",
//     featured: false,
//   },
//   {
//     id: 7,
//     category: "bisnis",
//     title: "SLA Internet: Baca Ini Sebelum Tanda Tangan Kontrak dengan ISP",
//     excerpt:
//       "Service Level Agreement bukan formalitas — ini adalah jaminan hukum kamu atas uptime, kecepatan, dan kompensasi ketika layanan bermasalah.",
//     date: "06.02",
//     month: "FEB",
//     year: "2026",
//     readTime: "6 min",
//     tag: "Bisnis",
//     img: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=900&q=75",
//     featured: false,
//   },
//   {
//     id: 8,
//     category: "tips",
//     title: "Cara Cek Kecepatan Internet yang Akurat: Jangan Salah Metode",
//     excerpt:
//       "Speedtest bukan satu-satunya cara, dan bukan yang paling akurat. Inilah cara profesional mengukur kualitas koneksimu secara komprehensif.",
//     date: "03.02",
//     month: "FEB",
//     year: "2026",
//     readTime: "5 min",
//     tag: "Tips",
//     img: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=900&q=75",
//     featured: false,
//   },
//   {
//     id: 9,
//     category: "teknologi",
//     title: "Masa Depan Internet: 10G PON dan Apa yang Akan Berubah",
//     excerpt:
//       "Generasi berikutnya dari teknologi fiber pasif menjanjikan kecepatan 10 gigabit ke rumah. Kapan Indonesia siap?",
//     date: "28.01",
//     month: "JAN",
//     year: "2026",
//     readTime: "7 min",
//     tag: "Teknologi",
//     img: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=900&q=75",
//     featured: false,
//   },
//   {
//     id: 10,
//     category: "jaringan",
//     title:
//       "BGP Routing: Kenapa Rute Internet Kamu Tidak Selalu Lurus ke Tujuan",
//     excerpt:
//       "Border Gateway Protocol menentukan bagaimana paket data melakukan perjalanan melintasi benua — dan mengapa latency bisa tiba-tiba melonjak.",
//     date: "25.01",
//     month: "JAN",
//     year: "2026",
//     readTime: "10 min",
//     tag: "Jaringan",
//     img: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=900&q=75",
//     featured: false,
//   },
//   {
//     id: 11,
//     category: "bisnis",
//     title:
//       "Cloud vs On-Premise: Pertimbangan Koneksi Internet yang Sering Dilupakan",
//     excerpt:
//       "Memilih arsitektur IT bukan hanya soal server — bandwidth, latency ke data center, dan redundansi koneksi menjadi faktor penentu.",
//     date: "22.01",
//     month: "JAN",
//     year: "2026",
//     readTime: "8 min",
//     tag: "Bisnis",
//     img: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?w=900&q=75",
//     featured: false,
//   },
//   {
//     id: 12,
//     category: "tips",
//     title: "Troubleshoot Koneksi Internet Sendiri Tanpa Harus Telepon CS",
//     excerpt:
//       "Langkah-langkah diagnosa mandiri yang bisa menyelesaikan 80% masalah koneksi sebelum kamu perlu menghubungi tim support.",
//     date: "19.01",
//     month: "JAN",
//     year: "2026",
//     readTime: "5 min",
//     tag: "Tips",
//     img: "https://images.unsplash.com/photo-1593640408182-31c228e68af4?w=900&q=75",
//     featured: false,
//   },
// ];

const PER_PAGE = 6;

// ─── CSS ─────────────────────────────────────────────────────────────────────
const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Mono:wght@300;400;500&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --bg: #060606;
    --line: rgba(255,255,255,0.07);
    --line-h: rgba(255,255,255,0.15);
    --text: #ececec;
    --text-2: rgba(236,236,236,0.38);
    --text-3: rgba(236,236,236,0.17);
    --accent: #00c8c8;
    --surface: rgba(255,255,255,0.028);
    --surface-h: rgba(255,255,255,0.055);
    --featured-bg: rgba(0,30,35,0.85);
  }

  body {
    background: var(--bg);
    color: var(--text);
    font-family: 'Syne', sans-serif;
    min-height: 100vh;
    overflow-x: hidden;
  }

  /* ── HERO ── */
  .hero {
    position: relative;
    padding: 0 0 0;
    overflow: hidden;
    border-bottom: 1px solid var(--line);
  }

  .hero-word {
    font-size: clamp(96px, 18vw, 240px);
    font-weight: 800;
    letter-spacing: -0.02em;
    text-transform: uppercase;
    color: var(--text);
    line-height: 0.88;
    padding: 40px 0 0 48px;
    position: relative;
    z-index: 1;
    user-select: none;
  }

  .hero-meta {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    padding: 24px 48px 36px;
    position: relative; z-index: 1;
    flex-wrap: wrap; gap: 16px;
  }

  .hero-sub {
    font-family: 'DM Mono', monospace;
    font-size: 9px; letter-spacing: 0.32em; color: var(--text-3);
    text-transform: uppercase;
  }

  .hero-total {
    font-family: 'DM Mono', monospace;
    font-size: 9px; letter-spacing: 0.22em; color: var(--text-3);
    text-transform: uppercase;
  }

  /* ── STICKY NAV ── */
  .navbar {
    position: sticky; top: 0; z-index: 100;
    background: rgba(6,6,6,0.92);
    backdrop-filter: blur(18px);
    -webkit-backdrop-filter: blur(18px);
    border-bottom: 1px solid var(--line);
    display: flex; align-items: stretch;
    justify-content: space-between;
    height: 52px;
  }

  .nav-cats { display: flex; align-items: stretch; }

  .nav-cat {
    font-family: 'DM Mono', monospace;
    font-size: 9px; letter-spacing: 0.22em; text-transform: uppercase;
    color: var(--text-3);
    padding: 0 22px;
    display: flex; align-items: center; gap: 6px;
    cursor: pointer;
    border: none; background: none;
    border-right: 1px solid var(--line);
    transition: color 0.18s, background 0.18s;
    position: relative;
  }
  .nav-cat:first-child { border-left: 1px solid var(--line); }
  .nav-cat::after {
    content: '';
    position: absolute; bottom: 0; left: 0; right: 0;
    height: 1px; background: var(--accent);
    transform: scaleX(0);
    transition: transform 0.22s ease;
  }
  .nav-cat:hover { color: var(--text-2); background: var(--surface); }
  .nav-cat.active { color: var(--text); }
  .nav-cat.active::after { transform: scaleX(1); }

  .nav-cat-count {
    font-size: 7px; color: var(--text-3);
    background: rgba(255,255,255,0.06);
    border-radius: 2px; padding: 1px 5px;
  }

  .nav-right {
    display: flex; align-items: center;
    gap: 0; border-left: 1px solid var(--line);
  }

  .nav-sort {
    font-family: 'DM Mono', monospace;
    font-size: 8.5px; letter-spacing: 0.15em; text-transform: uppercase;
    color: var(--text-3); background: none;
    border: none; border-right: 1px solid var(--line);
    padding: 0 18px; height: 52px; cursor: pointer;
    appearance: none; outline: none;
    transition: color 0.18s, background 0.18s;
  }
  .nav-sort:hover { color: var(--text-2); background: var(--surface); }
  .nav-sort option { background: #111; color: #eee; }

  .nav-view-btn {
    font-family: 'DM Mono', monospace;
    font-size: 8.5px; letter-spacing: 0.15em; text-transform: uppercase;
    color: var(--text-3); background: none;
    border: none; border-right: 1px solid var(--line);
    padding: 0 18px; height: 52px; cursor: pointer;
    transition: color 0.18s, background 0.18s;
  }
  .nav-view-btn:hover { color: var(--text-2); background: var(--surface); }
  .nav-view-btn.on { color: var(--text-2); background: var(--surface); }

  /* ── FEATURED ARTICLE (full width top) ── */
  .featured-wrap {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    border-bottom: 1px solid var(--line);
  }

  /* Card grid columns */
  .col-card {
    border-right: 1px solid var(--line);
    display: flex; flex-direction: column;
    cursor: pointer;
    transition: background 0.22s;
    position: relative;
    overflow: hidden;
  }
  .col-card:last-child { border-right: none; }
  .col-card:hover { background: var(--surface-h); }

  /* highlight (featured/active) col */
  .col-card.highlight {
    background: var(--featured-bg);
    border-left: 1px solid var(--accent);
    border-right: 1px solid var(--accent);
  }
  .col-card.highlight .card-title { text-decoration: underline; text-decoration-color: rgba(0,200,200,0.4); text-underline-offset: 4px; }
  .col-card.highlight .card-date { color: var(--accent); }

  .card-upper { padding: 28px 28px 20px; border-bottom: 1px solid var(--line); }

  .card-tag-row {
    display: flex; align-items: center; gap: 10px;
    margin-bottom: 14px;
  }

  .card-tag {
    display: flex; align-items: center; gap: 6px;
    background: rgba(255,255,255,0.07);
    border: 1px solid var(--line-h);
    border-radius: 20px;
    padding: 4px 12px 4px 8px;
    font-family: 'DM Mono', monospace;
    font-size: 8.5px; letter-spacing: 0.15em; text-transform: uppercase;
    color: var(--text-2);
  }
  .col-card.highlight .card-tag {
    background: rgba(0,200,200,0.08);
    border-color: rgba(0,200,200,0.25);
    color: var(--accent);
  }

  .tag-dot {
    width: 6px; height: 6px; border-radius: 50%;
    background: var(--text-3); flex-shrink: 0;
  }
  .col-card.highlight .tag-dot { background: var(--accent); }

  .card-read-time {
    font-family: 'DM Mono', monospace;
    font-size: 8px; letter-spacing: 0.15em; color: var(--text-3);
    text-transform: uppercase; margin-left: auto;
  }

  .card-title {
    font-size: clamp(14px, 1.5vw, 19px);
    font-weight: 700; color: var(--text);
    line-height: 1.25; letter-spacing: -0.01em;
    margin-bottom: 10px;
  }

  .card-divider {
    height: 1px; background: var(--line);
    margin: 14px 0;
  }
  .col-card.highlight .card-divider { background: var(--accent); opacity: 0.4; }

  .card-date-row { display: flex; align-items: center; gap: 10px; }

  .card-date {
    font-size: clamp(28px, 3.5vw, 44px);
    font-weight: 800; color: var(--text-2);
    letter-spacing: -0.01em; line-height: 1;
  }

  .card-excerpt {
    font-family: 'DM Mono', monospace;
    font-size: 10px; letter-spacing: 0.05em;
    color: var(--text-3); line-height: 1.6;
    margin-top: 14px;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .card-img {
    flex: 1; min-height: 240px; max-height: 320px;
    overflow: hidden; position: relative;
  }
  .card-img img {
    width: 100%; height: 100%;
    object-fit: cover;
    filter: grayscale(15%) brightness(0.85);
    transition: transform 0.5s ease, filter 0.4s ease;
  }
  .col-card:hover .card-img img {
    transform: scale(1.03);
    filter: grayscale(5%) brightness(0.95);
  }

  /* ── ARTICLE LIST (rows) ── */
  .list-section {
    padding: 0 0 0;
  }

  .list-header {
    display: flex; align-items: center; gap: 20px;
    padding: 40px 48px 0;
    margin-bottom: 0;
    border-bottom: 1px solid var(--line);
    padding-bottom: 16px;
  }
  .list-header-label {
    font-family: 'DM Mono', monospace;
    font-size: 8px; letter-spacing: 0.32em; color: var(--text-3);
    text-transform: uppercase;
  }
  .list-header-line { flex: 1; height: 1px; background: var(--line); }
  .list-header-count {
    font-family: 'DM Mono', monospace;
    font-size: 8px; letter-spacing: 0.15em; color: var(--text-3);
  }

  .article-row {
    display: grid;
    grid-template-columns: 52px 1fr auto 160px 48px;
    align-items: center;
    border-bottom: 1px solid var(--line);
    cursor: pointer;
    position: relative;
    transition: background 0.18s;
    animation: rowIn 0.3s ease both;
    overflow: hidden;
  }
  @keyframes rowIn {
    from { opacity: 0; transform: translateX(-6px); }
    to   { opacity: 1; transform: translateX(0); }
  }
  .article-row:hover { background: var(--surface-h); }
  .article-row::before {
    content: '';
    position: absolute; left: 0; top: 0; bottom: 0; width: 2px;
    background: var(--accent);
    transform: scaleY(0); transform-origin: bottom;
    transition: transform 0.2s ease;
  }
  .article-row:hover::before { transform: scaleY(1); }

  .row-num {
    padding: 22px 0 22px 24px;
    font-family: 'DM Mono', monospace;
    font-size: 9px; letter-spacing: 0.1em; color: var(--text-3);
    align-self: stretch; display: flex; align-items: center;
  }

  .row-content { padding: 22px 28px; }

  .row-cat-chip {
    font-family: 'DM Mono', monospace;
    font-size: 7.5px; letter-spacing: 0.2em; text-transform: uppercase;
    color: var(--text-3);
    border: 1px solid var(--line);
    border-radius: 3px; padding: 1px 7px;
    display: inline-block; margin-bottom: 8px;
  }

  .row-title {
    font-size: clamp(14px, 1.6vw, 20px);
    font-weight: 700; color: var(--text);
    letter-spacing: -0.01em; line-height: 1.2;
    margin-bottom: 6px;
  }

  .row-excerpt {
    font-family: 'DM Mono', monospace;
    font-size: 9.5px; letter-spacing: 0.04em; color: var(--text-3);
    line-height: 1.5;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .row-date {
    padding: 22px 24px;
    text-align: center;
    font-size: clamp(22px, 2.8vw, 36px);
    font-weight: 800; color: var(--text-2);
    line-height: 1; white-space: nowrap;
  }

  .row-thumb {
    width: 160px; height: 100px; overflow: hidden;
    position: relative;
  }
  .row-thumb img {
    width: 100%; height: 100%;
    object-fit: cover;
    filter: grayscale(20%) brightness(0.8);
    transition: filter 0.35s, transform 0.4s;
  }
  .article-row:hover .row-thumb img {
    filter: grayscale(5%) brightness(1);
    transform: scale(1.04);
  }

  .row-arrow {
    width: 48px; display: flex; align-items: center; justify-content: center;
    color: var(--text-3); font-size: 14px;
    transition: color 0.2s, transform 0.2s;
    padding-right: 8px;
  }
  .article-row:hover .row-arrow { color: var(--text-2); transform: translateX(3px); }

  /* ── PAGINATION ── */
  .pagination {
    display: flex; align-items: center; justify-content: center;
    gap: 6px; padding: 48px 0 72px;
    border-top: 1px solid var(--line);
  }

  .pg-btn {
    font-family: 'DM Mono', monospace;
    font-size: 11px; letter-spacing: 0.08em;
    width: 40px; height: 40px;
    display: flex; align-items: center; justify-content: center;
    border-radius: 6px;
    border: 1px solid var(--line);
    background: none; color: var(--text-3);
    cursor: pointer;
    transition: all 0.18s;
  }
  .pg-btn:hover { border-color: var(--line-h); color: var(--text-2); background: var(--surface); }
  .pg-btn.active {
    background: rgba(255,255,255,0.08);
    border-color: rgba(255,255,255,0.2);
    color: var(--text);
  }
  .pg-btn.arrow { font-size: 14px; }
  .pg-btn:disabled { opacity: 0.25; cursor: default; }

  /* ── VIEW MODES ── */
  .grid-view .featured-wrap { display: grid; }
  .list-view .featured-wrap { display: none; }
`;

// ─── HELPERS ─────────────────────────────────────────────────────────────────

// ─── CARD (editorial grid column) ────────────────────────────────────────────
function ArticleCard({ article, highlight, delay }) {
  return (
    <div
      className={`col-card ${highlight ? "highlight" : ""}`}
      style={{
        animationDelay: `${delay}ms`,
        animation: "rowIn 0.4s ease both",
      }}
    >
      <div className="card-upper">
        <div className="card-tag-row">
          <div className="card-tag">
            <div className="tag-dot" />
            {article.tag}
          </div>
          <span className="card-read-time">{article.readTime}</span>
        </div>
        <div className="card-title">{article.title}</div>
        <div className="card-divider" />
        <div className="card-date-row">
          <div className="card-date">{article.date}</div>
        </div>
        {highlight && <div className="card-excerpt">{article.excerpt}</div>}
      </div>
      <div className="card-img">
        <img
          src={`http://localhost:5000/api/article/${article.gambar}`}
          alt={article.title}
          loading="lazy"
        />
      </div>
    </div>
  );
}

// ─── ARTICLE ROW (list view) ──────────────────────────────────────────────────
function ArticleRow({ article, index, delay }) {
  console.log("render row", article);
  const navigate = useNavigate();
  return (
    <div
      className="article-row"
      style={{ animationDelay: `${delay}ms` }}
      onClick={() => navigate(`/article/${article.slug}`)}
    >
      <div className="row-num">{String(index).padStart(2, "0")}</div>
      <div className="row-content">
        <div className="row-cat-chip">{article.tag}</div>
        <div className="row-title">{article.judul}</div>
        <div className="row-excerpt">{article.konten}</div>
      </div>
      <div className="row-date">{article.date}</div>
      <div className="row-thumb">
        <img
          src={`http://localhost:5000/api/article/${article.gambar}`}
          alt={article.judul}
          loading="lazy"
        />
      </div>
      <div className="row-arrow">→</div>
    </div>
  );
}

// ─── PAGINATION ───────────────────────────────────────────────────────────────
function Pagination({ total, perPage, current, onChange }) {
  const pages = Math.ceil(total / perPage);
  if (pages <= 1) return null;
  return (
    <div className="pagination">
      <button
        className="pg-btn arrow"
        disabled={current === 1}
        onClick={() => onChange(current - 1)}
      >
        ←
      </button>
      {Array.from({ length: pages }, (_, i) => i + 1)?.map((p) => (
        <button
          key={p}
          className={`pg-btn ${current === p ? "active" : ""}`}
          onClick={() => onChange(p)}
        >
          {p}
        </button>
      ))}
      <button
        className="pg-btn arrow"
        disabled={current === pages}
        onClick={() => onChange(current + 1)}
      >
        →
      </button>
    </div>
  );
}

// ─── MAIN PAGE ────────────────────────────────────────────────────────────────
export default function ArticleListPage() {
  const toast = useRef(null);

  const [activeCat, setActiveCat] = useState("all");
  const [sort, setSort] = useState("latest");
  const [viewMode, setViewMode] = useState("grid"); // "grid" | "list"
  const [page, setPage] = useState(1);
  const [highlighted, setHighlighted] = useState(0); // index in filtered list for highlight
  const { useAllArtikel } = useArtikelApi();
  const { data, isLoading } = useAllArtikel();
  const [ARTICLES, setArticles] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchArtikels();
  }, [activeCat, sort, data]);

  function catCount(id) {
    return id === "all"
      ? ARTICLES?.length
      : ARTICLES?.filter((a) => a.category === id)?.length;
  }

  const fetchArtikels = async () => {
    try {
      // setLoading(true);
      // TODO: Implement API call
      setArticles(data);
      console.log("data", data);
      // setDataArtikels(data);
      // setLoading(false);
    } catch (error) {
      console.log("err");

      // setLoading(false);
    }
  };

  // Filter
  const filtered = ARTICLES?.filter(
    (a) => activeCat === "all" || a.category === activeCat,
  );

  // Sort
  const sorted =
    filtered &&
    [...filtered].sort((a, b) => {
      if (sort === "latest") return b.id - a.id;
      if (sort === "oldest") return a.id - b.id;
      if (sort === "readtime")
        return parseInt(a.readTime) - parseInt(b.readTime);
      return 0;
    });

  // Featured 3 (top of page, always visible)
  const featured3 = sorted?.slice(0, 3);
  // Rest → paginated list
  const rest = sorted?.slice(3);
  const paginated = rest?.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  const handleCat = (id) => {
    setActiveCat(id);
    setPage(1);
    setHighlighted(0);
  };

  return (
    <>
      <style>{CSS}</style>

      {/* ── HERO ── */}
      <header className="hero">
        <div className="hero-word">ARTIKEL</div>
        <div className="hero-meta">
          <div className="hero-sub">Veloxity · Knowledge Base · Indonesia</div>
          <div className="hero-total">{filtered?.length} artikel tersedia</div>
        </div>
      </header>

      {/* ── NAVBAR ── */}
      <nav className="navbar">
        <div className="nav-cats">
          {CATEGORIES?.map((cat) => (
            <button
              key={cat.id}
              className={`nav-cat ${activeCat === cat.id ? "active" : ""}`}
              onClick={() => handleCat(cat.id)}
            >
              {cat.short}
              <span className="nav-cat-count">{catCount(cat.id)}</span>
            </button>
          ))}
        </div>
        <div className="nav-right">
          <button
            className={`nav-view-btn ${viewMode === "grid" ? "on" : ""}`}
            onClick={() => setViewMode("grid")}
            title="Grid view"
          >
            ⊞ Grid
          </button>
          <button
            className={`nav-view-btn ${viewMode === "list" ? "on" : ""}`}
            onClick={() => setViewMode("list")}
            title="List view"
          >
            ☰ List
          </button>
          <select
            className="nav-sort"
            value={sort}
            onChange={(e) => {
              setSort(e.target.value);
              setPage(1);
            }}
          >
            <option value="latest">Terbaru</option>
            <option value="oldest">Terlama</option>
            <option value="readtime">Singkat</option>
          </select>
        </div>
      </nav>

      {/* ── FEATURED 3-COL GRID ── */}
      {viewMode === "grid" && featured3?.length > 0 && (
        <div className="featured-wrap">
          {featured3?.map((art, i) => (
            <ArticleCard
              key={art.id}
              article={art}
              highlight={i === highlighted}
              delay={i * 70}
            />
          ))}
        </div>
      )}

      {/* ── LIST SECTION ── */}
      <div className="list-section">
        {rest?.length > 0 && (
          <div className="list-header">
            <span className="list-header-label">
              {viewMode === "grid" ? "Artikel Lainnya" : "Semua Artikel"}
            </span>
            <div className="list-header-line" />
            <span className="list-header-count">
              {viewMode === "grid" ? rest?.length : sorted?.length} artikel
            </span>
          </div>
        )}

        {/* {viewMode === "grid"
          ? paginated?.map((art, i) => (
              <ArticleRow
                key={art.id + activeCat}
                article={art}
                index={i + 1}
                delay={i * 40}
              />
            ))
          : sorted?.map((art, i) => (
              <ArticleRow
                key={art.id + activeCat}
                article={art}
                index={i + 1}
                delay={i * 35}
              />
            ))} */}
        {viewMode === "grid"
          ? ARTICLES?.map((art, i) => (
              <ArticleRow
                key={art.id + activeCat}
                article={art}
                index={i + 1}
                delay={i * 40}
              />
            ))
          : sorted?.map((art, i) => (
              <ArticleRow
                key={art.id + activeCat}
                article={art}
                index={i + 1}
                delay={i * 35}
              />
            ))}
        {/* {viewMode ===
          "grid" ? (
            ARTICLES?.map((art, i) => (
              <ArticleRow
                key={art.id + activeCat}
                article={art}
                index={i + 1}
                delay={i * 40}
              />
            )),
          )} */}
      </div>

      {/* ── PAGINATION ── */}
      <Pagination
        total={viewMode === "grid" ? rest?.length : sorted?.length}
        perPage={PER_PAGE}
        current={page}
        onChange={(p) => {
          setPage(p);
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
      />
    </>
  );
}
