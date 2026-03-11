import { useState, useEffect, useRef } from "react";

// ─── Data ──────────────────────────────────────────────────────────────────
const PROVINCES = [
  {
    id: "banten",
    name: "Banten",
    number: 1,
    cities: [
      { name: "Kota Tangerang", type: "Kota", covered: true },
      { name: "Kota Tangerang Selatan", type: "Kota", covered: true },
      { name: "Kota Serang", type: "Kota", covered: true },
      { name: "Kota Cilegon", type: "Kota", covered: true },
      { name: "Kab. Tangerang", type: "Kabupaten", covered: true },
      { name: "Kab. Serang", type: "Kabupaten", covered: false },
      { name: "Kab. Lebak", type: "Kabupaten", covered: false },
      { name: "Kab. Pandeglang", type: "Kabupaten", covered: false },
    ],
  },
  {
    id: "dki-jakarta",
    name: "DKI Jakarta",
    number: 2,
    cities: [
      { name: "Jakarta Pusat", type: "Kota Adm.", covered: true },
      { name: "Jakarta Utara", type: "Kota Adm.", covered: true },
      { name: "Jakarta Barat", type: "Kota Adm.", covered: true },
      { name: "Jakarta Selatan", type: "Kota Adm.", covered: true },
      { name: "Jakarta Timur", type: "Kota Adm.", covered: true },
      { name: "Kep. Seribu", type: "Kab. Adm.", covered: false },
    ],
  },
  {
    id: "jawa-barat",
    name: "Jawa Barat",
    number: 3,
    cities: [
      { name: "Kota Bandung", type: "Kota", covered: true },
      { name: "Kota Bekasi", type: "Kota", covered: true },
      { name: "Kota Depok", type: "Kota", covered: true },
      { name: "Kota Bogor", type: "Kota", covered: true },
      { name: "Kota Cimahi", type: "Kota", covered: true },
      { name: "Kab. Bogor", type: "Kabupaten", covered: true },
      { name: "Kab. Bekasi", type: "Kabupaten", covered: true },
      { name: "Kab. Karawang", type: "Kabupaten", covered: false },
      { name: "Kab. Subang", type: "Kabupaten", covered: false },
      { name: "Kab. Purwakarta", type: "Kabupaten", covered: false },
      { name: "Kab. Sukabumi", type: "Kabupaten", covered: false },
      { name: "Kab. Cianjur", type: "Kabupaten", covered: false },
    ],
  },
  {
    id: "jawa-tengah",
    name: "Jawa Tengah",
    number: 4,
    cities: [
      { name: "Kota Semarang", type: "Kota", covered: true },
      { name: "Kota Solo", type: "Kota", covered: true },
      { name: "Kota Magelang", type: "Kota", covered: true },
      { name: "Kab. Semarang", type: "Kabupaten", covered: true },
      { name: "Kab. Boyolali", type: "Kabupaten", covered: false },
      { name: "Kab. Klaten", type: "Kabupaten", covered: false },
      { name: "Kab. Purworejo", type: "Kabupaten", covered: false },
      { name: "Kab. Banyumas", type: "Kabupaten", covered: false },
    ],
  },
  {
    id: "diy",
    name: "DI Yogyakarta",
    number: 5,
    cities: [
      { name: "Kota Yogyakarta", type: "Kota", covered: true },
      { name: "Kab. Sleman", type: "Kabupaten", covered: true },
      { name: "Kab. Bantul", type: "Kabupaten", covered: true },
      { name: "Kab. Gunungkidul", type: "Kabupaten", covered: false },
      { name: "Kab. Kulon Progo", type: "Kabupaten", covered: false },
    ],
  },
  {
    id: "jawa-timur",
    name: "Jawa Timur",
    number: 6,
    cities: [
      { name: "Kota Surabaya", type: "Kota", covered: true },
      { name: "Kota Malang", type: "Kota", covered: true },
      { name: "Kota Sidoarjo", type: "Kota", covered: true },
      { name: "Kota Gresik", type: "Kota", covered: true },
      { name: "Kab. Malang", type: "Kabupaten", covered: true },
      { name: "Kab. Jombang", type: "Kabupaten", covered: false },
      { name: "Kab. Kediri", type: "Kabupaten", covered: false },
      { name: "Kab. Blitar", type: "Kabupaten", covered: false },
      { name: "Kab. Jember", type: "Kabupaten", covered: false },
      { name: "Kab. Banyuwangi", type: "Kabupaten", covered: false },
    ],
  },
];

// ─── Styles ─────────────────────────────────────────────────────────────────
const css = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=DM+Mono:wght@300;400;500&display=swap');

  .cg-root {
    --bg: #000;
    --surface: rgba(255,255,255,0.04);
    --surface-hover: rgba(255,255,255,0.072);
    --border: rgba(255,255,255,0.075);
    --border-hover: rgba(255,255,255,0.18);
    --text-primary: #f0f0f0;
    --text-secondary: rgba(240,240,240,0.4);
    --text-muted: rgba(240,240,240,0.22);
    font-family: 'Syne', sans-serif;
    background: var(--bg);
    color: var(--text-primary);
    min-height: 100vh;
    padding: 48px 36px 64px;
    position: relative;
    overflow-x: hidden;
    box-sizing: border-box;
  }

  .cg-root *, .cg-root *::before, .cg-root *::after { box-sizing: border-box; }

  /* noise overlay */
  .cg-noise {
    position: fixed; inset: 0; pointer-events: none; z-index: 0;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.035'/%3E%3C/svg%3E");
    opacity: 0.5;
  }

  .cg-glow {
    position: fixed; inset: 0; pointer-events: none; z-index: 0;
    background:
      radial-gradient(ellipse 55% 35% at 15% 10%, rgba(255,255,255,0.018) 0%, transparent 60%),
      radial-gradient(ellipse 40% 45% at 85% 85%, rgba(255,255,255,0.012) 0%, transparent 60%);
  }

  .cg-inner { position: relative; z-index: 1; max-width: 1100px; margin: 0 auto; }

  /* Header */
  .cg-header { text-align: center; margin-bottom: 44px; }
  .cg-eyebrow {
    font-family: 'DM Mono', monospace;
    font-size: 10px; letter-spacing: 0.3em; color: var(--text-muted);
    text-transform: uppercase; margin-bottom: 14px;
  }
  .cg-title {
    font-size: clamp(24px, 4vw, 42px); font-weight: 800;
    letter-spacing: 0.12em; text-transform: uppercase;
    color: var(--text-primary); margin-bottom: 8px; line-height: 1;
  }
  .cg-subtitle {
    font-family: 'DM Mono', monospace;
    font-size: 10px; letter-spacing: 0.2em;
    color: var(--text-secondary); text-transform: uppercase;
  }

  /* Province tabs */
  .cg-tabs {
    display: flex; flex-wrap: wrap; gap: 6px;
    justify-content: center; margin-bottom: 40px;
  }

  .cg-tab {
    display: flex; align-items: center; gap: 8px;
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 6px;
    padding: 9px 16px;
    cursor: pointer;
    font-family: 'Syne', sans-serif;
    font-size: 12px; font-weight: 600;
    letter-spacing: 0.04em;
    color: var(--text-secondary);
    transition: all 0.2s ease;
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
    position: relative; overflow: hidden;
  }

  .cg-tab::before {
    content: '';
    position: absolute; inset: 0;
    background: linear-gradient(135deg, rgba(255,255,255,0.05) 0%, transparent 60%);
    opacity: 0; transition: opacity 0.2s ease;
    pointer-events: none;
  }

  .cg-tab:hover { border-color: var(--border-hover); color: var(--text-primary); }
  .cg-tab:hover::before { opacity: 1; }

  .cg-tab.active {
    background: rgba(255,255,255,0.09);
    border-color: rgba(255,255,255,0.22);
    color: var(--text-primary);
  }
  .cg-tab.active::before { opacity: 1; }

  .cg-tab-num {
    font-family: 'DM Mono', monospace;
    font-size: 9px; letter-spacing: 0.05em;
    color: var(--text-muted);
    background: rgba(255,255,255,0.06);
    border-radius: 3px;
    padding: 1px 5px;
    transition: color 0.2s;
  }

  .cg-tab.active .cg-tab-num { color: rgba(255,255,255,0.5); }

  /* Province meta row */
  .cg-meta {
    display: flex; align-items: center; justify-content: space-between;
    margin-bottom: 20px;
    padding-bottom: 16px;
    border-bottom: 1px solid var(--border);
  }

  .cg-meta-left {}
  .cg-meta-province {
    font-size: 18px; font-weight: 700; letter-spacing: 0.06em;
    text-transform: uppercase; color: var(--text-primary);
    margin-bottom: 4px;
  }
  .cg-meta-sub {
    font-family: 'DM Mono', monospace;
    font-size: 9px; letter-spacing: 0.2em; color: var(--text-muted);
    text-transform: uppercase;
  }

  .cg-meta-stats { display: flex; gap: 20px; align-items: center; }

  .cg-stat { text-align: right; }
  .cg-stat-num { font-size: 20px; font-weight: 800; color: var(--text-primary); line-height: 1; }
  .cg-stat-label {
    font-family: 'DM Mono', monospace;
    font-size: 8px; letter-spacing: 0.2em; color: var(--text-muted);
    text-transform: uppercase; margin-top: 3px;
  }

  .cg-stat-divider { width: 1px; height: 28px; background: var(--border); }

  /* Progress bar */
  .cg-progress-wrap { margin-bottom: 28px; }
  .cg-progress-track {
    height: 1px; background: rgba(255,255,255,0.07);
    border-radius: 2px; overflow: hidden; margin-bottom: 6px;
  }
  .cg-progress-fill {
    height: 100%; background: rgba(255,255,255,0.3);
    border-radius: 2px;
    transition: width 0.6s cubic-bezier(0.4,0,0.2,1);
  }
  .cg-progress-labels {
    display: flex; justify-content: space-between;
    font-family: 'DM Mono', monospace;
    font-size: 8px; letter-spacing: 0.15em; color: var(--text-muted);
    text-transform: uppercase;
  }

  /* Grid */
  .cg-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(190px, 1fr));
    gap: 8px;
  }

  /* Card */
  .cg-card {
    position: relative;
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 10px;
    padding: 18px 18px 15px;
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    transition: background 0.22s ease, border-color 0.22s ease, transform 0.18s ease, opacity 0.3s ease;
    overflow: hidden;
    animation: cg-fadeUp 0.35s ease both;
  }

  .cg-card::before {
    content: '';
    position: absolute; inset: 0;
    background: linear-gradient(135deg, rgba(255,255,255,0.045) 0%, transparent 55%);
    border-radius: inherit;
    pointer-events: none;
    opacity: 0;
    transition: opacity 0.22s ease;
  }

  .cg-card:hover {
    background: var(--surface-hover);
    border-color: var(--border-hover);
    transform: translateY(-1px);
  }
  .cg-card:hover::before { opacity: 1; }

  @keyframes cg-fadeUp {
    from { opacity: 0; transform: translateY(10px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  /* Card internals */
  .cg-card-top {
    display: flex; align-items: flex-start;
    justify-content: space-between; margin-bottom: 12px;
  }

  .cg-dot {
    width: 7px; height: 7px; border-radius: 50%;
    margin-top: 2px; flex-shrink: 0; position: relative;
  }
  .cg-dot.on { background: rgba(255,255,255,0.88); }
  .cg-dot.off { background: rgba(255,255,255,0.16); border: 1px solid rgba(255,255,255,0.12); }

  .cg-dot.on::after {
    content: '';
    position: absolute; inset: -3px; border-radius: 50%;
    background: rgba(255,255,255,0.1);
    animation: cg-pulse 2.8s ease-in-out infinite;
  }

  @keyframes cg-pulse {
    0%, 100% { transform: scale(1); opacity: 0.8; }
    50%       { transform: scale(2); opacity: 0; }
  }

  .cg-idx {
    font-family: 'DM Mono', monospace;
    font-size: 9px; letter-spacing: 0.08em; color: var(--text-muted);
  }

  .cg-city-name {
    font-size: 13px; font-weight: 600; letter-spacing: 0.02em;
    color: var(--text-primary); line-height: 1.2; margin-bottom: 3px;
  }
  .cg-card.off .cg-city-name { color: var(--text-secondary); }

  .cg-city-type {
    font-family: 'DM Mono', monospace;
    font-size: 9px; letter-spacing: 0.15em; color: var(--text-muted);
    text-transform: uppercase; margin-bottom: 14px;
  }

  .cg-card-footer {
    display: flex; align-items: center; justify-content: space-between;
  }

  .cg-status-label {
    font-family: 'DM Mono', monospace;
    font-size: 8px; letter-spacing: 0.18em; text-transform: uppercase;
  }
  .cg-card.on .cg-status-label { color: rgba(255,255,255,0.5); }
  .cg-card.off .cg-status-label { color: rgba(255,255,255,0.16); }

  .cg-badge {
    font-family: 'DM Mono', monospace;
    font-size: 7.5px; letter-spacing: 0.15em; text-transform: uppercase;
    padding: 2px 7px; border-radius: 3px; border: 1px solid;
  }
  .cg-card.on .cg-badge {
    color: rgba(255,255,255,0.55);
    border-color: rgba(255,255,255,0.1);
    background: rgba(255,255,255,0.05);
  }
  .cg-card.off .cg-badge {
    color: rgba(255,255,255,0.15);
    border-color: rgba(255,255,255,0.05);
    background: transparent;
  }

  /* Legend */
  .cg-legend {
    display: flex; align-items: center; gap: 20px;
    justify-content: center; margin-bottom: 32px;
  }
  .cg-legend-item {
    display: flex; align-items: center; gap: 7px;
    font-family: 'DM Mono', monospace;
    font-size: 9px; letter-spacing: 0.2em; color: var(--text-muted);
    text-transform: uppercase;
  }
  .cg-legend-dot { width: 6px; height: 6px; border-radius: 50%; }
  .cg-legend-sep { width: 1px; height: 12px; background: var(--border); }

  /* Empty */
  .cg-empty {
    text-align: center; padding: 48px 0;
    font-family: 'DM Mono', monospace;
    font-size: 10px; letter-spacing: 0.2em; color: var(--text-muted);
    text-transform: uppercase;
  }
`;

// ─── Sub-components ──────────────────────────────────────────────────────────

function PulseStyle() {
  return <style>{css}</style>;
}

function ProvinceTabs({ provinces, activeId, onSelect }) {
  console.log(provinces);
  if (provinces == null) return null;
  return (
    <div className="cg-tabs">
      {provinces.map((p) => {
        const covered = p.cities.filter((c) => c.covered).length;
        return (
          <button
            key={p.id}
            className={`cg-tab ${activeId === p.id ? "active" : ""}`}
            onClick={() => onSelect(p.id)}
          >
            <span className="cg-tab-num">{p.number}</span>
            {p.name}
            <span className="cg-tab-num" style={{ marginLeft: 4 }}>
              {covered}/{p.cities.length}
            </span>
          </button>
        );
      })}
    </div>
  );
}

function ProvinceMeta({ province }) {
  const covered = province.cities.filter((c) => c.covered).length;
  const total = province.cities.length;
  const pct = Math.round((covered / total) * 100);
  return (
    <>
      <div className="cg-meta">
        <div className="cg-meta-left">
          <div className="cg-meta-province">{province.name}</div>
          <div className="cg-meta-sub">Provinsi · Jawa · Indonesia</div>
        </div>
        <div className="cg-meta-stats">
          <div className="cg-stat">
            <div className="cg-stat-num">{total}</div>
            <div className="cg-stat-label">Kota</div>
          </div>
          <div className="cg-stat-divider" />
          <div className="cg-stat">
            <div className="cg-stat-num">{covered}</div>
            <div className="cg-stat-label">Tercover</div>
          </div>
          <div className="cg-stat-divider" />
          <div className="cg-stat">
            <div className="cg-stat-num">{pct}%</div>
            <div className="cg-stat-label">Coverage</div>
          </div>
        </div>
      </div>
      <div className="cg-progress-wrap">
        <div className="cg-progress-track">
          <div className="cg-progress-fill" style={{ width: `${pct}%` }} />
        </div>
        <div className="cg-progress-labels">
          <span>0%</span>
          <span>{pct}% Covered</span>
          <span>100%</span>
        </div>
      </div>
    </>
  );
}

function CityCard({ city, index, animDelay }) {
  const status = city.covered ? "on" : "off";
  return (
    <div
      className={`cg-card ${status}`}
      style={{ animationDelay: `${animDelay}ms` }}
    >
      <div className="cg-card-top">
        <div className={`cg-dot ${status}`} />
        <span className="cg-idx">{String(index + 1).padStart(2, "0")}</span>
      </div>
      <div className="cg-city-name">{city.name}</div>
      <div className="cg-city-type">{city.type}</div>
      <div className="cg-card-footer">
        <span className="cg-status-label">
          {city.covered ? "Tersedia" : "Belum tersedia"}
        </span>
        <span className="cg-badge">{city.covered ? "Active" : "Pending"}</span>
      </div>
    </div>
  );
}

function CityGrid({ cities }) {
  if (!cities || cities.length === 0) {
    return <div className="cg-empty">Tidak ada data kota</div>;
  }
  return (
    <div className="cg-grid">
      {cities.map((city, i) => (
        <CityCard key={city.name} city={city} index={i} animDelay={i * 30} />
      ))}
    </div>
  );
}

// ─── Main Component ──────────────────────────────────────────────────────────
/**
 * CoverageCityGrid
 *
 * Props:
 *  - provinces: Array<{
 *      id: string,
 *      name: string,
 *      number: number,
 *      cities: Array<{ name: string, type: string, covered: boolean }>
 *    }>
 *  - defaultProvinceId?: string  — which province is active on mount (defaults to first)
 *  - title?: string
 *  - subtitle?: string
 */
export function CoverageCityGrid({
  provinces = PROVINCES,
  defaultProvinceId,
  activeIdd,
  title = "Cakupan Layanan",
  subtitle = "Status ketersediaan jaringan internet per kota",
}) {
  console.log(activeIdd);
  const [activeId, setActiveId] = useState(activeIdd ?? provinces[0]?.id);

  // Reset to first province if provinces prop changes
  useEffect(() => {
    if (!provinces.find((p) => p.id === activeId)) {
      setActiveId(provinces[0]?.id);
    }
  }, [provinces]);

  const activeProvince = provinces.find((p) => p.id === activeIdd);

  return (
    <div className="cg-root">
      <PulseStyle />
      <div className="cg-noise" />
      <div className="cg-glow" />

      <div className="cg-inner">
        {/* Header */}
        <div className="cg-header">
          <div className="cg-eyebrow">Pulau Jawa · Indonesia</div>
          <h1 className="cg-title">{title}</h1>
          <p className="cg-subtitle">{subtitle}</p>
        </div>

        {/* Legend */}
        <div className="cg-legend">
          <div className="cg-legend-item">
            <div
              className="cg-legend-dot"
              style={{ background: "rgba(255,255,255,0.85)" }}
            />
            Tercover
          </div>
          <div className="cg-legend-sep" />
          <div className="cg-legend-item">
            <div
              className="cg-legend-dot"
              style={{
                background: "rgba(255,255,255,0.16)",
                border: "1px solid rgba(255,255,255,0.12)",
              }}
            />
            Belum Tercover
          </div>
        </div>

        {/* Province Tabs */}
        <ProvinceTabs
          provinces={provinces}
          activeId={activeIdd}
          onSelect={setActiveId}
        />

        {/* Province Meta + Grid */}
        {activeProvince ? (
          <>
            <ProvinceMeta province={activeProvince} />
            {/* Remount grid on province change for animation */}
            <CityGrid key={activeId} cities={activeProvince.cities} />
          </>
        ) : (
          <div className="cg-empty">Pilih provinsi untuk melihat data kota</div>
        )}
      </div>
    </div>
  );
}

// ─── Default Export (Demo) ───────────────────────────────────────────────────
export default function App() {
  return <CoverageCityGrid provinces={PROVINCES} defaultProvinceId="dki" />;
}
