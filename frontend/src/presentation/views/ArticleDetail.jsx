import { useState, useEffect, useRef } from "react";

// ─── STATIC ARTICLE DATA ─────────────────────────────────────────────────────
const ARTICLE = {
  id: 2,
  category: "Teknologi",
  categoryColor: "#00c8c8",
  tag: "Populer",
  title: "Fiber Optik vs Kabel Tembaga: Mana yang Lebih Unggul untuk Rumahan?",
  subtitle:
    "Perbandingan mendalam antara dua teknologi transmisi data yang paling umum digunakan, dari sisi kecepatan, stabilitas, hingga biaya instalasi.",
  author: "Tim Veloxity",
  date: "24 Februari 2026",
  dateShort: "24.02",
  readTime: "6 min read",
  coverImage:
    "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1800&q=85",
  content: [
    {
      type: "lead",
      text: "Ketika memilih layanan internet untuk rumah, salah satu keputusan teknis terpenting adalah memilih antara koneksi berbasis fiber optik atau kabel tembaga. Kedua teknologi ini memiliki keunggulan dan keterbatasan masing-masing — dan memahami perbedaannya dapat membantu kamu membuat keputusan yang lebih cerdas.",
    },
    {
      type: "heading",
      text: "Apa Itu Fiber Optik?",
    },
    {
      type: "paragraph",
      text: "Fiber optik menggunakan cahaya untuk mentransmisikan data melalui kabel yang terbuat dari serat kaca atau plastik sangat tipis. Teknologi ini mampu membawa data dalam jumlah besar dengan kecepatan mendekati kecepatan cahaya, membuatnya menjadi standar emas untuk koneksi internet modern.",
    },
    {
      type: "paragraph",
      text: "Dalam konteks infrastruktur ISP, fiber optik biasanya digunakan sebagai backbone utama — jaringan tulang punggung yang menghubungkan berbagai titik distribusi sebelum sinyal diteruskan ke rumah-rumah melalui berbagai media akhir.",
    },
    {
      type: "image",
      src: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=1400&q=80",
      caption:
        "Kabel fiber optik modern mampu mentransmisikan data hingga ratusan terabit per detik dalam satu serat tunggal.",
    },
    {
      type: "heading",
      text: "Kabel Tembaga: Warisan yang Masih Relevan",
    },
    {
      type: "paragraph",
      text: "Kabel tembaga telah menjadi tulang punggung infrastruktur telekomunikasi selama lebih dari satu abad. Melalui evolusi teknologi seperti DSL, VDSL, dan DOCSIS, kabel tembaga masih mampu memberikan kecepatan yang cukup layak untuk kebutuhan internet rumahan.",
    },
    {
      type: "quote",
      text: "Infrastruktur tembaga yang sudah ada memiliki nilai investasi yang sangat besar. Tidak mungkin menggantikannya dalam semalam — transisi menuju fiber harus dilakukan secara bertahap dan strategis.",
      author: "Dr. Ahmad Fauzi, Pakar Telekomunikasi ITB",
    },
    {
      type: "paragraph",
      text: "Namun demikian, kabel tembaga memiliki keterbatasan fisik yang tidak bisa diatasi hanya dengan teknologi. Semakin jauh jarak antara rumah dan titik distribusi, semakin besar degradasi sinyal yang terjadi — dan ini menjadi hambatan serius untuk memberikan kecepatan tinggi secara konsisten.",
    },
    {
      type: "divider",
    },
    {
      type: "heading",
      text: "Perbandingan Teknis Head-to-Head",
    },
    {
      type: "table",
      headers: ["Aspek", "Fiber Optik", "Kabel Tembaga"],
      rows: [
        ["Kecepatan Maks.", "10 Gbps+", "1 Gbps (DOCSIS 3.1)"],
        ["Latensi", "< 1 ms", "5–20 ms"],
        ["Simetrisitas", "Upload = Download", "Upload lebih lambat"],
        ["Gangguan EMI", "Tidak terpengaruh", "Rentan interferensi"],
        ["Jarak Efektif", "Puluhan km", "< 1.5 km optimal"],
        ["Biaya Instalasi", "Lebih tinggi", "Lebih rendah"],
        ["Umur Infrastruktur", "25–50 tahun", "15–25 tahun"],
      ],
    },
    {
      type: "heading",
      text: "Implikasi untuk Pengguna Rumahan",
    },
    {
      type: "paragraph",
      text: "Bagi pengguna rumahan, pilihan antara fiber dan tembaga sering kali tidak sepenuhnya berada di tangan mereka — melainkan ditentukan oleh infrastruktur yang tersedia di area tempat tinggal mereka. Namun ketika keduanya tersedia, fiber optik hampir selalu menjadi pilihan yang lebih bijak untuk jangka panjang.",
    },
    {
      type: "image",
      src: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1400&q=80",
      caption:
        "Peta distribusi jaringan fiber optik terus berkembang, menjangkau lebih banyak wilayah setiap tahunnya.",
    },
    {
      type: "paragraph",
      text: "Dengan semakin banyaknya aktivitas yang membutuhkan koneksi berkualitas tinggi — mulai dari video conference 4K, cloud gaming, hingga smart home ecosystem — investasi pada koneksi fiber optik akan memberikan return yang jelas dalam bentuk pengalaman internet yang lebih mulus dan andal.",
    },
    {
      type: "callout",
      title: "Kesimpulan",
      text: "Untuk kebutuhan rumahan modern, fiber optik adalah pilihan yang unggul dalam hampir semua aspek teknis. Jika tersedia di area kamu, tidak ada alasan kuat untuk memilih kabel tembaga — kecuali pertimbangan biaya jangka pendek yang sangat ketat.",
    },
  ],
  relatedArticles: [
    {
      id: 3,
      category: "Jaringan",
      title: "Cara Mengoptimalkan Kecepatan WiFi di Rumah dengan Benar",
      date: "21.02",
      img: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=600&q=70",
      readTime: "5 min",
    },
    {
      id: 4,
      category: "Bisnis",
      title: "Mengapa Bisnis Modern Butuh Koneksi Simetris",
      date: "18.02",
      img: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&q=70",
      readTime: "8 min",
    },
    {
      id: 5,
      category: "Teknologi",
      title: "IPv6: Apa Artinya bagi Pengguna Internet Biasa di Indonesia?",
      date: "15.02",
      img: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=600&q=70",
      readTime: "7 min",
    },
  ],
};

// ─── CSS ─────────────────────────────────────────────────────────────────────
const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Mono:wght@300;400;500&family=DM+Serif+Display:ital@0;1&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  :root {
    --bg: #060606;
    --line: rgba(255,255,255,0.07);
    --line-h: rgba(255,255,255,0.14);
    --text: #ececec;
    --text-2: rgba(236,236,236,0.42);
    --text-3: rgba(236,236,236,0.18);
    --surf: rgba(255,255,255,0.03);
    --surf-h: rgba(255,255,255,0.055);
    --accent: #00c8c8;
    --content-w: 720px;
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
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    border-bottom: 1px solid var(--line);
  }

  .hero-cover {
    position: absolute; inset: 0;
    background: url('https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1800&q=80') center/cover no-repeat;
  }
  .hero-cover::after {
    content: '';
    position: absolute; inset: 0;
    background: linear-gradient(
      to bottom,
      rgba(6,6,6,0.55) 0%,
      rgba(6,6,6,0.3) 30%,
      rgba(6,6,6,0.7) 65%,
      rgba(6,6,6,1) 100%
    );
  }

  /* Big background word */
  .hero-bg-word {
    position: absolute; z-index: 1;
    bottom: -0.12em; left: -0.03em;
    font-size: clamp(80px, 15vw, 200px);
    font-weight: 800; text-transform: uppercase;
    color: rgba(255,255,255,0.03);
    line-height: 1; letter-spacing: -0.02em;
    user-select: none; pointer-events: none;
    white-space: nowrap;
  }

  /* Top bar */
  .hero-topbar {
    position: relative; z-index: 2;
    display: flex; align-items: center; justify-content: space-between;
    padding: 28px 48px;
    border-bottom: 1px solid rgba(255,255,255,0.07);
  }

  .back-btn {
    display: flex; align-items: center; gap: 10px;
    font-family: 'DM Mono', monospace;
    font-size: 9px; letter-spacing: 0.22em; text-transform: uppercase;
    color: var(--text-3); background: none; border: none; cursor: pointer;
    transition: color 0.18s; padding: 0;
  }
  .back-btn:hover { color: var(--text-2); }
  .back-arrow { font-size: 14px; transition: transform 0.2s; }
  .back-btn:hover .back-arrow { transform: translateX(-3px); }

  .topbar-right {
    display: flex; align-items: center; gap: 16px;
  }
  .topbar-meta {
    font-family: 'DM Mono', monospace;
    font-size: 9px; letter-spacing: 0.2em; color: var(--text-3);
    text-transform: uppercase;
  }

  /* Hero content (bottom) */
  .hero-content {
    position: relative; z-index: 2;
    margin-top: auto;
    padding: 0 48px 52px;
    display: flex; flex-direction: column; gap: 0;
  }

  .hero-tag-row {
    display: flex; align-items: center; gap: 12px;
    margin-bottom: 24px;
  }
  .hero-chip {
    display: flex; align-items: center; gap: 7px;
    padding: 6px 14px 6px 10px; border-radius: 20px;
    border: 1px solid rgba(255,255,255,0.15);
    background: rgba(0,0,0,0.5); backdrop-filter: blur(8px);
    font-family: 'DM Mono', monospace;
    font-size: 8.5px; letter-spacing: 0.18em; text-transform: uppercase;
    color: rgba(255,255,255,0.7);
  }
  .chip-dot { width: 7px; height: 7px; border-radius: 50%; flex-shrink: 0; }

  .hero-read-time {
    font-family: 'DM Mono', monospace;
    font-size: 8.5px; letter-spacing: 0.18em; text-transform: uppercase;
    color: rgba(255,255,255,0.3);
  }

  .hero-title {
    font-family: 'DM Serif Display', serif;
    font-size: clamp(28px, 5vw, 64px);
    font-weight: 400;
    line-height: 1.08;
    letter-spacing: -0.01em;
    color: #fff;
    max-width: 900px;
    margin-bottom: 24px;
  }

  .hero-subtitle {
    font-family: 'DM Mono', monospace;
    font-size: clamp(11px, 1.1vw, 13px);
    letter-spacing: 0.05em;
    color: rgba(255,255,255,0.45);
    line-height: 1.7;
    max-width: 620px;
    margin-bottom: 32px;
  }

  .hero-author-row {
    display: flex; align-items: center; gap: 16px;
    padding-top: 24px;
    border-top: 1px solid rgba(255,255,255,0.08);
  }
  .author-avatar {
    width: 36px; height: 36px; border-radius: 50%;
    background: rgba(255,255,255,0.08);
    border: 1px solid rgba(255,255,255,0.12);
    display: flex; align-items: center; justify-content: center;
    font-size: 12px; color: rgba(255,255,255,0.4);
    flex-shrink: 0;
  }
  .author-info {}
  .author-name {
    font-size: 12px; font-weight: 600; color: rgba(255,255,255,0.65);
    letter-spacing: 0.02em;
  }
  .author-date {
    font-family: 'DM Mono', monospace;
    font-size: 9px; letter-spacing: 0.15em; color: rgba(255,255,255,0.28);
    text-transform: uppercase; margin-top: 2px;
  }

  /* ── PROGRESS BAR ── */
  .progress-bar {
    position: fixed; top: 0; left: 0; z-index: 200;
    height: 1px; background: var(--accent);
    transition: width 0.1s linear;
    pointer-events: none;
  }

  /* ── STICKY ARTICLE NAV ── */
  .article-nav {
    position: sticky; top: 0; z-index: 100;
    background: rgba(6,6,6,0.94);
    backdrop-filter: blur(18px);
    border-bottom: 1px solid var(--line);
    display: flex; align-items: center; justify-content: space-between;
    padding: 0 48px; height: 52px;
  }

  .anav-title {
    font-size: 12px; font-weight: 600;
    color: var(--text-2); letter-spacing: 0.01em;
    white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
    max-width: 50%;
  }

  .anav-right {
    display: flex; align-items: center; gap: 0;
  }

  .anav-btn {
    font-family: 'DM Mono', monospace;
    font-size: 8.5px; letter-spacing: 0.18em; text-transform: uppercase;
    color: var(--text-3); background: none; border: none;
    border-left: 1px solid var(--line);
    padding: 0 18px; height: 52px;
    cursor: pointer; display: flex; align-items: center; gap: 8px;
    transition: color 0.18s, background 0.18s;
  }
  .anav-btn:hover { color: var(--text-2); background: var(--surf); }
  .anav-btn:last-child { border-right: 1px solid var(--line); }

  /* ── LAYOUT: sidebar + content ── */
  .page-layout {
    display: grid;
    grid-template-columns: 1fr min(var(--content-w), 100%) 1fr;
    padding: 0;
  }

  .sidebar-left {
    padding: 64px 32px 0 48px;
    border-right: 1px solid var(--line);
    display: flex; flex-direction: column; gap: 32px;
    position: sticky; top: 52px; height: fit-content;
    max-height: calc(100vh - 52px); overflow-y: auto;
  }

  .sidebar-right {
    padding: 64px 48px 0 32px;
    border-left: 1px solid var(--line);
    position: sticky; top: 52px; height: fit-content;
    max-height: calc(100vh - 52px); overflow-y: auto;
  }

  .sidebar-label {
    font-family: 'DM Mono', monospace;
    font-size: 7.5px; letter-spacing: 0.32em; color: var(--text-3);
    text-transform: uppercase; margin-bottom: 12px;
  }

  /* TOC */
  .toc-item {
    font-family: 'DM Mono', monospace;
    font-size: 9.5px; letter-spacing: 0.05em; color: var(--text-3);
    padding: 7px 0; cursor: pointer;
    border-bottom: 1px solid rgba(255,255,255,0.04);
    transition: color 0.18s;
    display: flex; align-items: flex-start; gap: 10px;
    line-height: 1.4;
  }
  .toc-item:hover { color: var(--text-2); }
  .toc-item.active { color: var(--text-2); }
  .toc-item.active::before { color: var(--accent); }
  .toc-num { color: var(--text-3); flex-shrink: 0; font-size: 8px; margin-top: 1px; }
  .toc-item.active .toc-num { color: var(--accent); }

  /* Share */
  .share-group { display: flex; flex-direction: column; gap: 6px; }
  .share-btn {
    font-family: 'DM Mono', monospace;
    font-size: 8.5px; letter-spacing: 0.15em; text-transform: uppercase;
    color: var(--text-3); background: var(--surf); border: 1px solid var(--line);
    border-radius: 5px; padding: 8px 12px; cursor: pointer;
    display: flex; align-items: center; gap: 8px;
    transition: all 0.18s; width: 100%;
  }
  .share-btn:hover { border-color: var(--line-h); color: var(--text-2); background: var(--surf-h); }

  /* Stats */
  .stat-row { display: flex; flex-direction: column; gap: 10px; }
  .stat-item { display: flex; align-items: baseline; justify-content: space-between; }
  .stat-label { font-family: 'DM Mono', monospace; font-size: 8px; letter-spacing: 0.2em; color: var(--text-3); text-transform: uppercase; }
  .stat-val { font-family: 'DM Mono', monospace; font-size: 10px; color: var(--text-2); }

  /* ── ARTICLE BODY ── */
  .article-body {
    padding: 64px 48px 80px;
    border-right: 1px solid var(--line);
    border-left: 1px solid var(--line);
    min-width: 0;
  }

  /* Lead */
  .block-lead {
    font-family: 'DM Serif Display', serif;
    font-size: clamp(17px, 1.8vw, 22px);
    line-height: 1.6;
    color: rgba(236,236,236,0.72);
    margin-bottom: 40px;
    padding-bottom: 40px;
    border-bottom: 1px solid var(--line);
    font-style: italic;
  }

  /* Heading */
  .block-heading {
    font-family: 'Syne', sans-serif;
    font-size: clamp(18px, 2vw, 26px);
    font-weight: 700;
    color: var(--text);
    letter-spacing: -0.01em;
    margin: 44px 0 18px;
    padding-top: 4px;
    line-height: 1.2;
    position: relative;
  }
  .block-heading::before {
    content: attr(data-num);
    position: absolute;
    left: -40px;
    top: 4px;
    font-family: 'DM Mono', monospace;
    font-size: 9px;
    color: var(--text-3);
    letter-spacing: 0.1em;
  }

  /* Paragraph */
  .block-para {
    font-family: 'DM Mono', monospace;
    font-size: clamp(12px, 1.1vw, 14px);
    line-height: 1.9;
    color: var(--text-2);
    margin-bottom: 22px;
    letter-spacing: 0.02em;
  }

  /* Image */
  .block-img { margin: 40px -48px; }
  .block-img img {
    width: 100%; display: block;
    filter: brightness(0.88) grayscale(8%);
    transition: filter 0.4s;
  }
  .block-img:hover img { filter: brightness(1) grayscale(0%); }
  .block-img-cap {
    font-family: 'DM Mono', monospace;
    font-size: 9px; letter-spacing: 0.12em; color: var(--text-3);
    text-transform: uppercase; line-height: 1.5;
    padding: 12px 48px 0;
    display: flex; align-items: flex-start; gap: 10px;
  }
  .block-img-cap::before { content: '↑'; flex-shrink: 0; }

  /* Quote */
  .block-quote {
    margin: 40px 0;
    padding: 28px 32px;
    border-left: 2px solid rgba(255,255,255,0.15);
    background: var(--surf);
    position: relative;
  }
  .block-quote::before {
    content: '"';
    position: absolute; top: -12px; left: 24px;
    font-family: 'DM Serif Display', serif;
    font-size: 72px; color: rgba(255,255,255,0.05);
    line-height: 1;
  }
  .block-quote-text {
    font-family: 'DM Serif Display', serif;
    font-size: clamp(15px, 1.6vw, 20px);
    font-style: italic;
    color: rgba(236,236,236,0.62);
    line-height: 1.55;
    margin-bottom: 14px;
  }
  .block-quote-author {
    font-family: 'DM Mono', monospace;
    font-size: 9px; letter-spacing: 0.18em; color: var(--text-3);
    text-transform: uppercase;
  }

  /* Divider */
  .block-divider {
    display: flex; align-items: center; gap: 16px;
    margin: 44px 0;
  }
  .block-divider::before, .block-divider::after {
    content: ''; flex: 1; height: 1px; background: var(--line);
  }
  .block-divider-sym {
    font-family: 'DM Mono', monospace;
    font-size: 10px; color: var(--text-3); letter-spacing: 0.2em;
  }

  /* Table */
  .block-table { margin: 32px 0; overflow-x: auto; }
  .b-table {
    width: 100%; border-collapse: collapse;
  }
  .b-table thead tr th {
    font-family: 'DM Mono', monospace;
    font-size: 8px; letter-spacing: 0.22em; text-transform: uppercase;
    color: var(--text-3); font-weight: 400;
    padding: 12px 16px; text-align: left;
    border-bottom: 1px solid var(--line-h);
  }
  .b-table thead tr th:first-child { color: var(--text-3); }
  .b-table tbody tr td {
    font-family: 'DM Mono', monospace;
    font-size: 11px; letter-spacing: 0.04em;
    color: var(--text-2); padding: 12px 16px;
    border-bottom: 1px solid rgba(255,255,255,0.03);
    vertical-align: top;
  }
  .b-table tbody tr td:first-child { color: var(--text-3); }
  .b-table tbody tr:hover td { background: var(--surf); }
  .b-table tbody tr td:nth-child(2) { color: rgba(0,200,200,0.7); }

  /* Callout */
  .block-callout {
    margin: 40px 0 0;
    padding: 28px 32px;
    background: rgba(0,200,200,0.04);
    border: 1px solid rgba(0,200,200,0.12);
    border-radius: 2px;
  }
  .block-callout-title {
    font-family: 'DM Mono', monospace;
    font-size: 8px; letter-spacing: 0.3em; text-transform: uppercase;
    color: rgba(0,200,200,0.6); margin-bottom: 10px;
  }
  .block-callout-text {
    font-family: 'DM Mono', monospace;
    font-size: clamp(11px, 1.1vw, 13px);
    letter-spacing: 0.04em; color: var(--text-2);
    line-height: 1.75;
  }

  /* ── RELATED ── */
  .related-section {
    border-top: 1px solid var(--line);
    padding: 0 48px 80px;
  }

  .related-header {
    display: flex; align-items: center; gap: 20px;
    padding: 36px 0 0; margin-bottom: 0;
    border-bottom: 1px solid var(--line);
    padding-bottom: 14px;
  }
  .rel-lbl {
    font-family: 'DM Mono', monospace;
    font-size: 8px; letter-spacing: 0.32em; color: var(--text-3);
    text-transform: uppercase;
  }
  .rel-line { flex: 1; height: 1px; background: var(--line); }

  .related-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    border-top: 1px solid var(--line);
  }

  .rel-card {
    border-right: 1px solid var(--line);
    cursor: pointer; display: flex; flex-direction: column;
    transition: background 0.2s;
    animation: fu 0.4s ease both;
  }
  .rel-card:last-child { border-right: none; }
  .rel-card:hover { background: var(--surf-h); }

  .rel-upper { padding: 22px 24px 16px; border-bottom: 1px solid var(--line); }
  .rel-cat {
    font-family: 'DM Mono', monospace;
    font-size: 7.5px; letter-spacing: 0.2em; text-transform: uppercase;
    color: var(--text-3); border: 1px solid var(--line);
    border-radius: 3px; padding: 1px 7px;
    display: inline-block; margin-bottom: 10px;
  }
  .rel-title {
    font-size: clamp(13px, 1.3vw, 16px);
    font-weight: 700; color: var(--text);
    letter-spacing: -0.01em; line-height: 1.25;
    margin-bottom: 12px;
  }
  .rel-divider { height: 1px; background: var(--line); margin-bottom: 12px; }
  .rel-meta {
    display: flex; align-items: center; justify-content: space-between;
  }
  .rel-date {
    font-size: clamp(22px, 3vw, 36px);
    font-weight: 800; color: var(--text-3); line-height: 1;
  }
  .rel-time {
    font-family: 'DM Mono', monospace;
    font-size: 8.5px; letter-spacing: 0.12em; color: var(--text-3);
    text-transform: uppercase;
  }

  .rel-img { overflow: hidden; }
  .rel-img img {
    width: 100%; aspect-ratio: 16/9; object-fit: cover; display: block;
    filter: grayscale(15%) brightness(0.8);
    transition: filter 0.4s, transform 0.5s;
  }
  .rel-card:hover .rel-img img { filter: grayscale(0%) brightness(1); transform: scale(1.04); }

  @keyframes fu { from { opacity:0; transform: translateY(8px); } to { opacity:1; transform:translateY(0); } }
`;

// ─── EXTRACT HEADINGS FOR TOC ─────────────────────────────────────────────────
const HEADINGS = ARTICLE.content
  .filter((b) => b.type === "heading")
  .map((b, i) => ({ num: i + 1, text: b.text }));

// ─── RENDER BLOCK ─────────────────────────────────────────────────────────────
let headingCounter = 0;

function Block({ block }) {
  if (block.type === "lead") {
    return <p className="block-lead">{block.text}</p>;
  }
  if (block.type === "heading") {
    headingCounter++;
    const num = headingCounter;
    return (
      <h2
        className="block-heading"
        data-num={String(num).padStart(2, "0")}
        id={`heading-${num}`}
      >
        {block.text}
      </h2>
    );
  }
  if (block.type === "paragraph") {
    return <p className="block-para">{block.text}</p>;
  }
  if (block.type === "image") {
    return (
      <div className="block-img">
        <img src={block.src} alt={block.caption} />
        {block.caption && <div className="block-img-cap">{block.caption}</div>}
      </div>
    );
  }
  if (block.type === "quote") {
    return (
      <blockquote className="block-quote">
        <div className="block-quote-text">{block.text}</div>
        {block.author && (
          <div className="block-quote-author">— {block.author}</div>
        )}
      </blockquote>
    );
  }
  if (block.type === "divider") {
    return (
      <div className="block-divider">
        <span className="block-divider-sym">· · ·</span>
      </div>
    );
  }
  if (block.type === "table") {
    return (
      <div className="block-table">
        <table className="b-table">
          <thead>
            <tr>
              {block.headers.map((h, i) => (
                <th key={i}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {block.rows.map((row, ri) => (
              <tr key={ri}>
                {row.map((cell, ci) => (
                  <td key={ci}>{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
  if (block.type === "callout") {
    return (
      <div className="block-callout">
        <div className="block-callout-title">{block.title}</div>
        <div className="block-callout-text">{block.text}</div>
      </div>
    );
  }
  return null;
}

// ─── MAIN ─────────────────────────────────────────────────────────────────────
export default function ArticleDetailPage() {
  const [progress, setProgress] = useState(0);
  const [activeH, setActiveH] = useState(1);
  const [copied, setCopied] = useState(false);
  const bodyRef = useRef(null);

  // Reading progress
  useEffect(() => {
    const onScroll = () => {
      const el = bodyRef.current;
      if (!el) return;
      const top = el.getBoundingClientRect().top;
      const height = el.getBoundingClientRect().height;
      const wh = window.innerHeight;
      const pct = Math.min(
        100,
        Math.max(0, ((wh - top) / (height + wh)) * 100),
      );
      setProgress(pct);

      // Active heading
      for (let i = HEADINGS.length; i >= 1; i--) {
        const el = document.getElementById(`heading-${i}`);
        if (el && el.getBoundingClientRect().top < 120) {
          setActiveH(i);
          break;
        }
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToHeading = (num) => {
    const el = document.getElementById(`heading-${num}`);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(window.location.href).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  // Reset heading counter before render
  headingCounter = 0;

  return (
    <>
      <style>{CSS}</style>

      {/* Reading progress */}
      <div className="progress-bar" style={{ width: `${progress}%` }} />

      {/* ── HERO ── */}
      <header className="hero">
        <div className="hero-cover" />
        <div className="hero-bg-word">ARTIKEL</div>

        <div className="hero-topbar">
          <button className="back-btn">
            <span className="back-arrow">←</span>
            Kembali ke Artikel
          </button>
          <div className="topbar-right">
            <span className="topbar-meta">{ARTICLE.readTime}</span>
            <span className="topbar-meta" style={{ opacity: 0.5 }}>
              ·
            </span>
            <span className="topbar-meta">{ARTICLE.date}</span>
          </div>
        </div>

        <div className="hero-content">
          <div className="hero-tag-row">
            <div
              className="hero-chip"
              style={{ borderColor: ARTICLE.categoryColor + "44" }}
            >
              <div
                className="chip-dot"
                style={{ background: ARTICLE.categoryColor }}
              />
              {ARTICLE.category}
            </div>
            {ARTICLE.tag && <div className="hero-chip">{ARTICLE.tag}</div>}
            <span className="hero-read-time">{ARTICLE.readTime}</span>
          </div>

          <h1 className="hero-title">{ARTICLE.title}</h1>
          <p className="hero-subtitle">{ARTICLE.subtitle}</p>

          <div className="hero-author-row">
            <div className="author-avatar">V</div>
            <div className="author-info">
              <div className="author-name">{ARTICLE.author}</div>
              <div className="author-date">{ARTICLE.date} · Veloxity</div>
            </div>
          </div>
        </div>
      </header>

      {/* ── STICKY NAV ── */}
      <nav className="article-nav">
        <div className="anav-title">{ARTICLE.title}</div>
        <div className="anav-right">
          <button className="anav-btn" onClick={handleCopy}>
            {copied ? "✓ Tersalin" : "Salin Link"}
          </button>
          <button className="anav-btn">Bagikan</button>
          <button className="anav-btn">← Kembali</button>
        </div>
      </nav>

      {/* ── 3-COL LAYOUT ── */}
      <div className="page-layout">
        {/* LEFT SIDEBAR: TOC + Share */}
        <aside className="sidebar-left">
          <div>
            <div className="sidebar-label">Daftar Isi</div>
            {HEADINGS.map((h) => (
              <div
                key={h.num}
                className={`toc-item ${activeH === h.num ? "active" : ""}`}
                onClick={() => scrollToHeading(h.num)}
              >
                <span className="toc-num">
                  {String(h.num).padStart(2, "0")}
                </span>
                {h.text}
              </div>
            ))}
          </div>

          <div>
            <div className="sidebar-label">Bagikan</div>
            <div className="share-group">
              <button className="share-btn">⎘ &nbsp;Salin Tautan</button>
              <button className="share-btn">𝕏 &nbsp;Twitter / X</button>
              <button className="share-btn">in &nbsp;LinkedIn</button>
            </div>
          </div>

          <div>
            <div className="sidebar-label">Info</div>
            <div className="stat-row">
              <div className="stat-item">
                <span className="stat-label">Kategori</span>
                <span className="stat-val">{ARTICLE.category}</span>
              </div>
              <div className="stat-item">
                <span className="stat-label">Penulis</span>
                <span className="stat-val">{ARTICLE.author}</span>
              </div>
              <div className="stat-item">
                <span className="stat-label">Dipublikasi</span>
                <span className="stat-val">{ARTICLE.dateShort}</span>
              </div>
              <div className="stat-item">
                <span className="stat-label">Baca</span>
                <span className="stat-val">{ARTICLE.readTime}</span>
              </div>
              <div className="stat-item">
                <span className="stat-label">Progress</span>
                <span className="stat-val">{Math.round(progress)}%</span>
              </div>
            </div>
          </div>
        </aside>

        {/* ARTICLE BODY */}
        <article className="article-body" ref={bodyRef}>
          {ARTICLE.content.map((block, i) => (
            <Block key={i} block={block} />
          ))}
        </article>

        {/* RIGHT SIDEBAR: empty / ads / next article placeholder */}
        <aside className="sidebar-right">
          <div>
            <div className="sidebar-label">Progress Membaca</div>
            <div
              style={{
                height: 1,
                background: "var(--line)",
                position: "relative",
                marginBottom: 20,
              }}
            >
              <div
                style={{
                  position: "absolute",
                  left: 0,
                  top: 0,
                  bottom: 0,
                  background: "var(--accent)",
                  width: `${progress}%`,
                  transition: "width 0.1s",
                }}
              />
            </div>
            <div
              style={{
                fontFamily: "'DM Mono', monospace",
                fontSize: 9,
                letterSpacing: "0.2em",
                color: "var(--text-3)",
                textTransform: "uppercase",
              }}
            >
              {Math.round(progress)}% selesai
            </div>
          </div>

          <div style={{ marginTop: 32 }}>
            <div className="sidebar-label">Artikel Berikutnya</div>
            {ARTICLE.relatedArticles.slice(0, 1).map((r) => (
              <div key={r.id} style={{ cursor: "pointer" }}>
                <div
                  style={{
                    fontFamily: "'DM Mono', monospace",
                    fontSize: 8,
                    letterSpacing: "0.18em",
                    color: "var(--text-3)",
                    textTransform: "uppercase",
                    marginBottom: 8,
                  }}
                >
                  {r.category}
                </div>
                <div
                  style={{
                    fontSize: 13,
                    fontWeight: 700,
                    color: "var(--text-2)",
                    lineHeight: 1.3,
                    letterSpacing: "-0.01em",
                    marginBottom: 12,
                  }}
                >
                  {r.title}
                </div>
                <div style={{ overflow: "hidden", borderRadius: 2 }}>
                  <img
                    src={r.img}
                    alt={r.title}
                    style={{
                      width: "100%",
                      aspectRatio: "16/9",
                      objectFit: "cover",
                      display: "block",
                      filter: "brightness(0.75) grayscale(10%)",
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </aside>
      </div>

      {/* ── RELATED ARTICLES ── */}
      <section className="related-section">
        <div className="related-header">
          <span className="rel-lbl">Artikel Terkait</span>
          <div className="rel-line" />
          <span className="rel-lbl">
            {ARTICLE.relatedArticles.length} artikel
          </span>
        </div>

        <div className="related-grid">
          {ARTICLE.relatedArticles.map((r, i) => (
            <div
              key={r.id}
              className="rel-card"
              style={{ animationDelay: `${i * 70}ms` }}
            >
              <div className="rel-upper">
                <div className="rel-cat">{r.category}</div>
                <div className="rel-title">{r.title}</div>
                <div className="rel-divider" />
                <div className="rel-meta">
                  <div className="rel-date">{r.date}</div>
                  <div className="rel-time">{r.readTime}</div>
                </div>
              </div>
              <div className="rel-img">
                <img src={r.img} alt={r.title} loading="lazy" />
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
